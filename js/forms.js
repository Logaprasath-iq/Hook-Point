/**
 * HOOKPOINT — Forms & Order Checkout Engine
 * Handles order calculations, validation, demo reference generation on order.html,
 * contact enquiry form validation on contact.html, and telemetry catch reports.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("order-form")) {
    initOrderPage();
  }
  if (document.getElementById("contact-form")) {
    initContactPage();
  }
  if (document.getElementById("catch-report-form")) {
    initCatchReportValidation();
  }
});

// ==========================================================================
// FORM VALIDATION & UI ERROR FEEDBACK HELPERS
// ==========================================================================

function getFieldElement(target) {
  return typeof target === "string" ? document.getElementById(target) : target;
}

function showFieldError(target, message) {
  const input = getFieldElement(target);
  if (!input) return;

  // Add invalid state classes
  input.classList.remove("border-ocean-navy-border", "focus:border-ocean-aqua");
  input.classList.add("input-invalid");

  // Find or create inline error container
  const parent = input.parentElement;
  if (!parent) return;

  let errorEl = parent.querySelector(".field-error-msg");
  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.className = "field-error-msg";
    input.insertAdjacentElement("afterend", errorEl);
  }

  errorEl.innerHTML = `
    <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
    </svg>
    <span>${message}</span>
  `;
}

function clearFieldError(target) {
  const input = getFieldElement(target);
  if (!input) return;

  input.classList.remove("input-invalid");
  input.classList.add("border-ocean-navy-border");

  const parent = input.parentElement;
  if (parent) {
    const errorEl = parent.querySelector(".field-error-msg");
    if (errorEl) errorEl.remove();
  }
}

// --------------------------------------------------------------------------
// Real-time Field Binders
// --------------------------------------------------------------------------

/**
 * Full Name restriction:
 * - NO numbers allowed under any circumstance.
 * - Minimum more than 2 letters (at least 3 letters).
 * - Real-time keydown & input stripping.
 */
function bindNameRestrictions(input, fieldLabel = "Full Name") {
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    // If user types a digit 0-9
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      showFieldError(input, `Numbers are not allowed in ${fieldLabel}. Letters only.`);
    }
  });

  input.addEventListener("input", () => {
    const hadDigits = /[0-9]/.test(input.value);
    // Strip digits and non-name characters (letters, spaces, hyphens, dots, apostrophes allowed)
    input.value = input.value.replace(/[0-9]/g, "").replace(/[^a-zA-Z\s\.\'-]/g, "");

    const lettersCount = (input.value.match(/[a-zA-Z]/g) || []).length;

    if (hadDigits) {
      showFieldError(input, `Numbers are not allowed in ${fieldLabel} (letters only).`);
    } else if (input.value.trim().length === 0) {
      clearFieldError(input);
    } else if (lettersCount < 3) {
      showFieldError(input, `${fieldLabel} must be more than 2 letters (minimum 3 letters, no numbers).`);
    } else {
      clearFieldError(input);
    }
  });

  input.addEventListener("blur", () => {
    const val = input.value.trim();
    if (!val) {
      clearFieldError(input);
      return;
    }
    const lettersCount = (val.match(/[a-zA-Z]/g) || []).length;
    if (lettersCount < 3) {
      showFieldError(input, `${fieldLabel} must be more than 2 letters (minimum 3 letters, no numbers).`);
    } else {
      clearFieldError(input);
    }
  });
}

/**
 * Phone Number restriction:
 * - NO letters allowed under any circumstance.
 * - Numbers only, max 10 digits.
 * - Must be valid 10-digit mobile number (starting with 6, 7, 8, or 9).
 */
function bindPhoneRestrictions(input) {
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    // Allowed control keys
    if (["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Enter", "Home", "End"].includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }
    // Block letters and symbols
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      showFieldError(input, "Letters are not allowed in Phone Number. Numbers only.");
    }
  });

  input.addEventListener("input", () => {
    const hadNonDigits = /[^\d]/.test(input.value);
    const cleaned = input.value.replace(/\D/g, "").slice(0, 10);
    input.value = cleaned;

    if (hadNonDigits) {
      showFieldError(input, "Letters and symbols are not allowed in Phone Number (numbers only).");
    } else if (cleaned.length === 0) {
      clearFieldError(input);
    } else if (cleaned.length < 10) {
      showFieldError(input, "Phone number must be 10 digits (numbers only, e.g. 9876543210).");
    } else if (!/^[6-9]/.test(cleaned)) {
      showFieldError(input, "Please enter a valid mobile number starting with 6, 7, 8, or 9.");
    } else {
      clearFieldError(input);
    }
  });

  input.addEventListener("blur", () => {
    const val = input.value.trim();
    if (!val) {
      clearFieldError(input);
      return;
    }
    if (val.length !== 10 || !/^[6-9]\d{9}$/.test(val)) {
      showFieldError(input, "Please enter a valid 10-digit mobile number (numbers only, e.g. 9876543210).");
    } else {
      clearFieldError(input);
    }
  });
}

