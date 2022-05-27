import { getAuth, getFirestore } from "../../lib/server/firebaseAdmin";

import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import type { Connection } from "../../types/strava";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ url }) => {
  const { redirect } = JSON.parse(
    decodeURIComponent(url.searchParams.get("state"))
  );

  let response: AxiosResponse<Connection>;
  const tokenUrl = `https://www.strava.com/oauth/token?client_id=${
    import.meta.env.VITE_STRAVA_CLIENT_ID
  }&client_secret=${
    import.meta.env.VITE_STRAVA_CLIENT_SECRET
  }&code=${url.searchParams.get("code")}&grant_type=authorization_code`;

  // replace code below with oidc specific library
  try {
    response = await axios.post(tokenUrl, {});
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(
      JSON.stringify(
        {
          data: e.response?.data,
          status: e.response?.status,
          headers: e.response?.headers,
        },
        null,
        2
      )
    );
  }

  const uid = String(response.data.athlete.id);
  const token = await getAuth().createCustomToken(uid);

  const { athlete, ...stravaTokenData } = response.data;

  const userDoc = getFirestore().collection("users").doc(uid);
  if (!(await userDoc.get()).exists) {
    await userDoc.create(athlete);
  } else {
    await userDoc.update(athlete);
  }

  const tokenDoc = userDoc.collection("tokens").doc(uid);
  if (!(await tokenDoc.get()).exists) {
    await tokenDoc.create(stravaTokenData);
  } else {
    await tokenDoc.update(stravaTokenData);
  }

  return {
    status: 302,
    headers: {
      location: `/callback?state=${encodeURIComponent(
        JSON.stringify({ redirect, token })
      )}`,
    },
  };
};
