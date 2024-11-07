import React, { useState } from "react";
import { motion } from "framer-motion";

const FoodMenu = ({
  foodMenu,
  selectedVariants,
  setSelectedVariants,
  handleAddToCart,
  cart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState({});
  const categories = ["All", "Combos", "Snacks", "Beverages"];

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

      {/* Search and Sort Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option>Sort by Price</option>
          <option>Sort by Popularity</option>
          <option>Sort by Name</option>
        </select>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredMenu.map((item) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            key={item.id}
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
          >
            {/* Discount Badge */}
            {item.discount && (
              <div className="absolute right-0 top-4 z-10 rounded-l-lg bg-red-500 px-3 py-1 text-sm font-bold text-white">
                {item.discount}% OFF
              </div>
            )}

            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-white">
                    ₹{item.price}
                    {item.discount && (
                      <span className="ml-2 text-sm line-through opacity-70">
                        ₹{Math.round(item.price * (1 + item.discount / 100))}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <p className="mb-4 text-gray-600">{item.description}</p>

              {/* Variants Selection */}
              <div className="mb-4 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Select Variant
                </label>
                <select
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  onChange={(e) =>
                    setSelectedVariants({
                      ...selectedVariants,
                      [item.id]: e.target.value,
                    })
                  }
                >
                  {item.variants.map((variant) => (
                    <option key={variant} value={variant}>
                      {variant}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex flex-1 items-center justify-center rounded-lg bg-gray-100 p-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-3 text-xl text-gray-500 hover:text-blue-600"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">
                    {quantities[item.id] || 1}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-3 text-xl text-gray-500 hover:text-blue-600"
                  >
                    +
                  </button>
                </div>
                <button
                  className="flex-1 transform rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                  onClick={() => handleAddToCartWithQuantity(item)}
                >
                  Add to Cart
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
                  {item.prepTime || "15-20"} mins
                </span>
                {item.bestSeller && (
                  <span className="flex items-center">
                    <svg
                      className="mr-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Bestseller
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
