import { writable, get } from 'svelte/store';

const db = window.localStorage;

export let scripts = writable([]);

/**
 * Init LocalStorage scripts db
 */

function init() {
  const storedScripts = db.getItem('scripts');
  if(storedScripts === null) {
    db.setItem('scripts', JSON.stringify(get(scripts)));
  }
}

/**
 * Load all scripts from db
 */
export function loadScripts() {
  scripts.set(JSON.parse(db.getItem('scripts')));
}

/**
 * Load a single item from the db
 * @param {String} id - the id of the script to retrieve
 */
export function getScript(id) {
  return JSON.parse(db.getItem('scripts')).filter((script) => script.id === id)[0];
}

/**
 * Save/update script to db
 * @param {Object} script - script to save
 */
export function save(script) {
  let exists = get(scripts).filter((stored) => stored.id === script.id)[0];
  if(!exists) {
    scripts.update((all) => [script, ...all]);
  } else {
    get(scripts)[get(scripts).indexOf(get(scripts).find((stored) => stored.id === script.id))] = {...script};
  }
  db.setItem('scripts', JSON.stringify(get(scripts)));
  loadScripts();
}

/**
 * Removes a script from db
 * @param {Object} id - id of script to remove
 */
export function remove(id) {
  scripts.update((all) => all.filter((script) => script.id !== id));
  db.setItem('scripts', JSON.stringify(get(scripts)));
}

init();

loadScripts();