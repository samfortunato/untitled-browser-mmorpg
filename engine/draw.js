export const canvas = document.createElement('canvas');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

window.addEventListener('resize', () => {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
})

document.body.append(canvas);

export const ctx = canvas.getContext('2d');

export function clear() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'grey';
  ctx?.fillRect(0, 0, canvas.width, canvas.height);
}
