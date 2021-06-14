<script>
  import Icon from './Icon.svelte';
  import { router } from 'tinro';
  import { fade } from 'svelte/transition';
</script>

<header>
  <nav>
    <a href="/"><Icon name="script" size={3} title="Scripts" /></a>
    <a href="/prompt"><Icon name="prompt" size={3} title="Prompt" /></a>
    <a href="/edit"><Icon name="edit" size={3} title="Edit" /></a>
  </nav>
  <nav>
    {#if $router.path === '/prompt'}
    <button><Icon name="increase" size={3} /></button>
    <button><Icon name="decrease" size={3} /></button>
    <button><Icon name="mirror" size={3} /></button>
    {:else if $router.path === '/edit'}
    <button><Icon name="save" size={3} /></button>
    {/if}
  </nav>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 5rem;
    height: 100vh;
    padding: 3rem 1rem;
    border-right: 2px solid var(--blackish);
  }
  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;
  }
</style>