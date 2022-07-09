export enum ResourceState {
  META = 1,
  SUMMARY = 2,
  DETAIL = 3,
}

export interface Connection {
  access_token: string;
  athlete: Athlete;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  sync?: boolean;
}

export interface Athlete {
  athlete_type: number;
  badge_type_id: number;
  city: string;
  clubs: unknown[];
  country: string;
  created_at: Date;
  date_preference: string;
  firstname: string;
  follower_count: number;
  friend_count: number;
  ftp?: number;
  id: number;
  lastname: string;
  measurement_preference: string;
  mutual_friend_count: number;
  premium: boolean;
  profile_medium: string;
  profile: string;
  resource_state: ResourceState;
  sex: string;
  state: string;
  updated_at: Date;
  username: string;
  weight: number;
}

export interface Activity {
  achievement_count: number;
  athlete_count: number;
  athlete: { id: number; resource_state: number };
  average_speed: number;
  calories: number;
  comment_count: number;
  commute: boolean;
  description?: string;
  device_watts: boolean;
  distance: number;
  elapsed_time: number;
  external_id?: string;
  flagged: boolean;
  gear_id: string;
  has_heartrate: boolean;
  has_kudoed: boolean;
  id: number;
  kudos_count: number;
  manual: boolean;
  map: {
    id: string;
    polyline: string;
    resource_state: ResourceState;
  };
  max_speed: number;
  moving_time: number;
  name: string;
  photo_count: number;
  pr_count: number;
  private: boolean;
  resource_state: ResourceState;
  segment_efforts: unknown[];
  start_date_local: string;
  start_date: string;
  timezone: string;
  total_elevation_gain: number;
  total_photo_count: number;
  trainer: boolean;
  type: string;
  upload_id?: string;
  utc_offset: number;
  workout_type?: number;
}

export interface WebhookRequestBody {
  aspect_type: "create" | "update" | "delete";
  object_id: number;
  object_type: "activity" | "athlete";
  updates: object;
  subscription_id: number;
  event_time: number;
  owner_id: number;
}
