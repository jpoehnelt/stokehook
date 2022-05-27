<script lang="ts">
  import { onMount } from "svelte";
  import { getAuth, signInWithCustomToken } from "firebase/auth";
  import { goto } from "$app/navigation";

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    const { token, redirect, close } = JSON.parse(decodeURIComponent(state));
    console.log({ token, redirect, close })

    await signInWithCustomToken(getAuth(), token);
    if (close) {
      window.close();
    } else {
      await goto(redirect ?? "/app");
    }
  });
</script>
