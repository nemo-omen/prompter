<script>
  import { router } from 'tinro';
  import { v4 } from 'uuid';
  import short from 'short-uuid';
  import { onMount, afterUpdate } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { scripts, save } from '../services/db.service.js';
  import Toolbar from '../Toolbar.svelte';

  let editor;
  let cheatSheetVisible = false;
  export let id = '';
  let title = "";
  let date;
  let content = "";
  let lastScript;

  router.subscribe((data) => {
    if(data.path === '/') {
      clear();
    }
    load();
  });

  function clear() {
    id = undefined;
    title = '';
    date = undefined;
    content = '';
  }

  /**
   * Toggles the visibility of the cheatsheet element
   * @function toggleCheatSheet
   */
  function toggleCheatSheet() {
    cheatSheetVisible = !cheatSheetVisible;
  }

  /**
   * Creates a new script by clearing the title & content, generating new date & id values, and pushing the router to '/' 
   */
  function newScript() {
    title = '';
    id = short.generate();
    content = '';
    date = new Date().toLocaleString();
    router.goto('/');
    console.log('newScript');
  }

  /**
   * Send the current script to the prompter.
   * @param {String} scriptId - the ID of the script to send to the prompter
   */
  function prompt() {
    console.log('prompt');
  }

  /**
   * Persists the current script's values.
   */
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
    } else {
      const oldScripts = $scripts.filter((script) => script.id !== id);
    }
    save(script);
    router.goto('/' + id);
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
    // console.log('Requested script: ', script);
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
  <div class="doc-header">
    <h2>Editing{title !== '' ? ': ' + title : ''}</h2>
    <div class="title-group">
      <input type="text" id="script-title" class="title-input" placeholder="Title" tabindex="0" bind:value={title} on:keydown={handleKeyPress} on:blur={handleBlur} />
    </div>
    <div class="sub-header">
      <label for="script-title" class="title-label">Title</label>
      <h3 class="doc-date subheading">{date}</h3>
      <!-- <h3 class="doc-id subheading">ID: {id}</h3> -->
    </div>
    <Toolbar 
      on:newScript={newScript}
      on:saveScript={saveScript}
      on:prompt={prompt}
      on:showInfo={toggleCheatSheet}
      {id}
    />
  </div>
  <div class="doc-body">
    <label for="script-content" class="content-label">Content</label>
    <textarea id="script-content" class="editor" on:blur={handleBlur} on:keydown={handleKeyPress} bind:value={content}></textarea>
  </div>

  {#if cheatSheetVisible}
  <article class="cheatsheet" transition:fly={{y: 1000, duration: 500}}>
    <p>Stuff will live here</p>
  </article>
  {/if}
</section>

<style>
  #editor-content {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .doc-header > * + * {
    margin-top: 3rem;
  }
  .sub-header {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  .title-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .title-input {
    width: 100%;
    font-family: "Anonymous Pro", monospace;
    font-size: 2rem;
    padding: 0.5rem 0;
    border: none;
    border-bottom: 1px solid var(--text-color);
    /* order: 1; */
  }
  .title-label {
    padding: 0 0.5rem;
    /* order: 2; */
  }
  .title-input, .editor {
    transition-property: background-color, color, border-color, outline-color;
    transition-duration: 300ms;
  }
  .title-input:focus, .editor:focus {
    outline: 1px solid var(--lightgray);
    background-color: var(--focus-background-color);
  }
  .subheading {
    font-size: 1.25rem;
    color: var(--gray);
    font-weight: 500;
  }
  .doc-body {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }
  .content-label {
    padding: 0 0 0.5rem 0.5rem;
  }
  .editor {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    overflow-y: auto;
    overflow-x: hidden;
    resize: none;
    font-size: 3rem;
    text-transform: uppercase;
    line-height: 1.3;
    border: none;
  }
  :global(.editor > * + *) {
    margin-top: 1.5rem;
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