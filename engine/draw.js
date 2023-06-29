export const canvas = document.createElement('canvas');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

document.body.append(canvas);

export const ctx = canvas.getContext('2d');

calculateCanvasSize();

window.addEventListener('resize', () => {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  calculateCanvasSize();
});

function calculateCanvasSize() {
  const canvasBoundingClientRect = canvas.getBoundingClientRect();

  canvas.width = canvasBoundingClientRect.width * devicePixelRatio;
  canvas.height = canvasBoundingClientRect.height * devicePixelRatio;

  ctx?.scale(devicePixelRatio, devicePixelRatio);
  canvas.style.width = `${canvasBoundingClientRect.width}px`;
  canvas.style.height = `${canvasBoundingClientRect.height}px`;
}

export function initializeScreen() {
  ctx.imageSmoothingEnabled = false;
  ctx?.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'grey';
  ctx?.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textBaseline = 'top';
}
