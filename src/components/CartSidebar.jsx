import React, { useState } from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';

const CartSidebar = ({ 
  showCart, 
  setShowCart, 
  cart, 
  updateQuantity, 
  removeFromCart, 
  getTotalPrice, 
  checkout 
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform z-50 ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-2 text-gray-900">
            <ShoppingCart />
            <span>Cart ({cart.length})</span>
          </h2>
          <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto mb-4">
              {cart.map(item => (
                <div key={item.id} className="border-b py-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.size}</p>
                      <p className="text-sm text-gray-600">{item.material}</p>
                      <p className="text-sm font-semibold text-yellow-600 mt-1">PKR {item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold mb-4 text-gray-900">
                <span>Total:</span>
                <span className="text-yellow-600">PKR {getTotalPrice()}</span>
              </div>

              {!showCheckout ? (
                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                  <textarea
                    placeholder="Delivery Address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
                    rows="3"
                  />
                  <button 
                    onClick={() => {
                      if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
                        alert('Please fill in all required fields');
                        return;
                      }
                      checkout(customerInfo);
                      setShowCheckout(false);
                      setCustomerInfo({ name: '', email: '', phone: '', address: '' });
                    }}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Place Order
                  </button>
                  <button 
                    onClick={() => setShowCheckout(false)}
                    className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;