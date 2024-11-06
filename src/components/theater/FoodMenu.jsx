import React from "react";

const FoodMenu = ({
  foodMenu,
  selectedVariants,
  setSelectedVariants,
  handleAddToCart,
  cart,
}) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {foodMenu.map((item) => (
      <div key={item.id} className="rounded-lg border p-4 shadow">
        <img
          src={item.image}
          alt={item.name}
          className="mb-4 h-40 w-full rounded-lg object-cover"
        />
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="mb-2 text-gray-600">₹{item.price}</p>
        <select
          className="mb-2 w-full rounded border p-2"
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
        <button
          className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
          onClick={() => handleAddToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    ))}
  </div>
);

export default FoodMenu;
