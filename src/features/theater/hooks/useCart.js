import { useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});

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

  const updateCartItemQuantity = (itemId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    const foodTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    return { foodTotal, total: foodTotal };
  };

  return {
    cart,
    selectedVariants,
    setSelectedVariants,
    handleAddToCart,
    updateCartItemQuantity,
    removeFromCart,
    calculateTotal,
  };
};
