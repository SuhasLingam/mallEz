import React from "react";

const CartSummary = ({ cart, calculateTotal, setCurrentStep }) => (
  <div className="fixed bottom-4 right-4 w-96 rounded-lg bg-white p-4 shadow-lg">
    <h3 className="mb-4 font-semibold">Order Summary</h3>
    {cart.map((item) => (
      <div key={item.id} className="mb-2 flex justify-between">
        <span>
          {item.name} ({item.variant}) x {item.quantity}
        </span>
        <span>₹{item.price * item.quantity}</span>
      </div>
    ))}
    <div className="mt-4 border-t pt-4">
      <div className="mb-4 flex justify-between font-bold">
        <span>Total</span>
        <span>₹{calculateTotal().total}</span>
      </div>
      <button
        className="w-full rounded bg-green-500 py-2 text-white hover:bg-green-600"
        onClick={() => setCurrentStep(2)}
      >
        Proceed to Payment
      </button>
    </div>
  </div>
);

export default CartSummary;
