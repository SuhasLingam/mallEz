import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFirebaseImage } from "../../features/theater/hooks/useFirebaseImage";

const FoodMenuItem = ({ item, ...props }) => {
  const { imageUrl, loading } = useFirebaseImage(item.imageUrl, "concession");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      key={item.id}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-gray-200" />
        ) : (
          <img
            src={imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{item.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-white">₹{item.price}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="mb-4 text-gray-600">{item.description}</p>

        {/* Variants Selection */}
        {item.variants?.length > 0 && (
          <div className="mb-4 space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Variant
            </label>
            <select
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              onChange={(e) =>
                props.setSelectedVariants({
                  ...props.selectedVariants,
                  [item.id]: e.target.value,
                })
              }
              value={props.selectedVariants[item.id] || item.variants[0]}
            >
              {item.variants.map((variant) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex flex-1 items-center justify-center rounded-lg bg-gray-100 p-2">
            <button
              onClick={() => props.handleQuantityChange(item.id, -1)}
              className="px-3 text-xl text-gray-500 hover:text-blue-600"
            >
              -
            </button>
            <span className="w-8 text-center">
              {props.quantities[item.id] || 1}
            </span>
            <button
              onClick={() => props.handleQuantityChange(item.id, 1)}
              className="px-3 text-xl text-gray-500 hover:text-blue-600"
            >
              +
            </button>
          </div>
          <button
            className="flex-1 transform rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => props.handleAddToCartWithQuantity(item)}
            disabled={!item.isAvailable}
          >
            {item.isAvailable ? "Add to Cart" : "Not Available"}
          </button>
        </div>

        {/* Additional Features */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <svg
              className="mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            15-20 mins
          </span>
          {item.isAvailable && (
            <span className="flex items-center text-green-600">
              <svg
                className="mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Available
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FoodMenu = ({
  foodMenu,
  selectedVariants,
  setSelectedVariants,
  handleAddToCart,
  cart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState({});

  // Extract unique categories from the food menu
  const categories = ["All", ...new Set(foodMenu.map((item) => item.category))];

  const filteredMenu =
    selectedCategory === "All"
      ? foodMenu
      : foodMenu.filter((item) => item.category === selectedCategory);

  const handleQuantityChange = (itemId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change),
    }));
  };

  const handleAddToCartWithQuantity = (item) => {
    const quantity = quantities[item.id] || 1;
    for (let i = 0; i < quantity; i++) {
      handleAddToCart(item);
    }
    setQuantities((prev) => ({ ...prev, [item.id]: 1 })); // Reset quantity after adding to cart
  };

  if (!foodMenu?.length) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg bg-gray-50">
        <p className="text-gray-500">No concessions available at this time</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Navigation */}
      <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`transform rounded-full px-6 py-2 font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredMenu.map((item) => (
          <FoodMenuItem
            key={item.id}
            item={item}
            selectedVariants={selectedVariants}
            setSelectedVariants={setSelectedVariants}
            handleAddToCart={handleAddToCart}
            quantities={quantities}
            handleQuantityChange={handleQuantityChange}
            handleAddToCartWithQuantity={handleAddToCartWithQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
