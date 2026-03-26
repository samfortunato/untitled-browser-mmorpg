/**
 * Use this to ease into a number value over time.
 *
 * Think of it like a gentle easing curve on a graph.
 * The number returned eventually will reach 0.
 *
 * Use this for things like UI animations.
 * */
export class Easer {
  constructor(modifier = 0, easeAmount) {
    this.modifier = modifier;
    this.easeAmount = easeAmount;
  }

  easeBy() {
    this.modifier -= this.easeAmount;

    if (this.modifier <= 0) this.modifier = 0;

    return this.modifier;
  }
}

// could possibly be a generator (thanks AI):

/**
 * @param {number} modifier
 * @param {number} amount
 */
function* easeBy(modifier, amount) {
  let value = modifier;

  while (value > 0) {
    value -= amount;

    if (value < 0) value = 0;

    yield value;
  }

  yield value;
}

// const easer = easeBy(100, 10);

// easer.next().value;
// easer.next().value;

// etc.
