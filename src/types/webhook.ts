import type { WebhookRequestBody } from "./strava";

export interface Webhook
  extends Partial<Pick<WebhookRequestBody, "object_type">> {
  aspect_type: "create" | "update" | "delete" | "any";
  url?: string;
}
