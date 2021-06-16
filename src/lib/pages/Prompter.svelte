<script>
  import { onMount } from "svelte";
  import { getScript } from '../services/db.service.js';
  import Header from '../Header.svelte';
  import Markdown from '../Markdown.svelte';

  export let id;

  $: script = '';
  $: fontSize = 4;
  $: mirrored = false;

  let headerVisible = false;

  function showHeader(){
    headerVisible = true;
  }
  
  function hideHeader() {
    headerVisible = false;
  }

  function increaseTypeSize() {
    fontSize += 0.25;
  }

  function decreaseTypeSize() {
    fontSize -= 0.25;
  }

  function mirror() {
    mirrored = !mirrored;
  }

  onMount(() => {
    script = getScript(id);
  });
</script>
<section class="header-display" on:mouseenter={showHeader} on:mouseleave={hideHeader}>
  {#if headerVisible}
  <Header
  {id}
  on:increaseTypeSize={increaseTypeSize}  
  on:decreaseTypeSize={decreaseTypeSize}
  on:mirror={mirror}
  />
  {/if}
</section>
<section class="prompter">
  <Markdown 
  {id}
  bind:fontSize={fontSize}
  bind:mirrored={mirrored}
  />
</section>

<style>
  .header-display {
    width: 5rem;
    background-color: var(--blackish);
  }
  .prompter {
    padding: 15vh 10vw;
    font-size: var(--size-900);
    font-weight: 500;
    text-transform: uppercase;
    color: var(--whitish);
    overflow-y: auto;
    scroll-behavior: smooth;
  }
</style>