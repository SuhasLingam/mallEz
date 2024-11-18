import React, { useState } from "react";
import Footer from "../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "../animation";
import Navbar from "../components/navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaWallet,
  FaCreditCard,
  FaUniversity,
  FaPaypal,
  FaRupeeSign,
  FaArrowLeft,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";

const CreditCardForm = ({ onBack, onSuccess, amount }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your payment processing logic here
    // On successful payment:
    onSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="hover:text-gray-800 flex items-center text-gray-600"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-[#000066]">
            Credit / Debit Card
          </h3>
          <p className="text-sm text-gray-600">
            Pay securely using your Credit/Debit Card for instant transactions
          </p>
        </div>
        <FaCreditCard className="text-3xl text-blue-500" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            placeholder="XXXX - XXXX - XXXX - XXXX"
            className="rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-3 border"
            maxLength="19"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              CVV / CVC
            </label>
            <input
              type="text"
              placeholder="000"
              className="rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-3 border"
              maxLength="3"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Valid Thru
            </label>
            <input
              type="text"
              placeholder="mm / yyyy"
              className="rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-3 border"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-3 border"
          />
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="saveDetails"
            className="focus:ring-blue-500 w-4 h-4 text-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="saveDetails" className="ml-2 text-sm text-gray-600">
            Save details for future
          </label>
        </div>

        <div className="mb-4 text-sm text-center text-gray-600">
          Amount to be added: ₹{parseFloat(amount).toFixed(2)}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="w-full rounded-xl bg-[#00A9FF] p-3 text-white transition-colors hover:bg-blue-600"
        >
          Pay ₹{parseFloat(amount).toFixed(2)}
        </motion.button>
      </div>
    </motion.div>
  );
};

