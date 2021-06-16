<script>
  import { getScript } from './services/db.service.js';
  import remark from 'remark';
  import html from 'remark-html';
  import { onMount, afterUpdate } from 'svelte';

  export let id;
  export let fontSize;
  export let mirrored;

  $: parsed = '';

  function processContent() {
    remark()
      .use(html)
      .process(getScript(id).content, (error, file) =>{
        parsed =  String(file);
      });
  }

  onMount(() => {
    processContent();
  });
</script>

<div class="content" style="font-size: {fontSize}rem; {mirrored ? 'transform: scale(-1,1)' : ''}">
  {@html parsed}
</div>

<style>
  :global(.content > *) {
    line-height: 1.5;
    letter-spacing: 5px;
    word-break: keep-all;
  }
  :global(.content > * + *) {
    margin-top: 4rem;
  }
</style>