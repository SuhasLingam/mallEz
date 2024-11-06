import React, { useState } from "react";
import Navbar from "../components/navbar";
import StepIndicator from "../components/theater/StepIndicator";
import AuditoriumSelection from "../components/theater/AuditoriumSelection";
import ShowTimeSelection from "../components/theater/ShowTimeSelection";
import SeatInput from "../components/theater/SeatInput";
import FoodMenu from "../components/theater/FoodMenu";
import CartSummary from "../components/theater/CartSummary";
import { motion } from "framer-motion";

const Theater = () => {
  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAudi, setSelectedAudi] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [tempSeat, setTempSeat] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});

  // Food Menu Data
  const foodMenu = [
    {
      id: 1,
      name: "Popcorn Combo",
      price: 350,
      image:
        "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=300",
      description: "Large Popcorn + 2 Coke",
      variants: ["Salted", "Caramel", "Cheese"],
    },
    {
      id: 2,
      name: "Nachos",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300",
      description: "Crispy Nachos with Cheese Sauce",
      variants: ["Cheese", "Spicy", "Regular"],
    },
    {
      id: 3,
      name: "Pizza",
      price: 250,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
      description: "Fresh Personal Pizza",
      variants: ["Margherita", "Pepperoni", "Veggie"],
    },
    {
      id: 4,
      name: "Burger Combo",
      price: 300,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300",
      description: "Burger + Fries + Drink",
      variants: ["Veg", "Chicken", "Fish"],
    },
  ];

  // Handlers
  const handleAddToCart = (item) => {
    const selectedVariant = selectedVariants[item.id] || item.variants[0];
    const cartItemId = `${item.id}-${selectedVariant}`;

    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === cartItemId);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          name: item.name,
          price: item.price,
          variant: selectedVariant,
          quantity: 1,
        },
      ];
    });
  };

  const calculateTotal = () => {
    const foodTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    return { foodTotal, total: foodTotal };
  };

  const validateSeatNumber = (seatNumber) => {
    const regex = /^[A-F][1-2]?[0-9]$/;
    if (!regex.test(seatNumber)) return false;
    const row = seatNumber.charAt(0);
    if (!"ABCDEF".includes(row)) return false;
    const seatNum = parseInt(seatNumber.slice(1));
    return seatNum >= 1 && seatNum <= 30;
  };

  // Steps configuration
  const steps = ["Enter Details", "Add Food", "Payment"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3"
          alt="Theater"
          className="h-full w-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Movie Theater
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="rounded-lg bg-white p-6 shadow-lg">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-center text-2xl font-bold">
                Enter Show Details
              </h2>
              <div className="rounded-lg border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8">
                <AuditoriumSelection
                  selectedAudi={selectedAudi}
                  setSelectedAudi={setSelectedAudi}
                />
                <ShowTimeSelection
                  selectedShow={selectedShow}
                  setSelectedShow={setSelectedShow}
                />
                <SeatInput
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  tempSeat={tempSeat}
                  setTempSeat={setTempSeat}
                  validateSeatNumber={validateSeatNumber}
                />

                {/* Summary Card */}
                {selectedAudi && selectedShow && selectedSeats.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg"
                  >
                    <h3 className="mb-4 text-xl font-semibold">
                      Booking Summary
                    </h3>
                    <div className="space-y-3">
                      <p>Auditorium: {selectedAudi.name}</p>
                      <p>Time: {selectedShow.time}</p>
                      <p>Seats: {selectedSeats.join(", ")}</p>
                    </div>
                  </motion.div>
                )}

                <button
                  className={`mt-6 w-full transform rounded-lg py-3 text-lg font-semibold transition-all duration-300 ${
                    !selectedAudi || !selectedShow || !selectedSeats.length
                      ? "cursor-not-allowed bg-gray-300"
                      : "bg-blue-500 text-white hover:scale-105 hover:bg-blue-600"
                  }`}
                  disabled={
                    !selectedAudi || !selectedShow || !selectedSeats.length
                  }
                  onClick={() => setCurrentStep(1)}
                >
                  {!selectedAudi || !selectedShow || !selectedSeats.length
                    ? "Please Fill All Details"
                    : "Continue to Food Selection"}
                </button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  ← Back
                </button>
                <h2 className="text-2xl font-bold">Add Food & Beverages</h2>
              </div>

              <FoodMenu
                foodMenu={foodMenu}
                selectedVariants={selectedVariants}
                setSelectedVariants={setSelectedVariants}
                handleAddToCart={handleAddToCart}
                cart={cart}
              />

              {cart.length > 0 && (
                <CartSummary
                  cart={cart}
                  calculateTotal={calculateTotal}
                  setCurrentStep={setCurrentStep}
                />
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  ← Back
                </button>
                <h2 className="text-2xl font-bold">Payment</h2>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Auditorium</span>
                    <span>{selectedAudi.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time</span>
                    <span>{selectedShow.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery to Seat</span>
                    <span>{selectedSeats.join(", ")}</span>
                  </div>
                  {cart.length > 0 && (
                    <div>
                      <h4 className="mb-2 font-semibold">Food & Beverages</h4>
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>
                            {item.name} ({item.variant}) x {item.quantity}
                          </span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total Amount</span>
                      <span>₹{calculateTotal().total}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert(
                      "Payment Successful! Your food will be delivered to your seat.",
                    );
                    setCurrentStep(0);
                    setSelectedAudi(null);
                    setSelectedShow(null);
                    setSelectedSeats([]);
                    setCart([]);
                    setTempSeat("");
                  }}
                  className="mt-6 w-full transform rounded-lg bg-green-500 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-green-600"
                >
                  Pay Now ₹{calculateTotal().total}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Theater;
