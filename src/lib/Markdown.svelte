<script>
  import { getScript } from './services/db.service.js';
  import remark from 'remark';
  import html from 'remark-html';
  import { onMount, afterUpdate } from 'svelte';

  export let id;

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

{@html parsed}
