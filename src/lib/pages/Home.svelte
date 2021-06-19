<script>
  import { Route } from 'tinro';
  import Scripts from './Scripts.svelte';
  import Editor from './Editor.svelte';
  import Prompter from './Prompter.svelte';
</script>

  <Route path="/">
    <input type="checkbox" id="theme-switch">
    <section class="home">
      <section class="edit-header">
        <label for="theme-switch" class="switch-label"></label>
      </section>
      <Editor />
      <Scripts />
    </section>
  </Route>

  <Route path="/:id" let:meta>
    <input type="checkbox" id="theme-switch">
    <section class="home">
      <section class="edit-header">
        <label for="theme-switch" class="switch-label"></label>
      </section>
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
    padding: 1rem 3rem;
    height: 100vh;
    display: grid;
    grid-template-areas: 
    "head head"
    "body body";
    grid-template-rows: 2rem 1fr;
    grid-template-columns: 6fr 4fr;
    grid-gap: 1rem;
    background-color: var(--background-color);
    color: var(--text-color);
  }
  .edit-header {
    grid-area: head;
    display: flex;
    justify-content: flex-end;
  }

  .prompter-home {
    height: 100vh;
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: var(--blackish);
  }
</style>