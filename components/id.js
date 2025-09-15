/**
 * A globally unique identifier.
 *
 * Guaranteed to be unique for any entity.
 */
export class Id {
  #value;

  /** @param {string} [value] */
  constructor(value) {
    this.#value = value ? Symbol(value) : Symbol();
  }

  get value() {
    return this.#value;
  }
}
