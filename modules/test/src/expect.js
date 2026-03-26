/** @param {any} value */
export function expect(value) {
	return {
		toBeTruthy() {
			if (!!!value) throw value;
		},

		toBeFalsy() {
			if (!!value) throw value;
		},

		/** @param {any} expected */
		toEqual(expected) {
			if (value !== expected) throw `${value}, ${expected}`;
		}
	};
}