/**
 * Email Address restriction:
 * - Must strictly match proper email structure (user@domain.extension).
 * - No spaces allowed.
 */
function bindEmailRestrictions(input) {
  if (!input) return;

  input.addEventListener("input", () => {
    input.value = input.value.replace(/\s/g, "");
    if (input.value.length === 0) {
      clearFieldError(input);
    }
  });

  input.addEventListener("blur", () => {
    const val = input.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!val) {
      clearFieldError(input);
      return;
    }
    if (!emailRegex.test(val)) {
      showFieldError(input, "Please enter a valid email address (e.g. name@domain.com).");
    } else {
      clearFieldError(input);
    }
  });
}

/**
 * City & State restriction:
 * - NO numbers allowed under any circumstance.
 * - Minimum more than 2 letters (at least 3 letters).
 */
function bindCityRestrictions(input) {
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      showFieldError(input, "Numbers are not allowed in City & State. Letters only.");
    }
  });

  input.addEventListener("input", () => {
    const hadDigits = /[0-9]/.test(input.value);
    input.value = input.value.replace(/[0-9]/g, "").replace(/[^a-zA-Z\s,\.\'-]/g, "");

    const lettersCount = (input.value.match(/[a-zA-Z]/g) || []).length;

    if (hadDigits) {
      showFieldError(input, "Numbers are not allowed in City & State (letters only).");
    } else if (input.value.trim().length === 0) {
      clearFieldError(input);
    } else if (lettersCount < 3) {
      showFieldError(input, "City & State must be more than 2 letters (minimum 3 letters, no numbers).");
    } else {
      clearFieldError(input);
    }
  });

  input.addEventListener("blur", () => {
    const val = input.value.trim();
    if (!val) {
      clearFieldError(input);
      return;
    }
    const lettersCount = (val.match(/[a-zA-Z]/g) || []).length;
    if (lettersCount < 3) {
      showFieldError(input, "City & State must be more than 2 letters (minimum 3 letters, no numbers).");
    } else {
      clearFieldError(input);
    }
  });
}

/**
 * PIN / Postal Code restriction:
 * - NO letters allowed under any circumstance.
 * - Exactly 6 digits (numbers only, starts with 1-9).
 */
function bindPostalRestrictions(input) {
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Enter", "Home", "End"].includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      showFieldError(input, "Letters are not allowed in PIN code. Numbers only.");
    }
  });

  input.addEventListener("input", () => {
    const hadNonDigits = /[^\d]/.test(input.value);
    const cleaned = input.value.replace(/\D/g, "").slice(0, 6);
    input.value = cleaned;

    if (hadNonDigits) {
      showFieldError(input, "Letters are not allowed in PIN code (numbers only).");
    } else if (cleaned.length === 0) {
      clearFieldError(input);
    } else if (cleaned.length < 6) {
      showFieldError(input, "PIN code must be exactly 6 digits (numbers only, e.g. 682001).");
    } else if (cleaned[0] === "0") {
      showFieldError(input, "PIN code cannot start with 0.");
    } else {
      clearFieldError(input);
    }
  });

  input.addEventListener("blur", () => {
    const val = input.value.trim();
    if (!val) {
      clearFieldError(input);
      return;
    }
    if (!/^[1-9][0-9]{5}$/.test(val)) {
      showFieldError(input, "PIN code must be a valid 6-digit number (numbers only, e.g. 682001).");
    } else {
      clearFieldError(input);
    }
  });
}

