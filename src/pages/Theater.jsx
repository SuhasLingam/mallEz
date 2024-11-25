import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import StepIndicator from "../components/theater/StepIndicator";
import AuditoriumSelection from "../components/theater/AuditoriumSelection";
import ShowTimeSelection from "../components/theater/ShowTimeSelection";
import SeatInput from "../components/theater/SeatInput";
import FoodMenu from "../components/theater/FoodMenu";
import CartSummary from "../components/theater/CartSummary";
import { useCart } from "../features/theater/hooks/useCart";
import { useBooking } from "../features/theater/hooks/useBooking";
import { STEPS, FOOD_MENU } from "../features/theater/constants";
import { validateSeatNumber } from "../features/theater/utils/validators";
import OrderSummary from "../components/theater/OrderSummary";
import PaymentSection from "../components/theater/PaymentSection";
import { useTheaterData } from "../features/theater/hooks/useTheaterData";
import TheaterHero from "../components/theater/TheaterHero";

const Theater = () => {
  const { chainId, locationId } = useParams();
  const { loading, error, theaterData, screens, currentMovies, concessions } =
    useTheaterData(chainId, locationId);

  const {
    currentStep,
    setCurrentStep,
    selectedAudi,
    setSelectedAudi,
    selectedShow,
    setSelectedShow,
    selectedSeats,
    setSelectedSeats,
    tempSeat,
    setTempSeat,
    resetBooking,
  } = useBooking();

  const {
    cart,
    selectedVariants,
    setSelectedVariants,
    handleAddToCart,
    updateCartItemQuantity,
    removeFromCart,
    calculateTotal,
  } = useCart();

  const handlePayment = () => {
    alert("Payment Successful! Your food will be delivered to your seat.");
    resetBooking();
  };

  if (loading) {
    return <div className="min-h-screen pt-16">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen pt-16">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white pt-16">
      <Navbar />
      <TheaterHero theaterData={theaterData} />

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <StepIndicator currentStep={currentStep} steps={STEPS} />

        <div className="rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          {currentStep === 0 && (
            <div className="space-y-8">
              <h2 className="text-center text-3xl font-bold text-gray-800">
                Enter Show Details
              </h2>
              <div className="rounded-xl border-2 border-blue-100 p-8 shadow-inner">
                <AuditoriumSelection
                  screens={screens}
                  selectedAudi={selectedAudi}
                  setSelectedAudi={setSelectedAudi}
                />
                <ShowTimeSelection
                  currentMovies={currentMovies}
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

                {/* Updated Summary Card */}
                {selectedAudi && selectedShow && selectedSeats.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 overflow-hidden rounded-xl bg-blue-600 shadow-2xl"
                  >
                    <div className="p-6">
                      <h3 className="mb-4 text-2xl font-semibold text-white">
                        Booking Summary
                      </h3>
                      <div className="space-y-4 text-gray-100">
                        <div className="flex justify-between">
                          <span>Auditorium</span>
                          <span className="font-medium">
                            {selectedAudi.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time</span>
                          <span className="font-medium">
                            {selectedShow.time}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Seats</span>
                          <span className="font-medium">
                            {selectedSeats.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Updated Continue Button */}
                <button
                  className={`mt-8 w-full transform rounded-xl py-4 text-lg font-semibold shadow-lg transition-all duration-300 ${
                    !selectedAudi || !selectedShow || !selectedSeats.length
                      ? "cursor-not-allowed bg-gray-300"
                      : "hover:scale-102 bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  disabled={
                    !selectedAudi || !selectedShow || !selectedSeats.length
                  }
                  onClick={() => setCurrentStep(1)}
                >
                  {!selectedAudi || !selectedShow || !selectedSeats.length
                    ? "Please Fill All Details"
                    : "Continue to Food Selection →"}
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
                foodMenu={concessions}
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
                  removeFromCart={removeFromCart}
                  updateCartItemQuantity={updateCartItemQuantity}
                />
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Cart
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                  Secure Checkout
                </h2>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <OrderSummary
                  selectedAudi={selectedAudi}
                  selectedShow={selectedShow}
                  selectedSeats={selectedSeats}
                  cart={cart}
                  calculateTotal={calculateTotal}
                />
                <PaymentSection
                  handlePayment={handlePayment}
                  total={
                    calculateTotal().total +
                    Math.round(calculateTotal().total * 0.18)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Theater;
