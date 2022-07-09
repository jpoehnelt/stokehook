interface ImportMetaEnv {
  readonly VITE_SERVICE_ACCOUNT: string;
  readonly VITE_STRAVA_CLIENT_ID: string;
  readonly VITE_STRAVA_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
