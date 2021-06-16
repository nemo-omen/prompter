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
    <h1>Scripts</h1>
    <a href="/" class="header-link" title="New Script">
      <Icon name="new" size={2} />
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
          <a href="/prompt/{script.id}" title="Prompt">
            <Icon name="prompt" size={2} />
          </a>
          <button on:click={() => deleteScript(script.id)} title="Delete">
            <Icon name="delete" size={2} />
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
    color: var(--gray);
  }
  .header-link:hover, .header-link:focus, .header-link:active {
    color: var(--blue);
  }
  .scripts {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 0.5rem 0 0.3rem 3rem;
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
    border: 1px solid var(--whitish);
    transition: all 300ms ease-out;
    color: var(--gray);
  }
  .script-item:hover, article:focus{
    background-color: var(--whitish);
    color: var(--blackish);
  }
  .item-control {
    display: flex;
    justify-content: space-around;
    justify-self: flex-end;
    align-items: center;
    gap: 1rem;
  }
  a {
    font-size: 2rem;
    /* font-weight: 700; */
    text-decoration: none;
    justify-self: stretch;
  }
  h2 {
    font-weight: 500;
  }
  .date {
    font-size: var(--size-400);
    font-weight: 500;
    margin: 0.5rem 0.25rem;
    color: var(--lightgray);
  }
</style>