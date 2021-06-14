import { writable } from 'svelte/store';
export let scripts = writable([]);

const test = {
  id: 'ab12jku364589klhu7678sdkfjhg',
  date: '6/13/2021, 9:04:09 AM',
  title: 'Test Title',
  content: 'Test content goes here',
};

const test2 = {
  id: '15dfgsd554dfg4657d6fg7',
  date: '6/13/2021, 9:33:09 AM',
  title: 'Test Title 2',
  content: 'Test content 2 goes here',
};

scripts.set([test, test2]);