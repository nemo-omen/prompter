<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';
  import Icon from './Icon.svelte';
  import { router } from 'tinro';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let id;
</script>

<header transition:fly={{x: -100, duration: 300, easing: quintInOut}}>
  <nav>
    <a href="/"><Icon name="script" size={3} title="Scripts" /></a>
    <a href="/{id}"><Icon name="edit" size={3} title="Edit" /></a>
  </nav>
  <nav>
    <button on:click={() => dispatch('increaseTypeSize')}><Icon name="increase" size={3} title="Increase" /></button>
    <button on:click={() => dispatch('decreaseTypeSize')}><Icon name="decrease" size={3} title="Decrease" /></button>
    <button on:click={() => dispatch('mirror')}><Icon name="mirror" size={3} title="Mirror" /></button>
  </nav>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 7rem;
    height: 100vh;
    padding: 3rem 1rem;
    background-color: var(--lightblackish);
  }
  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;
  }

  nav a, nav button {
    color: var(--lightgray);
  }
  nav a:hover, nav button:hover, :global(nav a:hover > .icon), :global(nav button:hover > .icon) {
    color: var(--whitish);
  }
</style>