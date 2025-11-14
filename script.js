function initEcommerce(products) {
    // ===== CARGAR CARRITO DESDE LOCALSTORAGE =====
    let cart = [];
    const savedCart = localStorage.getItem('myrodiaCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log('✅ Carrito cargado desde LocalStorage:', cart);
        } catch (error) {
            console.error('❌ Error al cargar carrito:', error);
            cart = [];
        }
    }

    let currentCategory = 'todos';
    let selectedProduct = null;

    // ===== GUARDAR CARRITO EN LOCALSTORAGE =====
    function saveCart() {
        try {
            localStorage.setItem('myrodiaCart', JSON.stringify(cart));
            console.log('💾 Carrito guardado en LocalStorage');
        } catch (error) {
            console.error('❌ Error al guardar carrito:', error);
        }
    }

    function renderProducts() {
        const grid = document.getElementById('productsGrid');
        const filtered = currentCategory === 'todos'
            ? products
            : products.filter(p => p.category === currentCategory);

        grid.innerHTML = filtered.map(product => `
            <div class="product-card" onclick="showProductModal(${product.id})">
                <div class="product-img">
                    <img src="${product.icon}" alt="${product.nombre}" 
                         style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
                </div>
                <div class="product-name">${product.nombre}</div>
                <div class="product-desc">${product.desc.substring(0, 70)}...</div>
                <div class="product-price">$${product.precio}</div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    🛒 Agregar
                </button>
            </div>
        `).join('');
    }

    window.showProductModal = function(id) {
        selectedProduct = products.find(p => p.id === id);
        if (!selectedProduct) return;
        
        const modal = document.getElementById('productModal');
        const modalContent = modal.querySelector('.product-modal-content');
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${selectedProduct.nombre}</h2>
                <button class="close-modal" onclick="closeProductModal()">×</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${selectedProduct.icon}" alt="${selectedProduct.nombre}" 
                         style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
                </div>
                <div class="modal-info">
                    <p class="modal-description">${selectedProduct.desc}</p>
                    <div class="modal-category">
                        <span class="category-badge">${getCategoryName(selectedProduct.category)}</span>
                    </div>
                    <div class="modal-price">$${selectedProduct.precio}</div>
                    <button class="modal-add-btn" onclick="addFromModal()">
                        🛒 Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    };

    function getCategoryName(category) {
        const categories = {
            'jabones': '🧼 Jabones',
            'aromatizantes': '🌸 Aromatizantes',
            'kits': '📦 Kits',
            'especiales': '✨ Especiales'
        };
        return categories[category] || category;
    }

    window.closeProductModal = function() {
        document.getElementById('productModal').style.display = 'none';
    };

    window.addFromModal = function() {
        if (selectedProduct) {
            addToCart(selectedProduct.id);
            closeProductModal();
        }
    };

    window.filterCategory = function(category) {
        currentCategory = category;
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // Encontrar y activar el botón correspondiente
        const buttons = document.querySelectorAll('.category-btn');
        buttons.forEach(btn => {
            if (btn.textContent.toLowerCase().includes(category === 'todos' ? 'todo' : category)) {
                btn.classList.add('active');
            }
        });
        renderProducts();
    };

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ 
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                icon: product.icon,
                quantity: 1 
            });
        }

        // GUARDAR EN LOCALSTORAGE
        saveCart();
        updateCart();
        
        // Mostrar feedback visual
        showAddedToCartFeedback(product.nombre);
    };

    function showAddedToCartFeedback(productName) {
        const feedback = document.createElement('div');
        feedback.className = 'cart-feedback';
        feedback.textContent = `✅ ${productName} agregado al carrito`;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    window.updateQuantity = function(productId, change) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== productId);
            }
            // GUARDAR EN LOCALSTORAGE
            saveCart();
            updateCart();
        }
    };

    function updateCart() {
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartCount').textContent = cartCount;

        const cartItems = document.getElementById('cartItems');

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <span class="empty-cart-emoji">🛒</span>
                    <div>Tu carrito está vacío</div>
                    <div style="margin-top: 10px; font-size: 16px;">¡Agrega algunos productos!</div>
                </div>
            `;
            document.getElementById('cartTotal').textContent = '';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <img src="${item.icon}" alt="${item.nombre}" 
                                 style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
                            <div>
                                <div class="cart-item-name">${item.nombre}</div>
                                <div style="color: #7d5ba6; font-weight: 900; font-size: 18px;">$${item.precio}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
            document.getElementById('cartTotal').innerHTML = `💰 Total: $${total}`;
        }
    }

    window.toggleCart = function() {
        const modal = document.getElementById('cartModal');
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    };

    window.checkout = function() {
        if (cart.length === 0) {
            alert('❌ Tu carrito está vacío');
            return;
        }
        const total = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
        const itemsList = cart.map(item => `${item.nombre} x${item.quantity}`).join('\n');
        alert(`✅ ¡Gracias por tu compra!\n\n${itemsList}\n\n💰 Total: $${total}\n\n🎉 ¡Pronto recibirás tus productos!`);
        
        // LIMPIAR CARRITO Y LOCALSTORAGE
        cart = [];
        saveCart();
        updateCart();
        toggleCart();
    };

    // ===== FUNCIÓN PARA LIMPIAR EL CARRITO MANUALMENTE =====
    window.clearCart = function() {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            cart = [];
            saveCart();
            updateCart();
            alert('🗑️ Carrito vaciado');
        }
    };

    // Cerrar modales al hacer clic fuera
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) toggleCart();
    });

    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) closeProductModal();
    });

    // Render inicial y cargar carrito guardado
    renderProducts();
    updateCart();
}
