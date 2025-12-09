import React, { useState } from 'react';
import { ShoppingCart, ZoomIn } from 'lucide-react';

const ProductCard = ({ product, viewMode, onProductClick, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || {});
  const [selectedMaterial, setSelectedMaterial] = useState(product?.materials?.[0] || {});
  const [imageHover, setImageHover] = useState(false);
  
  if (!product) return null;
  
  const totalPrice = (product.basePrice || 0) + (selectedSize.price || 0) + (selectedMaterial.price || 0);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition flex flex-col md:flex-row">
        <div 
          className="md:w-1/3 relative overflow-hidden group cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 sm:h-56 md:h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn size={32} className="text-white drop-shadow-lg" />
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 
              className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 cursor-pointer hover:text-yellow-600 transition"
              onClick={() => onProductClick(product)}
            >
              {product.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">{product.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Size:</label>
                <select 
                  value={selectedSize.name}
                  onChange={(e) => setSelectedSize(product.sizes.find(s => s.name === e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-yellow-500 outline-none"
                >
                  {product.sizes.map(size => (
                    <option key={size.name} value={size.name}>
                      {size.name} {size.price > 0 ? `(+PKR ${size.price})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Material:</label>
                <select 
                  value={selectedMaterial.name}
                  onChange={(e) => setSelectedMaterial(product.materials.find(m => m.name === e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-yellow-500 outline-none"
                >
                  {product.materials.map(material => (
                    <option key={material.name} value={material.name}>
                      {material.name} {material.price > 0 ? `(+PKR ${material.price})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-700">
                <span>Product Price:</span>
                <span className="font-semibold">PKR {totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-700">
                <span>Delivery:</span>
                <span className="font-semibold">PKR {product.deliveryPrice}</span>
              </div>
              <div className="flex justify-between text-base sm:text-xl font-bold border-t border-yellow-200 pt-2 text-gray-900">
                <span>Total:</span>
                <span className="text-yellow-600">PKR {totalPrice + product.deliveryPrice}</span>
              </div>
            </div>

            <button 
              onClick={() => addToCart(product, selectedSize, selectedMaterial)}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:from-yellow-400 hover:to-yellow-500 transition transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md"
            >
              <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
      <div 
        className="relative overflow-hidden group cursor-pointer h-56 sm:h-72 md:h-80 lg:h-96"
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
        onClick={() => onProductClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-all duration-700 ${imageHover ? 'scale-125' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300`}></div>
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <div className="bg-white bg-opacity-90 p-3 rounded-full shadow-lg">
            <ZoomIn size={24} className="text-gray-800" />
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-5 lg:p-6">
        <h3 
          className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 cursor-pointer hover:text-yellow-600 transition line-clamp-2"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-5">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">From:</span>
            <span className="text-xl sm:text-2xl font-bold text-yellow-600">PKR {product.basePrice + product.deliveryPrice}</span>
          </div>
        </div>

        <button 
          onClick={() => onProductClick(product)}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-2.5 sm:py-3 lg:py-3.5 rounded-lg font-bold text-sm sm:text-base hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
          <span className="truncate">View Details & Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;