const PaypalForm = ({ onBack, onSuccess, amount }) => {
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();
  };

  const paypalData = `paypal-payment:amount=${amount}`; // You can customize this format

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="hover:text-gray-800 flex items-center text-gray-600"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-[#000066]">Paypal</h3>
          <p className="text-sm text-gray-600">
            Scan or pay using your Paypal ID
          </p>
        </div>
        <div className="rounded-xl bg-[#E3F2FF] p-3">
          <FaPaypal className="text-3xl text-[#00A9FF]" />
        </div>
      </div>

      {showQR ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-xl p-4 bg-white shadow-lg">
            <QRCodeSVG
              value={paypalData}
              size={200}
              level="H"
              includeMargin={true}
              className="w-full h-full"
            />
          </div>
          <p className="text-sm text-center text-gray-600">
            Scan this QR code with your PayPal app
          </p>
          <button
            onClick={() => setShowQR(false)}
            className="hover:text-blue-600 text-blue-500"
          >
            Enter PayPal ID instead
          </button>
        </div>
      ) : (
        <>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQR(true)}
            className="w-full rounded-xl bg-[#00A9FF] p-3 text-white transition-colors hover:bg-blue-600"
          >
            Generate QR Code
          </motion.button>

          <div className="flex items-center justify-center">
            <div className="flex-grow border-t"></div>
            <span className="px-4 text-gray-500">Or</span>
            <div className="flex-grow border-t"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Paypal ID
              </label>
              <input
                type="text"
                placeholder="Name"
                className="rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-3 border"
              />
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your data will be encrypted and is 100% safe with us
            </div>

            <div className="mb-4 text-sm text-center text-gray-600">
              Amount to be added: ₹{parseFloat(amount).toFixed(2)}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full rounded-xl bg-[#00A9FF] p-3 text-white transition-colors hover:bg-blue-600"
            >
              Verify and Pay
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
};

const NetBankingForm = ({ onBack, onSuccess, amount }) => {
  const banks = [
    { id: 1, name: "HDFC", logo: "https://example.com/hdfc.png" },
    { id: 2, name: "Kotak", logo: "https://example.com/kotak.png" },
    { id: 3, name: "SBI", logo: "https://example.com/sbi.png" },
    { id: 4, name: "Axis", logo: "https://example.com/axis.png" },
    { id: 5, name: "ICICI", logo: "https://example.com/icici.png" },
    { id: 6, name: "HSBC", logo: "https://example.com/hsbc.png" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your payment processing logic here
    // On successful payment:
    onSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="hover:text-gray-800 flex items-center text-gray-600"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-[#000066]">Net Banking</h3>
          <p className="text-sm text-gray-600">
            Pay directly from your bank account with ease.
          </p>
        </div>
        <div className="rounded-xl bg-[#E3F2FF] p-3">
          <FaUniversity className="text-3xl text-[#00A9FF]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="rounded-xl hover:bg-gray-50 flex items-center p-3 space-x-3 border cursor-pointer"
          >
            <input
              type="radio"
              name="bank"
              id={bank.name}
              className="w-4 h-4 text-blue-500"
            />
            <label
              htmlFor={bank.name}
              className="flex items-center cursor-pointer"
            >
              <span className="ml-2">{bank.name}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="relative">
        <select className="rounded-xl w-full p-3 pr-10 bg-white border appearance-none">
          <option value="">Other Banks ▼</option>
          {/* Add more banks as options */}
        </select>
      </div>

      <div className="mb-4 text-sm text-center text-gray-600">
        Amount to be added: ₹{parseFloat(amount).toFixed(2)}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full rounded-xl bg-[#00A9FF] p-3 text-white transition-colors hover:bg-blue-600"
      >
        Pay Now
      </motion.button>
    </motion.div>
  );
};

const UPIForm = ({ onBack, onSuccess, amount }) => {
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();
  };

  // Standard UPI payment string format
  const upiPaymentString = `upi://pay?pa=your-merchant-vpa@upi&pn=MallEz&am=${amount}&cu=INR&tn=Wallet Recharge`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="hover:text-gray-800 flex items-center text-gray-600"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-[#000066]">Scan & Pay</h3>
          <p className="text-sm text-gray-600">
            Scan the QR code using any UPI app on your mobile phone to pay
          </p>
        </div>
        <div className="rounded-xl bg-[#E3F2FF] p-3">
          <svg
            className="h-8 w-8 text-[#00A9FF]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z" />
          </svg>
        </div>
      </div>

      {showQR ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-xl p-4 bg-white shadow-lg">
            <QRCodeSVG
              value={upiPaymentString}
              size={200}
              level="H"
              includeMargin={true}
              className="w-full h-full"
            />
          </div>
          <p className="text-sm text-center text-gray-600">
            Scan this QR code with any UPI app
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <img
              src="/path-to-gpay-icon.png"
              alt="Google Pay"
              className="h-8"
            />
            <img
              src="/path-to-phonepe-icon.png"
              alt="PhonePe"
              className="h-8"
            />
            <img src="/path-to-paytm-icon.png" alt="Paytm" className="h-8" />
          </div>
          <button
            onClick={() => setShowQR(false)}
            className="hover:text-blue-600 text-blue-500"
          >
            Enter UPI ID instead
          </button>
        </div>
      ) : (
        <>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQR(true)}
            className="w-full rounded-xl bg-[#00A9FF] p-3 text-white transition-colors hover:bg-blue-600"
          >
            Generate QR Code
          </motion.button>

          <div className="flex items-center justify-center">
            <div className="flex-grow border-t"></div>
            <span className="px-4 text-gray-500">Or</span>
            <div className="flex-grow border-t"></div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              UPI ID / VPN
            </label>
            <input
              type="text"
              placeholder="Enter UPI ID"
              className="rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full p-3 border"
            />
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Your ID will be encrypted and is 100% safe with us
          </div>

          <div className="mb-4 text-sm text-center text-gray-600">
            Amount to be added: ₹{parseFloat(amount).toFixed(2)}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="w-full rounded-xl bg-[#00A9FF] p-3 text-white transition-colors hover:bg-blue-600"
          >
            Verify and Pay
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);
  const [showNetBanking, setShowNetBanking] = useState(false);
  const [showUPI, setShowUPI] = useState(false);

  const paymentMethods = [
    { id: 1, name: "Debit / Credit Card", icon: <FaCreditCard /> },
    { id: 2, name: "Net Banking", icon: <FaUniversity /> },
    { id: 3, name: "Paypal", icon: <FaPaypal /> },
    { id: 4, name: "UPI", icon: <FaRupeeSign /> },
  ];

  const handleSuccessfulPayment = () => {
    const newBalance = parseFloat(balance) + parseFloat(amount);
    setBalance(newBalance);
    setAmount("");
    toast.success("Recharge successful!");
    setShowCreditCard(false);
    setShowPaypal(false);
    setShowNetBanking(false);
    setShowUPI(false);
  };

  const validateAmount = (value) => {
    if (value < 0) return "0";
    if (value > 100000) return "100000";
    return value;
  };

  const handleAmountChange = (e) => {
    const value = validateAmount(e.target.value);
    setAmount(value);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  const handleMethodClick = (methodId) => {
    if (methodId === 1) setShowCreditCard(true);
    if (methodId === 2) setShowNetBanking(true);
    if (methodId === 3) setShowPaypal(true);
    if (methodId === 4) setShowUPI(true);
  };

  const handleRecharge = async (e) => {
    e.preventDefault();
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }
    if (parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (parseFloat(amount) > 100000) {
      toast.error("Amount cannot exceed ₹100,000");
      return;
    }
  };

  return (
    <motion.div
      key="recharge"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="bg-mainBackgroundColor font-poppins flex flex-col min-h-screen pt-20"
    >
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="md:py-16 flex flex-col items-center justify-center flex-grow px-4 py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-opacity-90 md:max-w-2xl md:p-8 w-full max-w-md p-4 bg-white shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {!showCreditCard && !showPaypal && !showNetBanking && !showUPI ? (
              <motion.form
                key="payment-selection"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleRecharge}
                className="space-y-6"
              >
                <h2 className="text-mainTextColor md:text-3xl text-2xl font-bold text-center">
                  Recharge Wallet
                </h2>
                <div className="rounded-2xl md:p-6 p-4 text-center text-white bg-blue-500">
                  <div className="opacity-90 md:text-lg mb-2 text-base">
                    Current Balance
                  </div>
                  <div className="md:text-4xl flex items-center justify-center text-3xl font-bold">
                    <FaRupeeSign className="md:text-3xl mr-1 text-2xl" />
                    {balance.toFixed(2)}
                  </div>
                </div>

                <div className="relative">
                  <FaWallet className="left-3 top-1/2 absolute text-gray-400 -translate-y-1/2" />
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 md:text-base w-full p-2 pl-10 text-sm border rounded-full"
                    placeholder="Enter amount to add"
                    required
                    min="0"
                    max="100000"
                  />
                </div>

                {amount && (
                  <div className="text-sm text-center text-gray-600">
                    New Balance will be: ₹
                    {(parseFloat(balance) + parseFloat(amount || 0)).toFixed(2)}
                  </div>
                )}

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        if (!amount) {
                          toast.error("Please enter an amount first");
                          return;
                        }
                        handleMethodClick(method.id);
                      }}
                      className="hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:p-3 md:text-base flex items-center w-full p-2 px-4 text-sm transition-colors bg-white border border-gray-200 rounded-full"
                    >
                      <span className="mr-3 text-blue-500">{method.icon}</span>
                      <span className="text-gray-700">{method.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.form>
            ) : showCreditCard ? (
              <CreditCardForm
                onBack={() => setShowCreditCard(false)}
                onSuccess={handleSuccessfulPayment}
                amount={amount}
              />
            ) : showPaypal ? (
              <PaypalForm
                onBack={() => setShowPaypal(false)}
                onSuccess={handleSuccessfulPayment}
                amount={amount}
              />
            ) : showNetBanking ? (
              <NetBankingForm
                onBack={() => setShowNetBanking(false)}
                onSuccess={handleSuccessfulPayment}
                amount={amount}
              />
            ) : (
              <UPIForm
                onBack={() => setShowUPI(false)}
                onSuccess={handleSuccessfulPayment}
                amount={amount}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Recharge;
