export class Shrine {
  isActivated = false;

  update() {
    if (didPlayerInteract()) {
      this.activate();
    }
  }

  activate() {
    this.isActivated = true;
  }

  draw(ctx) {
    // ...draw shrine

    if (this.isActivated) {
      // ...draw shrine entrance opened
    }
  }
}
