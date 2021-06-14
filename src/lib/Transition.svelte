<script>
  import { router } from 'tinro';
  import { fade, fly } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';
</script>

{#key $router.path}
  <section in:fade={{duration: 500, easing: quintInOut}}>
    <slot></slot>
  </section>
{/key}