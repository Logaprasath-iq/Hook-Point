/**
 * HOOKPOINT — Blog & Journal Engine
 * Powers article filtering on blog.html and dynamic article loading on blog-details.html.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("blog-grid")) {
    initBlogGrid();
  }
  if (document.getElementById("blog-details-container")) {
    initBlogDetails();
  }
});

// ==========================================================================
// 1. BLOG CATALOGUE (blog.html)
// ==========================================================================
function initBlogGrid() {
  const posts = (window.HookPointData && window.HookPointData.blogPosts) || [];
  const gridContainer = document.getElementById("blog-grid");
  const searchInput = document.getElementById("blog-search-input");
  const categoryButtons = document.querySelectorAll(".blog-category-btn");
  const emptyState = document.getElementById("blog-empty-state");

  let currentCategory = "all";
  let currentSearch = "";

  function filterPosts() {
    return posts.filter((post) => {
      // Exclude featured spotlight article (blog-001) from the grid to eliminate duplicate card and maintain perfect 3x2 alignment
      if (post.id === "blog-001") return false;

      const matchesCat =
        currentCategory === "all" ||
        post.categorySlug === currentCategory ||
        post.category.toLowerCase().includes(currentCategory);

      const matchesSearch =
        !currentSearch ||
        post.title.toLowerCase().includes(currentSearch) ||
        post.excerpt.toLowerCase().includes(currentSearch) ||
        post.category.toLowerCase().includes(currentSearch);

      return matchesCat && matchesSearch;
    });
  }

  function render() {
    const filtered = filterPosts();
    if (!gridContainer) return;

    if (filtered.length === 0) {
      gridContainer.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    const countEl = document.getElementById("blog-count");
    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} comprehensive field articles`;
    }

    gridContainer.innerHTML = filtered
      .map((post) => {
        if (post.noImage) {
          return `
      <article class="reveal-card ocean-card group flex flex-col h-full bg-gradient-to-b from-ocean-navy-card via-ocean-navy-surface to-ocean-navy-card border-2 border-ocean-gold/50 rounded-2xl overflow-hidden shadow-xl hover:border-ocean-gold transition duration-300 relative">
        <!-- Top Tactical Header Banner (Zero Images) -->
        <div class="p-6 pb-4 border-b border-ocean-navy-border/80 bg-ocean-navy-surface/90">
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase rounded-md bg-ocean-gold/20 text-ocean-gold border border-ocean-gold/40">
              <svg class="w-3.5 h-3.5 text-ocean-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ${post.category}
            </span>
            <span class="text-[10px] font-mono uppercase tracking-wider text-ocean-aqua px-2.5 py-0.5 rounded bg-ocean-aqua/10 border border-ocean-aqua/30">
              Field Intelligence
            </span>
          </div>
          <div class="flex items-center gap-3 text-xs text-ocean-muted-blue">
            <span>${post.date}</span>
            <span>•</span>
            <span class="text-ocean-aqua font-medium">${post.readTime}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div class="mb-4">
            <h3 class="text-lg font-bold text-white hover:text-ocean-gold transition duration-200 line-clamp-2 leading-snug min-h-[3.25rem]">
              <a href="blog-details.html?id=${post.id}">${post.title}</a>
            </h3>

            <p class="text-xs text-ocean-text-secondary mt-2.5 line-clamp-3 leading-relaxed min-h-[3.25rem]">
              ${post.excerpt}
            </p>

            ${
              post.keyPoints && post.keyPoints.length
                ? `
            <div class="mt-4 pt-4 border-t border-ocean-navy-border/60 space-y-2">
              <div class="text-[10px] font-bold uppercase tracking-wider text-ocean-muted-blue">Key Field Directives:</div>
              <ul class="space-y-1.5 text-[11px] text-ocean-text-secondary">
                ${post.keyPoints
                  .slice(0, 2)
                  .map(
                    (kp) => `
                  <li class="flex items-start gap-2">
                    <span class="text-ocean-gold font-bold">›</span>
                    <span class="line-clamp-2">${kp}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
            `
                : ""
            }
          </div>

          <!-- Author & Link Footer (No Image Avatar) -->
          <div class="pt-5 mt-auto border-t border-ocean-navy-border flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-full bg-ocean-gold/20 border border-ocean-gold/60 text-ocean-gold font-extrabold text-[11px] flex items-center justify-center shrink-0">
                ${post.author && post.author.name ? post.author.name.split(" ").map((n) => n[0]).join("").slice(0, 2) : "HP"}
              </div>
              <div class="text-[11px] text-white font-medium truncate">${post.author.name}</div>
            </div>

            <a href="blog-details.html?id=${post.id}" class="text-xs font-semibold text-ocean-gold hover:text-white transition flex items-center gap-1 group-hover:translate-x-1">
              <span>Read Directive</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </article>
          `;
        }

        return `
      <article class="reveal-card ocean-card group flex flex-col h-full bg-ocean-navy-card border border-ocean-navy-border rounded-2xl overflow-hidden hover:border-ocean-aqua/40 transition duration-300">
        <!-- Cover Image -->
        <a href="blog-details.html?id=${post.id}" class="block aspect-[16/9] overflow-hidden bg-ocean-navy-surface relative">
          <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-ocean-navy/80 via-transparent to-transparent opacity-60"></div>
          <span class="absolute top-3 start-3 px-3 py-1 text-[11px] font-bold uppercase rounded-md bg-ocean-blue text-white shadow-md">
            ${post.category}
          </span>
        </a>

        <!-- Content -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div class="mb-4">
            <div class="flex items-center gap-3 text-xs text-ocean-muted-blue mb-2.5">
              <span>${post.date}</span>
              <span>•</span>
              <span class="text-ocean-aqua font-medium">${post.readTime}</span>
            </div>

            <h3 class="text-lg font-bold text-white hover:text-ocean-aqua transition duration-200 line-clamp-2 leading-snug min-h-[3.25rem]">
              <a href="blog-details.html?id=${post.id}">${post.title}</a>
            </h3>

            <p class="text-xs text-ocean-text-secondary mt-2.5 line-clamp-3 leading-relaxed min-h-[3.25rem]">
              ${post.excerpt}
            </p>
          </div>

          <!-- Author & Link Footer -->
          <div class="pt-5 mt-auto border-t border-ocean-navy-border flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <img src="${post.author.avatar}" alt="${post.author.name}" class="w-7 h-7 rounded-full object-cover border border-ocean-aqua/30" />
              <div class="text-[11px] text-white font-medium truncate">${post.author.name}</div>
            </div>

            <a href="blog-details.html?id=${post.id}" class="text-xs font-semibold text-ocean-gold hover:text-white transition flex items-center gap-1 group-hover:translate-x-1">
              <span>Read Article</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </article>
    `;
      })
      .join("");

    if (window.initCardScrollReveal) {
      window.initCardScrollReveal();
    }
  }

  // Events
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      render();
    });
  }

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("active", "bg-ocean-blue", "text-white"));
      btn.classList.add("active", "bg-ocean-blue", "text-white");
      currentCategory = btn.getAttribute("data-category") || "all";
      render();
    });
  });

  render();
}

// ==========================================================================
// 2. BLOG DETAILS (blog-details.html)
// ==========================================================================
function initBlogDetails() {
  const container = document.getElementById("blog-details-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id") || "blog-001";

  const posts = (window.HookPointData && window.HookPointData.blogPosts) || [];
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    container.innerHTML = `
      <div class="py-20 text-center space-y-4">
        <h2 class="text-2xl font-bold text-white">Article Not Found</h2>
        <p class="text-ocean-text-secondary">The journal post you requested does not exist.</p>
        <a href="blog.html" class="inline-block mt-4 water-button">Return to Blog</a>
      </div>
    `;
    return;
  }

  document.title = `${post.title} — HookPoint Angler Journal`;

  // Breadcrumbs
  const breadcrumbCategory = document.getElementById("breadcrumb-category");
  const breadcrumbTitle = document.getElementById("breadcrumb-title");
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = post.category;
  }
  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = post.title;
  }

  // Render Article
  container.innerHTML = `
    <!-- Article Header -->
    <header class="max-w-3xl mx-auto text-center space-y-4 mb-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-blue/20 border border-ocean-aqua/30 text-ocean-aqua text-xs font-bold uppercase tracking-wider">
        ${post.category}
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
        ${post.title}
      </h1>
      <div class="flex items-center justify-center gap-4 text-xs text-ocean-muted-blue pt-2">
        <div class="flex items-center gap-2">
          <img src="${post.author.avatar}" alt="${post.author.name}" class="w-8 h-8 rounded-full object-cover border border-ocean-aqua/30" />
          <span class="text-white font-medium">${post.author.name} (${post.author.role})</span>
        </div>
        <span>•</span>
        <span>${post.date}</span>
        <span>•</span>
        <span class="text-ocean-aqua font-semibold">${post.readTime}</span>
      </div>
    </header>

    <!-- Featured Cover Image OR Zero-Image Directive Banner -->
    ${
      post.noImage
        ? `
    <div class="max-w-4xl mx-auto rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-ocean-navy-surface via-ocean-navy-card to-ocean-navy-surface border-2 border-ocean-gold/40 shadow-2xl mb-12">
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-ocean-navy-border pb-4 mb-6">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-ocean-gold animate-pulse"></span>
          <span class="text-xs font-mono uppercase tracking-widest text-ocean-gold font-bold">Field Directive & Rigging Manual // Technical Standard</span>
        </div>
        <span class="text-xs font-mono text-ocean-aqua px-2.5 py-1 rounded bg-ocean-aqua/10 border border-ocean-aqua/30">REF: HP-RIG-2026-X</span>
      </div>
      <p class="text-sm sm:text-base text-white/95 leading-relaxed font-medium">
        ${post.excerpt}
      </p>
      ${
        post.keyPoints && post.keyPoints.length
          ? `
      <div class="mt-6 pt-6 border-t border-ocean-navy-border grid grid-cols-1 sm:grid-cols-3 gap-4">
        ${post.keyPoints
          .map(
            (kp, idx) => `
          <div class="p-3.5 rounded-xl bg-ocean-navy-deep/80 border border-ocean-navy-border/80 text-xs text-ocean-text-secondary">
            <span class="text-ocean-gold font-bold block mb-1">Standard #0${idx + 1}</span>
            <span class="leading-relaxed block">${kp}</span>
          </div>
        `
          )
          .join("")}
      </div>`
          : ""
      }
    </div>
    `
        : `
    <div class="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-ocean-navy-border shadow-2xl mb-12 aspect-[16/9] bg-ocean-navy-surface">
      <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover" />
    </div>
    `
    }

    <!-- Article Body in centered readable width -->
    <div class="max-w-3xl mx-auto prose prose-invert text-ocean-text-secondary leading-relaxed space-y-6 text-sm sm:text-base">
      ${post.content}
    </div>

    <!-- Share & Social Toolbar -->
    <div class="max-w-3xl mx-auto mt-12 pt-6 border-t border-ocean-navy-border flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-xs font-bold text-white uppercase tracking-wider">Share this Field Guide:</div>
      <div class="flex items-center gap-3">
        <button type="button" id="copy-link-btn" class="p-2.5 rounded-lg bg-ocean-navy-surface border border-ocean-navy-border text-ocean-text-secondary hover:text-ocean-aqua hover:border-ocean-aqua transition" title="Copy Article Link">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </button>
        <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/60 transition" title="Share on WhatsApp">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-lg bg-sky-950/60 border border-sky-500/30 text-sky-400 hover:bg-sky-900/60 transition" title="Share on Twitter / X">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
      </div>
    </div>

    <!-- Author Profile Card -->
    <div class="max-w-3xl mx-auto mt-10 p-6 rounded-2xl bg-ocean-navy-card border border-ocean-navy-border flex flex-col sm:flex-row items-center sm:items-start gap-5">
      ${
        post.author && post.author.avatar
          ? `<img src="${post.author.avatar}" alt="${post.author.name}" class="w-16 h-16 rounded-full object-cover border-2 border-ocean-gold shrink-0" />`
          : `<div class="w-16 h-16 rounded-full bg-ocean-gold/20 border-2 border-ocean-gold text-ocean-gold font-black text-xl flex items-center justify-center shrink-0">
              ${post.author && post.author.name ? post.author.name.split(" ").map((n) => n[0]).join("").slice(0, 2) : "HP"}
            </div>`
      }
      <div class="text-center sm:text-start">
        <h4 class="text-base font-bold text-white">${post.author.name}</h4>
        <div class="text-xs text-ocean-gold font-medium">${post.author.role}</div>
        <p class="text-xs text-ocean-text-secondary mt-2 leading-relaxed">
          Veterans of the Indian coastline sharing verified terminal rigging secrets, marine safety, and ethical catch-and-release techniques to foster sustainable angling for future generations.
        </p>
      </div>
    </div>

    <!-- Related Articles -->
    <div class="mt-16 pt-10 border-t border-ocean-navy-border">
      <div class="flex items-center justify-between mb-8">
        <div>
          <span class="text-xs uppercase font-bold text-ocean-aqua tracking-wider">Further Reading</span>
          <h3 class="text-xl sm:text-2xl font-bold text-white mt-1">Recommended Coastal Guides</h3>
        </div>
        <a href="blog.html" class="text-xs font-semibold text-ocean-gold hover:text-white transition flex items-center gap-1">
          <span>All Articles</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        ${posts
          .filter((p) => p.id !== post.id)
          .slice(0, 3)
          .map((rel) => {
            if (rel.noImage) {
              return `
              <article class="ocean-card group bg-ocean-navy-card border border-ocean-gold/40 rounded-2xl overflow-hidden hover:border-ocean-gold transition-all duration-300 flex flex-col justify-between h-full">
                <div class="p-5 border-b border-ocean-navy-border/60 bg-ocean-navy-surface/80">
                  <span class="text-[10px] uppercase font-bold text-ocean-gold">${rel.category}</span>
                  <h4 class="text-sm font-bold text-white hover:text-ocean-gold transition-colors duration-200 line-clamp-2 min-h-[2.5rem] mt-1">
                    <a href="blog-details.html?id=${rel.id}">${rel.title}</a>
                  </h4>
                  <div class="text-[11px] text-ocean-aqua mt-2">Zero-Image Field Directive</div>
                </div>
                <div class="p-5 pt-3 mt-auto">
                  <div class="text-[11px] text-ocean-muted-blue">${rel.date} • ${rel.readTime}</div>
                  <a href="blog-details.html?id=${rel.id}" class="text-xs text-ocean-gold font-semibold hover:text-white mt-3 inline-block">Read Manual &rarr;</a>
                </div>
              </article>
              `;
            }
            return `
          <article class="ocean-card group flex flex-col justify-between h-full bg-ocean-navy-card border border-ocean-navy-border rounded-2xl overflow-hidden hover:border-ocean-aqua/50 transition-all duration-300">
            <div>
              <a href="blog-details.html?id=${rel.id}" class="block aspect-[16/9] overflow-hidden bg-ocean-navy-surface relative">
                <img src="${rel.image}" alt="${rel.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform" style="transform: translateZ(0); -webkit-transform: translateZ(0); backface-visibility: hidden; -webkit-backface-visibility: hidden;" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-ocean-navy/60 via-transparent to-transparent opacity-40"></div>
                <span class="absolute top-3 start-3 px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-ocean-blue text-white shadow">
                  ${rel.category}
                </span>
              </a>
              <div class="p-5">
                <h4 class="text-sm font-bold text-white group-hover:text-ocean-aqua transition-colors duration-200 line-clamp-2 min-h-[2.5rem] mt-1 leading-snug">
                  <a href="blog-details.html?id=${rel.id}">${rel.title}</a>
                </h4>
              </div>
            </div>
            <div class="px-5 pb-5 pt-0 mt-auto">
              <div class="text-[11px] text-ocean-muted-blue pt-3 border-t border-ocean-navy-border/60 flex items-center justify-between">
                <span>${rel.date}</span>
                <span class="text-ocean-aqua font-medium">${rel.readTime}</span>
              </div>
            </div>
          </article>
        `;
          })
          .join("")}
      </div>
    </div>
  `;

  // Copy link clipboard
  const copyBtn = document.getElementById("copy-link-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        if (window.HookPointCart) {
          window.HookPointCart.showToast("Article link copied to clipboard!", "success");
        }
      });
    });
  }
}
