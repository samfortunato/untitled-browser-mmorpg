export class AudioEmitter {
  constructor(audioUrl) {
    this.audioElement = document.createElement('audio');

    this.audioElement.src = audioUrl;
  }

  play() {
    this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }
}
