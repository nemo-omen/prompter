<script>
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { meta, router } from 'tinro';
  import { scripts, remove } from '../services/db.service.js';
  import Icon from '../Icon.svelte';

  let path = '';

  router.subscribe((data) => {
    path = data.path;
  });

  function deleteScript(id) {
    remove(id);
    if(path === '/' + id) {
      router.goto('/');
    }
  }
</script>

<section class="scripts">
  <header>
    <h2>Scripts</h2>
    <a href="/" class="header-link button" title="New Script">
      <Icon name="new" size={2} title="New" />
    </a>
  </header>
  <section class="script-list">
    {#each $scripts as script (script.id)}
    <article class="script-item" animate:flip transition:fade>
        <a href="/{script.id}">
        <section class="item-info">
          <h2>{script.title}</h2>
          <p class="date">{script.date}</p>
        </section>
      </a>
        <section class="item-control">
          <a href="/prompt/{script.id}" title="Prompt" class="button">
            <Icon name="prompt" size={2} title="Prompt" />
          </a>
          <button on:click={() => deleteScript(script.id)} title="Delete">
            <Icon name="delete" size={2} title="Delete" />
          </button>
        </section>
      </article>
      {/each}
    </section>
</section>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-link {
    margin: 0.25rem;
    outline-offset: -1px;
  }
  .scripts {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-left: 3rem;
    border-left: 2px dashed var(--lightgray);
    overflow: hidden;
  }
  .script-list {
    overflow-y: auto;
    height: 100%;
  }
  :global(.script-list > * + *) {
    margin-top: 1rem;
  }

  .script-item {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 0.5rem;
    transition: all 300ms ease-out;
  }
  .script-item:hover{
    color: var(--focus-color);
    background-color: var(--focus-background-color);
  }
  .item-control {
    display: flex;
    justify-content: space-around;
    justify-self: flex-end;
    align-items: center;
    gap: 1rem;
    margin: 0 0.5rem 0 0;
  }
  a {
    font-size: 2rem;
    text-decoration: none;
    justify-self: stretch;
  }
  a:focus {
    background-color: var(--focus-background-color);
    color: var(--focus-color);
  }
  .date {
    font-size: var(--size-400);
    font-weight: 500;
    margin: 0.5rem 0.25rem;
    color: var(--gray);
  }
</style>