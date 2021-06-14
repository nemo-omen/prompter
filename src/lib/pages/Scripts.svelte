<script>
  import { scripts } from '../services/db.service.js';
</script>

<section class="scripts">
  <header>
    <h1>Scripts</h1>
  </header>
  <section class="script-list">
      {#each $scripts as script}
        <article class="script-item">
          <a href="/{script.id}">{script.title}</a>
          <p class="date">{script.date}</p>
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
    padding: 0.5rem;
    border: 1px solid var(--whitish);
    transition: all 300ms ease-out;
  }
  .script-item:hover {
    background-color: var(--whitish);
  }
  a {
    font-size: 2rem;
    font-weight: 700;
    text-decoration: underline;
  }
  .date {
    font-size: 1.25rem;
    margin: 0.5rem 0.25rem;
    color: var(--lightgray);
  }
</style>