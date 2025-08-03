document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".sidebar__link");
  const currentPath = window.location.pathname.replace(/\/$/, "");

  sidebarLinks.forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "");
    if (linkPath === currentPath) {
      link.classList.add("sidebar__link--active");
    } else {
      link.classList.remove("sidebar__link--active");
    }
  });

  const toggles = document.querySelectorAll("#darkmode-toggle, #mode-toggle-mobile");

  function setMode(theme) {
    if (theme === "light") {
      document.body.classList.add("light");
      toggles.forEach(t => (t.checked = false));
    } else {
      document.body.classList.remove("light");
      toggles.forEach(t => (t.checked = true));
    }
    localStorage.setItem("theme", theme);
  }

  const userTheme = localStorage.getItem("theme") || "dark";
  setMode(userTheme);

  toggles.forEach(toggle => {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        setMode("dark");
      } else {
        setMode("light");
      }
    });
  });
});