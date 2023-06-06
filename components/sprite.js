export class Sprite {
  name = '';
  img = new Image();
  crops = {};
  tick = 0;
  currentFrame = 0;
  frames = [];

  constructor(name) {
    this.name = name;

    this.setSprite(name);
  }

  setSprite(name) {
    this.name = name;
    this.img.src = `./assets/sprites/${name}.gif`;
  }

  /**
   * Animate based on any state of the entity?
   *
   * So, from within an Entity, it's better to do this?:
   * ```javascript
   * this.sprite.step(this);
   * ```
   *
   * where you just pass the whole Entity.
   *
   * And, within `step`, you can do stuff like:
   * ```javascript
   * if (entity.direction === DIRECTIONS.UP) ...
   *
   * // ...
   *
   * return this.frames[entity.state];
   * ```
   *
   * etc.
   * */
  step(entity) { }

  getCurrentFrame(type = '') { }
}
