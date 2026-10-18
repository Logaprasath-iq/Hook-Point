/**
 * HOOKPOINT — Direction Manager (LTR / RTL Support)
 * Default: LTR
 * Persisted in localStorage: 'hookpoint_dir'
 */

(function () {
  const DIR_KEY = "hookpoint_dir";

  // Immediate execution before DOM to avoid layout flicker
  const savedDir = localStorage.getItem(DIR_KEY);
  if (savedDir === "rtl") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }

  function getDir() {
    return document.documentElement.getAttribute("dir") || "ltr";
  }

  function setDir(dir) {
    const targetDir = dir === "rtl" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", targetDir);
    localStorage.setItem(DIR_KEY, targetDir);
    updateDirButtons();
    window.dispatchEvent(new CustomEvent("hookpoint_dir_changed", { detail: { dir: targetDir } }));
  }

  function toggleDir() {
    const current = getDir();
    const next = current === "rtl" ? "ltr" : "rtl";
    setDir(next);
    if (window.HookPointCart && window.HookPointCart.showToast) {
      window.HookPointCart.showToast(
        next === "rtl" ? "Direction changed to RTL (Right-to-Left)" : "Direction changed to LTR (Left-to-Right)",
        "info"
      );
    }
  }

  function updateDirButtons() {
    const isRtl = getDir() === "rtl";
    const buttons = document.querySelectorAll(".direction-toggle-btn");
    buttons.forEach((btn) => {
      btn.setAttribute("aria-label", isRtl ? "Switch to LTR Mode" : "Switch to RTL Mode");
      btn.setAttribute("title", isRtl ? "Switch to Left-to-Right (LTR)" : "Switch to Right-to-Left (RTL)");
      btn.innerHTML = `<span class="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-ocean-aqua pointer-events-none">
        <svg class="w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <span>${isRtl ? "LTR" : "RTL"}</span>
      </span>`;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateDirButtons();
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".direction-toggle-btn");
      if (btn) {
        e.preventDefault();
        toggleDir();
      }
    });
  });

  window.HookPointDir = {
    getDir,
    setDir,
    toggleDir,
    updateButtons: updateDirButtons
  };
})();
