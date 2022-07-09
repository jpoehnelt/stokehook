<script lang="ts">
  import WebhookComponent from "../../components/Webhook.svelte";
  import { getWebhooksRef } from "../../lib/db";
  import { onDestroy, onMount } from "svelte";
  import { onSnapshot, addDoc, type Unsubscribe } from "firebase/firestore";
  import { writable } from "svelte/store";
  import type { Webhook } from "../../types/webhook";

  const webhooks = writable<{ id: string; data: Webhook }[]>([]);

  let webhooksSnapshotUnsubscribe: Unsubscribe;

  const onAdd = () => {
    addDoc(getWebhooksRef(), {});
  };

  onMount(() => {
    webhooksSnapshotUnsubscribe = onSnapshot(getWebhooksRef(), (snapshot) => {
      webhooks.set(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data() as Webhook,
        }))
      );
    });
  });
  onDestroy(() => {
    if (webhooksSnapshotUnsubscribe) webhooksSnapshotUnsubscribe();
  });
</script>

<h1>Webhooks</h1>

{#each $webhooks as webhook}
  <div class="pb-4 mb-4 border-b"><WebhookComponent {webhook} /></div>
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
