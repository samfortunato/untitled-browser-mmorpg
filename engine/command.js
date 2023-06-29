import { addEntity } from './entity.js';

import { MapEditor } from '../entities/ui/map-editor/map-editor.js';

import { getCurrentSceneMap } from './scene.js';

const COMMANDS = {
  'mapeditor': onMapEditor,
  'logmap': onLogMap,
}

function onMapEditor() {
  addEntity(new MapEditor());
}

function onLogMap() {
  console.log(getCurrentSceneMap().tiles);
}

export function processCommand(commandText) {
  const commandName = commandText.slice(1);
  const command = COMMANDS[commandName];

  if (command) command();
}
