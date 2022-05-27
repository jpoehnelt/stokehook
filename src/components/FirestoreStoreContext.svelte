<script lang="ts">
  import { onDestroy, onMount, setContext } from "svelte";
  import { writable } from "svelte/store";

  import {
    DocumentReference,
    CollectionReference,
    onSnapshot,
  } from "firebase/firestore";
  import type { Unsubscribe } from "firebase/firestore";
  import { FirestoreStoreWritableStatus } from "../types";
  import type { FirestoreStoreData } from "../types";
  import { dev } from "$app/env";
  import Loader from "./Loader.svelte";
  import { auth } from "../lib/auth";

  // see https://github.com/sveltejs/language-tools/issues/273#issuecomment-1003496094
  // and https://github.com/sveltejs/language-tools/issues/442 for generic props
  type T = $$Generic;
  interface $$Props {
    ref: DocumentReference<T> | CollectionReference<T>;
    allowAnonymous?: boolean;
  }

  export let ref: DocumentReference<T> | CollectionReference<T>;
  export let allowAnonymous = false;

  let unsubscribe: Unsubscribe;

  let store = writable<FirestoreStoreData<T>>({
    status: FirestoreStoreWritableStatus.PENDING,
  });

  // TODO typings... maybe use a getter helper for common usages?
  setContext(ref.path, store);

  onMount(async () => {
    if (!allowAnonymous) {
      auth.onAuthStateChanged((user) => {
        if (dev) console.log(`[FiresStoreContext] ref: ${ref.path} logout`);

        if (!user) {
          store.set({
            status: FirestoreStoreWritableStatus.EMPTY,
          });
          unsubscribe();
        }
      });
    }

    if (dev) console.log(`[FiresStoreContext] ref: ${ref.path} onMount`);

    store.set({
      status: FirestoreStoreWritableStatus.PENDING,
    });

    // listen to snapshots for docs and collections and update the appropriate store
    if (ref instanceof DocumentReference) {
      unsubscribe = onSnapshot(ref, (snapshot) => {
        store.set({
          status: FirestoreStoreWritableStatus.READY,
          document: snapshot,
        });

        if (dev) {
          console.log(
            `[FiresStoreContext] ref: ${ref.path} onSnapshot<Document>`
          );
        }
      });
    }

    if (ref instanceof CollectionReference) {
      unsubscribe = onSnapshot(ref, (snapshot) => {
        store.set({
          status: FirestoreStoreWritableStatus.READY,
          collection: snapshot.docs,
        });
        if (dev) {
          console.log(
            `[FiresStoreContext] ref: ${ref.path} onSnapshot<Collection>`
          );
        }
      });
    }
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();

    store.update((s) => {
      s.document = undefined;
      s.collection = undefined;
      s.status = FirestoreStoreWritableStatus.EMPTY;

      return s;
    });

    if (dev) {
      console.log(`[FiresStoreContext] ref: ${ref.path} onDestroy`);
    }
  });
</script>

<Loader condition={$store.status === FirestoreStoreWritableStatus.READY}>
  <slot />
</Loader>
