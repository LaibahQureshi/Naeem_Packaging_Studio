import React from 'react';
import { ShoppingCart, Menu, X, Home, Box, Settings, Package } from 'lucide-react';

const Header = ({ 
  currentPage, 
  setCurrentPage, 
  cart, 
  showCart, 
  setShowCart, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-yellow-400 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Package size={24} />
            <span className="text-xl font-bold">Naeem Packaging Studio</span>
          </div>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <button onClick={() => setCurrentPage('home')} className="hover:text-yellow-300 transition flex items-center space-x-1">
              <Home size={20} />
              <span>Home</span>
            </button>
            <button onClick={() => setCurrentPage('products')} className="hover:text-yellow-300 transition flex items-center space-x-1">
              <Box size={20} />
              <span>Products</span>
            </button>
            <button onClick={() => setCurrentPage('admin')} className="hover:text-yellow-300 transition flex items-center space-x-1">
              <Settings size={20} />
              <span>Admin</span>
            </button>
            <button 
              onClick={() => setShowCart(!showCart)} 
              className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-full hover:from-yellow-400 hover:to-yellow-500 transition flex items-center space-x-2 font-semibold"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
          </nav>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-gray-800 hover:text-yellow-400 px-2 rounded">Home</button>
            <button onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-gray-800 hover:text-yellow-400 px-2 rounded">Products</button>
            <button onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-gray-800 hover:text-yellow-400 px-2 rounded">Admin</button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;