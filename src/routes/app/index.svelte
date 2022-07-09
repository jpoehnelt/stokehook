<script lang="ts">
  import Webhook from "../../components/Webhook.svelte";
  import { getWebhooksRef, getUserRef } from "../../lib/db";
  import { getContext, onDestroy, onMount } from "svelte";
  import { auth } from "../../lib/auth";
  import type { FirestoreStoreWritable, UserData } from "../../types";
  import {
    updateDoc,
    collection,
    onSnapshot,
    addDoc,
    type Unsubscribe,
  } from "firebase/firestore";
  import FirestoreStoreContext from "../../components/FirestoreStoreContext.svelte";
  import { writable } from "svelte/store";

  const user = auth.currentUser!;
  const webhooks = writable<any[]>([]);

  let webhooksSnapshotUnsubscribe: Unsubscribe;

  const onAdd = () => {
    addDoc(getWebhooksRef(), {});
  };

  onMount(() => {
    webhooksSnapshotUnsubscribe = onSnapshot(getWebhooksRef(), (snapshot) => {
      webhooks.set(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  });
  onDestroy(() => {
    if (webhooksSnapshotUnsubscribe) webhooksSnapshotUnsubscribe();
  });
</script>

<h1>Webhooks</h1>

{#each $webhooks as webhook}
  <div class="pb-4 mb-4 border-b"><Webhook {webhook} /></div>
{/each}

<div class="mb-4 pb-4 border-b flex justify-center">
  <button class="btn btn-primary" on:click={onAdd}>Add Webhook</button>
</div>

<p class="my-4">
  For more information on Strava webhooks, visit the <a
    href="https://developers.strava.com/docs/webhooks/#event-data"
    target="_blank">Strava webhook documentation</a
  >.
</p>
