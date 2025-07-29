let cart = [];
let discount = 0;
let appliedCoupon = null;

function addToCart(product, price) {
  cart.push({ product, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  cartItems.innerHTML = '';

  let totalBeforeDiscount = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.product} — ₹${item.price}`;
    cartItems.appendChild(li);
    totalBeforeDiscount += item.price;
  });

  let finalTotal = totalBeforeDiscount - discount;

  if (discount > 0) {
    totalEl.innerHTML = `Total: <s>₹${totalBeforeDiscount}</s> <strong>₹${finalTotal}</strong> (₹${discount} OFF)`;
  } else {
    totalEl.textContent = `Total: ₹${totalBeforeDiscount}`;
  }
}

function applyCoupon() {
  const code = document.getElementById('couponInput').value.trim().toLowerCase();
  const message = document.getElementById('coupon-message');
  const validCoupons = ['vts_cuts', 'gopi123', 'mahesh123', 'teja123'];
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  if (validCoupons.includes(code)) {
    if (cartTotal >= 900) {
      discount = 100;
      appliedCoupon = code;
      message.textContent = `🎉 ₹100 OFF applied with code: ${code}`;
      message.style.color = "green";
    } else {
      discount = 0;
      appliedCoupon = null;
      message.textContent = "❌ Minimum ₹900 required for this coupon.";
      message.style.color = "orange";
    }
  } else {
    discount = 0;
    appliedCoupon = null;
    message.textContent = "❌ Invalid coupon code.";
    message.style.color = "red";
  }

  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const buyerName = document.getElementById('buyer-name').value.trim();
  const buyerPhone = document.getElementById('buyer-phone').value.trim();
  const buyerAddress = document.getElementById('buyer-address').value.trim();

  if (!buyerName || !buyerPhone || !buyerAddress) {
    alert("Please fill in all your details before ordering.");
    return;
  }

  let message = `🛒 *Order from ShadowTrends*%0A`;
  message += `👤 *Name:* ${buyerName}%0A📞 *Phone:* ${buyerPhone}%0A🏠 *Address:* ${buyerAddress}%0A%0A`;
  message += `🧾 *Items:*%0A`;

  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.product} — ₹${item.price}%0A`;
  });

  const totalBeforeDiscount = cart.reduce((sum, item) => sum + item.price, 0);
  const finalTotal = totalBeforeDiscount - discount;

  if (discount > 0) {
    message += `%0A🏷️ *Coupon:* ${appliedCoupon}%0A`;
    message += `💸 *Original Total:* ₹${totalBeforeDiscount}%0A`;
    message += `🎁 *Discount:* ₹${discount}%0A`;
  }

  message += `💰 *Total to Pay:* ₹${finalTotal}`;

  const phoneNumber = "919553702309";
  window.open(`https://wa.me/${phoneNumber}?text=${message}`);
}
