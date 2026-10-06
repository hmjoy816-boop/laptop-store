/* Laptopia cart + GA4 ecommerce dataLayer events. Load AFTER js/products.js */
(function () {
  var KEY = "laptopia_cart", OKEY = "laptopia_order";
  window.dataLayer = window.dataLayer || [];

  function read(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function fmt(n) { return "$" + Number(n).toLocaleString("en-US"); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
  function gaItem(p, q) {
    return { item_id: slug(p.name), item_name: p.name, item_category: p.category, price: p.price, quantity: q };
  }
  function push(event, data) {
    dataLayer.push({ ecommerce: null });
    dataLayer.push({ event: event, ecommerce: data });
  }

  var Cart = {
    get: function () { return read(KEY, []); },
    lines: function () {
      return Cart.get().map(function (l) {
        var p = PRODUCTS.find(function (x) { return x.id === l.id; });
        return p ? { p: p, qty: l.qty } : null;
      }).filter(Boolean);
    },
    count: function () { return Cart.get().reduce(function (s, l) { return s + l.qty; }, 0); },
    total: function () { return Cart.lines().reduce(function (s, l) { return s + l.p.price * l.qty; }, 0); },
    add: function (id, qty) {
      var p = PRODUCTS.find(function (x) { return x.id === id; });
      if (!p) return;
      qty = Math.max(1, parseInt(qty, 10) || 1);
      var cart = Cart.get(), line = cart.find(function (l) { return l.id === id; });
      if (line) line.qty += qty; else cart.push({ id: id, qty: qty });
      write(KEY, cart);
      push("add_to_cart", { currency: "USD", value: p.price * qty, items: [gaItem(p, qty)] });
      setTimeout(function () { location.href = "checkout.html"; }, 300);
    },
    remove: function (id) {
      var p = PRODUCTS.find(function (x) { return x.id === id; });
      var line = Cart.get().find(function (l) { return l.id === id; });
      if (p && line) push("remove_from_cart", { currency: "USD", value: p.price * line.qty, items: [gaItem(p, line.qty)] });
      write(KEY, Cart.get().filter(function (l) { return l.id !== id; }));
    },
    clear: function () { write(KEY, []); }
  };

  window.Cart = Cart;
  window.LP = { push: push, gaItem: gaItem, fmt: fmt, esc: esc, read: read, write: write, OKEY: OKEY };

  // Cart link in the header menu (shows item count)
  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector("#header nav");
    if (!nav) return;
    var target = nav.querySelector("ul") || nav, a = document.createElement("a");
    a.href = "checkout.html";
    a.textContent = "Cart (" + Cart.count() + ")";
    if (target.tagName === "UL") { var li = document.createElement("li"); li.appendChild(a); target.appendChild(li); }
    else target.appendChild(a);
  });
})();
