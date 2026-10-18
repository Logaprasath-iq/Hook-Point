/**
 * HOOKPOINT — Products & Catalogue Engine
 * Controls filtering, sorting, search, grid/list view on products.html,
 * and dynamic single product rendering on product-details.html.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("products-grid")) {
    initProductsCatalogue();
  }
  if (document.getElementById("product-details-container")) {
    initProductDetails();
  }
});

// ==========================================================================
// 1. PRODUCTS CATALOGUE ENGINE (products.html)
// ==========================================================================
function initProductsCatalogue() {
  const products = (window.HookPointData && window.HookPointData.products) || [];
  const gridContainer = document.getElementById("products-grid");
  const countDisplay = document.getElementById("product-count-display");
  const emptyState = document.getElementById("products-empty-state");
  const searchInput = document.getElementById("product-search-input");
  const categoryFilters = document.querySelectorAll(".category-filter-btn");
  const sortSelect = document.getElementById("product-sort-select");
  const priceSlider = document.getElementById("price-range-slider");
  const priceDisplay = document.getElementById("price-range-display");
  const inStockOnlyCheck = document.getElementById("in-stock-only");
  const viewToggleGrid = document.getElementById("view-toggle-grid");
  const viewToggleList = document.getElementById("view-toggle-list");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");

  // State
  let currentCategory = "all";
  let currentSearch = "";
  let currentMaxPrice = 16000;
  let currentSort = "featured";
  let inStockOnly = false;
  let currentView = "grid"; // 'grid' | 'list'
  let visibleCount = 20;

  // Read URL query params (e.g. ?category=rods or ?search=...)
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get("category");
  const paramSearch = urlParams.get("search");

  if (paramCategory) {
    currentCategory = paramCategory.toLowerCase();
    categoryFilters.forEach((btn) => {
      if (btn.getAttribute("data-category") === currentCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  if (paramSearch) {
    currentSearch = paramSearch.toLowerCase();
    if (searchInput) searchInput.value = paramSearch;
  }

  function filterAndSortProducts() {
    let result = products.filter((p) => {
      // Category filter
      const matchesCat =
        currentCategory === "all" ||
        p.categorySlug === currentCategory ||
        p.category.toLowerCase().includes(currentCategory);

      // Search filter
      const matchesSearch =
        !currentSearch ||
        p.name.toLowerCase().includes(currentSearch) ||
        p.description.toLowerCase().includes(currentSearch) ||
        p.category.toLowerCase().includes(currentSearch);

      // Price filter
      const matchesPrice = p.price <= currentMaxPrice;

      // In-stock filter
      const matchesStock = !inStockOnly || p.stockStatus === "In Stock";

      return matchesCat && matchesSearch && matchesPrice && matchesStock;
    });

    // Sorting
    switch (currentSort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        // Prioritize Best Seller or Staff Pick
        result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        break;
    }

    return result;
  }

  function render() {
    const filtered = filterAndSortProducts();
    const total = filtered.length;

    if (countDisplay) {
      countDisplay.innerHTML = `Showing <span class="text-ocean-gold font-bold">${Math.min(
        visibleCount,
        total
      )}</span> of <span class="text-white font-bold">${total}</span> premium items`;
    }

    if (total === 0) {
      gridContainer.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      const loadMoreContainer = document.getElementById("load-more-container");
      if (loadMoreContainer) loadMoreContainer.classList.add("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    const displayed = filtered.slice(0, visibleCount);

    if (currentView === "grid") {
      gridContainer.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
      gridContainer.innerHTML = displayed.map((p) => createProductCardHtml(p)).join("");
    } else {
      gridContainer.className = "space-y-4";
      gridContainer.innerHTML = displayed.map((p) => createProductListRowHtml(p)).join("");
    }

    // Load More Button Visibility
    const loadMoreBtn = document.getElementById("load-more-btn");
    const loadMoreContainer = document.getElementById("load-more-container");
    if (loadMoreContainer) {
      if (visibleCount >= total) {
        loadMoreContainer.classList.add("hidden");
      } else {
        loadMoreContainer.classList.remove("hidden");
      }
    }

    // Trigger scroll reveals on newly rendered cards
    if (window.HookPointCart && window.HookPointCart.updateBadges) {
      window.HookPointCart.updateBadges();
    }
    if (window.initCardScrollReveal) {
      window.initCardScrollReveal();
    }
  }

  // HTML Product Card Generator
  function createProductCardHtml(p) {
    const formattedPrice = window.HookPointCart ? window.HookPointCart.formatINR(p.price) : `₹${p.price}`;
    const formattedOrig = p.originalPrice
      ? window.HookPointCart
        ? window.HookPointCart.formatINR(p.originalPrice)
        : `₹${p.originalPrice}`
      : null;

    return `
      <div class="reveal-card ocean-card group flex flex-col h-full bg-ocean-navy-card border border-ocean-navy-border rounded-2xl overflow-hidden hover:border-ocean-aqua/40 transition duration-300">
        <!-- Card Image with Badges -->
        <div class="relative overflow-hidden aspect-[4/3] bg-ocean-navy-surface">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-ocean-navy/80 via-transparent to-transparent opacity-60"></div>
          
          <!-- Badges -->
          <div class="absolute top-3 start-3 flex flex-col gap-1.5 z-10">
            ${
              p.badge
                ? `<span class="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-ocean-gold text-ocean-navy shadow-md">${p.badge}</span>`
                : ""
            }
            <span class="px-2.5 py-1 text-[10px] font-semibold rounded-md ${
              p.stockStatus === "In Stock" ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30" : "bg-amber-950/80 text-amber-400 border border-amber-500/30"
            }">${p.stockStatus}</span>
          </div>

          <!-- Quick Action Hover Overlay -->
          <div class="absolute inset-x-0 bottom-3 px-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <a href="product-details.html?id=${p.id}" class="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-lg bg-ocean-navy-surface/90 text-white hover:text-ocean-aqua border border-ocean-aqua/30 backdrop-blur transition">
              View Details
            </a>
            <button type="button" class="add-to-cart-btn p-2 rounded-lg bg-ocean-gold text-ocean-navy hover:bg-ocean-gold-hover shadow-lg transition" data-product-id="${p.id}" title="Add to Tackle Box">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
        </div>

        <!-- Card Info -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div class="mb-4">
            <div class="flex items-center justify-between text-xs text-ocean-muted-blue mb-1">
              <span class="uppercase tracking-wider font-semibold text-ocean-aqua">${p.category}</span>
              <div class="flex items-center gap-1 text-amber-400">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span class="font-bold text-white text-[11px]">${p.rating}</span>
                <span class="text-[10px] text-ocean-muted-blue">(${p.reviewsCount})</span>
              </div>
            </div>

            <h3 class="font-bold text-base text-white hover:text-ocean-aqua transition duration-200 line-clamp-2 min-h-[3rem]">
              <a href="product-details.html?id=${p.id}">${p.name}</a>
            </h3>

            <p class="text-xs text-ocean-text-secondary mt-1.5 line-clamp-2 leading-relaxed min-h-[2.5rem]">
              ${p.shortDesc}
            </p>
          </div>

          <!-- Price & Primary CTA -->
          <div class="pt-4 mt-auto border-t border-ocean-navy-border flex items-center justify-between">
            <div>
              <div class="text-lg font-bold text-ocean-gold">${formattedPrice}</div>
              ${
                formattedOrig
                  ? `<div class="text-[11px] text-ocean-muted-blue line-through">${formattedOrig}</div>`
                  : ""
              }
            </div>

            <button type="button" class="add-to-cart-btn inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3.5 rounded-lg bg-ocean-blue hover:bg-ocean-blue-hover text-white transition shadow" data-product-id="${p.id}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // HTML Product List Row Generator
  function createProductListRowHtml(p) {
    const formattedPrice = window.HookPointCart ? window.HookPointCart.formatINR(p.price) : `₹${p.price}`;
    const formattedOrig = p.originalPrice
      ? window.HookPointCart
        ? window.HookPointCart.formatINR(p.originalPrice)
        : `₹${p.originalPrice}`
      : null;

    return `
      <div class="reveal-card ocean-card p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center bg-ocean-navy-card border border-ocean-navy-border rounded-2xl hover:border-ocean-aqua/40 transition">
        <div class="w-full sm:w-48 h-40 rounded-xl overflow-hidden shrink-0 relative bg-ocean-navy-surface">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" loading="lazy" />
          ${
            p.badge
              ? `<span class="absolute top-2 start-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-ocean-gold text-ocean-navy">${p.badge}</span>`
              : ""
          }
        </div>
        
        <div class="flex-1 min-w-0 w-full">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs uppercase font-semibold text-ocean-aqua">${p.category}</span>
            <span class="text-xs text-ocean-muted-blue">•</span>
            <span class="text-xs ${p.stockStatus === 'In Stock' ? 'text-emerald-400' : 'text-amber-400'}">${p.stockStatus}</span>
          </div>

          <h3 class="text-lg font-bold text-white hover:text-ocean-aqua transition">
            <a href="product-details.html?id=${p.id}">${p.name}</a>
          </h3>

          <p class="text-xs text-ocean-text-secondary mt-1 line-clamp-2 leading-relaxed">
            ${p.description}
          </p>

          <div class="flex items-center gap-4 mt-3">
            <div class="flex items-center gap-1 text-amber-400 text-xs">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span class="font-bold text-white">${p.rating}</span>
              <span class="text-ocean-muted-blue">(${p.reviewsCount} angler reviews)</span>
            </div>
            <span class="text-xs text-ocean-text-secondary hidden md:inline">| Application: <span class="text-white">${p.applications}</span></span>
          </div>
        </div>

        <div class="sm:text-end w-full sm:w-auto shrink-0 flex sm:flex-col justify-between items-center sm:items-end gap-3 pt-3 sm:pt-0 mt-3 sm:mt-0 border-t sm:border-t-0 border-ocean-navy-border">
          <div>
            <div class="text-xl font-bold text-ocean-gold">${formattedPrice}</div>
            ${formattedOrig ? `<div class="text-xs text-ocean-muted-blue line-through">${formattedOrig}</div>` : ""}
          </div>
          <div class="flex items-center gap-2">
            <a href="product-details.html?id=${p.id}" class="outline-ocean-button py-2 px-3 text-xs">Details</a>
            <button type="button" class="add-to-cart-btn water-button py-2 px-4 text-xs" data-product-id="${p.id}">
              Add to Box
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      visibleCount = 12;
      render();
    });
  }

  categoryFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryFilters.forEach((b) => b.classList.remove("active", "bg-ocean-blue", "text-white"));
      btn.classList.add("active", "bg-ocean-blue", "text-white");
      currentCategory = btn.getAttribute("data-category") || "all";
      visibleCount = 12;
      render();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      render();
    });
  }

  if (priceSlider) {
    priceSlider.addEventListener("input", (e) => {
      currentMaxPrice = parseInt(e.target.value, 10);
      if (priceDisplay) {
        priceDisplay.textContent = `Up to ₹${currentMaxPrice.toLocaleString("en-IN")}`;
      }
      render();
    });
  }

  if (inStockOnlyCheck) {
    inStockOnlyCheck.addEventListener("change", (e) => {
      inStockOnly = e.target.checked;
      render();
    });
  }

  if (viewToggleGrid) {
    viewToggleGrid.addEventListener("click", () => {
      currentView = "grid";
      viewToggleGrid.classList.add("text-ocean-aqua");
      viewToggleList.classList.remove("text-ocean-aqua");
      render();
    });
  }

  if (viewToggleList) {
    viewToggleList.addEventListener("click", () => {
      currentView = "list";
      viewToggleList.classList.add("text-ocean-aqua");
      viewToggleGrid.classList.remove("text-ocean-aqua");
      render();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      currentCategory = "all";
      currentSearch = "";
      currentMaxPrice = 16000;
      currentSort = "featured";
      inStockOnly = false;

      if (searchInput) searchInput.value = "";
      if (priceSlider) priceSlider.value = 16000;
      if (priceDisplay) priceDisplay.textContent = "Up to ₹16,000";
      if (inStockOnlyCheck) inStockOnlyCheck.checked = false;
      if (sortSelect) sortSelect.value = "featured";

      categoryFilters.forEach((b) => {
        if (b.getAttribute("data-category") === "all") {
          b.classList.add("active", "bg-ocean-blue", "text-white");
        } else {
          b.classList.remove("active", "bg-ocean-blue", "text-white");
        }
      });

      visibleCount = 12;
      render();
    });
  }

  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += 8;
      render();
    });
  }

  // Initial render
  render();
}

// ==========================================================================
// 2. PRODUCT DETAILS ENGINE (product-details.html)
// ==========================================================================
function initProductDetails() {
  const container = document.getElementById("product-details-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "rod-001"; // Fallback to rod-001 if empty

  const products = (window.HookPointData && window.HookPointData.products) || [];
  const product = products.find((p) => p.id === productId);

  if (!product) {
    container.innerHTML = `
      <div class="py-20 text-center space-y-4">
        <h2 class="text-2xl font-bold text-white">Product Not Found</h2>
        <p class="text-ocean-text-secondary">The tackle item you requested does not exist or has been retired.</p>
        <a href="products.html" class="inline-block mt-4 water-button">Return to Catalogue</a>
      </div>
    `;
    return;
  }

  // Update Page Title
  document.title = `${product.name} — HookPoint Fishing Tackle`;

  // Update Breadcrumbs
  const breadcrumbCategory = document.getElementById("breadcrumb-category");
  const breadcrumbProduct = document.getElementById("breadcrumb-product");
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = product.category;
    breadcrumbCategory.href = `products.html?category=${product.categorySlug}`;
  }
  if (breadcrumbProduct) {
    breadcrumbProduct.textContent = product.name;
  }

  const formattedPrice = window.HookPointCart ? window.HookPointCart.formatINR(product.price) : `₹${product.price}`;
  const formattedOrig = product.originalPrice
    ? window.HookPointCart
      ? window.HookPointCart.formatINR(product.originalPrice)
      : `₹${product.originalPrice}`
    : null;

  // Render Main Layout
  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <!-- Left Column: Gallery -->
      <div class="lg:col-span-6 space-y-4">
        <!-- Main Image with Zoom Wrapper -->
        <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ocean-navy-surface border border-ocean-navy-border shadow-2xl">
          <img id="main-product-image" src="${product.gallery && product.gallery[0] ? product.gallery[0] : product.image}" alt="${product.name}" class="w-full h-full object-cover transition duration-300" />
          
          ${
            product.badge
              ? `<span class="absolute top-4 start-4 px-3 py-1.5 text-xs font-bold uppercase rounded-lg bg-ocean-gold text-ocean-navy shadow-lg">${product.badge}</span>`
              : ""
          }
        </div>

        <!-- Thumbnail Row -->
        <div class="flex items-center gap-3 overflow-x-auto pb-2">
          ${(product.gallery || [product.image])
            .map(
              (img, idx) => `
            <button type="button" class="gallery-thumb w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition ${
              idx === 0 ? "border-ocean-aqua shadow-lg" : "border-ocean-navy-border opacity-70 hover:opacity-100"
            }" data-img="${img}">
              <img src="${img}" alt="${product.name} angle ${idx + 1}" class="w-full h-full object-cover" />
            </button>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- Right Column: Product Info & Actions -->
      <div class="lg:col-span-6 flex flex-col justify-between space-y-6">
        <div>
          <div class="flex items-center gap-3 text-xs mb-2">
            <span class="px-2.5 py-1 rounded bg-ocean-blue/20 text-ocean-aqua font-bold uppercase tracking-wider border border-ocean-aqua/30">
              ${product.category}
            </span>
            <span class="text-ocean-muted-blue">•</span>
            <span class="font-semibold ${product.stockStatus === 'In Stock' ? 'text-emerald-400' : 'text-amber-400'}">
              ● ${product.stockStatus}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            ${product.name}
          </h1>

          <!-- Rating -->
          <div class="flex items-center gap-3 mt-3">
            <div class="flex items-center gap-1 text-amber-400">
              ${Array(5)
                .fill(0)
                .map(
                  (_, i) =>
                    `<svg class="w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-current/40"}" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`
                )
                .join("")}
              <span class="text-white font-bold ms-1 text-sm">${product.rating}</span>
            </div>
            <span class="text-xs text-ocean-muted-blue">(${product.reviewsCount} verified reviews)</span>
          </div>

          <!-- Price -->
          <div class="mt-5 p-4 rounded-xl bg-ocean-navy-surface border border-ocean-navy-border flex items-baseline gap-4">
            <span class="text-3xl font-extrabold text-ocean-gold">${formattedPrice}</span>
            ${
              formattedOrig
                ? `<span class="text-base text-ocean-muted-blue line-through">${formattedOrig}</span>
                   <span class="text-xs font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">Save ${Math.round(
                     ((product.originalPrice - product.price) / product.originalPrice) * 100
                   )}%</span>`
                : ""
            }
          </div>

          <!-- Description -->
          <p class="text-sm text-ocean-text-secondary mt-4 leading-relaxed">
            ${product.description}
          </p>

          <!-- Highlights Checklist -->
          <div class="mt-4 space-y-2">
            ${(product.features || [])
              .map(
                (f) => `
              <div class="flex items-center gap-2 text-xs text-white">
                <svg class="w-4 h-4 text-ocean-aqua shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span>${f}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Quantity & Add to Cart Action -->
        <div class="pt-6 border-t border-ocean-navy-border space-y-4">
          <div class="flex items-center gap-4">
            <label for="detail-quantity" class="text-xs font-semibold text-ocean-text-secondary uppercase">Quantity:</label>
            <div class="flex items-center border border-ocean-navy-border rounded-xl bg-ocean-navy-surface">
              <button type="button" id="qty-minus" class="w-10 h-10 flex items-center justify-center text-white hover:text-ocean-aqua text-sm font-bold" aria-label="Decrease quantity">−</button>
              <input type="number" id="detail-quantity" value="1" min="1" max="20" class="w-12 bg-transparent text-center font-bold text-white text-sm outline-none" />
              <button type="button" id="qty-plus" class="w-10 h-10 flex items-center justify-center text-white hover:text-ocean-aqua text-sm font-bold" aria-label="Increase quantity">+</button>
            </div>
            <span class="text-xs text-ocean-muted-blue">${product.stockStatus === 'In Stock' ? 'Ready for immediate dispatch' : 'Ships within 3-5 days'}</span>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button type="button" id="detail-add-btn" class="flex-1 water-button py-3.5 text-sm font-bold">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <span>Add to Tackle Box</span>
            </button>
            <a href="order.html?productId=${product.id}" class="gold-button py-3.5 px-6 text-sm font-bold text-center">
              Direct Order Enquiry
            </a>
          </div>

          <div class="p-3 rounded-lg bg-ocean-navy/60 border border-ocean-navy-border text-xs text-ocean-text-secondary flex items-center gap-2">
            <svg class="w-4 h-4 text-ocean-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span>All HookPoint rods & reels backed by our 2-Year Saltwater Integrity Warranty.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Specifications, Materials, Shipping Tabs -->
    <div class="mt-14 pt-10 border-t border-ocean-navy-border">
      <h3 class="text-xl font-bold text-white mb-6">Technical Specifications & Engineering</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Specs Table -->
        <div class="ocean-card p-6 bg-ocean-navy-card">
          <h4 class="text-sm font-bold text-ocean-aqua uppercase tracking-wider mb-4">Core Dimensions</h4>
          <dl class="divide-y divide-ocean-navy-border text-xs">
            ${Object.entries(product.specs || {})
              .map(
                ([k, v]) => `
              <div class="py-2.5 flex justify-between">
                <dt class="text-ocean-text-secondary font-medium">${k}</dt>
                <dd class="text-white font-semibold text-end">${v}</dd>
              </div>
            `
              )
              .join("")}
          </dl>
        </div>

        <!-- Materials & Target Applications -->
        <div class="space-y-6">
          <div class="ocean-card p-6 bg-ocean-navy-card">
            <h4 class="text-sm font-bold text-ocean-gold uppercase tracking-wider mb-2">Materials & Finishes</h4>
            <p class="text-xs text-ocean-text-secondary leading-relaxed">${product.materials}</p>
          </div>

          <div class="ocean-card p-6 bg-ocean-navy-card">
            <h4 class="text-sm font-bold text-ocean-aqua uppercase tracking-wider mb-2">Recommended Fishing Applications</h4>
            <p class="text-xs text-ocean-text-secondary leading-relaxed">${product.applications}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div class="mt-16 pt-10 border-t border-ocean-navy-border">
      <div class="flex items-center justify-between mb-8">
        <div>
          <span class="text-xs uppercase font-bold text-ocean-aqua tracking-wider">Explore Similar Tackle</span>
          <h3 class="text-xl sm:text-2xl font-bold text-white mt-1">Recommended for Your Arsenal</h3>
        </div>
        <a href="products.html?category=${product.categorySlug}" class="text-xs font-semibold text-ocean-gold hover:text-white transition flex items-center gap-1">
          <span>View All in ${product.category}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        ${products
          .filter((p) => p.id !== product.id)
          .slice(0, 4)
          .map(
            (rel) => `
          <article class="ocean-card group flex flex-col justify-between h-full bg-ocean-navy-card border border-ocean-navy-border rounded-2xl overflow-hidden hover:border-ocean-aqua/50 transition-colors duration-200">
            <div>
              <a href="product-details.html?id=${rel.id}" class="block aspect-[4/3] overflow-hidden bg-ocean-navy-surface relative">
                <img src="${rel.image}" alt="${rel.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform" style="transform: translateZ(0); -webkit-transform: translateZ(0); backface-visibility: hidden; -webkit-backface-visibility: hidden;" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-ocean-navy/60 via-transparent to-transparent opacity-30"></div>
              </a>
              <div class="p-4">
                <div class="text-[10px] uppercase font-bold text-ocean-aqua tracking-wider">${rel.category}</div>
                <h4 class="text-xs font-bold text-white group-hover:text-ocean-aqua transition-colors duration-200 line-clamp-2 min-h-[2rem] mt-1">
                  <a href="product-details.html?id=${rel.id}">${rel.name}</a>
                </h4>
              </div>
            </div>
            <div class="px-4 pb-4 pt-0 mt-auto">
              <div class="text-sm font-bold text-ocean-gold pt-2 border-t border-ocean-navy-border/50">
                ${window.HookPointCart ? window.HookPointCart.formatINR(rel.price) : `₹${rel.price}`}
              </div>
            </div>
          </article>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  // Gallery Thumbnail Clicks
  const mainImg = document.getElementById("main-product-image");
  const thumbs = document.querySelectorAll(".gallery-thumb");
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbs.forEach((t) => t.classList.remove("border-ocean-aqua", "shadow-lg"));
      thumb.classList.add("border-ocean-aqua", "shadow-lg");
      const targetSrc = thumb.getAttribute("data-img");
      if (mainImg && targetSrc) {
        mainImg.style.opacity = "0.4";
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = "1";
        }, 150);
      }
    });
  });

  // Quantity controls
  const qtyInput = document.getElementById("detail-quantity");
  const qtyMinus = document.getElementById("qty-minus");
  const qtyPlus = document.getElementById("qty-plus");

  if (qtyMinus && qtyInput) {
    qtyMinus.addEventListener("click", () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });
  }

  if (qtyPlus && qtyInput) {
    qtyPlus.addEventListener("click", () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val < 20) qtyInput.value = val + 1;
    });
  }

  // Add to cart click
  const addBtn = document.getElementById("detail-add-btn");
  if (addBtn && qtyInput) {
    addBtn.addEventListener("click", () => {
      const q = parseInt(qtyInput.value, 10) || 1;
      if (window.HookPointCart) {
        window.HookPointCart.addToCart(product.id, q);
      }
    });
  }
}
