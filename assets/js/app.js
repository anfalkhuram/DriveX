(function ($) {
  const data = window.SparesData || {};
  const storageKey = "spares_cart";
  const assetBase = "../assets/images/";
  const body = $("body");
  const currentPage = body.data("page") || "";
  const pageState = {
    shopPage: 1,
    perPage: 6
  };

  function asset(name) {
    return assetBase + name;
  }

  function formatCurrency(value) {
    return "$" + Number(value).toFixed(2);
  }

  function findProduct(id) {
    return data.products.find(function (product) {
      return product.id === id;
    });
  }

  function getDiscount(product) {
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }

  function renderStars(rating) {
    const fullStars = Math.round(rating);
    let html = "";
    for (let index = 0; index < 5; index += 1) {
      html += index < fullStars
        ? '<i class="fa-solid fa-star"></i>'
        : '<i class="fa-regular fa-star text-secondary opacity-50"></i>';
    }
    return html;
  }

  function defaultCart() {
    return data.cart.map(function (item) {
      return { productId: item.productId, quantity: item.quantity };
    });
  }

  function getCart() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey));
      return Array.isArray(stored) && stored.length ? stored : defaultCart();
    } catch (error) {
      return defaultCart();
    }
  }

  function saveCart(cart) {
    localStorage.setItem(storageKey, JSON.stringify(cart));
    updateCartCount();
  }

  function getCartDetailed() {
    return getCart()
      .map(function (item) {
        const product = findProduct(item.productId);
        if (!product) {
          return null;
        }
        return {
          product: product,
          quantity: item.quantity,
          total: product.price * item.quantity
        };
      })
      .filter(Boolean);
  }

  function cartCount() {
    return getCart().reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);
  }

  function cartSubtotal() {
    return getCartDetailed().reduce(function (sum, item) {
      return sum + item.total;
    }, 0);
  }

  function shippingCost() {
    return cartSubtotal() > 300 ? 0 : 18;
  }

  function taxAmount() {
    return cartSubtotal() * 0.08;
  }

  function grandTotal() {
    return cartSubtotal() + shippingCost() + taxAmount();
  }

  function showToast(message) {
    const toast = [
      '<div class="alert alert-dark shadow-lg border-0 rounded-4 px-3 py-3 mb-2">',
      '<div class="d-flex align-items-center gap-3">',
      '<i class="fa-solid fa-circle-check text-success fs-5"></i>',
      "<div>",
      '<div class="fw-semibold">DriveX Spares</div>',
      '<div class="small text-white-50">' + message + "</div>",
      "</div>",
      "</div>",
      "</div>"
    ].join("");
    $("#toastShell").html(toast);
    window.clearTimeout(window.sparesToastTimer);
    window.sparesToastTimer = window.setTimeout(function () {
      $("#toastShell").empty();
    }, 2400);
  }

  function updateCartCount() {
    $(".cart-count").text(cartCount());
  }

  function addToCart(productId, quantity) {
    const cart = getCart();
    const existing = cart.find(function (item) {
      return item.productId === productId;
    });
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId: productId, quantity: quantity });
    }
    saveCart(cart);
    showToast("Item added to cart.");
  }

  function updateCartItem(productId, quantity) {
    const cart = getCart()
      .map(function (item) {
        if (item.productId === productId) {
          return { productId: item.productId, quantity: Math.max(1, quantity) };
        }
        return item;
      })
      .filter(function (item) {
        return item.quantity > 0;
      });
    saveCart(cart);
  }

  function removeCartItem(productId) {
    const cart = getCart().filter(function (item) {
      return item.productId !== productId;
    });
    saveCart(cart);
    showToast("Item removed from cart.");
  }

  function headerTemplate() {
    const navItems = [
      { key: "home", label: "Home", href: "index.html" },
      { key: "shop", label: "Shop", href: "shop.html" },
      { key: "about", label: "About", href: "about.html" },
      { key: "contact", label: "Contact", href: "contact.html" }
    ];

    const links = navItems
      .map(function (item) {
        const activeClass = currentPage === item.key ? "active" : "";
        return '<li class="nav-item"><a class="nav-link ' + activeClass + '" href="' + item.href + '">' + item.label + "</a></li>";
      })
      .join("");

    return [
      '<div class="top-strip py-2">',
      '<div class="container d-flex flex-wrap gap-2 justify-content-between align-items-center">',
      '<div class="d-flex align-items-center gap-3"><span><i class="fa-solid fa-phone-volume me-2"></i>Need fitment help? +92 300 4445500</span><span class="badge rounded-pill">24/7 Parts Support</span></div>',
      '<div class="d-flex align-items-center gap-3"><span><i class="fa-solid fa-truck-fast me-2"></i>Free shipping above $300</span><span><i class="fa-solid fa-shield-halved me-2"></i>Genuine quality promise</span></div>',
      "</div>",
      "</div>",
      '<header class="site-header">',
      '<nav class="navbar navbar-expand-xl py-3">',
      '<div class="container align-items-center">',
      '<a class="navbar-brand d-flex align-items-center gap-3" href="index.html">',
      '<img src="' + asset("logo-mark.svg") + '" alt="DriveX Spares" class="brand-mark">',
      '<div><span class="fw-bold fs-4 text-dark display-font">DriveX</span><div class="small text-muted-soft">Performance Spares</div></div>',
      "</a>",
      '<button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#siteNavbar">',
      '<span class="navbar-toggler-icon"></span></button>',
      '<div class="collapse navbar-collapse" id="siteNavbar">',
      '<ul class="navbar-nav ms-xl-4">' + links + "</ul>",
      '<div class="ms-xl-auto d-flex flex-column flex-xl-row align-items-xl-center gap-3 mt-3 mt-xl-0">',
      '<div class="search-shell w-100"><i class="fa-solid fa-magnifying-glass"></i><input type="search" class="form-control" placeholder="Search filters, brakes, oils, accessories"></div>',
      '<a href="shop.html" class="btn btn-outline-dark rounded-pill px-4"><i class="fa-solid fa-layer-group me-2"></i>Categories</a>',
      '<a href="cart.html" class="icon-btn position-relative"><i class="fa-solid fa-cart-shopping"></i><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-count">0</span></a>',
      '<a href="login.html" class="btn btn-danger rounded-pill px-4"><i class="fa-regular fa-user me-2"></i>Login</a>',
      "</div>",
      "</div>",
      "</div>",
      "</nav>",
      "</header>"
    ].join("");
  }

  function footerTemplate() {
    return [
      '<footer class="footer-shell mt-5">',
      '<div class="container">',
      '<div class="row g-4">',
      '<div class="col-lg-4">',
      '<div class="d-flex align-items-center gap-3 mb-3"><img src="' + asset("logo-mark.svg") + '" alt="DriveX" class="brand-mark"><div><h5 class="mb-0">DriveX Spares</h5><small>Automotive parts with workshop-grade confidence.</small></div></div>',
      '<p class="mb-4">A polished static storefront and admin experience for car spare parts, designed around speed, trust, and easy catalog browsing.</p>',
      '<div class="d-flex gap-2"><a class="social-link" href="#"><i class="fa-brands fa-facebook-f"></i></a><a class="social-link" href="#"><i class="fa-brands fa-instagram"></i></a><a class="social-link" href="#"><i class="fa-brands fa-linkedin-in"></i></a></div>',
      "</div>",
      '<div class="col-sm-6 col-lg-2"><h6 class="mb-3">Store</h6><div class="d-grid gap-2"><a href="shop.html">Shop Parts</a><a href="product.html?id=1">Featured Product</a><a href="cart.html">Cart</a><a href="checkout.html">Checkout</a></div></div>',
      '<div class="col-sm-6 col-lg-3"><h6 class="mb-3">Support</h6><div class="d-grid gap-2"><a href="about.html">About Us</a><a href="contact.html">Contact</a><a href="login.html">Account Access</a><a href="../admin/dashboard.html">Admin Demo</a></div></div>',
      '<div class="col-lg-3"><h6 class="mb-3">Contact</h6><div class="d-grid gap-2"><span><i class="fa-solid fa-location-dot me-2"></i>Main Shahrah-e-Faisal, Karachi</span><span><i class="fa-solid fa-envelope me-2"></i>support@drivexspares.com</span><span><i class="fa-solid fa-phone me-2"></i>+92 300 4445500</span></div></div>',
      "</div>",
      '<div class="border-top border-light border-opacity-10 mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between gap-2">',
      "<span>© 2026 DriveX Spares. Static UI demo built with HTML, CSS, Bootstrap 5, and jQuery.</span>",
      "<span>Designed for responsive storefront and admin workflows.</span>",
      "</div>",
      "</div>",
      "</footer>"
    ].join("");
  }

  function buildProductCard(product) {
    return [
      '<div class="col-md-6 col-xl-4 reveal-up">',
      '<div class="product-card">',
      '<div class="product-media">',
      '<span class="product-badge">' + product.badge + "</span>",
      '<a href="product.html?id=' + product.id + '"><img src="' + asset(product.image) + '" alt="' + product.name + '"></a>',
      "</div>",
      '<div class="card-body">',
      '<div class="product-meta mb-2"><span class="text-uppercase">' + product.brand + "</span><span>•</span><span>" + product.category + "</span></div>",
      '<h3 class="card-title"><a class="text-dark" href="product.html?id=' + product.id + '">' + product.name + "</a></h3>",
      '<p class="text-muted-soft mb-3">' + product.shortDescription + "</p>",
      '<div class="d-flex align-items-center justify-content-between mb-3">',
      '<div class="rating-stars small">' + renderStars(product.rating) + ' <span class="text-muted-soft ms-1">(' + product.reviews + ")</span></div>",
      '<span class="discount-pill">' + getDiscount(product) + "% Off</span>",
      "</div>",
      '<div class="price-row mb-3"><span class="current">' + formatCurrency(product.price) + '</span><span class="old">' + formatCurrency(product.oldPrice) + "</span></div>",
      '<div class="d-flex gap-2"><a href="product.html?id=' + product.id + '" class="btn btn-outline-dark flex-grow-1 rounded-pill">View Details</a><button class="btn btn-danger rounded-pill px-4 add-to-cart-btn" data-product-id="' + product.id + '"><i class="fa-solid fa-cart-plus"></i></button></div>',
      "</div>",
      "</div>",
      "</div>"
    ].join("");
  }

  function injectChrome() {
    $("#siteHeader").html(headerTemplate());
    $("#siteFooter").html(footerTemplate());
    updateCartCount();
  }

  function initReveal() {
    $(".reveal-up").each(function (index, element) {
      window.setTimeout(function () {
        $(element).addClass("visible");
      }, index * 90 + 80);
    });
  }

  function initHome() {
    if (currentPage !== "home") {
      return;
    }
    $("#categoryGrid").html(
      data.categories
        .map(function (category) {
          return [
            '<div class="col-md-6 col-xl-4 reveal-up">',
            '<a href="shop.html?category=' + category.id + '" class="category-card d-block text-dark">',
            '<div class="category-icon mb-3"><i class="fa-solid ' + category.icon + '"></i></div>',
            "<h5>" + category.label + "</h5>",
            '<p class="text-muted-soft mb-0">' + category.description + "</p>",
            "</a>",
            "</div>"
          ].join("");
        })
        .join("")
    );
    $("#featuredGrid").html(data.products.slice(0, 6).map(buildProductCard).join(""));
    $("#brandGrid").html(
      data.brands
        .map(function (brand) {
          return '<div class="col-6 col-md-3 reveal-up"><div class="brand-tile">' + brand + "</div></div>";
        })
        .join("")
    );
    $("#testimonialGrid").html(
      data.testimonials
        .map(function (item) {
          return [
            '<div class="col-md-6 col-xl-4 reveal-up">',
            '<div class="testimonial-card">',
            '<div class="avatar-row mb-3"><img src="' + asset(item.avatar) + '" alt="' + item.name + '"><div><h6 class="mb-0">' + item.name + '</h6><small class="text-muted-soft">' + item.role + "</small></div></div>",
            '<p class="mb-0 text-muted-soft">"' + item.quote + '"</p>',
            "</div>",
            "</div>"
          ].join("");
        })
        .join("")
    );
    initReveal();
  }

  function getFilteredProducts() {
    const params = new URLSearchParams(window.location.search);
    const categoryFilter = $("#categoryFilter").val() || params.get("category") || "";
    const brandFilter = $("#brandFilter").val() || "";
    const priceFilter = Number($("#priceFilter").val() || 9999);
    const sortValue = $("#sortFilter").val() || "featured";

    let filtered = data.products.filter(function (product) {
      const categoryMatch = !categoryFilter || product.category === categoryFilter;
      const brandMatch = !brandFilter || product.brand === brandFilter;
      const priceMatch = product.price <= priceFilter;
      return categoryMatch && brandMatch && priceMatch;
    });

    if (sortValue === "price-low") {
      filtered = filtered.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (sortValue === "price-high") {
      filtered = filtered.sort(function (a, b) {
        return b.price - a.price;
      });
    } else if (sortValue === "rating") {
      filtered = filtered.sort(function (a, b) {
        return b.rating - a.rating;
      });
    }

    return filtered;
  }

  function renderShopGrid() {
    const products = getFilteredProducts();
    const start = (pageState.shopPage - 1) * pageState.perPage;
    const paged = products.slice(start, start + pageState.perPage);
    $("#shopResultCount").text(products.length + " parts found");

    if (!products.length) {
      $("#shopGrid").html('<div class="col-12"><div class="empty-state"><h4>No parts match these filters</h4><p class="text-muted-soft mb-0">Try another category, brand, or price range.</p></div></div>');
      $("#shopPagination").empty();
      return;
    }

    $("#shopGrid").html(paged.map(buildProductCard).join(""));
    const totalPages = Math.ceil(products.length / pageState.perPage);
    const pagination = [];
    for (let page = 1; page <= totalPages; page += 1) {
      pagination.push(
        '<li class="page-item ' + (page === pageState.shopPage ? "active" : "") + '"><a class="page-link shop-page-link" href="#" data-page="' + page + '">' + page + "</a></li>"
      );
    }
    $("#shopPagination").html(pagination.join(""));
    initReveal();
  }

  function initShop() {
    if (currentPage !== "shop") {
      return;
    }
    const categoryOptions = ['<option value="">All Categories</option>']
      .concat(
        data.categories.map(function (category) {
          return '<option value="' + category.id + '">' + category.label + "</option>";
        })
      )
      .join("");
    const brandOptions = ['<option value="">All Brands</option>']
      .concat(
        data.brands.map(function (brand) {
          return '<option value="' + brand + '">' + brand + "</option>";
        })
      )
      .join("");
    $("#categoryFilter").html(categoryOptions);
    $("#brandFilter").html(brandOptions);
    const params = new URLSearchParams(window.location.search);
    if (params.get("category")) {
      $("#categoryFilter").val(params.get("category"));
    }
    renderShopGrid();
  }

  function initProductPage() {
    if (currentPage !== "product") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id") || 1);
    const product = findProduct(productId) || data.products[0];
    const related = data.products.filter(function (item) {
      return item.category === product.category && item.id !== product.id;
    }).slice(0, 3);

    $("#productTitle").text(product.name);
    $("#productBreadcrumb").text(product.name);
    $("#productBrand").text(product.brand);
    $("#productDescription").text(product.description);
    $("#productPrice").text(formatCurrency(product.price));
    $("#productOldPrice").text(formatCurrency(product.oldPrice));
    $("#productDiscount").text(getDiscount(product) + "% Discount");
    $("#productRating").html(renderStars(product.rating) + ' <span class="text-muted-soft ms-2">' + product.rating + " / 5</span>");
    $("#productSku").text(product.sku);
    $("#productBadge").text(product.badge);
    $("#productAddToCart").attr("data-product-id", product.id);
    $("#galleryMain").html('<img src="' + asset(product.image) + '" alt="' + product.name + '">');
    $("#galleryThumbs").html(
      [1, 2, 3]
        .map(function (itemIndex) {
          return '<button type="button" class="thumb-item ' + (itemIndex === 1 ? "active" : "") + '" data-image="' + asset(product.image) + '"><img src="' + asset(product.image) + '" alt="' + product.name + " thumbnail\"></button>";
        })
        .join("")
    );
    $("#specList").html(
      Object.keys(product.specifications)
        .map(function (key) {
          return '<div class="spec-item"><small class="text-muted-soft d-block mb-1">' + key + '</small><strong>' + product.specifications[key] + "</strong></div>";
        })
        .join("")
    );
    $("#relatedGrid").html(related.map(buildProductCard).join(""));
    initReveal();
  }

  function renderCartPage() {
    const detailedCart = getCartDetailed();
    if (!$("#cartItems").length) {
      return;
    }
    if (!detailedCart.length) {
      $("#cartItems").html('<div class="empty-state"><h4>Your cart is empty</h4><p class="text-muted-soft mb-3">Browse the spare parts catalog and add items to continue.</p><a href="shop.html" class="btn btn-danger rounded-pill px-4">Start Shopping</a></div>');
      $("#cartSummary").html("");
      return;
    }
    $("#cartItems").html(
      detailedCart
        .map(function (item) {
          return [
            '<div class="cart-line" data-product-id="' + item.product.id + '">',
            '<img src="' + asset(item.product.image) + '" alt="' + item.product.name + '">',
            "<div>",
            '<h5 class="mb-1">' + item.product.name + "</h5>",
            '<p class="text-muted-soft mb-1">' + item.product.brand + " • " + item.product.sku + "</p>",
            '<button class="btn btn-link text-danger p-0 remove-cart-item">Remove</button>',
            "</div>",
            '<div><strong>' + formatCurrency(item.product.price) + "</strong></div>",
            '<div><div class="qty-control"><button type="button" class="cart-qty-btn" data-action="decrease">-</button><input type="number" class="cart-qty-input" min="1" value="' + item.quantity + '"><button type="button" class="cart-qty-btn" data-action="increase">+</button></div></div>',
            '<div class="text-end"><strong>' + formatCurrency(item.total) + "</strong></div>",
            "</div>"
          ].join("");
        })
        .join("")
    );
    $("#cartSummary").html(
      [
        '<div class="summary-card">',
        "<h5 class=\"mb-4\">Order Summary</h5>",
        '<div class="summary-line"><span>Subtotal</span><strong>' + formatCurrency(cartSubtotal()) + "</strong></div>",
        '<div class="summary-line"><span>Shipping</span><strong>' + (shippingCost() === 0 ? "Free" : formatCurrency(shippingCost())) + "</strong></div>",
        '<div class="summary-line"><span>Tax</span><strong>' + formatCurrency(taxAmount()) + "</strong></div>",
        '<hr><div class="summary-line summary-total"><span>Total</span><strong>' + formatCurrency(grandTotal()) + "</strong></div>",
        '<a href="checkout.html" class="btn btn-danger w-100 rounded-pill mt-4">Proceed to Checkout</a>',
        "</div>"
      ].join("")
    );
  }

  function initCheckout() {
    if (currentPage !== "checkout") {
      return;
    }
    $("#checkoutSummary").html(
      [
        '<div class="summary-card">',
        '<h5 class="mb-4">Order Snapshot</h5>',
        getCartDetailed()
          .map(function (item) {
            return '<div class="summary-line"><span>' + item.product.name + " x " + item.quantity + '</span><strong>' + formatCurrency(item.total) + "</strong></div>";
          })
          .join(""),
        "<hr>",
        '<div class="summary-line"><span>Delivery</span><strong>' + (shippingCost() === 0 ? "Free" : formatCurrency(shippingCost())) + "</strong></div>",
        '<div class="summary-line"><span>Tax</span><strong>' + formatCurrency(taxAmount()) + "</strong></div>",
        '<div class="summary-line summary-total mt-3"><span>Grand Total</span><strong>' + formatCurrency(grandTotal()) + "</strong></div>",
        "</div>"
      ].join("")
    );
  }

  function validateForm($form) {
    let valid = true;
    $form.find("[required]").each(function () {
      const field = $(this);
      const value = $.trim(field.val());
      let fieldValid = value.length > 0;
      if (field.attr("type") === "email") {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      if (field.attr("type") === "checkbox") {
        fieldValid = field.is(":checked");
      }
      field.toggleClass("is-invalid", !fieldValid);
      if (!fieldValid) {
        valid = false;
      }
    });
    return valid;
  }

  function bindGlobalEvents() {
    $(document).on("click", ".add-to-cart-btn", function () {
      addToCart(Number($(this).data("product-id")), 1);
    });

    $(document).on("click", "#productAddToCart", function () {
      const productId = Number($(this).data("product-id"));
      const quantity = Number($("#productQty").val() || 1);
      addToCart(productId, Math.max(1, quantity));
    });

    $(document).on("click", ".qty-step", function () {
      const input = $($(this).data("target"));
      const current = Number(input.val() || 1);
      input.val(Math.max(1, current + Number($(this).data("delta"))));
    });

    $(document).on("click", ".thumb-item", function () {
      $(".thumb-item").removeClass("active");
      $(this).addClass("active");
      $("#galleryMain").html('<img src="' + $(this).data("image") + '" alt="Product image">');
    });

    $(document).on("change keyup", "#categoryFilter, #brandFilter, #priceFilter, #sortFilter", function () {
      pageState.shopPage = 1;
      renderShopGrid();
    });

    $(document).on("click", ".shop-page-link", function (event) {
      event.preventDefault();
      pageState.shopPage = Number($(this).data("page"));
      renderShopGrid();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    $(document).on("click", ".cart-qty-btn", function () {
      const line = $(this).closest(".cart-line");
      const input = line.find(".cart-qty-input");
      const delta = $(this).data("action") === "increase" ? 1 : -1;
      input.val(Math.max(1, Number(input.val() || 1) + delta)).trigger("change");
    });

    $(document).on("change", ".cart-qty-input", function () {
      const line = $(this).closest(".cart-line");
      updateCartItem(Number(line.data("product-id")), Number($(this).val() || 1));
      renderCartPage();
    });

    $(document).on("click", ".remove-cart-item", function () {
      const line = $(this).closest(".cart-line");
      removeCartItem(Number(line.data("product-id")));
      renderCartPage();
    });

    $(".needs-validation-js").on("submit", function (event) {
      event.preventDefault();
      const form = $(this);
      if (validateForm(form)) {
        form.find(".form-feedback").html('<div class="alert alert-success border-0 rounded-4 mt-3 mb-0">Form validated successfully. This is a UI-only demo.</div>');
        if (form.attr("id") === "checkoutForm") {
          showToast("Checkout form is ready. UI submission only.");
        }
      } else {
        form.find(".form-feedback").html('<div class="alert alert-danger border-0 rounded-4 mt-3 mb-0">Please complete all required fields correctly.</div>');
      }
    });

    $(".payment-option").on("click", function () {
      $(".payment-option").removeClass("active");
      $(this).addClass("active");
      $(this).find('input[type="radio"]').prop("checked", true);
    });
  }

  $(function () {
    injectChrome();
    initHome();
    initShop();
    initProductPage();
    renderCartPage();
    initCheckout();
    bindGlobalEvents();
  });
})(jQuery);
