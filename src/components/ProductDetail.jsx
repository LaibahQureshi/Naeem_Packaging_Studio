import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';

const ProductDetail = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0]);
  const totalPrice = product.basePrice + selectedSize.price + selectedMaterial.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            <X size={24} />
          </button>
          
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-700">Size:</label>
                  <select 
                    value={selectedSize.name}
                    onChange={(e) => setSelectedSize(product.sizes.find(s => s.name === e.target.value))}
                    className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                  >
                    {product.sizes.map(size => (
                      <option key={size.name} value={size.name}>
                        {size.name} {size.price > 0 ? `(+PKR ${size.price})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-700">Material:</label>
                  <select 
                    value={selectedMaterial.name}
                    onChange={(e) => setSelectedMaterial(product.materials.find(m => m.name === e.target.value))}
                    className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                  >
                    {product.materials.map(material => (
                      <option key={material.name} value={material.name}>
                        {material.name} {material.price > 0 ? `(+PKR ${material.price})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Base Price:</span>
                  <span className="font-semibold text-gray-900">PKR {product.basePrice}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Size Upgrade:</span>
                  <span className="font-semibold text-gray-900">PKR {selectedSize.price}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Material Upgrade:</span>
                  <span className="font-semibold text-gray-900">PKR {selectedMaterial.price}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Delivery:</span>
                  <span className="font-semibold text-gray-900">PKR {product.deliveryPrice}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold border-t-2 border-yellow-200 pt-3">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-yellow-600">PKR {totalPrice + product.deliveryPrice}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  onAddToCart(product, selectedSize, selectedMaterial);
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart size={24} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;