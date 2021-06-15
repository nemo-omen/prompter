<script>
  import { flip } from 'svelte/animate';
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
  </header>
  <section class="script-list">
    {#each $scripts as script (script.id)}
    <article class="script-item" animate:flip>
        <a href="/{script.id}">
        <section class="item-info">
          <h2>{script.title}</h2>
          <p class="date">{script.date}</p>
        </section>
      </a>
        <section class="item-control">
          <button>
            <Icon name="prompt" size={2} />
          </button>
          <button on:click={() => deleteScript(script.id)}>
            <Icon name="delete" size={2} />
          </button>
        </section>
      </article>
      {/each}
    </section>
</section>

<style>
  .scripts {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 0.5rem 0 0.3rem 3rem;
    border-left: 2px dashed var(--lightgray);
  }
  :global(.script-list > * + *) {
    margin-top: 1rem;
  }

  .script-item {
    display: flex;
    justify-content: space-between;
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
    gap: 1rem;
  }
  a {
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
  }
  h2 { 
    font-size: 2rem;
  }
  .date {
    font-size: 1.25rem;
    margin: 0.5rem 0.25rem;
    color: var(--lightgray);
  }
</style>