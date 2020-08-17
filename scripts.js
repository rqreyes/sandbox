const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

// mouse
const mouse = {
  x: null,
  y: null,
  radius: 100,
};

window.addEventListener('mousemove', (evt) => {
  mouse.x = evt.x;
  mouse.y = evt.y;
});

const paint = () => {
  let imageWidth = png.width;
  let imageHeight = png.height;
  const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  class Particle {
    constructor(x, y, color) {
      (this.x = x + canvas.width / 2 - png.width * 2),
        (this.y = y + canvas.height / 2 - png.height * 2),
        (this.color = color),
        (this.size = 2),
        (this.baseX = x + canvas.width / 2 - png.width * 2),
        (this.baseY = y + canvas.height / 2 - png.height * 2),
        (this.density = Math.random() * 10 + 2);
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      ctx.fillStyle = this.color;

      // collision detection
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;

      // max distance, past that the force will be 0
      const maxDistance = 100;
      let force = (maxDistance - distance) / maxDistance;
      if (force < 0) force = 0;

      let directionX = forceDirectionX * force * this.density * 0.6;
      let directionY = forceDirectionY * force * this.density * 0.6;

      if (distance < mouse.radius + this.size) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 20;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 20;
        }
      }

      this.draw();
    }
  }

  function init() {
    particleArray = [];

    for (let y = 0, y2 = data.height; y < y2; y += 1) {
      for (let x = 0, x2 = data.width; x < x2; x += 1) {
        if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
          let positionX = x;
          let positionY = y;
          let color = `rgb(${data.data[y * 4 * data.width + x * 4]}, ${
            data.data[y * 4 * data.width + x * 4 + 1]
          }, ${data.data[y * 4 * data.width + x * 4 + 2]})`;

          particleArray.push(new Particle(positionX * 4, positionY * 4, color));
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i += 1) {
      particleArray[i].update();
    }
  }

  init();
  animate();

  window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  });
};

const png = new Image();
png.src =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAA1CAYAAAFzU5TPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1MjYzQzU5RjJBMjA2ODExODIyQUYzNTU4MjQyRkM2QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1Mjc1RDE4NEQ4RkQxMUVBQkMxMEU1M0M2NEY3NzhDMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1Mjc1RDE4M0Q4RkQxMUVBQkMxMEU1M0M2NEY3NzhDMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTVBOTA5QjFGNjIwNjgxMTgyMkFGMzU1ODI0MkZDNkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTI2M0M1OUYyQTIwNjgxMTgyMkFGMzU1ODI0MkZDNkIiLz4gPC9yZGY6RGVzY3Jp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';

window.addEventListener('load', () => {
  ctx.drawImage(png, 0, 0);
  paint();
});
