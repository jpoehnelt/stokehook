<script lang="ts">
  import { Pulse } from "svelte-loading-spinners";
  export let condition: boolean;
  export let size = "120";
  export let color = "#EA580C";
  export let className = "flex justify-center items-center";
</script>

{#if condition}
  <slot />
{:else}
  <div class={className}>
    <Pulse {size} {color} unit="px" duration="1.3s" />
  </div>
{/if}
