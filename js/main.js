// Wait for all content to load before showing solutions
document.addEventListener("DOMContentLoaded", () => {
  // Prevent scroll restoration on page load
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // Force scroll to top on page load
  window.scrollTo(0, 0);

  // Initialize solutions with a delay
  setTimeout(() => {
    initializeSolutions();
    document
      .getElementById("solutions-container")
      ?.classList.remove("opacity-0");
  }, 100);
});

function initializeSolutions() {
  const buttons = document.querySelectorAll(".solution-btn");
  const solutions = document.querySelectorAll(".solution-detail");
  const firstButton = document.querySelector(
    "[onclick=\"showSolution('hotels')\"]"
  );

  // Hide all solutions first
  solutions.forEach((solution) => {
    solution.style.display = "none";
  });

  // Remove active state from all buttons
  buttons.forEach((btn) => {
    btn.setAttribute("data-active", "false");
    btn.classList.remove("bg-gray-100", "border-gray-800");
  });

  // Show first solution and set active state
  const hotelsSolution = document.getElementById("hotels-content");
  if (hotelsSolution) {
    hotelsSolution.style.display = "block";
  }

  // Set active state on first button
  if (firstButton) {
    firstButton.setAttribute("data-active", "true");
    firstButton.classList.add("bg-gray-100", "border-gray-800");
  }
}

function showSolution(solutionId) {
  // Get all necessary elements
  const buttons = document.querySelectorAll(".solution-btn");
  const solutions = document.querySelectorAll(".solution-detail");
  const clickedButton = document.querySelector(
    `[onclick="showSolution('${solutionId}')"]`
  );
  const isMobile = window.innerWidth < 1024; // lg breakpoint

  // Remove active state from all buttons
  buttons.forEach((btn) => {
    btn.setAttribute("data-active", "false");
    btn.classList.remove("bg-gray-100", "border-gray-800");
    // Reset all arrows
    const arrow = btn.querySelector(".solution-arrow");
    if (arrow) {
      arrow.classList.remove("rotate-180");
    }
  });

  // Add active state to clicked button
  clickedButton.setAttribute("data-active", "true");
  clickedButton.classList.add("bg-gray-100", "border-gray-800");

  // Rotate arrow of clicked button
  const clickedArrow = clickedButton.querySelector(".solution-arrow");
  if (clickedArrow) {
    clickedArrow.classList.add("rotate-180");
  }

  // Hide all solutions
  solutions.forEach((solution) => {
    solution.style.display = "none";
  });

  // Show the corresponding solution content
  const selectedSolution = document.getElementById(`${solutionId}-content`);
  if (selectedSolution) {
    selectedSolution.style.display = "block";

    // Only scroll on mobile when explicitly clicked
    if (isMobile && event && event.type === "click") {
      const solutionContent = document.getElementById("solution-content");
      if (solutionContent) {
        solutionContent.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }

  // Add fade animation
  const content = document.getElementById("solution-content");
  content.style.opacity = "0";
  setTimeout(() => {
    content.style.opacity = "1";
  }, 200);
}

// Handle resize events
window.addEventListener("resize", () => {
  const activeButton = document.querySelector(
    '.solution-btn[data-active="true"]'
  );
  if (activeButton) {
    const solutionId = activeButton.getAttribute("onclick").match(/'(.*?)'/)[1];
    showSolution(solutionId);
  }
});
