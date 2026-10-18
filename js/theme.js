/**
 * HOOKPOINT — Theme Manager (Dark / Light Mode)
 * Default: Dark (Deep Ocean)
 * Persisted in localStorage: 'hookpoint_theme'
 */

(function () {
  const THEME_KEY = "hookpoint_theme";

  // Immediate execution before DOM ready to prevent Flash of Light/Dark
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }

  function getTheme() {
    return document.documentElement.classList.contains("light") ? "light" : "dark";
  }

  function setTheme(theme) {
    const isLight = theme === "light";
    if (isLight) {
      document.documentElement.classList.add("light");
      if (document.body) document.body.classList.add("light");
      localStorage.setItem(THEME_KEY, "light");
    } else {
      document.documentElement.classList.remove("light");
      if (document.body) document.body.classList.remove("light");
      localStorage.setItem(THEME_KEY, "dark");
    }
    updateThemeButtons();
    window.dispatchEvent(new CustomEvent("hookpoint_theme_changed", { detail: { theme: isLight ? "light" : "dark" } }));
  }

  function toggleTheme() {
    const current = getTheme();
    const target = current === "light" ? "dark" : "light";
    setTheme(target);
    if (window.HookPointCart && window.HookPointCart.showToast) {
      window.HookPointCart.showToast(
        target === "dark" ? "Switched to Deep Ocean Dark Theme" : "Switched to Soft White Light Theme",
        "info"
      );
    }
  }

  function updateThemeButtons() {
    const isLight = getTheme() === "light";
    const buttons = document.querySelectorAll(".theme-toggle-btn");
    buttons.forEach((btn) => {
      btn.setAttribute("aria-label", isLight ? "Switch to Deep Ocean Theme" : "Switch to Soft Light Theme");
      btn.setAttribute("title", isLight ? "Switch to Deep Ocean Dark" : "Switch to Soft White Light");
      // Render Sun icon for Light, Moon icon for Dark
      btn.innerHTML = isLight
        ? `<svg class="w-5 h-5 text-ocean-gold transition-transform hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
           </svg>`
        : `<svg class="w-5 h-5 text-ocean-aqua transition-transform hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
           </svg>`;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (getTheme() === "light" && document.body) {
      document.body.classList.add("light");
    }
    updateThemeButtons();
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".theme-toggle-btn");
      if (btn) {
        e.preventDefault();
        toggleTheme();
      }
    });
  });

  window.HookPointTheme = {
    getTheme,
    setTheme,
    toggleTheme,
    updateButtons: updateThemeButtons
  };
})();
