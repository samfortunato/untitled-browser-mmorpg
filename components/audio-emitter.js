export class AudioEmitter {
  player = document.createElement('audio');

  constructor(audioName, volume = 1) {
    this.player.src = `./assets/sfx/${audioName}.mp3`;
    this.player.volume = volume;
  }

  play() {
    if (this.player.paused) this.player.play();
  }

  loop() {
    this.player.loop = true;

    if (this.player.paused) this.player.play();
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.player.pause();
    this.player.currentTime = 0;
  }
}
