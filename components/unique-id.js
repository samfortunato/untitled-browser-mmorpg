export class UniqueId {
  constructor(id) {
    this.id = id ? Symbol(id) : Symbol();
  }
}
