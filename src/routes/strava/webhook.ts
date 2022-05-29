import type { RequestHandler } from "@sveltejs/kit";
import axios, { type AxiosResponse } from "axios";
import admin from "firebase-admin";
import { logger } from "../../lib/server/logger";
import { db } from "../../lib/server/firebaseAdmin";
import { getToken } from "../../lib/server/strava/tokens";
import type { Activity, Athlete, WebhookRequestBody } from "../../types/strava";
import type { Webhook } from "../../types/webhook";

export const post: RequestHandler = async ({ request }) => {
  const data = (await request.json()) as WebhookRequestBody;

  logger.info("webhook request", { data });

  const { owner_id, object_id, aspect_type, object_type } = data;
  const userId = String(owner_id);

  const webhooks = await getUserWebhooks({ userId, object_type, aspect_type });

  if (webhooks.length) {
    let objectUrl: string;

    switch (object_type) {
      case "activity":
        objectUrl = `https://www.strava.com/api/v3/activities/${object_id}`;
        break;
    }

    const payload: {
      data?: Activity | Athlete;
      meta?: { id: string; url: string };
    } & WebhookRequestBody = {
      ...data,
    };

    if (aspect_type === "create" || aspect_type === "update") {
      const access_token = await getToken(userId);

      payload.data = (
        await axios.get(objectUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
      ).data;
    }
    
    logger.info("webhooks", { webhooks });

    for (const {
      id,
      data: { url },
    } of webhooks) {
      payload.meta = { id, url };

      if (url) {
        let response: AxiosResponse;
        try {
          response = await axios.post(url, payload);
        } catch (e) {
          if (axios.isAxiosError(e)) {
            logger.error("failed to send webhook", {
              data: e.response?.data,
              status: e.response?.status,
              url,
              payload,
            });
          } else {
            throw e;
          }
        }

        try {
          const userRef = db.collection("users").doc(userId);
          const webhookRef = userRef.collection("webhooks").doc(id);

          const stats = { sent: admin.firestore.FieldValue.increment(1) };
          stats[`sent_${aspect_type}`] =
            admin.firestore.FieldValue.increment(1);
          stats[`sent_${object_type}`] =
            admin.firestore.FieldValue.increment(1);

          // update global, user, and webhook stats
          await Promise.all([
            webhookRef
              .collection("logs")
              .add({ status: response.status, ...payload }),
            db.collection("meta").doc("stats").set(stats, { merge: true }),
            userRef.set(stats, { merge: true }),
            webhookRef.set(stats, { merge: true }),
          ]);
        } catch (e) {
          logger.error("error logging stats");
        }
      }
    }
  } else {
    logger.info("no webhook to send");
  }

  return {
    status: 200,
  };
};

export const get: RequestHandler = async ({ url }) => {
  return {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "hub.challenge": url.searchParams.get("hub.challenge"),
    }),
  };
};

const getUserWebhooks = async ({
  userId,
  object_type,
  aspect_type,
}: { userId: string } & Pick<
  WebhookRequestBody,
  "aspect_type" | "object_type"
>): Promise<{ id: string; data: Webhook }[]> => {
  const ref = db.collection("users").doc(userId).collection("webhooks");

  const query = await ref
    .orderBy("url") // required to filter for existence of url field
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .where("aspect_type", "in", [aspect_type, "any"])
    .where("object_type", "==", object_type)
    .get();

  return query.docs.map((d) => ({ id: d.id, data: d.data() as Webhook }));
};
