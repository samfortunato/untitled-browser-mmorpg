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
