<script>
  import { Route } from 'tinro';
  import Scripts from './Scripts.svelte';
  import Editor from './Editor.svelte';
  import Prompter from './Prompter.svelte';
</script>

  <Route path="/">
    <section class="home">
      <Editor />
      <Scripts />
    </section>
  </Route>

  <Route path="/:id" let:meta>
    <section class="home">
      <Editor id={meta.params.id} />
      <Scripts />
    </section>
  </Route>

  <Route path="/prompt/:id" let:meta>
    <section class="prompter-home">
      <Prompter id={meta.params.id} />
    </section>
  </Route>

<style>
  .home {
    padding: 3rem;
    height: 100vh;
    display: grid;
    grid-template-columns: 6fr 4fr;
    grid-gap: 3rem;
  }
  .prompter-home {
    height: 100vh;
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: var(--blackish);
  }
</style>