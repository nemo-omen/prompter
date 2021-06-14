<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';

  const dispatch = createEventDispatcher();
  
</script>

<section class="toolbar">
  <div class="button-group">
    <button on:click={() => dispatch('newScript')}>
      <Icon name="new" size={2} />
    </button>
    <button on:click={() => dispatch('saveScript')}>
      <Icon name="save" size={2} />
    </button>
    <button on:click={() => dispatch('prompt')}>
      <Icon name="prompt" size={2} />
    </button>
    <button on:click={() => dispatch('showInfo')}>
      <Icon name="info" size={2} />
    </button>
  </div>
</section>

<style>
  .toolbar {
    display: flex;
    justify-content: end;
    margin: 1rem 0;
    opacity: 0;
    transition: all 300ms ease-in-out;
  }
  .toolbar:hover {
    opacity: 1;
  }
  .button-group {
    display: flex;
    gap: 1rem;
    color: var(--lightgray);
  }
</style>