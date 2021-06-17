<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';

  export let id;

  const dispatch = createEventDispatcher();
  
</script>

<section class="toolbar">
  <div class="button-group">
    <button on:click={() => dispatch('newScript')} title="New Script">
      <Icon name="new" size={2} />
    </button>
    <button on:click={() => dispatch('saveScript')} title="Save">
      <Icon name="save" size={2} />
    </button>
    <a href="/prompt/{id}" title="Prompt">
      <Icon name="prompt" size={2} />
    </a>
    <button on:click={() => dispatch('showInfo')} title="Cheatsheet">
      <Icon name="info" size={2} />
    </button>
  </div>
</section>

<style>
  .toolbar {
    display: flex;
    justify-content: end;
    margin: 1rem 0;
    transition: all 300ms ease-in-out;
  }
  button, a { 
    color: var(--gray);
  }
  
  button:hover,
  a:hover {
    color: var(--blackish);
  }

  button:focus,
  a:focus {
    color: var(--blue);
    outline: 1px solid var(--lightgray);
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    color: var(--lightgray);
  }
</style>