// --------------------------------------------------------------------------
// Validation Evaluators (Used upon Form Submission)
// --------------------------------------------------------------------------

function validateName(input, fieldLabel = "Full Name") {
  if (!input) return false;
  const val = input.value.trim();
  if (!val) {
    showFieldError(input, `Please enter your ${fieldLabel}.`);
    return false;
  }
  if (/[0-9]/.test(val)) {
    showFieldError(input, `Numbers are not allowed in ${fieldLabel}. Letters only.`);
    return false;
  }
  const lettersCount = (val.match(/[a-zA-Z]/g) || []).length;
  if (lettersCount < 3) {
    showFieldError(input, `${fieldLabel} must be more than 2 letters (minimum 3 letters, no numbers).`);
    return false;
  }
  clearFieldError(input);
  return true;
}

function validatePhone(input) {
  if (!input) return false;
  const val = input.value.trim().replace(/\D/g, "");
  if (!val) {
    showFieldError(input, "Please enter your 10-digit mobile number.");
    return false;
  }
  if (val.length !== 10 || !/^[6-9]\d{9}$/.test(val)) {
    showFieldError(input, "Please enter a valid 10-digit mobile number (numbers only, e.g. 9876543210).");
    return false;
  }
  clearFieldError(input);
  return true;
}

function validateEmail(input) {
  if (!input) return false;
  const val = input.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!val) {
    showFieldError(input, "Please enter your email address.");
    return false;
  }
  if (!emailRegex.test(val)) {
    showFieldError(input, "Please enter a valid email address (e.g. name@domain.com).");
    return false;
  }
  clearFieldError(input);
  return true;
}

function validateAddress(input) {
  if (!input) return false;
  const val = input.value.trim();
  if (!val || val.length < 5) {
    showFieldError(input, "Please provide a complete delivery address (minimum 5 characters).");
    return false;
  }
  clearFieldError(input);
  return true;
}

function validateCity(input) {
  if (!input) return false;
  const val = input.value.trim();
  if (!val) {
    showFieldError(input, "Please enter your City & State.");
    return false;
  }
  if (/[0-9]/.test(val)) {
    showFieldError(input, "Numbers are not allowed in City & State. Letters only.");
    return false;
  }
  const lettersCount = (val.match(/[a-zA-Z]/g) || []).length;
  if (lettersCount < 3) {
    showFieldError(input, "City & State must be more than 2 letters (minimum 3 letters, no numbers).");
    return false;
  }
  clearFieldError(input);
  return true;
}

function validatePostal(input) {
  if (!input) return false;
  const val = input.value.trim();
  if (!val) {
    showFieldError(input, "Please enter your 6-digit PIN code.");
    return false;
  }
  if (!/^[1-9][0-9]{5}$/.test(val)) {
    showFieldError(input, "PIN code must be a valid 6-digit number (numbers only, e.g. 682001).");
    return false;
  }
  clearFieldError(input);
  return true;
}

