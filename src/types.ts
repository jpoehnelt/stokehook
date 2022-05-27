import type { Writable } from "svelte/store";
import type {
  QueryDocumentSnapshot,
  DocumentSnapshot,
} from "firebase/firestore";

export enum FirestoreStoreWritableStatus {
  EMPTY,
  PENDING,
  READY,
}

export type FirestoreStoreData<T> = {
  status: FirestoreStoreWritableStatus;
  document?: DocumentSnapshot<T>;
  collection?: QueryDocumentSnapshot<T>[];
};

export type FirestoreStoreWritable<T> = Writable<FirestoreStoreData<T>>;

export interface UserData {
  units?: "metric" | "imperial";
  dirty?: boolean;
}
