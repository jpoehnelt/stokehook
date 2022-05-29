import axios from "axios";
import type { Connection } from "../../../types/strava";
import type { AxiosResponse } from "axios";
import { db } from "../firebaseAdmin";
import { logger } from "../logger";

export const getToken = async (uid: string): Promise<string> => {
  const tokenRef = db
    .collection("users")
    .doc(uid)
    .collection("tokens")
    .doc(uid);

  const { access_token, expires_at, refresh_token } = (
    await tokenRef.get()
  ).data();

  const cushion = 200;
  const now = Date.now() / 1000;

  if (expires_at < now - cushion) {
    logger.info("refreshing access token for user", { uid, expires_at, now });
    const response = await axios.post<never, AxiosResponse<Connection>>(
      "https://www.strava.com/api/v3/oauth/token",
      {
        client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
        client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
        refresh_token,
        grant_type: "refresh_token",
      }
    );

    const data = response.data;
    await tokenRef.update(data);

    return data.access_token;
  }

  return access_token;
};
