window.SparesData = {
  categories: [
    { id: "engine", label: "Engine Parts", icon: "fa-gears", description: "Filters, plugs, belts, and performance components." },
    { id: "brakes", label: "Brakes", icon: "fa-circle-stop", description: "Brake pads, discs, calipers, and fluid systems." },
    { id: "tires", label: "Tires", icon: "fa-circle-notch", description: "Road, off-road, and all-season tire solutions." },
    { id: "oils", label: "Oils & Fluids", icon: "fa-oil-can", description: "Synthetic oils, coolants, and maintenance essentials." },
    { id: "accessories", label: "Accessories", icon: "fa-toolbox", description: "Lighting, boosters, cabin upgrades, and add-ons." }
  ],
  brands: ["Bosca", "Ferodo", "RoadX", "Motex", "VoltEdge", "Luma"],
  products: [
    {
      id: 1,
      name: "Turbo Air Filter Kit",
      category: "engine",
      brand: "Bosca",
      price: 145,
      oldPrice: 179,
      stock: 18,
      status: "Active",
      rating: 4.8,
      reviews: 118,
      image: "product-engine.svg",
      sku: "ENG-4012",
      badge: "Best Seller",
      shortDescription: "High-flow filter kit for cleaner intake and better throttle response.",
      description: "Built for daily drivers and tuned builds, this turbo air filter kit improves airflow efficiency while protecting internal engine components from dust and debris.",
      specifications: {
        Material: "Dual-layer cotton mesh",
        Fitment: "Universal 76mm intake",
        Warranty: "12 months",
        Weight: "1.6 kg"
      }
    },
    {
      id: 2,
      name: "Carbon Ceramic Brake Set",
      category: "brakes",
      brand: "Ferodo",
      price: 220,
      oldPrice: 269,
      stock: 11,
      status: "Active",
      rating: 4.9,
      reviews: 86,
      image: "product-brake.svg",
      sku: "BRK-2088",
      badge: "Hot Deal",
      shortDescription: "Low-dust, high-grip brake kit with stable stopping power.",
      description: "This premium carbon ceramic brake set delivers smooth braking, strong heat resistance, and better control across city and highway driving conditions.",
      specifications: {
        Material: "Carbon ceramic composite",
        Fitment: "Sedan / Crossover",
        Warranty: "18 months",
        Weight: "3.1 kg"
      }
    },
    {
      id: 3,
      name: "All-Terrain Tire 18 Inch",
      category: "tires",
      brand: "RoadX",
      price: 185,
      oldPrice: 215,
      stock: 24,
      status: "Active",
      rating: 4.7,
      reviews: 64,
      image: "product-tire.svg",
      sku: "TIR-8831",
      badge: "Top Rated",
      shortDescription: "Durable all-terrain tire for balanced grip and mileage.",
      description: "Designed for drivers who move between asphalt and rough roads, this all-terrain tire offers dependable traction, reduced noise, and steady handling.",
      specifications: {
        Compound: "All-terrain silica blend",
        Size: "255/55R18",
        Warranty: "24 months",
        Weight: "14.9 kg"
      }
    },
    {
      id: 4,
      name: "Synthetic Engine Oil 5W-30",
      category: "oils",
      brand: "Motex",
      price: 42,
      oldPrice: 55,
      stock: 57,
      status: "Active",
      rating: 4.6,
      reviews: 144,
      image: "product-oil.svg",
      sku: "OIL-1550",
      badge: "Value Pack",
      shortDescription: "Long-life synthetic oil for efficient engine protection.",
      description: "A workshop favorite for modern petrol engines, this 5W-30 synthetic oil helps reduce wear, improve cold starts, and maintain cleaner engine internals.",
      specifications: {
        Capacity: "4 liters",
        Grade: "5W-30",
        Standard: "API SN / ACEA C3",
        Warranty: "Sealed pack"
      }
    },
    {
      id: 5,
      name: "Smart Battery Booster",
      category: "accessories",
      brand: "VoltEdge",
      price: 118,
      oldPrice: 149,
      stock: 16,
      status: "Low Stock",
      rating: 4.7,
      reviews: 72,
      image: "product-battery.svg",
      sku: "ACC-9003",
      badge: "Garage Pick",
      shortDescription: "Portable jump starter with USB charging and LED torch.",
      description: "Compact enough for the glovebox, this battery booster helps restart drained batteries and doubles as an emergency power bank for roadside use.",
      specifications: {
        Capacity: "12000mAh",
        Output: "12V peak 600A",
        Warranty: "12 months",
        Weight: "0.9 kg"
      }
    },
    {
      id: 6,
      name: "LED Headlight Pair",
      category: "accessories",
      brand: "Luma",
      price: 96,
      oldPrice: 124,
      stock: 32,
      status: "Active",
      rating: 4.5,
      reviews: 91,
      image: "product-accessory.svg",
      sku: "ACC-5210",
      badge: "New Arrival",
      shortDescription: "Bright white beam kit with efficient cooling design.",
      description: "Upgrade visibility and styling with plug-and-play LED headlights engineered for brighter beam spread and longer service life.",
      specifications: {
        Brightness: "8000 lumens",
        Color: "6500K white",
        Warranty: "12 months",
        Weight: "0.7 kg"
      }
    },
    {
      id: 7,
      name: "Performance Spark Plug Pack",
      category: "engine",
      brand: "Bosca",
      price: 58,
      oldPrice: 72,
      stock: 41,
      status: "Active",
      rating: 4.8,
      reviews: 59,
      image: "product-engine.svg",
      sku: "ENG-1771",
      badge: "Workshop Favorite",
      shortDescription: "Iridium spark plugs for smoother ignition and mileage.",
      description: "These iridium spark plugs are made for reliable cold starts, crisp combustion, and better fuel economy under regular service intervals.",
      specifications: {
        Material: "Iridium tip",
        Fitment: "4-cylinder engines",
        Warranty: "6 months",
        Weight: "0.3 kg"
      }
    },
    {
      id: 8,
      name: "Premium Brake Fluid DOT 4",
      category: "brakes",
      brand: "Ferodo",
      price: 26,
      oldPrice: 34,
      stock: 63,
      status: "Active",
      rating: 4.4,
      reviews: 33,
      image: "product-brake.svg",
      sku: "BRK-4405",
      badge: "Maintenance",
      shortDescription: "High boiling point brake fluid for safer braking feel.",
      description: "Formulated for consistent brake pedal feel, this DOT 4 fluid resists vapor lock and helps maintain braking confidence during daily driving.",
      specifications: {
        Capacity: "500 ml",
        Standard: "DOT 4",
        Warranty: "Sealed pack",
        Weight: "0.6 kg"
      }
    }
  ],
  testimonials: [
    {
      name: "Adeel Khan",
      role: "Garage Owner",
      quote: "The layout feels premium and the catalog is incredibly easy to browse. Perfect fit for an auto parts storefront.",
      avatar: "avatar-1.svg"
    },
    {
      name: "Sara Malik",
      role: "Fleet Manager",
      quote: "Quick filters, clean product details, and a checkout flow that looks trustworthy even with dummy content.",
      avatar: "avatar-2.svg"
    },
    {
      name: "Usman Rauf",
      role: "Enthusiast Buyer",
      quote: "The admin panel is crisp and modern. It already feels like a dashboard a team could start using immediately.",
      avatar: "avatar-3.svg"
    }
  ],
  cart: [
    { productId: 1, quantity: 1 },
    { productId: 3, quantity: 2 },
    { productId: 6, quantity: 1 }
  ],
  orders: [
    {
      id: "ORD-1042",
      customer: "Adeel Khan",
      status: "Processing",
      total: 516,
      date: "2026-04-28",
      payment: "Card",
      shipping: "Express",
      items: [
        { productId: 2, quantity: 1 },
        { productId: 3, quantity: 1 },
        { productId: 6, quantity: 1 }
      ]
    },
    {
      id: "ORD-1043",
      customer: "Sara Malik",
      status: "Shipped",
      total: 332,
      date: "2026-04-29",
      payment: "COD",
      shipping: "Standard",
      items: [
        { productId: 1, quantity: 1 },
        { productId: 5, quantity: 1 }
      ]
    },
    {
      id: "ORD-1044",
      customer: "Usman Rauf",
      status: "Pending",
      total: 110,
      date: "2026-04-30",
      payment: "Bank Transfer",
      shipping: "Standard",
      items: [
        { productId: 4, quantity: 1 },
        { productId: 8, quantity: 2 }
      ]
    }
  ],
  customers: [
    { id: "CUS-3001", name: "Adeel Khan", email: "adeel@example.com", phone: "+92 300 1112233", orders: 8, spent: 1890, status: "VIP" },
    { id: "CUS-3002", name: "Sara Malik", email: "sara@example.com", phone: "+92 301 2200455", orders: 5, spent: 1120, status: "Active" },
    { id: "CUS-3003", name: "Usman Rauf", email: "usman@example.com", phone: "+92 333 9876501", orders: 3, spent: 670, status: "Active" },
    { id: "CUS-3004", name: "Bilal Auto Hub", email: "sales@bilalhub.com", phone: "+92 321 4400001", orders: 11, spent: 2480, status: "Wholesale" }
  ],
  reviews: [
    { id: "REV-701", productId: 1, author: "Imran", rating: 5, status: "Pending", comment: "Strong build quality and neat packaging." },
    { id: "REV-702", productId: 3, author: "Hassan", rating: 4, status: "Approved", comment: "Very balanced on highway runs." },
    { id: "REV-703", productId: 6, author: "Muneeb", rating: 3, status: "Rejected", comment: "Light output is fine but fitment took effort." }
  ],
  settings: {
    storeName: "DriveX Spares",
    email: "support@drivexspares.com",
    phone: "+92 300 4445500",
    address: "Main Shahrah-e-Faisal, Karachi",
    currency: "USD",
    orderPrefix: "ORD"
  }
};
