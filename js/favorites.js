/**
 * HOOKPOINT — Favorites & Wishlist Manager
 * Persists favorite product IDs in localStorage ('hookpoint_favorites'),
 * updates badge counters, toggles heart state on cards, and powers the slide-out Favorites Drawer.
 */

(function () {
  const FAV_STORAGE_KEY = "hookpoint_favorites";

  function getFavorites() {
    try {
      const stored = localStorage.getItem(FAV_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading favorites from localStorage", e);
      return [];
    }
  }

  function saveFavorites(favorites) {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
      updateBadges();
      syncHeartButtons();
      renderFavoritesDrawer();
      window.dispatchEvent(new CustomEvent("hookpoint_favorites_updated", { detail: { favorites } }));
    } catch (e) {
      console.error("Error saving favorites to localStorage", e);
    }
  }

  function isFavorite(productId) {
    return getFavorites().includes(productId);
  }

  function toggleFavorite(productId) {
    let favs = getFavorites();
    const index = favs.indexOf(productId);
    const products = (window.HookPointData && window.HookPointData.products) || [];
    const product = products.find((p) => p.id === productId);
    const prodName = product ? product.name : "Item";

    if (index > -1) {
      favs.splice(index, 1);
      saveFavorites(favs);
      if (window.HookPointCart && window.HookPointCart.showToast) {
        window.HookPointCart.showToast(`Removed "${prodName}" from Favorites.`, "info");
      }
    } else {
      favs.push(productId);
      saveFavorites(favs);
      if (window.HookPointCart && window.HookPointCart.showToast) {
        window.HookPointCart.showToast(`Saved "${prodName}" to Favorites!`, "success");
      }
    }
  }

  function updateBadges() {
    const favs = getFavorites();
    const count = favs.length;
    document.querySelectorAll(".fav-count-badge").forEach((badge) => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove("hidden");
        badge.classList.add("flex");
      } else {
        badge.classList.add("hidden");
        badge.classList.remove("flex");
      }
    });
  }

  function syncHeartButtons() {
    const favs = getFavorites();
    document.querySelectorAll(".product-fav-btn").forEach((btn) => {
      const id = btn.getAttribute("data-product-id");
      const icon = btn.querySelector("svg");
      if (favs.includes(id)) {
        btn.classList.add("text-rose-500", "border-rose-500/50");
        btn.classList.remove("text-ocean-muted-blue");
        if (icon) {
          icon.setAttribute("fill", "currentColor");
        }
      } else {
        btn.classList.remove("text-rose-500", "border-rose-500/50");
        btn.classList.add("text-ocean-muted-blue");
        if (icon) {
          icon.setAttribute("fill", "none");
        }
      }
    });
  }

  function ensureDrawerMarkup() {
    if (document.getElementById("favorites-drawer-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "favorites-drawer-overlay";
    overlay.className = "cart-drawer-overlay";
    overlay.addEventListener("click", closeFavoritesDrawer);

    const drawer = document.createElement("aside");
    drawer.id = "favorites-drawer";
    drawer.className = "cart-drawer";
    drawer.setAttribute("aria-label", "Saved Favorites Slide-Out");
    drawer.innerHTML = `
      <!-- Header -->
      <div class="p-5 border-b border-ocean-navy-border flex items-center justify-between bg-ocean-navy-surface">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-500 flex items-center justify-center">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-white">Saved Favorites</h3>
            <p class="text-xs text-ocean-text-secondary"><span id="favorites-drawer-count">0</span> gear items saved</p>
          </div>
        </div>
        <button type="button" id="favorites-drawer-close" class="p-2 text-ocean-text-secondary hover:text-white rounded-lg hover:bg-ocean-navy transition" aria-label="Close Favorites">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Items List -->
      <div id="favorites-items-list" class="flex-1 overflow-y-auto p-5 space-y-4">
        <!-- Rendered dynamically -->
      </div>

      <!-- Footer -->
      <div id="favorites-drawer-footer" class="p-5 border-t border-ocean-navy-border bg-ocean-navy-surface/90 backdrop-blur space-y-3">
        <a href="products.html" onclick="HookPointFavorites.closeFavoritesDrawer()" class="block w-full text-center py-2.5 px-4 rounded-xl bg-ocean-navy border border-ocean-navy-border text-white text-xs font-semibold hover:border-ocean-aqua transition">
          Continue Exploring Catalogue
        </a>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    document.getElementById("favorites-drawer-close").addEventListener("click", closeFavoritesDrawer);
  }

  function openFavoritesDrawer() {
    ensureDrawerMarkup();
    renderFavoritesDrawer();
    const overlay = document.getElementById("favorites-drawer-overlay");
    const drawer = document.getElementById("favorites-drawer");
    if (overlay && drawer) {
      overlay.classList.add("active");
      drawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeFavoritesDrawer() {
    const overlay = document.getElementById("favorites-drawer-overlay");
    const drawer = document.getElementById("favorites-drawer");
    if (overlay && drawer) {
      overlay.classList.remove("active");
      drawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  function renderFavoritesDrawer() {
    ensureDrawerMarkup();
    const favIds = getFavorites();
    const products = (window.HookPointData && window.HookPointData.products) || [];
    const favProducts = products.filter((p) => favIds.includes(p.id));

    const countEl = document.getElementById("favorites-drawer-count");
    if (countEl) countEl.textContent = favProducts.length;

    const listEl = document.getElementById("favorites-items-list");
    if (!listEl) return;

    if (favProducts.length === 0) {
      listEl.innerHTML = `
        <div class="py-16 text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-ocean-navy-card border border-ocean-navy-border text-ocean-muted-blue flex items-center justify-center">
            <svg class="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </div>
          <h4 class="text-base font-bold text-white">Your Wishlist is Empty</h4>
          <p class="text-xs text-ocean-text-secondary max-w-xs mx-auto leading-relaxed">Tap the heart button on any rod, reel, lure, or accessory to save items you want to keep an eye on.</p>
          <a href="products.html" onclick="HookPointFavorites.closeFavoritesDrawer()" class="inline-block mt-3 water-button text-xs py-2 px-5">Explore All Gear</a>
        </div>
      `;
      return;
    }

    listEl.innerHTML = favProducts
      .map((p) => {
        const formattedPrice = window.HookPointCart ? window.HookPointCart.formatINR(p.price) : `₹${p.price}`;
        return `
        <div class="p-3.5 rounded-xl bg-ocean-navy-card border border-ocean-navy-border flex items-center gap-3.5">
          <a href="product-details.html?id=${p.id}" onclick="HookPointFavorites.closeFavoritesDrawer()" class="w-16 h-16 rounded-lg overflow-hidden bg-ocean-navy-surface shrink-0 block">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" />
          </a>
          <div class="flex-1 min-w-0">
            <span class="text-[10px] uppercase font-bold text-ocean-aqua block truncate">${p.category}</span>
            <a href="product-details.html?id=${p.id}" onclick="HookPointFavorites.closeFavoritesDrawer()" class="text-xs font-bold text-white hover:text-ocean-aqua transition block truncate">${p.name}</a>
            <div class="text-xs font-mono font-bold text-ocean-gold mt-1">${formattedPrice}</div>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" onclick="HookPointCart.addToCart('${p.id}'); HookPointFavorites.toggleFavorite('${p.id}');" class="py-1 px-2.5 rounded-lg bg-ocean-blue hover:bg-ocean-blue-hover text-white text-[11px] font-semibold transition">
                Move to Cart
              </button>
              <button type="button" onclick="HookPointFavorites.toggleFavorite('${p.id}')" class="p-1 text-ocean-text-secondary hover:text-rose-400 transition" title="Remove">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureDrawerMarkup();
    updateBadges();
    syncHeartButtons();

    // Bind all .open-favorites-btn
    document.addEventListener("click", (e) => {
      const favBtn = e.target.closest(".open-favorites-btn");
      if (favBtn) {
        e.preventDefault();
        openFavoritesDrawer();
        return;
      }

      const cardFav = e.target.closest(".product-fav-btn");
      if (cardFav) {
        e.preventDefault();
        e.stopPropagation();
        const id = cardFav.getAttribute("data-product-id");
        if (id) toggleFavorite(id);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeFavoritesDrawer();
    });
  });

  window.HookPointFavorites = {
    getFavorites,
    isFavorite,
    toggleFavorite,
    openFavoritesDrawer,
    closeFavoritesDrawer,
    renderFavoritesDrawer,
    updateBadges,
    syncHeartButtons
  };
})();
