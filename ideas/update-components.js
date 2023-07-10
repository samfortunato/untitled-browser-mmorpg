class Component {
  update(dt) { }
  draw(ctx) { }
}

class FooComponent extends Component { }

class FooEntity {
  components = new Map([
    ['foo', new FooComponent()],
  ]);

  update(dt) {
    this.components.forEach(component => component.update?.(dt));
  }

  draw(ctx) {
    this.components.forEach(component => component.draw?.(ctx));
  }
}
