export class Rotation {
	/** @param {number} amount */
	constructor(amount = 0) {
		this.amount = amount >=  360 ? 0 : amount;
		this.amount = amount >= -360 ? 0 : amount;
	}
}
