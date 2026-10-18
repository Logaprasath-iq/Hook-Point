/**
 * HOOKPOINT — Forms & Order Checkout Engine
 * Handles order calculations, validation, demo reference generation on order.html,
 * and contact enquiry form validation on contact.html.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("order-form")) {
    initOrderPage();
  }
  if (document.getElementById("contact-form")) {
    initContactPage();
  }
});

// ==========================================================================
// 1. ORDER ENQUIRY ENGINE (order.html)
// ==========================================================================
function initOrderPage() {
  const orderForm = document.getElementById("order-form");
  const orderItemsList = document.getElementById("order-items-list");
  const orderSubtotalEl = document.getElementById("order-subtotal");
  const orderShippingEl = document.getElementById("order-shipping");
  const orderTotalEl = document.getElementById("order-total");
  const shippingMethodRadios = document.querySelectorAll('input[name="shipping_speed"]');

  // Read URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const paramProductId = urlParams.get("productId");

  // If redirected with a product ID and cart is empty or doesn't have it, add it
  if (paramProductId && window.HookPointData && window.HookPointCart) {
    const existing = window.HookPointCart.getCart().find((i) => i.id === paramProductId);
    if (!existing) {
      window.HookPointCart.addToCart(paramProductId, 1, { openDrawer: false });
    }
  }

  function getShippingCost(subtotal) {
    let speed = "standard";
    shippingMethodRadios.forEach((r) => {
      if (r.checked) speed = r.value;
    });

    if (subtotal >= 2999 && speed === "standard") {
      return 0; // Free Standard Shipping over ₹2,999
    }
    return speed === "express" ? 299 : 149;
  }

  function renderOrderItems() {
    const cart = window.HookPointCart ? window.HookPointCart.getCart() : [];
    const subtotal = window.HookPointCart ? window.HookPointCart.getCartSubtotal() : 0;
    const shipping = getShippingCost(subtotal);
    const grandTotal = subtotal + shipping;

    if (orderSubtotalEl) {
      orderSubtotalEl.textContent = window.HookPointCart ? window.HookPointCart.formatINR(subtotal) : `₹${subtotal}`;
    }

    if (orderShippingEl) {
      if (shipping === 0) {
        orderShippingEl.innerHTML = `<span class="text-emerald-400 font-bold uppercase">FREE</span>`;
      } else {
        orderShippingEl.textContent = window.HookPointCart ? window.HookPointCart.formatINR(shipping) : `₹${shipping}`;
      }
    }

    if (orderTotalEl) {
      orderTotalEl.textContent = window.HookPointCart ? window.HookPointCart.formatINR(grandTotal) : `₹${grandTotal}`;
    }

    if (!orderItemsList) return;

    if (cart.length === 0) {
      orderItemsList.innerHTML = `
        <div class="p-6 text-center rounded-xl bg-ocean-navy border border-dashed border-ocean-navy-border space-y-3">
          <p class="text-xs text-ocean-text-secondary">Your Tackle Box is currently empty.</p>
          <a href="products.html" class="inline-block water-button text-xs py-2 px-4">Browse Catalogue to Add Items</a>
        </div>
      `;
      return;
    }

    let itemsHtml = "";

    // Products in cart
    itemsHtml += cart
      .map(
        (item) => `
      <div class="flex items-center gap-3 p-3 rounded-xl bg-ocean-navy border border-ocean-navy-border">
        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover shrink-0 border border-ocean-navy-border" />
        <div class="flex-1 min-w-0">
          <div class="text-xs font-bold text-white truncate">${item.name}</div>
          <div class="text-xs text-ocean-gold font-semibold">${window.HookPointCart ? window.HookPointCart.formatINR(item.price) : '₹' + item.price} × ${item.quantity}</div>
        </div>
        <div class="flex items-center gap-1.5">
          <button type="button" class="w-6 h-6 rounded bg-ocean-navy-surface text-ocean-text-secondary hover:text-white flex items-center justify-center text-xs" onclick="HookPointCart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
          <span class="w-6 text-center text-xs font-bold text-white">${item.quantity}</span>
          <button type="button" class="w-6 h-6 rounded bg-ocean-navy-surface text-ocean-text-secondary hover:text-white flex items-center justify-center text-xs" onclick="HookPointCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          <button type="button" class="ms-1 text-red-400 hover:text-red-300 p-1" onclick="HookPointCart.removeFromCart('${item.id}')" title="Remove">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    `
      )
      .join("");

    orderItemsList.innerHTML = itemsHtml;
  }

  // Recalculate when cart updates or shipping speed changes
  window.addEventListener("hookpoint_cart_updated", renderOrderItems);
  shippingMethodRadios.forEach((r) => r.addEventListener("change", renderOrderItems));

  // Initial render of summary
  renderOrderItems();

  // Order Form Submission & Validation
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cart = window.HookPointCart ? window.HookPointCart.getCart() : [];
    if (cart.length === 0) {
      if (window.HookPointCart) {
        window.HookPointCart.showToast("Your Tackle Box is empty! Please add items from our catalogue.", "error");
      }
      return;
    }

    const name = document.getElementById("order-name").value.trim();
    const phone = document.getElementById("order-phone").value.trim();
    const email = document.getElementById("order-email").value.trim();
    const address = document.getElementById("order-address").value.trim();
    const city = document.getElementById("order-city").value.trim();
    const postal = document.getElementById("order-postal").value.trim();
    const payment = document.querySelector('input[name="payment_method"]:checked')?.value || "COD";
    const notes = document.getElementById("order-notes")?.value.trim() || "None";

    // Validation
    if (name.length < 2) {
      showFieldError("order-name", "Please enter your full name.");
      return;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      showFieldError("order-phone", "Please enter a valid 10-digit mobile number.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFieldError("order-email", "Please enter a valid email address.");
      return;
    }
    if (address.length < 5) {
      showFieldError("order-address", "Please provide a complete delivery address.");
      return;
    }
    if (city.length < 2) {
      showFieldError("order-city", "Please enter your city.");
      return;
    }
    if (postal.length < 4) {
      showFieldError("order-postal", "Please enter a valid PIN code.");
      return;
    }

    // Generate reference code
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderRef = `HKP-2026-${randomNum}`;

    const subtotal = window.HookPointCart ? window.HookPointCart.getCartSubtotal() : 0;
    const shipping = getShippingCost(subtotal);
    const total = subtotal + shipping;

    showOrderSuccessModal({
      orderRef,
      name,
      phone,
      email,
      address: `${address}, ${city} - ${postal}`,
      payment,
      notes,
      items: cart,
      total: window.HookPointCart ? window.HookPointCart.formatINR(total) : `₹${total}`
    });

    // Clear cart
    if (window.HookPointCart) {
      window.HookPointCart.clearCart();
    }
  });

  function showFieldError(fieldId, msg) {
    const el = document.getElementById(fieldId);
    if (el) {
      el.focus();
      el.classList.add("border-red-500");
      setTimeout(() => el.classList.remove("border-red-500"), 3000);
    }
    if (window.HookPointCart) {
      window.HookPointCart.showToast(msg, "error");
    }
  }

  function showOrderSuccessModal(orderData) {
    let modal = document.getElementById("order-success-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "order-success-modal";
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean-navy/90 backdrop-blur-md";
      document.body.appendChild(modal);
    }

    const itemsSummary = orderData.items.map((i) => `${i.quantity} × ${i.name}`).join("<br/>");

    modal.innerHTML = `
      <div class="ocean-card max-w-lg w-full bg-ocean-navy-card border border-ocean-gold/50 p-6 sm:p-8 rounded-2xl shadow-2xl relative animate-scale">
        <div class="text-center space-y-3">
          <div class="w-16 h-16 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span class="px-3 py-1 rounded-full bg-ocean-gold/20 text-ocean-gold text-xs font-bold uppercase tracking-wider">
            Order Enquiry Received
          </span>
          <h2 class="text-2xl font-extrabold text-white">Tight Lines, ${orderData.name}!</h2>
          <p class="text-xs text-ocean-text-secondary">
            Your demonstration enquiry has been logged into HookPoint's dispatch registry.
          </p>
        </div>

        <div class="my-6 p-4 rounded-xl bg-ocean-navy-surface border border-ocean-navy-border space-y-2 text-xs">
          <div class="flex justify-between">
            <span class="text-ocean-text-secondary">Reference No:</span>
            <span class="text-ocean-gold font-mono font-bold">${orderData.orderRef}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-ocean-text-secondary">Recipient:</span>
            <span class="text-white font-medium">${orderData.name} (${orderData.phone})</span>
          </div>
          <div class="flex justify-between">
            <span class="text-ocean-text-secondary">Delivery Destination:</span>
            <span class="text-white font-medium text-end max-w-xs truncate">${orderData.address}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-ocean-text-secondary">Estimated Total:</span>
            <span class="text-ocean-gold font-bold text-sm">${orderData.total}</span>
          </div>
          <div class="pt-2 border-t border-ocean-navy-border">
            <span class="text-ocean-text-secondary block mb-1">Tackle Order Summary:</span>
            <div class="text-white leading-relaxed font-mono text-[11px]">${itemsSummary}</div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-ocean-blue/20 border border-ocean-aqua/30 text-[11px] text-ocean-aqua text-center mb-6">
          <strong>Demonstration Notice:</strong> No real payment was charged. In a live store, an automated invoice and tracking link will be sent to <strong>${orderData.email}</strong>.
        </div>

        <div class="space-y-3">
          <a href="https://wa.me/919876543210?text=${encodeURIComponent(
            `Hi HookPoint, I have placed an order enquiry with Reference ${orderData.orderRef} for ${orderData.total}. Please confirm courier dispatch.`
          )}" target="_blank" rel="noopener noreferrer" class="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" /></svg>
            <span>Confirm Order via WhatsApp Support</span>
          </a>
          <button type="button" onclick="document.getElementById('order-success-modal').remove(); window.location.href='index.html';" class="w-full text-center py-2.5 text-xs text-ocean-text-secondary hover:text-white transition">
            Return to Homepage
          </button>
        </div>
      </div>
    `;
  }
}

// ==========================================================================
// 2. CONTACT ENQUIRY ENGINE (contact.html)
// ==========================================================================
function initContactPage() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  // Quick topic selection chips
  const topicPills = document.querySelectorAll(".quick-topic-btn");
  const subjectSelect = document.getElementById("contact-subject");
  if (topicPills.length && subjectSelect) {
    topicPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const cat = pill.getAttribute("data-category");
        if (cat) {
          subjectSelect.value = cat;
          topicPills.forEach((p) => p.classList.remove("active-topic"));
          pill.classList.add("active-topic");
        }
      });
    });

    subjectSelect.addEventListener("change", () => {
      topicPills.forEach((p) => {
        if (p.getAttribute("data-category") === subjectSelect.value) {
          p.classList.add("active-topic");
        } else {
          p.classList.remove("active-topic");
        }
      });
    });
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-message").value.trim();

    if (name.length < 2) {
      if (window.HookPointCart) window.HookPointCart.showToast("Please enter your name.", "error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (window.HookPointCart) window.HookPointCart.showToast("Please enter a valid email address.", "error");
      return;
    }
    if (message.length < 10) {
      if (window.HookPointCart) window.HookPointCart.showToast("Please enter a detailed message (minimum 10 characters).", "error");
      return;
    }

    // Success response
    if (window.HookPointCart) {
      window.HookPointCart.showToast(
        "Thank you! Your enquiry has been routed to our Head Tackle Master. We will contact you within 2 hours.",
        "success"
      );
    }

    contactForm.reset();
  });
}
