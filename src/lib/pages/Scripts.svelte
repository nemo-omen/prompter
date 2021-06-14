<script>
  import { scripts } from '../services/db.service.js';
  import Icon from '../Icon.svelte';
</script>

<section class="scripts">
  <header>
    <h1>Scripts</h1>
  </header>
  <section class="script-list">
    {#each $scripts as script}
    <a href="/{script.id}">
      <article class="script-item">
        <section class="item-info">
          <h2>{script.title}</h2>
          <p class="date">{script.date}</p>
        </section>
        <section class="item-control">
          <button>
            <Icon name="prompt" size={2} />
          </button>
          <button>
            <Icon name="delete" size={2} />
          </button>
        </section>
      </article>
    </a>
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
  .script-item:hover {
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