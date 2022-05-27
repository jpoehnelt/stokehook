<script lang="ts">
  import { getWebhooksRef } from "../lib/db";
  import { deleteDoc, doc, updateDoc } from "firebase/firestore";
  import Loader from "./Loader.svelte";

  export let webhook;
  let urlInput: HTMLInputElement;
  let urlValid: boolean = true;
  let saved = false;

  // TODO made this into a anonymous function since there were issues with svelte using the same ref for operations???
  const webhookRef = () => doc(getWebhooksRef(), webhook.id);

  const onChange = async () => {
    urlValid = urlInput.checkValidity();
    
    if (urlValid) {
      saved = true;
      await updateDoc(webhookRef(), webhook.data);
      setTimeout(() => (saved = false), 1000);
    }
  };

  const onDelete = async () => {
    await deleteDoc(webhookRef());
  };
</script>

<div class="form-group">
  <label for="url">Object type</label>
  <select
    id="type"
    bind:value={webhook.data.object_type}
    on:change={onChange}
    placeholder="https://example.com"
  >
    <option>activity</option>
    <!-- <option>athlete</option> -->
  </select>
</div>

<div class="form-group">
  <label for="url">Aspect type</label>
  <select
    id="type"
    bind:value={webhook.data.aspect_type}
    on:change={onChange}
    placeholder="https://example.com"
  >
    <option>any</option>
    <option>create</option>
    <option>update</option>
    <option>delete</option>
  </select>
  <p>
    The full activity is only returned when an activity is created or updated.
  </p>
</div>

<div class="form-group">
  <label for="url">URL</label>
  <input
    id="url"
    type="url"
    class:invalid={!urlValid}
    bind:value={webhook.data.url}
    bind:this={urlInput}
    on:change={onChange}
    pattern="https?://.+"
    required
    placeholder="https://example.com"
  />
  <p>Use <a href="https://webhook.site">Webhook.site</a> for testing.</p>
</div>

<div class="flex justify-end items-center gap-4">
  {#if saved}
    <div class="flex items-center gap-2 btn">
      <Loader size={"24"} condition={false} /><span>Saving</span>
    </div>
  {/if}
  <button class="btn btn-secondary my-2" on:click={onDelete}>Delete</button>
</div>
