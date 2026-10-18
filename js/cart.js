/**
 * HOOKPOINT — Shopping Cart & Tackle Box Manager
 * Handles local storage persistence, slide-out drawer, badge updates, and toast alerts.
 */

(function () {
  const CART_STORAGE_KEY = "hookpoint_cart";

  // Initialize or fetch cart array
  function getCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading cart from localStorage", e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      updateBadges();
      renderCartDrawer();
      window.dispatchEvent(new CustomEvent("hookpoint_cart_updated", { detail: { cart } }));
    } catch (e) {
      console.error("Error saving cart to localStorage", e);
    }
  }

  function formatINR(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  }

  function addToCart(productId, quantity = 1, options = {}) {
    const qty = parseInt(quantity, 10) || 1;
    if (qty <= 0) return;

    // Look up product or bundle from HookPointData
    const products = (window.HookPointData && window.HookPointData.products) || [];
    const bundles = (window.HookPointData && window.HookPointData.pricingTiers && window.HookPointData.pricingTiers.bundleOffers) || [];
    let product = products.find((p) => p.id === productId) || bundles.find((b) => b.id === productId);

    if (!product) {
      showToast("Product could not be found.", "error");
      return;
    }

    if (!product.category) {
      product = Object.assign({}, product, { category: "Curated Package" });
    }

    const cart = getCart();
    const existingIndex = cart.findIndex((item) => item.id === productId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity: qty
      });
    }

    saveCart(cart);
    showToast(`Added ${qty} × ${product.name} to your Tackle Box!`, "success");

    // Animate badge
    animateBadges();

    // Optionally open drawer
    if (options.openDrawer !== false) {
      openCartDrawer();
    }
  }

  function updateQuantity(productId, newQty) {
    let cart = getCart();
    const target = cart.find((item) => item.id === productId);
    if (!target) return;

    const parsedQty = parseInt(newQty, 10);
    if (parsedQty <= 0) {
      removeFromCart(productId);
      return;
    }

    target.quantity = parsedQty;
    saveCart(cart);
  }

  function removeFromCart(productId) {
    let cart = getCart();
    const removedItem = cart.find((i) => i.id === productId);
    cart = cart.filter((item) => item.id !== productId);
    saveCart(cart);
    if (removedItem) {
      showToast(`Removed ${removedItem.name} from Tackle Box.`, "info");
    }
  }

  function clearCart() {
    saveCart([]);
    showToast("Tackle Box has been emptied.", "info");
  }

  function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  function getCartSubtotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  }

  function updateBadges() {
    const count = getCartCount();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach((badge) => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });
  }

  function animateBadges() {
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach((badge) => {
      badge.classList.add("scale-125");
      setTimeout(() => badge.classList.remove("scale-125"), 300);
    });
  }

  // Toast Notification System
  function showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type === "error" ? "border-red-500" : type === "info" ? "toast-gold" : "toast-success"}`;

    const iconHtml =
      type === "error"
        ? `<svg class="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
        : type === "info"
        ? `<svg class="w-5 h-5 text-ocean-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
        : `<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;

    toast.innerHTML = `
      ${iconHtml}
      <div class="text-sm font-medium flex-1">${message}</div>
      <button type="button" class="text-ocean-text-secondary hover:text-white shrink-0" onclick="this.parentElement.remove()" aria-label="Close notification">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    `;

    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }

  // Slide-Out Drawer DOM Injection & Control
  function ensureDrawerMarkup() {
    if (document.getElementById("cart-drawer-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "cart-drawer-overlay";
    overlay.className = "cart-drawer-overlay";
    overlay.addEventListener("click", closeCartDrawer);

    const drawer = document.createElement("aside");
    drawer.id = "cart-drawer";
    drawer.className = "cart-drawer";
    drawer.setAttribute("aria-label", "Tackle Box Slide-Out Cart");
    drawer.innerHTML = `
      <!-- Drawer Header -->
      <div class="p-5 border-b border-ocean-navy-border flex items-center justify-between bg-ocean-navy-surface">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-ocean-blue/20 border border-ocean-aqua/30 flex items-center justify-center text-ocean-aqua">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-white leading-tight">Your Tackle Box</h3>
            <p class="text-xs text-ocean-text-secondary"><span id="drawer-item-count">0</span> items selected</p>
          </div>
        </div>
        <button type="button" id="cart-drawer-close" class="p-2 text-ocean-text-secondary hover:text-white rounded-lg hover:bg-ocean-navy transition" aria-label="Close cart">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <!-- Free Shipping Alert Indicator -->
      <div id="drawer-free-shipping" class="px-5 py-2.5 bg-ocean-navy/60 border-b border-ocean-navy-border text-xs text-center text-ocean-text-secondary">
        <!-- Injected dynamically -->
      </div>

      <!-- Drawer Body (Items) -->
      <div id="drawer-items-list" class="flex-1 overflow-y-auto p-5 space-y-4">
        <!-- Rendered dynamically -->
      </div>

      <!-- Drawer Footer -->
      <div id="drawer-footer" class="p-5 border-t border-ocean-navy-border bg-ocean-navy-surface/90 backdrop-blur space-y-4">
        <div class="flex justify-between items-center text-sm">
          <span class="text-ocean-text-secondary">Subtotal:</span>
          <span id="drawer-subtotal" class="text-lg font-bold text-ocean-gold">₹0</span>
        </div>
        <p class="text-xs text-ocean-muted-blue leading-relaxed">
          Taxes calculated at order enquiry. Free Pan-India secure courier packaging on orders over ₹2,999.
        </p>
        <div class="space-y-2">
          <a href="order.html" class="w-full gold-button py-3 text-center text-sm font-bold shadow-lg block">
            Proceed to Order Enquiry
          </a>
          <button type="button" onclick="HookPointCart.closeCartDrawer()" class="w-full text-center py-2 text-xs text-ocean-text-secondary hover:text-ocean-aqua transition">
            Continue Exploring Tackle
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    document.getElementById("cart-drawer-close").addEventListener("click", closeCartDrawer);
  }

  function openCartDrawer() {
    ensureDrawerMarkup();
    renderCartDrawer();
    const overlay = document.getElementById("cart-drawer-overlay");
    const drawer = document.getElementById("cart-drawer");
    if (overlay && drawer) {
      overlay.classList.add("active");
      drawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeCartDrawer() {
    const overlay = document.getElementById("cart-drawer-overlay");
    const drawer = document.getElementById("cart-drawer");
    if (overlay && drawer) {
      overlay.classList.remove("active");
      drawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  function renderCartDrawer() {
    ensureDrawerMarkup();
    const cart = getCart();
    const count = getCartCount();
    const subtotal = getCartSubtotal();

    const countEl = document.getElementById("drawer-item-count");
    if (countEl) countEl.textContent = count;

    const subtotalEl = document.getElementById("drawer-subtotal");
    if (subtotalEl) subtotalEl.textContent = formatINR(subtotal);

    // Free Shipping threshold indicator (₹2,999)
    const freeShippingEl = document.getElementById("drawer-free-shipping");
    if (freeShippingEl) {
      const threshold = 2999;
      if (subtotal >= threshold) {
        freeShippingEl.innerHTML = `<span class="text-emerald-400 font-semibold flex items-center justify-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          You qualify for FREE Pan-India Shipping!
        </span>`;
      } else {
        const remaining = threshold - subtotal;
        freeShippingEl.innerHTML = `Add <span class="text-ocean-gold font-bold">${formatINR(remaining)}</span> more for <strong>FREE Pan-India Shipping</strong>!`;
      }
    }

    const itemsContainer = document.getElementById("drawer-items-list");
    const footerEl = document.getElementById("drawer-footer");

    if (!itemsContainer) return;

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="py-12 text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-ocean-navy flex items-center justify-center text-ocean-muted-blue border border-ocean-navy-border">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h4 class="text-white font-bold text-base">Your Tackle Box is Empty</h4>
          <p class="text-xs text-ocean-text-secondary max-w-xs mx-auto leading-relaxed">
            Ready to cast out? Explore our premium collection of rods, reels, lures, and saltwater accessories.
          </p>
          <a href="products.html" onclick="HookPointCart.closeCartDrawer()" class="inline-block mt-2 water-button text-xs py-2 px-5">
            Browse Tackle Catalog
          </a>
        </div>
      `;
      if (footerEl) footerEl.style.display = "none";
      return;
    }

    if (footerEl) footerEl.style.display = "block";

    itemsContainer.innerHTML = cart
      .map(
        (item) => `
        <div class="flex items-center gap-3.5 p-3 rounded-xl bg-ocean-navy border border-ocean-navy-border/60 hover:border-ocean-aqua/30 transition">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover shrink-0 border border-ocean-navy-border" />
          <div class="flex-1 min-w-0">
            <div class="text-[11px] font-semibold text-ocean-aqua uppercase tracking-wider truncate">${item.category || 'Tackle'}</div>
            <h4 class="text-xs font-bold text-white truncate hover:text-ocean-aqua transition">
              <a href="product-details.html?id=${item.id}">${item.name}</a>
            </h4>
            <div class="text-xs font-semibold text-ocean-gold mt-0.5">${formatINR(item.price)}</div>
            
            <div class="flex items-center gap-2 mt-2">
              <div class="flex items-center border border-ocean-navy-border rounded-lg bg-ocean-navy-surface">
                <button type="button" class="w-6 h-6 flex items-center justify-center text-xs text-ocean-text-secondary hover:text-white" onclick="HookPointCart.updateQuantity('${item.id}', ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
                <span class="w-7 text-center text-xs font-bold text-white">${item.quantity}</span>
                <button type="button" class="w-6 h-6 flex items-center justify-center text-xs text-ocean-text-secondary hover:text-white" onclick="HookPointCart.updateQuantity('${item.id}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="text-[11px] text-red-400/80 hover:text-red-400 ms-auto flex items-center gap-1" onclick="HookPointCart.removeFromCart('${item.id}')" aria-label="Remove item">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  // Bind Global Click Delegations
  document.addEventListener("DOMContentLoaded", () => {
    ensureDrawerMarkup();
    updateBadges();

    // Trigger cart drawer open from any button with .open-cart-btn
    document.addEventListener("click", (e) => {
      const openBtn = e.target.closest(".open-cart-btn");
      if (openBtn) {
        e.preventDefault();
        openCartDrawer();
      }

      // Add to cart buttons with data-product-id
      const addBtn = e.target.closest(".add-to-cart-btn");
      if (addBtn) {
        e.preventDefault();
        const pId = addBtn.getAttribute("data-product-id");
        const qty = addBtn.getAttribute("data-quantity") || 1;
        if (pId) {
          addToCart(pId, parseInt(qty, 10));
        }
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeCartDrawer();
      }
    });
  });

  window.HookPointCart = {
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartSubtotal,
    openCartDrawer,
    closeCartDrawer,
    renderCartDrawer,
    updateBadges,
    showToast,
    formatINR
  };
})();
