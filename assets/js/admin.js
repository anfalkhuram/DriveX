(function ($) {
  const data = window.SparesData || {};
  const assetBase = "../assets/images/";
  const body = $("body");
  const currentPage = body.data("admin-page") || "";
  const state = {
    products: (data.products || []).map(function (item) {
      return $.extend(true, {}, item);
    }),
    categories: (data.categories || []).map(function (item) {
      return $.extend(true, {}, item);
    }),
    orders: (data.orders || []).map(function (item) {
      return $.extend(true, {}, item);
    }),
    reviews: (data.reviews || []).map(function (item) {
      return $.extend(true, {}, item);
    })
  };

  function asset(name) {
    return assetBase + name;
  }

  function formatCurrency(value) {
    return "$" + Number(value).toFixed(2);
  }

  function statusClass(status) {
    return "status-" + status.toLowerCase().replace(/\s+/g, "-");
  }

  function productById(productId) {
    return state.products.find(function (item) {
      return item.id === productId;
    });
  }

  function injectAdminChrome() {
    const menu = [
      { key: "orders", label: "Orders", icon: "fa-box-open", href: "orders.html" },
      { key: "customers", label: "Customers", icon: "fa-users", href: "customers.html" },
      { key: "settings", label: "Settings", icon: "fa-gear", href: "settings.html" }
    ];
    $("#adminSidebar").html(
      [
        '<aside class="admin-sidebar">',
        '<div class="brand-row d-flex align-items-center gap-3">',
        '<img src="' + asset("logo-mark.svg") + '" alt="DriveX" class="brand-mark">',
        '<div class="brand-copy"><div class="fw-bold text-white fs-5">DriveX Admin</div><small>Spare parts control room</small></div>',
        "</div>",
        '<div class="sidebar-nav">',
        '<a class="sidebar-link ' + (currentPage === "dashboard" ? "active" : "") + '" href="dashboard.html"><span><i class="fa-solid fa-gauge-high"></i><span class="menu-text">Dashboard</span></span></a>',
        '<button type="button" class="sidebar-toggle-link border-0 bg-transparent ' + (["products", "categories", "reviews"].indexOf(currentPage) > -1 ? "active" : "") + '" id="catalogToggle"><span><i class="fa-solid fa-boxes-stacked"></i><span class="menu-text">Catalog</span></span><i class="fa-solid fa-chevron-down chevron"></i></button>',
        '<div class="submenu" id="catalogSubmenu">',
        '<a class="sidebar-link ' + (currentPage === "products" ? "active" : "") + '" href="products.html"><span><i class="fa-solid fa-screwdriver-wrench"></i><span class="menu-text">Products</span></span></a>',
        '<a class="sidebar-link ' + (currentPage === "categories" ? "active" : "") + '" href="categories.html"><span><i class="fa-solid fa-tags"></i><span class="menu-text">Categories</span></span></a>',
        '<a class="sidebar-link ' + (currentPage === "reviews" ? "active" : "") + '" href="reviews.html"><span><i class="fa-solid fa-star-half-stroke"></i><span class="menu-text">Reviews</span></span></a>',
        "</div>",
        menu
          .map(function (item) {
            return '<a class="sidebar-link ' + (currentPage === item.key ? "active" : "") + '" href="' + item.href + '"><span><i class="fa-solid ' + item.icon + '"></i><span class="menu-text">' + item.label + "</span></span></a>";
          })
          .join(""),
        "</div>",
        "</aside>"
      ].join("")
    );
    $("#adminTopbar").html(
      [
        '<div class="admin-topbar">',
        '<div class="topbar-inner d-flex flex-wrap gap-3 justify-content-between align-items-center">',
        '<div class="d-flex align-items-center gap-3">',
        '<button class="btn btn-light rounded-circle shadow-sm" id="sidebarToggle"><i class="fa-solid fa-bars"></i></button>',
        '<div><div class="fw-semibold display-font">DriveX Spares Admin</div><small class="text-muted">Monitor products, orders, customers, and reviews.</small></div>',
        "</div>",
        '<div class="d-flex align-items-center gap-3">',
        '<div class="topbar-search d-none d-md-block"><i class="fa-solid fa-magnifying-glass"></i><input type="search" class="form-control" placeholder="Search orders, customers, products"></div>',
        '<button class="btn btn-light position-relative rounded-circle shadow-sm"><i class="fa-regular fa-bell"></i><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span></button>',
        '<div class="d-flex align-items-center gap-2"><span class="admin-avatar">DX</span><div class="d-none d-sm-block"><div class="fw-semibold">Admin User</div><small class="text-muted">Store Manager</small></div></div>',
        "</div>",
        "</div>",
        "</div>"
      ].join("")
    );
    if (["products", "categories", "reviews"].indexOf(currentPage) > -1) {
      $("#catalogSubmenu").show();
    }
  }

  function renderDashboard() {
    if (currentPage !== "dashboard") {
      return;
    }
    const revenue = state.orders.reduce(function (sum, order) {
      return sum + order.total;
    }, 0);
    $("#dashboardStats").html(
      [
        { title: "Total Products", value: state.products.length, icon: "fa-screwdriver-wrench", trend: "+8.2%" },
        { title: "Orders", value: state.orders.length, icon: "fa-box-open", trend: "+4.7%" },
        { title: "Customers", value: data.customers.length, icon: "fa-users", trend: "+6.4%" },
        { title: "Revenue", value: formatCurrency(revenue), icon: "fa-sack-dollar", trend: "+12.8%" }
      ]
        .map(function (item) {
          return [
            '<div class="col-md-6 col-xl-3">',
            '<div class="admin-card stat-card">',
            '<div class="d-flex justify-content-between align-items-start mb-4"><div class="stat-icon"><i class="fa-solid ' + item.icon + '"></i></div><span class="mini-trend"><i class="fa-solid fa-arrow-trend-up"></i>' + item.trend + "</span></div>",
            '<div class="text-muted mb-2">' + item.title + "</div>",
            '<div class="stat-value">' + item.value + "</div>",
            "</div>",
            "</div>"
          ].join("");
        })
        .join("")
    );
    $("#dashboardBars").html(
      [52, 65, 48, 74, 68, 88, 79]
        .map(function (value) {
          return '<div class="d-flex flex-column align-items-center gap-2"><div class="bar w-100" style="height:' + value + '%;"></div><small class="text-muted">' + value + "k</small></div>";
        })
        .join("")
    );
    $("#dashboardRecentOrders").html(
      state.orders
        .map(function (order) {
          return '<tr><td><a class="fw-semibold text-dark" href="order-details.html?id=' + order.id + '">' + order.id + '</a></td><td>' + order.customer + '</td><td><span class="status-badge ' + statusClass(order.status) + '">' + order.status + '</span></td><td>' + formatCurrency(order.total) + "</td></tr>";
        })
        .join("")
    );
  }

  function renderProductsTable() {
    if (currentPage !== "products") {
      return;
    }
    const search = ($("#productSearch").val() || "").toLowerCase();
    const status = $("#productStatusFilter").val() || "";
    const rows = state.products.filter(function (item) {
      const matchSearch = !search || [item.name, item.brand, item.sku].join(" ").toLowerCase().indexOf(search) > -1;
      const matchStatus = !status || item.status === status;
      return matchSearch && matchStatus;
    });
    $("#productsTableBody").html(
      rows
        .map(function (item) {
          return [
            "<tr>",
            '<td><div class="product-mini"><img src="' + asset(item.image) + '" alt="' + item.name + '"><div><div class="fw-semibold">' + item.name + '</div><small class="text-muted">' + item.sku + "</small></div></div></td>",
            "<td>" + item.brand + "</td>",
            "<td>" + formatCurrency(item.price) + "</td>",
            "<td>" + item.stock + "</td>",
            '<td><span class="status-badge ' + statusClass(item.status) + '">' + item.status + "</span></td>",
            '<td class="text-end"><button class="btn btn-light table-action me-1 edit-product" data-id="' + item.id + '"><i class="fa-regular fa-pen-to-square"></i></button><button class="btn btn-light table-action delete-product" data-id="' + item.id + '"><i class="fa-regular fa-trash-can text-danger"></i></button></td>',
            "</tr>"
          ].join("");
        })
        .join("")
    );
  }

  function renderCategoriesTable() {
    if (currentPage !== "categories") {
      return;
    }
    $("#categoriesTableBody").html(
      state.categories
        .map(function (category, index) {
          return "<tr><td>" + (index + 1) + '</td><td><div class="fw-semibold">' + category.label + '</div><small class="text-muted">' + category.id + "</small></td><td>" + category.description + '</td><td class="text-end"><button class="btn btn-light table-action me-1 edit-category" data-id="' + category.id + '"><i class="fa-regular fa-pen-to-square"></i></button><button class="btn btn-light table-action delete-category" data-id="' + category.id + '"><i class="fa-regular fa-trash-can text-danger"></i></button></td></tr>';
        })
        .join("")
    );
  }

  function renderOrdersTable() {
    if (currentPage !== "orders") {
      return;
    }
    const search = ($("#orderSearch").val() || "").toLowerCase();
    const status = $("#orderStatusFilter").val() || "";
    const rows = state.orders.filter(function (order) {
      const matchSearch = !search || [order.id, order.customer, order.payment].join(" ").toLowerCase().indexOf(search) > -1;
      const matchStatus = !status || order.status === status;
      return matchSearch && matchStatus;
    });
    $("#ordersTableBody").html(
      rows
        .map(function (order) {
          return "<tr><td><a class=\"fw-semibold text-dark\" href=\"order-details.html?id=" + order.id + "\">" + order.id + "</a></td><td>" + order.customer + "</td><td>" + order.date + '</td><td><span class="status-badge ' + statusClass(order.status) + '">' + order.status + "</span></td><td>" + formatCurrency(order.total) + '</td><td><select class="form-select form-select-sm order-status-select" data-id="' + order.id + '"><option' + (order.status === "Pending" ? " selected" : "") + '>Pending</option><option' + (order.status === "Processing" ? " selected" : "") + '>Processing</option><option' + (order.status === "Shipped" ? " selected" : "") + '>Shipped</option></select></td></tr>';
        })
        .join("")
    );
  }

  function renderCustomersTable() {
    if (currentPage !== "customers") {
      return;
    }
    const search = ($("#customerSearch").val() || "").toLowerCase();
    const rows = data.customers.filter(function (customer) {
      return !search || [customer.name, customer.email, customer.id].join(" ").toLowerCase().indexOf(search) > -1;
    });
    $("#customersTableBody").html(
      rows
        .map(function (customer) {
          return '<tr><td><div class="product-mini"><img class="customer-avatar" src="' + asset("avatar-1.svg") + '" alt="' + customer.name + '"><div><div class="fw-semibold">' + customer.name + '</div><small class="text-muted">' + customer.id + "</small></div></div></td><td>" + customer.email + "</td><td>" + customer.phone + "</td><td>" + customer.orders + "</td><td>" + formatCurrency(customer.spent) + '</td><td><span class="status-badge status-active">' + customer.status + "</span></td></tr>";
        })
        .join("")
    );
  }

  function renderReviewsTable() {
    if (currentPage !== "reviews") {
      return;
    }
    const status = $("#reviewStatusFilter").val() || "";
    const search = ($("#reviewSearch").val() || "").toLowerCase();
    const rows = state.reviews.filter(function (review) {
      const product = productById(review.productId);
      const haystack = [review.id, review.author, review.comment, product ? product.name : ""].join(" ").toLowerCase();
      const matchSearch = !search || haystack.indexOf(search) > -1;
      const matchStatus = !status || review.status === status;
      return matchSearch && matchStatus;
    });
    $("#reviewsTableBody").html(
      rows
        .map(function (review) {
          const product = productById(review.productId);
          return "<tr><td>" + review.id + '</td><td><div class="product-mini"><img class="review-thumb" src="' + asset(product.image) + '" alt="' + product.name + '"><div><div class="fw-semibold">' + product.name + "</div><small class=\"text-muted\">" + review.author + "</small></div></div></td><td>" + review.comment + '</td><td>' + "★".repeat(review.rating) + '</td><td><span class="status-badge ' + statusClass(review.status) + '">' + review.status + '</span></td><td class="text-end"><button class="btn btn-success btn-sm review-action" data-status="Approved" data-id="' + review.id + '">Approve</button> <button class="btn btn-outline-danger btn-sm review-action" data-status="Rejected" data-id="' + review.id + '">Reject</button></td></tr>';
        })
        .join("")
    );
  }

  function renderSettingsForm() {
    if (currentPage !== "settings") {
      return;
    }
    $("#storeName").val(data.settings.storeName);
    $("#storeEmail").val(data.settings.email);
    $("#storePhone").val(data.settings.phone);
    $("#storeAddress").val(data.settings.address);
    $("#storeCurrency").val(data.settings.currency);
    $("#orderPrefix").val(data.settings.orderPrefix);
  }

  function renderOrderDetails() {
    if (currentPage !== "order-details") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("id") || state.orders[0].id;
    const order = state.orders.find(function (item) {
      return item.id === orderId;
    }) || state.orders[0];
    $("#orderTitle").text(order.id);
    $("#orderMeta").html('<span class="status-badge ' + statusClass(order.status) + '">' + order.status + "</span> <span class=\"ms-2 text-muted\">" + order.date + "</span>");
    $("#orderInfo").html(
      [
        { label: "Customer", value: order.customer },
        { label: "Payment", value: order.payment },
        { label: "Shipping", value: order.shipping },
        { label: "Order Total", value: formatCurrency(order.total) }
      ]
        .map(function (item) {
          return '<div class="detail-row"><span class="text-muted">' + item.label + "</span><strong>" + item.value + "</strong></div>";
        })
        .join("")
    );
    $("#orderItems").html(
      order.items
        .map(function (line) {
          const product = productById(line.productId);
          return '<div class="detail-row"><span>' + product.name + " x " + line.quantity + "</span><strong>" + formatCurrency(product.price * line.quantity) + "</strong></div>";
        })
        .join("")
    );
    $("#detailStatus").val(order.status);
  }

  function bindAdminEvents() {
    $(document).on("click", "#sidebarToggle", function () {
      if (window.innerWidth < 992) {
        body.toggleClass("sidebar-open");
      } else {
        body.toggleClass("sidebar-collapsed");
      }
    });

    $(document).on("click", "#catalogToggle", function () {
      $("#catalogSubmenu").slideToggle(180);
      $(this).toggleClass("active");
    });

    $("#productSearch, #productStatusFilter").on("keyup change", renderProductsTable);
    $("#orderSearch, #orderStatusFilter").on("keyup change", renderOrdersTable);
    $("#customerSearch").on("keyup", renderCustomersTable);
    $("#reviewSearch, #reviewStatusFilter").on("keyup change", renderReviewsTable);

    $(document).on("click", ".edit-product", function () {
      const id = Number($(this).data("id"));
      const product = productById(id);
      $("#productModalLabel").text("Edit Product");
      $("#productId").val(product.id);
      $("#productName").val(product.name);
      $("#productBrand").val(product.brand);
      $("#productCategory").val(product.category);
      $("#productPrice").val(product.price);
      $("#productStock").val(product.stock);
      $("#productStatus").val(product.status);
      bootstrap.Modal.getOrCreateInstance(document.getElementById("productModal")).show();
    });

    $(document).on("click", "#openAddProductModal", function () {
      $("#productModalLabel").text("Add Product");
      $("#productForm")[0].reset();
      $("#productId").val("");
    });

    $(document).on("submit", "#productForm", function (event) {
      event.preventDefault();
      const id = Number($("#productId").val());
      const payload = {
        id: id || state.products.length + 1,
        name: $("#productName").val(),
        brand: $("#productBrand").val(),
        category: $("#productCategory").val(),
        price: Number($("#productPrice").val()),
        oldPrice: Number($("#productPrice").val()) + 25,
        stock: Number($("#productStock").val()),
        status: $("#productStatus").val(),
        rating: 4.6,
        reviews: 0,
        image: "product-accessory.svg",
        sku: "NEW-" + String(Date.now()).slice(-5),
        badge: "Draft",
        shortDescription: "New static demo product.",
        description: "Created from the admin modal in this UI-only demo.",
        specifications: {
          Category: $("#productCategory").val(),
          Brand: $("#productBrand").val(),
          Warranty: "12 months",
          Status: $("#productStatus").val()
        }
      };
      const existingIndex = state.products.findIndex(function (item) {
        return item.id === payload.id;
      });
      if (existingIndex > -1) {
        state.products[existingIndex] = payload;
      } else {
        state.products.unshift(payload);
      }
      renderProductsTable();
      bootstrap.Modal.getOrCreateInstance(document.getElementById("productModal")).hide();
    });

    $(document).on("click", ".delete-product", function () {
      const id = Number($(this).data("id"));
      state.products = state.products.filter(function (item) {
        return item.id !== id;
      });
      renderProductsTable();
    });

    $(document).on("click", ".edit-category", function () {
      const id = $(this).data("id");
      const category = state.categories.find(function (item) {
        return item.id === id;
      });
      $("#categoryId").val(category.id);
      $("#categoryName").val(category.label);
      $("#categoryDescription").val(category.description);
      bootstrap.Modal.getOrCreateInstance(document.getElementById("categoryModal")).show();
    });

    $(document).on("click", "#openAddCategoryModal", function () {
      $("#categoryForm")[0].reset();
      $("#categoryId").val("");
    });

    $(document).on("submit", "#categoryForm", function (event) {
      event.preventDefault();
      const existingId = $("#categoryId").val();
      const payload = {
        id: existingId || $("#categoryName").val().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        label: $("#categoryName").val(),
        icon: "fa-toolbox",
        description: $("#categoryDescription").val()
      };
      const existingIndex = state.categories.findIndex(function (item) {
        return item.id === existingId;
      });
      if (existingIndex > -1) {
        state.categories[existingIndex] = payload;
      } else {
        state.categories.unshift(payload);
      }
      renderCategoriesTable();
      bootstrap.Modal.getOrCreateInstance(document.getElementById("categoryModal")).hide();
    });

    $(document).on("click", ".delete-category", function () {
      const id = $(this).data("id");
      state.categories = state.categories.filter(function (item) {
        return item.id !== id;
      });
      renderCategoriesTable();
    });

    $(document).on("change", ".order-status-select", function () {
      const id = $(this).data("id");
      const order = state.orders.find(function (item) {
        return item.id === id;
      });
      if (order) {
        order.status = $(this).val();
        renderOrdersTable();
      }
    });

    $(document).on("change", "#detailStatus", function () {
      const params = new URLSearchParams(window.location.search);
      const order = state.orders.find(function (item) {
        return item.id === params.get("id");
      });
      if (order) {
        order.status = $(this).val();
        renderOrderDetails();
      }
    });

    $(document).on("click", ".review-action", function () {
      const id = $(this).data("id");
      const status = $(this).data("status");
      const review = state.reviews.find(function (item) {
        return item.id === id;
      });
      if (review) {
        review.status = status;
        renderReviewsTable();
      }
    });

    $("#settingsForm").on("submit", function (event) {
      event.preventDefault();
      $("#settingsFeedback").html('<div class="alert alert-success rounded-4 border-0 mt-3 mb-0">Settings saved in the demo UI.</div>');
    });
  }

  $(function () {
    injectAdminChrome();
    renderDashboard();
    renderProductsTable();
    renderCategoriesTable();
    renderOrdersTable();
    renderCustomersTable();
    renderReviewsTable();
    renderSettingsForm();
    renderOrderDetails();
    bindAdminEvents();
  });
})(jQuery);
