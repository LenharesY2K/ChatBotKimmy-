document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("getStarted");

    setTimeout(() => {
        container.classList.add("active");
    }, 100); 
});
document.getElementById('btn-getStarted').onclick = function() {
  window.location.href = "index.html";
};