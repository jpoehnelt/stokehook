<script lang="ts">
  import { getUserRef } from "../../lib/db";
  import { getContext, onDestroy, onMount } from "svelte";
  import { auth } from "../../lib/auth";
  import type { FirestoreStoreWritable, UserData } from "../../types";
  import { deleteDoc, updateDoc } from "firebase/firestore";
  import type { Unsubscriber } from "svelte/store";

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = auth.currentUser!;
  const userRef = getUserRef(user);

  const store = getContext<FirestoreStoreWritable<UserData>>(
    getUserRef(auth.currentUser).path
  );

  let storeUnsubscriber: Unsubscriber;
  const defaults: UserData = {};

  let settings: UserData = { ...defaults };
  onMount(() => {
    storeUnsubscriber = store.subscribe(({ document }) => {
      if (document) {
        settings = { ...settings, ...document.data() };
        for (let key in defaults) {
          if (document.get(key) === undefined) {
            updateDoc(userRef, { [key]: defaults[key] });
          }
        }
      }
    });
  });
  onDestroy(() => {
    if (storeUnsubscriber) storeUnsubscriber();
  });

  const onDelete = async () => {
    await deleteDoc(userRef);
    await auth.signOut();
  };
</script>

<button class="btn btn-secondary" on:click={onDelete}>Delete Account</button>
