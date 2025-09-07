class Component { }

class Transform extends Component {
	constructor(x, y) {
		super();

		this.x = x;
		this.y = y;
	}
}

class Shape extends Component {
	constructor(w, h) {
		super();

		this.w = w;
		this.h = h;
	}
}

class Entity {
	components = new Map();

	addComponent(component) {
		this.components.set(component.constructor.name, component);
	}

	addComponents(...components) {
		for (const component of components) {
			this.components.set(component.constructor.name, component);
		}
	}

	getComponent(name) {
		return this.components.get(name);
	}
}

class Foo extends Entity {
	constructor() {
		super();

		this.addComponent(new Transform(0, 0));
		this.addComponent(new Shape(0, 0));
	}
}

// or

class Bar extends Entity {
	constructor() {
		super();

		this.addComponents(
			new Transform(0, 0),
			new Shape(0, 0),
		);
	}
}
