<script>
  import { Route } from 'tinro';
  import Scripts from './Scripts.svelte';
  import Editor from './Editor.svelte';
</script>

<section class="home">
  <Route path="/">
    <Editor />
  </Route>
  <Route path="/:id" let:meta>
    <Editor id={meta.params.id} />
  </Route>
  <Scripts />
</section>

<style>
  .home {
    padding: 3rem;
    height: 100vh;
    display: grid;
    grid-template-columns: 6fr 5fr;
    grid-gap: 3rem;
  }
</style>