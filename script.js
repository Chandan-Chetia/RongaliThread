document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.getElementById('overlay');

  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
  });

  // Close mobile menu when clicking on overlay
  overlay.addEventListener('click', function() {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Product data
  const products = [
    {
      id: 1,
      title: "Pure Padmini Mekhela Chador",
      price: "₹3,499",
      originalPrice: "₹4,999",
      description: "Exquisite handwoven Muga silk with traditional motifs.",
      features: [
        "100% Pure Muga Silk",
        "Handwoven by skilled artisans",
        "Traditional Assamese motifs"
      ],
      image: "./w1.jpg",
      category: "mekhla",
      stock: 5
    },
    {
      id: 2,
      title: "Pure Gilele Pat Gamosa",
      price: "₹1,999",
      description: "Authentic Assamese Gamosa set of 3 pieces.",
      features: [
        "Set of 3 pure cotton Gamosas",
        "Traditional red and white designs"
      ],
      image: "./g1.jpg",
      category: "gamosa",
      stock: 10
    },
    {
      id: 3,
      title: "Assamese Jewelry Set",
      price: "₹3,499",
      description: "Traditional Assamese jewelry with colorful beads.",
      features: [
        "Includes necklace, earrings, and bangles",
        "Handcrafted by local artisans"
      ],
      image: "./w2.jpg",
      category: "accessories",
      stock: 3
    },
    {
      id: 4,
      title: "Traditional Mekhela Chador",
      price: "₹2,799",
      description: "Beautiful cotton Mekhela Chador with traditional patterns.",
      features: [
        "100% Pure Cotton",
        "Comfortable for daily wear",
        "Handwoven by local artisans"
      ],
      image: "./w3.jpg",
      category: "mekhla",
      stock: 7
    },
    {
      id: 5,
      title: "Assamese Silk Scarf",
      price: "₹1,299",
      description: "Elegant silk scarf with traditional designs.",
      features: [
        "Pure Muga Silk",
        "Lightweight and comfortable",
        "Perfect for all occasions"
      ],
      image: "./w4.jpg",
      category: "accessories",
      stock: 12
    },
    {
      id: 6,
      title: "Premium Gamosa Set",
      price: "₹2,499",
      description: "Set of 5 premium quality Gamosas.",
      features: [
        "Set of 5 pieces",
        "Traditional designs",
        "High quality cotton"
      ],
      image: "./g2.jpg",
      category: "gamosa",
      stock: 8
    }
  ];

  // Render products
  function renderProducts(filter = 'all', searchTerm = '') {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    let filteredProducts = filter === 'all' ? products : products.filter(product => product.category === filter);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
      return;
    }

    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-img">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-price">${product.price}</div>
          <div class="product-actions">
            <button class="add-to-cart" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
              Add to Cart
            </button>
            <button class="buy-now" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
              Buy Now
            </button>
          </div>
        </div>
      `;
      productsGrid.appendChild(productCard);
    });

    // Add event listeners to new buttons
    addProductEventListeners();
  }

  // Product Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const filterValue = this.getAttribute('data-filter');
      renderProducts(filterValue);
    });
  });

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  
  searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    renderProducts('all', searchTerm);
  });
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const searchTerm = searchInput.value.trim();
      renderProducts('all', searchTerm);
    }
  });

  // Product Modal
  const modal = document.getElementById('productModal');
  const closeModal = document.getElementById('closeModal');

  function addProductEventListeners() {
    // Quick view (modal open)
    document.querySelectorAll('.product-img').forEach(img => {
      img.addEventListener('click', function() {
        const productId = this.closest('.product-card').querySelector('.add-to-cart').getAttribute('data-id');
        const product = products.find(p => p.id == productId);
        if (product) openProductModal(product);
      });
    });

    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productId = this.getAttribute('data-id');
        addToCart(productId, 1);
      });
    });

    // Buy now
    document.querySelectorAll('.buy-now').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productId = this.getAttribute('data-id');
        buyNow(productId, 1);
      });
    });
  }

  function openProductModal(product) {
    document.getElementById('modalProductImg').src = product.image;
    document.getElementById('modalProductTitle').textContent = product.title;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    const featuresList = document.getElementById('modalProductFeatures');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
    
    document.getElementById('addToCartModal').setAttribute('data-id', product.id);
    document.getElementById('buyNowModal').setAttribute('data-id', product.id);
    document.getElementById('quantity').value = 1;
    
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal.addEventListener('click', function() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Quantity controls
  const decreaseQty = document.getElementById('decreaseQty');
  const increaseQty = document.getElementById('increaseQty');
  const quantityInput = document.getElementById('quantity');

  decreaseQty.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    if (value > 1) quantityInput.value = value - 1;
  });

  increaseQty.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
  });

  // Add to cart from modal
  document.getElementById('addToCartModal').addEventListener('click', function() {
    const productId = this.getAttribute('data-id');
    const quantity = parseInt(quantityInput.value);
    addToCart(productId, quantity);
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Buy now from modal
  document.getElementById('buyNowModal').addEventListener('click', function() {
    const productId = this.getAttribute('data-id');
    const quantity = parseInt(quantityInput.value);
    buyNow(productId, quantity);
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Buy now function
  function buyNow(productId, quantity) {
    // Clear cart first
    cart = [];
    
    // Then add the product
    addToCart(productId, quantity);
    
    // Open cart sidebar
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Cart functionality
  let cart = [];

  function addToCart(productId, quantity) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    if (product.stock <= 0) {
      showNotification('This product is out of stock', 'error');
      return;
    }

    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
      if (existingItem.quantity + quantity > product.stock) {
        showNotification(`Only ${product.stock} items available`, 'error');
        return;
      }
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    updateCartUI();
    showNotification(`${quantity} ${product.title} added to cart`, 'success');
  }

  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
    document.getElementById('cartTotalItems').textContent = totalItems;
    
    // Update cart items
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
      document.getElementById('cartTotalPrice').textContent = '₹0';
    } else {
      cartItemsContainer.innerHTML = '';
      
      let totalPrice = 0;
      
      cart.forEach(item => {
        const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ''));
        totalPrice += priceNumber * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-price">${item.price}</div>
            <div class="cart-item-quantity">
              <button class="decrease-item" data-id="${item.id}" aria-label="Decrease quantity">-</button>
              <span>${item.quantity}</span>
              <button class="increase-item" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
      
      document.getElementById('cartTotalPrice').textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
      
      // Add event listeners to cart item buttons
      document.querySelectorAll('.decrease-item').forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          const item = cart.find(item => item.id == productId);
          
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            cart = cart.filter(item => item.id != productId);
          }
          
          updateCartUI();
        });
      });
      
      document.querySelectorAll('.increase-item').forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          const item = cart.find(item => item.id == productId);
          const product = products.find(p => p.id == productId);
          
          if (item.quantity >= product.stock) {
            showNotification(`Only ${product.stock} items available`, 'error');
            return;
          }
          
          item.quantity += 1;
          updateCartUI();
        });
      });
      
      document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          cart = cart.filter(item => item.id != productId);
          updateCartUI();
          showNotification('Item removed from cart', 'error');
        });
      });
    }
  }

  // Cart Sidebar
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCart = document.getElementById('closeCart');
  const cartIcon = document.getElementById('cartIcon');

  cartIcon.addEventListener('click', function() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeCart.addEventListener('click', function() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Checkout button
  document.querySelector('.cart-checkout').addEventListener('click', function() {
    if (cart.length === 0) {
      showNotification('Your cart is empty', 'error');
      return;
    }
    showNotification('Proceeding to checkout', 'success');
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Auth Modal
  const authModal = document.getElementById('authModal');
  const closeAuthModal = document.getElementById('closeAuthModal');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const authTabs = document.querySelectorAll('.auth-tab');

  loginBtn.addEventListener('click', function() {
    authModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  signupBtn.addEventListener('click', function() {
    authModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchAuthTab('signup');
  });

  closeAuthModal.addEventListener('click', function() {
    authModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  authTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchAuthTab(tabName);
    });
  });

  function switchAuthTab(tabName) {
    authTabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    document.querySelectorAll('.auth-form').forEach(form => {
      if (form.id === `${tabName}Form`) {
        form.classList.add('active');
      } else {
        form.classList.remove('active');
      }
    });
  }

  // Form submissions
  document.getElementById('loginFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Login successful', 'success');
    authModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  document.getElementById('signupFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Account created successfully', 'success');
    authModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Newsletter form
  document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    showNotification(`Thank you for subscribing with ${email}`, 'success');
    this.reset();
  });

  // Initial render
  renderProducts();
});