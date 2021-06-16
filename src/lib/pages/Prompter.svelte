<script>
  import { onMount } from "svelte";
  import { getScript } from '../services/db.service.js';
  import Header from '../Header.svelte';
  import Markdown from '../Markdown.svelte';

  export let id;

  $: script = '';

  let headerVisible = false;

  function showHeader(){
    headerVisible = true;
  }
  
  function hideHeader() {
    headerVisible = false;
  }

  onMount(() => {
    script = getScript(id);
    console.log('Script content: ', script.content);
  });
</script>
<section class="header-display" on:mouseenter={showHeader} on:mouseleave={hideHeader}>
  {#if headerVisible}
  <Header {id}/>
  {/if}
</section>
<section class="prompter">
  <Markdown {id} />
</section>

<style>
  .header-display {
    width: 5rem;
    background-color: var(--blackish);
  }
  .prompter {
    width: 60vw;
    margin: 3rem auto;
    font-size: var(--size-900);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--whitish);
  }
</style>