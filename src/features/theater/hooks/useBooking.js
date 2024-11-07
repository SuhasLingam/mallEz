import { useState } from "react";

export const useBooking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAudi, setSelectedAudi] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [tempSeat, setTempSeat] = useState("");

  const resetBooking = () => {
    setCurrentStep(0);
    setSelectedAudi(null);
    setSelectedShow(null);
    setSelectedSeats([]);
    setTempSeat("");
  };

  return {
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
  };
};
