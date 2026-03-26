export class Circle {
	get radius() {
		return this.diameter / 2;
	}

	get area() {
		return Math.PI * this.radius**2;
	}

	/** @param {number} diameter */
	constructor(diameter) {
		this.diameter = diameter;
	}
}

const circle = new Circle(10);

circle.area;
circle.radius;
circle.diameter;
