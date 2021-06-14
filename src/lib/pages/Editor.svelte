<script>
  import { router } from 'tinro';
  import { v4 } from 'uuid';
  import short from 'short-uuid';
  import { onMount, afterUpdate } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { scripts } from '../services/db.service.js';
  import Toolbar from '../Toolbar.svelte';

  let editor;
  let cheatSheetVisible = false;
  export let id;
  let title = "";
  let date;
  let content = "";
  let lastScript;

  router.subscribe((data) => {
    console.log('Router data: ', data);
    load();
  });

  function toggleCheatSheet() {
    cheatSheetVisible = !cheatSheetVisible;
  }

  function newScript() {
    id = undefined;
    title = '';
    id = short.generate();
    content = '';
    date = new Date().toLocaleString();
    router.goto('/');
    console.log('newScript');
  }

  function prompt() {
    console.log('prompt');
  }

  function showInfo() {
    console.log('showInfo');
  }

  async function saveScript() {
    const exists = $scripts.filter((script) => script.id === id)[0];
    const script = {
      id,
      title,
      date: new Date().toLocaleString(),
      content
    };

    if(exists === undefined) {
      if(title === '') {
        script.title = 'Untitled';
        title = 'Untitled';
      }

      $scripts = [script, ...$scripts];
    } else {
      const oldScripts = $scripts.filter((script) => script.id !== id);
      scripts.set([script, ...oldScripts]);
    }
    console.log($scripts);
  }

  function handleKeyPress(event) {
    if(event.ctrlKey) {
      if(event.key === 's' || event.key === 'S') {
        event.preventDefault();
        saveScript();
      }
    }
  }
  
  function handleBlur() {
    saveScript();
  }

  function getScriptById(scriptId) {
    const script = $scripts.filter((script) => script.id === scriptId)[0];
    console.log('Requested script: ', script);
    if(script === undefined) {
      return;
    } else {
      id = script.id;
      date = script.date;
      content = script.content;
      title = script.title;
    }
  }

  function load() {
    if(id === undefined) {
      id = short.generate();
      date = new Date().toLocaleString();
    } else {
      getScriptById(id);
    }
  }

</script>

<section id="editor-content">
  {#if cheatSheetVisible}
  <article class="cheatsheet" transition:fly={{x: 1000, duration: 500}}>
    <p>Stuff will live here</p>
  </article>
  {/if}

  <div class="doc-header">
    <input type="text" class="title-input" placeholder="Title" bind:value={title} on:keydown={handleKeyPress} on:blur={handleBlur} />
    <div class="sub-header">
      <h3 class="doc-date subheading">{date}</h3>
      <!-- <h3 class="doc-id subheading">ID: {id}</h3> -->
    </div>
    <Toolbar 
      on:newScript={newScript}
      on:saveScript={saveScript}
      on:prompt={prompt}
      on:showInfo={toggleCheatSheet}
    />
  </div>
  <div class="doc-body">
    <div class="editor" contenteditable on:blur={handleBlur} on:keydown={handleKeyPress} bind:innerHTML={content}>
      
    </div>
  </div>
</section>

<style>
  #editor-content {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .doc-header > * + * {
    margin-top: 0.5rem;
  }
  .sub-header {
    display: flex;
    justify-content: space-between;
  }
  .title-input {
    width: 100%;
    font-family: "Anonymous Pro", monospace;
    font-size: 2rem;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid #000;
  }
  .title-input:focus, .editor:focus {
    outline: 1px solid var(--lightgray);
  }
  .subheading {
    font-size: 1.25rem;
    color: var(--lightgray);
  }
  .doc-id {
    font-weight: 400;
  }
  .doc-body {
    position: relative;
    height: 100%;
  }
  .editor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 3rem;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 1.3;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .cheatsheet {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid #000;
  }
</style>