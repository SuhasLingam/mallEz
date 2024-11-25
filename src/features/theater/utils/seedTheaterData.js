import { collection, doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/firebaseConfig";

const DUMMY_THEATER_DATA = [
  {
    id: "pvr-cinemas",
    title: "PVR Cinemas",
    description: "India's largest theater chain",
    logo: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300",
    locations: [
      {
        id: "pvr-forum",
        name: "PVR Forum Mall",
        imageUrl:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3",
        address: "Forum Mall, Koramangala, Bangalore",
        features: ["Dolby Atmos", "4K Screen", "IMAX"],
        screens: [
          {
            id: "screen-1",
            name: "Audi 1",
            capacity: 120,
            features: ["Dolby Atmos", "4K"],
            seatLayout: {
              rows: 10,
              seatsPerRow: 12,
              unavailableSeats: ["A1", "A2"],
            },
          },
          {
            id: "screen-2",
            name: "Audi 2",
            capacity: 150,
            features: ["IMAX", "4K"],
            seatLayout: {
              rows: 12,
              seatsPerRow: 15,
              unavailableSeats: ["B1", "B2"],
            },
          },
        ],
        currentMovies: [
          {
            id: "movie-1",
            movieId: "mov123",
            movieName: "Avengers: Endgame",
            imageUrl: "theater_images/movies/avengers.jpg",
            showTimes: [
              {
                time: "10:00",
                screen: "Audi 1",
                price: 250,
                availableSeats: 100,
              },
              {
                time: "14:30",
                screen: "Audi 2",
                price: 300,
                availableSeats: 120,
              },
              {
                time: "18:45",
                screen: "Audi 1",
                price: 250,
                availableSeats: 110,
              },
              {
                time: "22:15",
                screen: "Audi 2",
                price: 300,
                availableSeats: 150,
              },
            ],
          },
        ],
        concessions: [
          {
            id: "food-1",
            name: "Popcorn Combo",
            imageUrl:
              "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=300",
            price: 350,
            description: "Large Popcorn + 2 Coke",
            category: "Combos",
            variants: ["Salted", "Caramel", "Cheese"],
            isAvailable: true,
          },
          {
            id: "food-2",
            name: "Nachos",
            imageUrl:
              "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300",
            price: 200,
            description: "Crispy Nachos with Cheese Sauce",
            category: "Snacks",
            variants: ["Cheese", "Spicy", "Regular"],
            isAvailable: true,
          },
        ],
      },
    ],
  },
  {
    id: "inox",
    title: "INOX Cinemas",
    description: "Premium movie experience",
    logo: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300",
    locations: [
      {
        id: "inox-garuda",
        name: "INOX Garuda Mall",
        imageUrl:
          "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300",
        address: "Garuda Mall, Magrath Road, Bangalore",
        features: ["4K Screen", "Recliner Seats"],
        screens: [
          {
            id: "screen-1",
            name: "Audi 1",
            capacity: 120,
            features: ["Dolby Atmos", "4K"],
            seatLayout: {
              rows: 10,
              seatsPerRow: 12,
              unavailableSeats: ["A1", "A2"],
            },
          },
          {
            id: "screen-2",
            name: "Audi 2",
            capacity: 150,
            features: ["IMAX", "4K"],
            seatLayout: {
              rows: 12,
              seatsPerRow: 15,
              unavailableSeats: ["B1", "B2"],
            },
          },
        ],
        currentMovies: [
          {
            id: "movie-1",
            movieId: "mov123",
            movieName: "Avengers: Endgame",
            imageUrl: "theater_images/movies/avengers.jpg",
            showTimes: [
              {
                time: "10:00",
                screen: "Audi 1",
                price: 250,
                availableSeats: 100,
              },
              {
                time: "14:30",
                screen: "Audi 2",
                price: 300,
                availableSeats: 120,
              },
              {
                time: "18:45",
                screen: "Audi 1",
                price: 250,
                availableSeats: 110,
              },
              {
                time: "22:15",
                screen: "Audi 2",
                price: 300,
                availableSeats: 150,
              },
            ],
          },
        ],
        concessions: [
          {
            id: "food-1",
            name: "Popcorn Combo",
            imageUrl:
              "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=300",
            price: 350,
            description: "Large Popcorn + 2 Coke",
            category: "Combos",
            variants: ["Salted", "Caramel", "Cheese"],
            isAvailable: true,
          },
          {
            id: "food-2",
            name: "Nachos",
            imageUrl:
              "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300",
            price: 200,
            description: "Crispy Nachos with Cheese Sauce",
            category: "Snacks",
            variants: ["Cheese", "Spicy", "Regular"],
            isAvailable: true,
          },
        ],
      },
    ],
  },
  {
    id: "cinepolis",
    title: "Cinepolis",
    description: "International cinema chain",
    logo: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300",
    locations: [
      {
        id: "cinepolis-nexus",
        name: "Cinepolis Nexus Mall",
        imageUrl:
          "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300",
        address: "Nexus Mall, Koramangala, Bangalore",
        features: ["IMAX", "Dolby Atmos", "VIP Seats"],
        screens: [
          {
            id: "screen-1",
            name: "Audi 1",
            capacity: 120,
            features: ["Dolby Atmos", "4K"],
            seatLayout: {
              rows: 10,
              seatsPerRow: 12,
              unavailableSeats: ["A1", "A2"],
            },
          },
          {
            id: "screen-2",
            name: "Audi 2",
            capacity: 150,
            features: ["IMAX", "4K"],
            seatLayout: {
              rows: 12,
              seatsPerRow: 15,
              unavailableSeats: ["B1", "B2"],
            },
          },
        ],
        currentMovies: [
          {
            id: "movie-1",
            movieId: "mov123",
            movieName: "Avengers: Endgame",
            imageUrl: "theater_images/movies/avengers.jpg",
            showTimes: [
              {
                time: "10:00",
                screen: "Audi 1",
                price: 250,
                availableSeats: 100,
              },
              {
                time: "14:30",
                screen: "Audi 2",
                price: 300,
                availableSeats: 120,
              },
              {
                time: "18:45",
                screen: "Audi 1",
                price: 250,
                availableSeats: 110,
              },
              {
                time: "22:15",
                screen: "Audi 2",
                price: 300,
                availableSeats: 150,
              },
            ],
          },
        ],
        concessions: [
          {
            id: "food-1",
            name: "Popcorn Combo",
            imageUrl:
              "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=300",
            price: 350,
            description: "Large Popcorn + 2 Coke",
            category: "Combos",
            variants: ["Salted", "Caramel", "Cheese"],
            isAvailable: true,
          },
          {
            id: "food-2",
            name: "Nachos",
            imageUrl:
              "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300",
            price: 200,
            description: "Crispy Nachos with Cheese Sauce",
            category: "Snacks",
            variants: ["Cheese", "Spicy", "Regular"],
            isAvailable: true,
          },
        ],
      },
    ],
  },
];

// Helper function to get image URL from Storage
const getImageUrl = async (path) => {
  try {
    const imageRef = ref(storage, path);
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error(`Error getting image URL for ${path}:`, error);
    return null;
  }
};

export const seedTheaterData = async () => {
  try {
    // Add multiple theater chains
    for (const chain of DUMMY_THEATER_DATA) {
      const chainRef = doc(db, "theaterChains", chain.id);
      await setDoc(chainRef, {
        title: chain.title,
        description: chain.description,
        logo: chain.logo,
      });

      // Add locations for each chain
      for (const location of chain.locations) {
        const locationRef = doc(chainRef, "locations", location.id);
        await setDoc(locationRef, {
          name: location.name,
          imageUrl: location.imageUrl,
          address: location.address,
          features: location.features,
        });

        // Add screens
        for (const screen of location.screens) {
          await setDoc(doc(locationRef, "screens", screen.id), screen);
        }

        // Add current movies
        for (const movie of location.currentMovies) {
          await setDoc(doc(locationRef, "currentMovies", movie.id), movie);
        }

        // Add concessions
        for (const food of location.concessions) {
          await setDoc(doc(locationRef, "concessions", food.id), food);
        }
      }
    }

    console.log("Dummy data added successfully!");
  } catch (error) {
    console.error("Error adding dummy data:", error);
    throw error;
  }
};
