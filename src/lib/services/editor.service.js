import { writable } from 'svelte/store';

export let editorContent = writable("");

export let cheatSheetVisible = writable(false);