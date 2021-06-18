<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  import { getScript } from '../services/db.service.js';
  import Header from '../Header.svelte';
  import Icon from '../Icon.svelte';
  import Markdown from '../Markdown.svelte';
  import { null_to_empty } from "svelte/internal";

  export let id;

  $: script = '';
  $: fontSize = 4;
  $: headingSize = fontSize * 1.5;
  $: mirrored = false;
  $: transcript = [];
  $: supportedBrowser = false;

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

    try {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();

      recognition.interimResults = true;

      recognition.addEventListener('result', (event) => {
        console.log(event.results);
        transcript = Array.from(event.results);
      });

      supportedBrowser = true;
  
      recognition.start();

    } catch(error) {
      if(error.name === 'TypeError') {
        if(error.message === 'SpeechRecognition is not a constructor') {
          supportedBrowser = false;
        }
      }
    }




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
  {:else}
  <div class="arrow" transition:fade={{duration: 300}}>
    <Icon name="arrowleft" size={3} />
  </div>
  {/if}
</section>
<section class="prompter" style="--heading-size:{headingSize}">
  <Markdown 
  {id}
  bind:fontSize={fontSize}
  bind:mirrored={mirrored}
  />
</section>

<style>
  .header-display {
    position: relative;
    width: 7rem;
    background-color: var(--mutedlightblackish);
    border-right: 1px solid var(--lightlightblackish);
  }
  .arrow {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: var(--gray);
  }
  .prompter {
    margin-block: 10vh;
    padding-inline: 10vw;
    font-size: var(--size-900);
    font-weight: 500;
    text-transform: uppercase;
    text-align: left;
    color: var(--whitish);
    overflow-y: auto;
    scroll-behavior: smooth;
  }
  :global(.prompter h1, .prompter h2, .prompter h3) {
    font-size: var(--heading-size);
    display: block;
    border-top: 5px solid gold;
    border-bottom: 5px solid gold;
    text-align: center;
    margin: 10vh;
    color: gold;
  }
</style>