function validateMessage(input) {
  if (!input) return false;
  const val = input.value.trim();
  if (!val || val.length < 10) {
    showFieldError(input, "Please enter a detailed message (minimum 10 characters).");
    return false;
  }
  clearFieldError(input);
  return true;
}

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

  // Input references
  const nameInput = document.getElementById("order-name");
  const phoneInput = document.getElementById("order-phone");
  const emailInput = document.getElementById("order-email");
  const addressInput = document.getElementById("order-address");
  const cityInput = document.getElementById("order-city");
  const postalInput = document.getElementById("order-postal");

  // Bind real-time character blocking & sanitizers
  bindNameRestrictions(nameInput, "Full Name");
  bindPhoneRestrictions(phoneInput);
  bindEmailRestrictions(emailInput);
  bindCityRestrictions(cityInput);
  bindPostalRestrictions(postalInput);

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
          <div class="text-xs text-ocean-gold font-semibold">${window.HookPointCart ? window.HookPointCart.formatINR(item.price) : "₹" + item.price} × ${item.quantity}</div>
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

  // Order Form Submission & Strict Validation
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cart = window.HookPointCart ? window.HookPointCart.getCart() : [];
    if (cart.length === 0) {
      if (window.HookPointCart) {
        window.HookPointCart.showToast("Your Tackle Box is empty! Please add items from our catalogue.", "error");
      }
      return;
    }

    // Comprehensive field validation
    const isNameOk = validateName(nameInput, "Full Name");
    const isPhoneOk = validatePhone(phoneInput);
    const isEmailOk = validateEmail(emailInput);
    const isAddressOk = validateAddress(addressInput);
    const isCityOk = validateCity(cityInput);
    const isPostalOk = validatePostal(postalInput);

    if (!isNameOk || !isPhoneOk || !isEmailOk || !isAddressOk || !isCityOk || !isPostalOk) {
      // Find and focus the first invalid field
      const checks = [
        { ok: isNameOk, el: nameInput },
        { ok: isPhoneOk, el: phoneInput },
        { ok: isEmailOk, el: emailInput },
        { ok: isAddressOk, el: addressInput },
        { ok: isCityOk, el: cityInput },
        { ok: isPostalOk, el: postalInput },
      ];
      const firstInvalid = checks.find((c) => !c.ok);
      if (firstInvalid && firstInvalid.el) {
        firstInvalid.el.focus();
        firstInvalid.el.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (window.HookPointCart) {
        window.HookPointCart.showToast("Please correct the highlighted form errors before proceeding.", "error");
      }
      return;
    }

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const address = addressInput.value.trim();
    const city = cityInput.value.trim();
    const postal = postalInput.value.trim();
    const payment = document.querySelector('input[name="payment_method"]:checked')?.value || "COD";
    const notes = document.getElementById("order-notes")?.value.trim() || "None";

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
      total: window.HookPointCart ? window.HookPointCart.formatINR(total) : `₹${total}`,
    });

    // Clear cart
    if (window.HookPointCart) {
      window.HookPointCart.clearCart();
    }
  });

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

  const nameInput = document.getElementById("contact-name");
  const phoneInput = document.getElementById("contact-phone");
  const emailInput = document.getElementById("contact-email");
  const subjectSelect = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");

  // Bind real-time input sanitizers and restrictions
  bindNameRestrictions(nameInput, "Your Full Name");
  bindPhoneRestrictions(phoneInput);
  bindEmailRestrictions(emailInput);

  // Quick topic selection chips
  const topicPills = document.querySelectorAll(".quick-topic-btn");
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

  // Contact Form Submission & Strict Validation
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameOk = validateName(nameInput, "Your Full Name");
    const isPhoneOk = validatePhone(phoneInput);
    const isEmailOk = validateEmail(emailInput);
    const isMessageOk = validateMessage(messageInput);

    if (!isNameOk || !isPhoneOk || !isEmailOk || !isMessageOk) {
      const checks = [
        { ok: isNameOk, el: nameInput },
        { ok: isPhoneOk, el: phoneInput },
        { ok: isEmailOk, el: emailInput },
        { ok: isMessageOk, el: messageInput },
      ];
      const firstInvalid = checks.find((c) => !c.ok);
      if (firstInvalid && firstInvalid.el) {
        firstInvalid.el.focus();
        firstInvalid.el.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (window.HookPointCart) {
        window.HookPointCart.showToast("Please correct the highlighted form errors before submitting.", "error");
      }
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
    [nameInput, phoneInput, emailInput, messageInput].forEach((el) => clearFieldError(el));
  });
}

// ==========================================================================
// 3. FISHING REPORT VALIDATION (fishing-reports.html)
// ==========================================================================
function initCatchReportValidation() {
  const anglerNameInput = document.getElementById("report-angler-name");
  if (anglerNameInput) {
    bindNameRestrictions(anglerNameInput, "Angler Name");
  }

  const reportForm = document.getElementById("catch-report-form");
  if (reportForm && anglerNameInput) {
    reportForm.addEventListener("submit", (e) => {
      if (!validateName(anglerNameInput, "Angler Name")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        anglerNameInput.focus();
        if (window.HookPointCart) {
          window.HookPointCart.showToast("Please enter a valid Angler Name (minimum 3 letters, no numbers).", "error");
        }
      }
    }, true);
  }
}
