import React from "react";

const PaymentSection = ({ handlePayment, total }) => (
  <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <h3 className="border-b pb-4 text-xl font-semibold text-gray-800">
      Payment Method
    </h3>

    {/* Payment Options */}
    <div className="space-y-4">
      <label className="block">
        <input
          type="radio"
          name="payment"
          className="peer hidden"
          defaultChecked
        />
        <div className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-100">
          <div className="flex items-center gap-4">
            <img
              src="https://razorpay.com/favicon.png"
              alt="Razorpay"
              className="h-8 w-8"
            />
            <div>
              <p className="font-medium text-gray-800">UPI / Cards</p>
              <p className="text-sm text-gray-500">
                Pay securely with UPI or Cards
              </p>
            </div>
          </div>
          <svg
            className="h-5 w-5 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </label>
    </div>

    <SecurityBadge />
    <PayButton handlePayment={handlePayment} total={total} />
    <TrustBadges />
  </div>
);

const SecurityBadge = () => (
  <div className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 p-4">
    <div className="flex items-center gap-3">
      <svg
        className="h-5 w-5 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
      <div className="text-sm">
        <p className="font-medium text-gray-800">100% Secure Payments</p>
        <p className="text-gray-500">All transactions are encrypted</p>
      </div>
    </div>
    <img
      src="https://razorpay.com/favicon.png"
      alt="Razorpay"
      className="h-8 w-8 opacity-50"
    />
  </div>
);

const PayButton = ({ handlePayment, total }) => (
  <button
    onClick={handlePayment}
    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
  >
    <svg
      className="h-6 w-6"
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
    Pay Securely ₹{total}
  </button>
);

const TrustBadges = () => (
  <div className="mt-6 flex flex-wrap justify-center gap-6 text-gray-400">
    {[1, 2, 3].map((i) => (
      <svg key={i} className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ))}
  </div>
);

export default PaymentSection;
