import React from "react";
import { motion } from "framer-motion";

const CartSummary = ({
  cart,
  calculateTotal,
  setCurrentStep,
  removeFromCart,
  updateCartItemQuantity,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 overflow-hidden rounded-xl border bg-white shadow-xl"
    >
      {/* Cart Header */}
      <div className="border-b bg-white/50 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Your Cart</h3>
            <p className="text-sm text-gray-600">
              {cart.length} {cart.length === 1 ? "item" : "items"} in cart
            </p>
          </div>
          <div className="rounded-full bg-blue-100/80 px-4 py-2 text-sm font-medium text-blue-600 backdrop-blur-sm">
            Will be delivered to your seat
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-h-[400px] space-y-1 overflow-y-auto p-6">
        {cart.map((item) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            key={item.id}
            className="group relative flex items-center justify-between rounded-xl border border-white/50 bg-white/30 p-4 backdrop-blur-sm transition-all hover:bg-white/50"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">{item.name}</h4>
                <span className="font-semibold text-blue-600">
                  ₹{item.price * item.quantity}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="rounded-full bg-white/50 px-2 py-0.5 backdrop-blur-sm">
                  {item.variant}
                </span>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="ml-4 flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-white/50 bg-white/50 backdrop-blur-sm">
                <button
                  onClick={() => updateCartItemQuantity(item.id, -1)}
                  className="px-3 py-1 text-gray-600 hover:text-blue-600"
                >
                  -
                </button>
                <span className="border-x border-white/50 px-3 py-1 text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCartItemQuantity(item.id, 1)}
                  className="px-3 py-1 text-gray-600 hover:text-blue-600"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="transform rounded-full p-2 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-red-50 hover:text-red-500"
                title="Remove item"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cart Footer */}
      <div className="border-t border-white/50 bg-white/30 p-6 backdrop-blur-sm">
        <div className="space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{calculateTotal().total}</span>
          </div>

          {/* Delivery Fee */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium text-green-600">Free</span>
          </div>

          {/* Total */}
          <div className="border-t border-white/50 pt-4">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">
                  ₹{calculateTotal().total}
                </span>
                <p className="text-xs text-gray-500">Including all taxes</p>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={() => setCurrentStep(2)}
            className="mt-6 w-full transform rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
          >
            Proceed to Payment
          </button>

          {/* Security Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Secure payment powered by Razorpay</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummary;
