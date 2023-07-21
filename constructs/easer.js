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
    if (this.modifier === 0) return 0;

    this.modifier -= this.easeAmount;

    if (this.modifier <= 0) {
      this.modifier = 0;
    }

    return this.modifier;
  }
}
