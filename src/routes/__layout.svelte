<script lang="ts">
  import "../app.css";
  import NavBar from "../components/NavBar.svelte";
  import Container from "../components/Container.svelte";
</script>

<div class="text-gray-700">
  <NavBar />
  <main>
    <Container>
      <slot />
    </Container>
  </main>
</div>
