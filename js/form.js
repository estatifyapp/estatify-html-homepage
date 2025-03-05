// Toast notification handler
const toast = {
  element: document.getElementById("toast"),
  messageElement: document.getElementById("toast-message"),
  show(message, type = "success") {
    // ... toast implementation ...
  },
  hide() {
    this.element.classList.add("hidden");
  },
};

// Form validation and submission handler
function handleForm(formId, endpoint) {
  // ... form handling implementation ...
}

// Initialize forms
document.addEventListener("DOMContentLoaded", () => {
  handleForm("waitlistForm", "/api/waitlist");
  handleForm("contactForm", "/api/contact");
});

function sendEmail(event) {
  event.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const investment = document.getElementById("investmentRange").value;
  const message = document.getElementById("message").value;

  const subject = `New Investment Inquiry from ${name}`;
  const body = `
Name: ${name}
Email: ${email}
Investment Range: ${investment}

Message:
${message}
  `;

  const mailtoLink = `mailto:ioannis.papadopoulos@estatify.app?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open in new window
  window.open(mailtoLink, "_blank");

  // Optional: Reset form after submission
  document.getElementById("contactForm").reset();
}
