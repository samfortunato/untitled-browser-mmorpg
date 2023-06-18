export class AudioEmitter {
  constructor(audioName, volume = 1) {
    this.audioElement = document.createElement('audio');

    this.audioElement.src = `./assets/sfx/${audioName}.mp3`;
    this.audioElement.volume = volume;
  }

  play() {
    if (this.audioElement.paused) this.audioElement.play();
  }

  loop() {
    this.audioElement.loop = true;
    if (this.audioElement.paused) this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }

  stop() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }
}
