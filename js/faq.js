function toggleFAQ(button) {
  const content = document.getElementById(button.getAttribute("aria-controls"));
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  const icon = button.querySelector("svg");

  content.classList.toggle("hidden");
  button.setAttribute("aria-expanded", !isExpanded);
  icon.style.transform = !isExpanded ? "rotate(180deg)" : "";
}
