class ConnectionBackground {
  constructor() {
    this.canvas = document.getElementById("connectionCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.points = [];
    this.numPoints = 50;
    this.connectionDistance = 150;
    this.mouse = { x: 0, y: 0 };
    this.isMouseMoving = false;
    this.mouseTimeout = null;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.createPoints();
    this.setupEventListeners();
    this.animate();
  }

  setupCanvas() {
    const updateSize = () => {
      this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
      this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
  }

  createPoints() {
    for (let i = 0; i < this.numPoints; i++) {
      this.points.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }
  }

  setupEventListeners() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.isMouseMoving = true;

      clearTimeout(this.mouseTimeout);
      this.mouseTimeout = setTimeout(() => {
        this.isMouseMoving = false;
      }, 100);
    });
  }

  drawConnections() {
    this.ctx.strokeStyle = "#ffffff";

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];

      // Connect to nearby points
      for (let j = i + 1; j < this.points.length; j++) {
        const otherPoint = this.points[j];
        const dx = otherPoint.x - point.x;
        const dy = otherPoint.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          this.ctx.beginPath();
          this.ctx.moveTo(point.x, point.y);
          this.ctx.lineTo(otherPoint.x, otherPoint.y);
          this.ctx.globalAlpha = 1 - distance / this.connectionDistance;
          this.ctx.stroke();
        }
      }

      // Connect to mouse if nearby
      if (this.isMouseMoving) {
        const dx = this.mouse.x - point.x;
        const dy = this.mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance * 1.5) {
          this.ctx.beginPath();
          this.ctx.moveTo(point.x, point.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.globalAlpha = 1 - distance / (this.connectionDistance * 1.5);
          this.ctx.stroke();
        }
      }
    }
  }

  updatePoints() {
    this.points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;

      // Bounce off edges
      if (point.x < 0 || point.x > this.canvas.width) point.vx *= -1;
      if (point.y < 0 || point.y > this.canvas.height) point.vy *= -1;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections
    this.ctx.lineWidth = 0.5;
    this.drawConnections();

    // Draw points
    this.ctx.globalAlpha = 0.8;
    this.points.forEach((point) => {
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fill();
    });
  }

  animate() {
    this.updatePoints();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ConnectionBackground();
});
