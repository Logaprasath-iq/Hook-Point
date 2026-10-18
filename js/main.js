/**
 * HOOKPOINT — Main Interactive Engine
 * Handles Navbar Scrolling, Mobile Hamburger Navigation, Scroll Reveals,
 * Stats Counters, Water Bubbles, and Newsletter Validation.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initScrollReveals();
  initCardScrollReveal();
  initStatsCounters();
  initWaterBubbles();
  initNewsletterForms();
  initTestimonialSliders();
  initFaqAccordions();
  highlightActiveNav();
});

// 1. Sticky Navbar Transition on Scroll
function initNavbar() {
  const navbar = document.querySelector(".site-nav");
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// 2. Mobile Menu Drawer Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const menuDrawer = document.getElementById("mobile-menu-drawer");
  const menuBackdrop = document.getElementById("mobile-menu-backdrop");

  if (!menuDrawer) return;

  function openMenu() {
    menuDrawer.classList.add("open");
    menuDrawer.classList.remove("translate-x-full", "-translate-x-full");
    if (menuBackdrop) menuBackdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menuDrawer.classList.remove("open", "translate-x-full", "-translate-x-full");
    if (menuBackdrop) menuBackdrop.classList.add("hidden");
    document.body.style.overflow = "";
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isExpanded = menuDrawer.classList.contains("open");
      if (isExpanded) closeMenu();
      else openMenu();
    });
  }

  // Handle all close buttons
  document.querySelectorAll("#mobile-menu-close, #mobile-menu-close-btn, .mobile-menu-close").forEach((btn) => {
    btn.addEventListener("click", closeMenu);
  });

  if (menuBackdrop) menuBackdrop.addEventListener("click", closeMenu);

  // Close on nav link click in mobile menu (except dropdown toggles)
  menuDrawer.querySelectorAll("a:not(.mobile-dropdown-toggle)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // When direction changes, ensure closed drawer is tucked offscreen
  window.addEventListener("hookpoint_dir_changed", () => {
    if (!menuDrawer.classList.contains("open")) {
      closeMenu();
    }
  });

  // Auto-close mobile drawer if window resized to desktop display mode
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });

  // Mobile Dropdown Accordion Toggle
  const mobileDropdownToggles = menuDrawer.querySelectorAll(".mobile-dropdown-toggle");
  mobileDropdownToggles.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const menu = btn.nextElementSibling;
      const arrow = btn.querySelector(".dropdown-arrow");
      if (menu) {
        menu.classList.toggle("hidden");
        if (arrow) arrow.classList.toggle("rotate-180");
      }
    });
  });
}

// 3. Highlight Current Nav Link
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .nav-dropdown-item");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPath = href.split("?")[0].split("/").pop();

    if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Also highlight Home dropdown parent if on index.html or home-2.html
  const isHome = currentPath === "index.html" || currentPath === "home-2.html" || currentPath === "";
  const homeDropdownBtn = document.querySelector(".nav-dropdown-btn");
  if (homeDropdownBtn) {
    if (isHome) {
      homeDropdownBtn.classList.add("active", "text-ocean-gold");
      homeDropdownBtn.classList.remove("text-ocean-text-secondary");
    } else {
      homeDropdownBtn.classList.remove("active", "text-ocean-gold");
      homeDropdownBtn.classList.add("text-ocean-text-secondary");
    }
  }
}

// 4. Scroll Reveal via IntersectionObserver
function initScrollReveals() {
  // Check prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
      el.classList.add("revealed");
    });
    return;
  }

  const revealElements = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// 4b. Staggered Card Scroll Reveal (.reveal-card with column delays)
function initCardScrollReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal-card").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  const cards = document.querySelectorAll(".reveal-card:not(.is-visible)");
  if (!cards.length) return;

  // Group cards by parent to compute responsive column index
  const parents = new Set();
  cards.forEach((card) => {
    if (card.parentElement) parents.add(card.parentElement);
  });

  parents.forEach((parent) => {
    const parentCards = Array.from(
      parent.querySelectorAll(":scope > .reveal-card, :scope > div > .reveal-card, :scope > article.reveal-card")
    );
    if (!parentCards.length) return;

    let cols = 1;
    const w = window.innerWidth;
    if (w >= 1280) cols = 4;
    else if (w >= 1024) cols = 3;
    else if (w >= 640) cols = 2;
    else cols = 1;

    parentCards.forEach((card, idx) => {
      const colIndex = idx % cols;
      const delay = colIndex * 120; // 120ms stagger per column
      card.style.setProperty("--reveal-delay", `${delay}ms`);
    });
  });

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  cards.forEach((card) => cardObserver.observe(card));
}

if (typeof window !== "undefined") {
  window.initCardScrollReveal = initCardScrollReveal;
}

// 5. Animated Number Counters
function initStatsCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((el) => observer.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute("data-counter")) || 0;
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = progress === 1 ? target : (target * easeProgress);

      el.textContent = `${prefix}${current.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }
}

// 6. Water Bubbles Generator
function initWaterBubbles() {
  const container = document.querySelector(".bubble-container");
  if (!container) return;

  const count = 15;
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    const size = Math.random() * 20 + 8; // 8px to 28px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 8 + 8}s`; // 8s to 16s
    bubble.style.animationDelay = `${Math.random() * 6}s`;
    bubble.style.opacity = `${Math.random() * 0.5 + 0.2}`;
    container.appendChild(bubble);
  }
}

// 7. Newsletter Form Handler
function initNewsletterForms() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input) return;

      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        if (window.HookPointCart && window.HookPointCart.showToast) {
          window.HookPointCart.showToast("Please enter a valid email address.", "error");
        } else {
          alert("Please enter a valid email address.");
        }
        input.focus();
        return;
      }

      // Success
      if (window.HookPointCart && window.HookPointCart.showToast) {
        window.HookPointCart.showToast(
          "Welcome to the HookPoint Crew! Check your inbox for your 10% welcome coupon.",
          "success"
        );
      }
      form.reset();
    });
  });
}

// 8. Testimonial Carousel / Slider Controller
function initTestimonialSliders() {
  const sliders = document.querySelectorAll(".testimonial-slider-container");
  sliders.forEach((slider) => {
    const track = slider.querySelector(".testimonial-track");
    const prevBtn = slider.querySelector(".slider-prev");
    const nextBtn = slider.querySelector(".slider-next");
    if (!track) return;

    let currentIndex = 0;
    const slides = track.children;
    const totalSlides = slides.length;
    if (totalSlides <= 1) return;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;
      const isRtl = document.documentElement.getAttribute("dir") === "rtl";
      const shift = isRtl ? currentIndex * 100 : -currentIndex * 100;
      track.style.transform = `translateX(${shift}%)`;
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
    }

    // Auto rotate every 7 seconds
    let timer = setInterval(() => goToSlide(currentIndex + 1), 7000);
    slider.addEventListener("mouseenter", () => clearInterval(timer));
    slider.addEventListener("mouseleave", () => {
      timer = setInterval(() => goToSlide(currentIndex + 1), 7000);
    });
  });
}

// 9. Interactive FAQ Accordion Controller
function initFaqAccordions() {
  const allFaqs = document.querySelectorAll("details.faq-accordion");
  allFaqs.forEach((faq) => {
    faq.addEventListener("toggle", () => {
      if (faq.open) {
        // Close siblings for neat accordion experience
        const parent = faq.parentElement;
        if (parent) {
          parent.querySelectorAll("details.faq-accordion[open]").forEach((sibling) => {
            if (sibling !== faq) {
              sibling.removeAttribute("open");
            }
          });
        }
      }
    });
  });
}
