<script lang="ts">
  import { auth } from "../lib/auth";
  import { getUserRef } from "../lib/db";
  import { goto } from "$app/navigation";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber } from "svelte/store";
  import FirestoreStoreContext from "./FirestoreStoreContext.svelte";

  export let guard = true;

  let unsubscribe: Unsubscriber;
  $: userRef = null;

  onMount(() => {
    unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        if (guard) {
          await goto(`/`);
        }
      } else {
        userRef = getUserRef(user);
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

{#if !userRef && !guard}
  <slot />
{/if}

{#if userRef}
  <FirestoreStoreContext ref={userRef}>
    <slot />
  </FirestoreStoreContext>
{/if}

{#if !userRef && guard}<div />{/if}
