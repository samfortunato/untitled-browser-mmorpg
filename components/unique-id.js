/**
 * A globally unique identifier.
 *
 * Guaranteed to be unique for any entity.
 */
export class UniqueId {
  constructor(id) {
    this.id = id ? Symbol(id) : Symbol();
  }

  getId() {
    return this.id;
  }
}
