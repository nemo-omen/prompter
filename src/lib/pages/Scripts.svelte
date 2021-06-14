<script>
  import { scripts } from '../services/db.service.js';
</script>

<section class="scripts">
  <header>
    <h1>Scripts</h1>
  </header>
  <section>
    <ul>
      {#each $scripts as script}
        <li>
          <a href="/{script.id}">{script.title}</a>
          <p class="date">{script.date}</p>
        </li>
      {/each}
    </ul>
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
  ul {
    list-style-type: none;
  }
  ul > * + * {
    margin-top: 1rem;
  }
  li {
    font-weight: 700;
  }
  a {
    font-size: 2rem;
    text-decoration: underline;
  }
  .date {
    font-size: 1.25rem;
    margin: 0.5rem 0.25rem;
    color: var(--lightgray);
  }
</style>