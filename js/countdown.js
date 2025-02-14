class CountdownTimer {
  constructor(targetDate, elementIds) {
    if (!targetDate || !elementIds) {
      throw new Error("CountdownTimer requires targetDate and elementIds");
    }
    this.targetDate = new Date(targetDate).getTime();
    this.elements = {
      days: document.getElementById(elementIds.days),
      hours: document.getElementById(elementIds.hours),
      minutes: document.getElementById(elementIds.minutes),
      seconds: document.getElementById(elementIds.seconds),
    };
    this.interval = null;
  }

  calculateTimeLeft() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.stop();
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }

  updateDisplay(timeLeft) {
    for (const [unit, value] of Object.entries(timeLeft)) {
      if (this.elements[unit]) {
        this.elements[unit].textContent = value.toString().padStart(2, "0");
      }
    }
  }

  start() {
    this.updateDisplay(this.calculateTimeLeft());
    this.interval = setInterval(() => {
      this.updateDisplay(this.calculateTimeLeft());
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Initialize the countdown
document.addEventListener("DOMContentLoaded", () => {
  try {
    const countdown = new CountdownTimer("2025-05-01T00:00:00", {
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
    });
    countdown.start();
  } catch (error) {
    console.error("Error initializing countdown:", error);
  }
});
