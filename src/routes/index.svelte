<script lang="ts">
  import { onSnapshot } from "firebase/firestore";
  import { db } from "../lib/db";
  import { collection, doc } from "firebase/firestore";

  import { onMount } from "svelte";

  import Login from "../components/Login.svelte";
import Loader from "../components/Loader.svelte";

  let stats: {
    sent?: Number;
  } = {};

  onMount(() => {
    onSnapshot(doc(collection(db, "meta"), "stats"), (snapshot) => {
      stats = snapshot.data();
    });
  });
</script>

<div class="sm:text-center lg:text-left">
  <h1
    class="text-6xl mb-12 leading-24 tracking-wide font-extrabold text-gray-900md:text-6xl"
  >
    <span class="block my-4">Seemlessly integrate Strava</span>
    <span class="block text-orange-600 my-4">anywhere with webhooks</span>
  </h1>
  <p
    class="mt-3 text-base my-8 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0"
  >
    StokeHook provides a service for sending Strava webhooks to your favorite
    service or tool.
  </p>
  <div class="mt-12 sm:flex sm:justify-center md:justify-start">
    <Login
      className="btn btn-primary !text-4xl !px-8 !py-4 !w-full"
      text={"Get started"}
    />
  </div>
</div>

<div class="mt-12 pt-12 border-t">
  <dl
    class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
  >
    <div class="relative">
      <dt>
        <div
          class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white"
        >
          <!-- Heroicon name: outline/globe-alt -->
          <svg
            class="h-6 w-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            viewBox="0 0 384 512"
            ><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
              d="M162.1 257.8c-7.812-7.812-20.47-7.812-28.28 0l-48 48c-7.812 7.812-7.812 20.5 0 28.31l48 48C137.8 386.1 142.9 388 148 388s10.23-1.938 14.14-5.844c7.812-7.812 7.812-20.5 0-28.31L128.3 320l33.86-33.84C169.1 278.3 169.1 265.7 162.1 257.8zM365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0H64C28.65 0 0 28.65 0 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM221.9 257.8c-7.812 7.812-7.812 20.5 0 28.31L255.7 320l-33.86 33.84c-7.812 7.812-7.812 20.5 0 28.31C225.8 386.1 230.9 388 236 388s10.23-1.938 14.14-5.844l48-48c7.812-7.812 7.812-20.5 0-28.31l-48-48C242.3 250 229.7 250 221.9 257.8z"
            /></svg
          >
        </div>
        <p class="ml-16 text-lg leading-relaxed font-medium text-gray-900">
          Webhook includes the data
        </p>
      </dt>
      <dd class="mt-2 ml-16 text-base text-gray-500">
        Sends the current data with the webhook to avoid a second call and need
        for a token to get the object.
      </dd>
    </div>

    <div class="relative">
      <dt>
        <div
          class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white"
        >
          <!-- Heroicon name: outline/scale -->
          <svg
            class="h-6 w-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            viewBox="0 0 288 512"
            ><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path
              d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
            /></svg
          >
        </div>
        <p class="ml-16 text-lg leading-relaxed font-medium text-gray-900">
          It's free
        </p>
      </dt>
      <dd class="mt-2 ml-16 text-base text-gray-500">
        If this is useful, please support me on <a href="https://patreon.com/jpoehnelt">Patreon</a> or <a href="https://opencollective.com/jpoehnelt">OpenCollective</a>.
      </dd>
    </div>

    <div class="relative">
      <dt>
        <div
          class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white"
        >
          <!-- Heroicon name: outline/lightning-bolt -->
          <svg
            class="h-6 w-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            viewBox="0 0 320 512"
            ><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path
              d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"
            /></svg
          >
        </div>
        <p class="ml-16 text-lg leading-relaxed font-medium text-gray-900">
          Immediately processed
        </p>
      </dt>
      <dd class="mt-2 ml-16 text-base text-gray-500">
        There is no SLO, but webhooks will be processed as quickly as possible.
      </dd>
    </div>

    <div class="relative">
      <dt>
        <div
          class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white"
        >
          <svg
            class="h-6 w-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            viewBox="0 0 448 512"
            ><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path
              d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
            /></svg
          >
        </div>
        <p class="ml-16 text-lg leading-relaxed font-medium text-gray-900">
          Your data is never shared
        </p>
      </dt>
      <dd class="mt-2 ml-16 text-base text-gray-500">
        All data is only stored as necessary to debug webhook failures and
        enable replays of the HTTP request.
      </dd>
    </div>
  </dl>
</div>

<div class="mt-12 pt-12 border-t text-xl">
  <p class="mx-auto sm:max-w-xl text-center">
    I currently am doing this as a <span class="font-bold text-orange-600"
      >hobby</span
    >
    and will make a <span class="font-bold text-orange-600">best effort</span>
    to fix bugs and respond to feature requests. You can file issues on
    <a class="underline" href="https://github.com/jpoehnelt/stokehook/issues"
      >GitHub</a
    >. This application is not affiliated with Strava.
  </p>
</div>

<div class="mt-12 pt-4 border-t">
  <div class="mx-auto w-fit p-8 rounded-md flex gap-8 items-center">
    <div class="text-9xl text-purple-600 font-mono h-32 flex items-center"><Loader condition={Boolean(stats.sent)} size={"64"} color={"#9333ea"}>{stats.sent}</Loader></div>
    <div class="w-48 tracking-wide text-gray-600 text-3xl">Webhooks sent</div>
  </div>
</div>
<div class="mt-4 pt-12 border-t text-sm">
  <p class="mx-auto sm:max-w-xl text-center pb-4">
    &copy; <a href="https://justin.poehnelt.com">Justin Poehnelt</a>
  </p>
</div>
