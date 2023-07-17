import { setupInput } from './input.js';
import { setupServerConnection } from './server.js';

export function setupEngine() {
  setupServerConnection();
  setupInput();
}
