import React from "react";

const OrderSummary = ({
  selectedAudi,
  selectedShow,
  selectedSeats,
  cart,
  calculateTotal,
}) => (
  <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between border-b pb-4">
      <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
        Booking ID: #BK{Math.random().toString(36).substr(2, 8).toUpperCase()}
      </span>
    </div>

    <div className="space-y-4">
      <ShowDetails
        selectedAudi={selectedAudi}
        selectedShow={selectedShow}
        selectedSeats={selectedSeats}
      />
      {cart.length > 0 && <FoodDetails cart={cart} />}
      <PriceBreakdown calculateTotal={calculateTotal} />
    </div>
  </div>
);

const ShowDetails = ({ selectedAudi, selectedShow, selectedSeats }) => (
  <div className="rounded-lg bg-blue-50 p-4">
    <div className="mb-3 flex items-center gap-2 font-medium text-blue-800">
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
          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        />
      </svg>
      Show Details
    </div>
    <div className="grid gap-2 text-sm">
      <DetailRow label="Auditorium" value={selectedAudi.name} />
      <DetailRow label="Show Time" value={selectedShow.time} />
      <DetailRow label="Seats" value={selectedSeats.join(", ")} />
    </div>
  </div>
);

const FoodDetails = ({ cart }) => (
  <div className="rounded-lg bg-green-50 p-4">
    <div className="mb-3 flex items-center gap-2 font-medium text-green-800">
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
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      Food & Beverages
    </div>
    <div className="space-y-2">
      {cart.map((item) => (
        <DetailRow
          key={item.id}
          label={`${item.name} (${item.variant}) × ${item.quantity}`}
          value={`₹${item.price * item.quantity}`}
          className="text-sm text-gray-600"
        />
      ))}
    </div>
  </div>
);

const PriceBreakdown = ({ calculateTotal }) => {
  const subtotal = calculateTotal().total;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <div className="space-y-2 rounded-lg bg-gray-50 p-4">
      <DetailRow label="Subtotal" value={`₹${subtotal}`} className="text-sm" />
      <DetailRow
        label="Convenience Fee"
        value="Free"
        valueClassName="text-green-600"
        className="text-sm"
      />
      <DetailRow label="GST (18%)" value={`₹${gst}`} className="text-sm" />
      <div className="border-t pt-2">
        <DetailRow
          label="Grand Total"
          value={`₹${total}`}
          className="text-base"
          labelClassName="font-medium text-gray-800"
          valueClassName="text-lg font-bold text-blue-600"
        />
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  className = "",
  labelClassName = "",
  valueClassName = "font-medium text-gray-800",
}) => (
  <div className={`flex justify-between ${className}`}>
    <span className={`text-gray-600 ${labelClassName}`}>{label}</span>
    <span className={valueClassName}>{value}</span>
  </div>
);

export default OrderSummary;
