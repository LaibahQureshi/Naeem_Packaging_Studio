import React, { useState, useEffect } from 'react';
import { productAPI, orderAPI, messageAPI } from 'c:/Users/Laiba/Desktop/custombox-ecommerce/src/utils/api'; 
import Header from 'c:/Users/Laiba/Desktop/custombox-ecommerce/src/components/Header';
import HomePage from 'c:/Users/Laiba/Desktop/custombox-ecommerce/src/components/HomePage';
import CartSidebar from 'c:/Users/Laiba/Desktop/custombox-ecommerce/src/components/CartSidebar';
import ProductDetail from 'c:/Users/Laiba/Desktop/custombox-ecommerce/src/components/ProductDetail';
import AdminPage from 'c:/Users/Laiba/Desktop/custombox-ecommerce/src/components/AdminPage';
import AdminLogin from './components/AdminLogin';
import ProductsPage from './components/ProductsPage';

const CustomBoxEcommerce = () => {
  // All useState hooks MUST be inside the component
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [priceFilter, setPriceFilter] = useState('all');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [contactMessages, setContactMessages] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '', 
    description: '', 
    basePrice: '', 
    image: '', 
    sizes: [], 
    materials: [], 
    deliveryPrice: ''
  });

  // useEffect hooks
  useEffect(() => {
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  // Functions
  const loadData = async () => {
    try {
      const productsData = await productAPI.getAll();
      setProducts(productsData);
      
      const ordersData = await orderAPI.getAll();
      setOrders(ordersData);
      
      const messagesData = await messageAPI.getAll();
      setContactMessages(messagesData);
    } catch (error) {
      console.error('Error loading data:', error);
      setProducts([]);
      setOrders([]);
      setContactMessages([]);
    }
  };

  const saveProducts = async (updatedProducts) => {
    setProducts(updatedProducts);
    await loadData();
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.basePrice) {
      alert('Please fill in required fields');
      return;
    }

    const product = {
      name: newProduct.name,
      description: newProduct.description,
      basePrice: parseFloat(newProduct.basePrice),
      image: newProduct.image || 'https://images.unsplash.com/photo-1606400082777-ef05f3c5cde7?w=500',
      sizes: newProduct.sizes.length > 0 ? newProduct.sizes : [{ name: 'Standard', price: 0 }],
      materials: newProduct.materials.length > 0 ? newProduct.materials : [{ name: 'Standard', price: 0 }],
      deliveryPrice: parseFloat(newProduct.deliveryPrice) || 100
    };

    try {
      await productAPI.create(product);
      await loadData();
      setNewProduct({ name: '', description: '', basePrice: '', image: '', sizes: [], materials: [], deliveryPrice: '' });
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Make sure backend is running.');
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminLoginTime');
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  const addToCart = (product, selectedSize, selectedMaterial) => {
    const totalPrice = product.basePrice + selectedSize.price + selectedMaterial.price + product.deliveryPrice;
    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      size: selectedSize.name,
      material: selectedMaterial.name,
      price: totalPrice,
      quantity: 1,
      deliveryPrice: product.deliveryPrice
    };
    setCart([...cart, cartItem]);
    setShowCart(true);
  };

  const updateQuantity = (itemId, change) => {
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      await loadData();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const checkout = async (customerInfo, paymentMethod) => {
    const order = {
      date: new Date().toISOString(),
      items: cart,
      total: getTotalPrice(),
      customer: customerInfo,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'jazzcash' ? 'Pending' : 'COD',
      status: 'Pending'
    };

    try {
      await orderAPI.create(order);
      setCart([]);
      setShowCart(false);
      
      if (paymentMethod === 'jazzcash') {
        alert(`Order placed successfully!\n\nRedirecting to JazzCash payment gateway...`);
      } else {
        alert(`Order placed successfully!\n\nPayment Method: Cash on Delivery`);
      }
      
      setCurrentPage('home');
      await loadData();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const deleteProduct = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(productId);
        await loadData();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceFilter !== 'all') {
      filtered = filtered.filter(p => {
        const minPrice = p.basePrice + p.deliveryPrice;
        if (priceFilter === 'under500') return minPrice < 500;
        if (priceFilter === '500-1000') return minPrice >= 500 && minPrice <= 1000;
        if (priceFilter === 'over1000') return minPrice > 1000;
        return true;
      });
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a.basePrice + a.deliveryPrice) - (b.basePrice + b.deliveryPrice));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b.basePrice + b.deliveryPrice) - (a.basePrice + a.deliveryPrice));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }; 

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        showCart={showCart}
        setShowCart={setShowCart}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      
      {currentPage === 'products' && (
        <ProductsPage 
          products={getFilteredAndSortedProducts()}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
        />
      )}
      
      {currentPage === 'admin' && (
        isAdminLoggedIn ? (
          <AdminPage 
            products={products}
            orders={orders}
            addProduct={addProduct}
            newProduct={newProduct}        // 👈 ADD THIS
            setNewProduct={setNewProduct}  // 👈 ADD THIS
            saveProducts={saveProducts}
            deleteProduct={deleteProduct}
            updateOrderStatus={updateOrderStatus}
            onLogout={handleAdminLogout}
          />
        ) : (
          <AdminLogin onLogin={setIsAdminLoggedIn} />
        )
      )}
      
      <CartSidebar 
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        checkout={checkout}
      />
      
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
      
      <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-8 mt-16 border-t-2 border-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-yellow-400 font-semibold">&copy; 2025 Naeem Packaging Studio. All rights reserved.</p>
          <p className="text-yellow-400 text-sm">Premium Custom Packaging Solutions</p>
        </div>
      </footer>
    </div>
  );
};

export default CustomBoxEcommerce;