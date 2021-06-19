<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';

  export let id;

  const dispatch = createEventDispatcher();
  
</script>

<section class="toolbar">
  <div class="button-group">
    <button on:click={() => dispatch('newScript')} title="New Script">
      <Icon name="new" size={2} title="New" />
    </button>
    <button on:click={() => dispatch('saveScript')} title="Save">
      <Icon name="save" size={2} title="Save" />
    </button>
    <a href="/prompt/{id}" class="button" title="Prompt">
      <Icon name="prompt" size={2} title="Prompt" />
    </a>
    <button on:click={() => dispatch('showInfo')} title="Cheatsheet">
      <Icon name="info" size={2} title="Help" />
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
  .button-group {
    display: flex;
    gap: 2rem;
  }
  :global(button:focus > .icon > .visually-hidden, .button:focus > .icon > .visually-hidden) {
    opacity: 1;
  }
</style>