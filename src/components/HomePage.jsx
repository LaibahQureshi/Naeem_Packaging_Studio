import React from 'react';
import { Package, DollarSign, Truck } from 'lucide-react';

const HomePage = ({ setCurrentPage }) => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight italic tracking-wide text-amber-400 drop-shadow-2xl mb-4" 
             style={{ fontFamily: "'Cormorant Garamond', 'Merriweather', 'Georgia', serif" }}
             //style={{ fontFamily: "'Momo Signature', 'Segoe Script', 'Lucida Handwriting', 'Brush Script MT', cursive" }}
             >
            Premium Custom Packaging Solutions
          </h1>
          <p className="text-1xl sm:text-2xl md:text-3xl font-extralight italic tracking-wide text-amber-400 drop-shadow-2xl mb-4"
          style={{ fontFamily: "'Cormorant Garamond', 'Merriweather', 'Georgia', serif" }}

>
            Design and order custom boxes for your business. Professional quality, fast delivery, competitive prices.
          </p>
          <button 
            onClick={() => setCurrentPage('products')}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-bold hover:from-yellow-400 hover:to-yellow-500 transition transform hover:scale-105 shadow-lg"
          >
            Browse Products
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-900">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-yellow-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-yellow-600" size={28} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Quality Materials</h3>
            <p className="text-sm sm:text-base text-gray-600">Premium quality materials for durable and professional packaging</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-green-600" size={28} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Competitive Pricing</h3>
            <p className="text-sm sm:text-base text-gray-600">Best prices in the market with no hidden charges</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="bg-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="text-purple-600" size={28} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
            <p className="text-sm sm:text-base text-gray-600">Quick turnaround time with reliable delivery service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;