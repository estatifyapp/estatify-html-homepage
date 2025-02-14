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
