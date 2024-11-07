export const FOOD_MENU = [
  {
    id: 1,
    name: "Popcorn Combo",
    price: 350,
    image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=300",
    description: "Large Popcorn + 2 Coke",
    variants: ["Salted", "Caramel", "Cheese"],
    category: "Combos",
    discount: 10,
    prepTime: "10-15",
    bestSeller: true,
  },
  {
    id: 2,
    name: "Nachos",
    price: 200,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300",
    description: "Crispy Nachos with Cheese Sauce",
    variants: ["Cheese", "Spicy", "Regular"],
    category: "Snacks",
    prepTime: "12-15",
    bestSeller: false,
  },
  // ... other menu items
];

export const STEPS = ["Enter Details", "Add Food", "Payment"];

export const CATEGORIES = ["All", "Combos", "Snacks", "Beverages"];

export const SHOW_TIMES = ["10:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"];

export const AUDITORIUMS = [
  { id: 1, name: "Audi 1", feature: "Dolby Atmos" },
  { id: 2, name: "Audi 2", feature: "4K Screen" },
  { id: 3, name: "Audi 3", feature: "IMAX" },
];
