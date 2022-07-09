<script lang="ts">
  import { goto } from "$app/navigation";

  const connectStrava = async () => {
    const redirect_uri = `${window.location.protocol}//${window.location.host}/strava/callback`;
    const authorizeURL = `https://www.strava.com/api/v3/oauth/authorize`;
    const clientId = `83745`;

    const state = {
      redirect: window.location.protocol + "//" + window.location.host + "/app",
    };

    goto(
      `${authorizeURL}?state=${encodeURIComponent(
        JSON.stringify(state)
      )}&response_type=code&client_id=${clientId}&scope=activity%3Aread_all&redirect_uri=${redirect_uri}`
    );
  };

  export let text = "Sign in with Strava";
  export let className = "btn btn-primary";
</script>

<button class={className} on:click={connectStrava}>{text}</button>
