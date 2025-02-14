function showSolution(solutionId) {
  // Remove active state from all buttons
  document.querySelectorAll(".solution-btn").forEach((btn) => {
    btn.setAttribute("data-active", "false");
    btn.classList.remove("bg-gray-100", "border-gray-800");
  });

  // Add active state to clicked button
  const activeBtn = document.querySelector(
    `[onclick="showSolution('${solutionId}')"]`
  );
  activeBtn.setAttribute("data-active", "true");
  activeBtn.classList.add("bg-gray-100", "border-gray-800");

  // Update content (you'll need to add content for each solution)
  const content = document.getElementById("solution-content");
  // Add fade out/in animation
  content.style.opacity = "0";
  setTimeout(() => {
    // Update content based on solutionId
    // This is where you'd update the image and text for each solution
    content.style.opacity = "1";
  }, 200);
}

// Initialize the first solution as active
document.addEventListener("DOMContentLoaded", () => {
  showSolution("hotels");
});
