export const destinations = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518548419070-ad8e3d53b94c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
    ],
    price: 850,
    rating: 4.8,
    reviewsCount: 1240,
    category: "Beach",
    tags: ["Beach", "Culture", "Relaxation", "Adventure"],
    description: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.",
    bestTime: "April to October",
    averageBudget: "Medium",
    duration: "7 Days",
    weather: {
      temp: "29°C",
      condition: "Sunny",
      humidity: "75%",
      wind: "12 km/h"
    },
    attractions: [
      { name: "Ubud Monkey Forest", image: "https://images.unsplash.com/photo-1518548419070-ad8e3d53b94c?auto=format&fit=crop&w=300&q=80" },
      { name: "Tanah Lot Temple", image: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&w=300&q=80" },
      { name: "Uluwatu Cliff Temple", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&q=80" }
    ],
    tips: [
      "Respect local customs and dress modestly when visiting temples.",
      "Always drink bottled or filtered water.",
      "Rent a scooter for cheap and flexible transportation, but drive carefully!"
    ],
    coordinates: { x: 35, y: 70 } // Relative percentage coordinates for static map SVG
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522083165195-3427502977a1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80"
    ],
    price: 1200,
    rating: 4.9,
    reviewsCount: 3105,
    category: "City",
    tags: ["City", "Culture", "Romantic", "Luxury"],
    description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.",
    bestTime: "June to August",
    averageBudget: "Luxury",
    duration: "5 Days",
    weather: {
      temp: "22°C",
      condition: "Partly Cloudy",
      humidity: "60%",
      wind: "8 km/h"
    },
    attractions: [
      { name: "Eiffel Tower", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=300&q=80" },
      { name: "Louvre Museum", image: "https://images.unsplash.com/photo-1522083165195-3427502977a1?auto=format&fit=crop&w=300&q=80" },
      { name: "Arc de Triomphe", image: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=300&q=80" }
    ],
    tips: [
      "Book museum tickets online in advance to skip hours of queues.",
      "Learn basic French phrases like 'Bonjour' and 'Merci'.",
      "Use the Metro; it is incredibly fast, clean, and covers the entire city."
    ],
    coordinates: { x: 42, y: 35 }
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
    ],
    price: 1100,
    rating: 4.7,
    reviewsCount: 980,
    category: "Romantic",
    tags: ["Beach", "Romantic", "Relaxation", "Luxury"],
    description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.",
    bestTime: "September to October",
    averageBudget: "Luxury",
    duration: "4 Days",
    weather: {
      temp: "26°C",
      condition: "Sunny",
      humidity: "55%",
      wind: "18 km/h"
    },
    attractions: [
      { name: "Oia Sunset Viewpoint", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=300&q=80" },
      { name: "Red Beach", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80" },
      { name: "Akrotiri Archaeological Site", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=300&q=80" }
    ],
    tips: [
      "Walk down the steps from Oia to Amoudi Bay for fresh seafood.",
      "Stay in Fira or Imerovigli for more budget-friendly caldera views.",
      "Wear good walking shoes; the cobblestone stairs can be slippery."
    ],
    coordinates: { x: 48, y: 45 }
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528702748617-c64d494307ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1489516408517-0c0a15662682?auto=format&fit=crop&w=800&q=80"
    ],
    price: 1500,
    rating: 4.6,
    reviewsCount: 1450,
    category: "Luxury",
    tags: ["Luxury", "City", "Adventure", "Family"],
    description: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture, and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline.",
    bestTime: "November to March",
    averageBudget: "Luxury",
    duration: "6 Days",
    weather: {
      temp: "34°C",
      condition: "Clear Sky",
      humidity: "40%",
      wind: "10 km/h"
    },
    attractions: [
      { name: "Burj Khalifa", image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=300&q=80" },
      { name: "The Dubai Mall", image: "https://images.unsplash.com/photo-1528702748617-c64d494307ca?auto=format&fit=crop&w=300&q=80" },
      { name: "Desert Safari Dunes", image: "https://images.unsplash.com/photo-1489516408517-0c0a15662682?auto=format&fit=crop&w=300&q=80" }
    ],
    tips: [
      "Dress respectfully in public areas (shoulders and knees covered).",
      "The metro system is clean, fast, and very cost-effective.",
      "Check out the Gold and Spice Souks in Deira for old-world Dubai charm."
    ],
    coordinates: { x: 55, y: 50 }
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490761902450-974dd8b8d846?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
    ],
    price: 980,
    rating: 4.9,
    reviewsCount: 1890,
    category: "Culture",
    tags: ["Culture", "City", "Relaxation", "Nature"],
    description: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines, and traditional wooden houses.",
    bestTime: "October to November / April",
    averageBudget: "Medium",
    duration: "8 Days",
    weather: {
      temp: "18°C",
      condition: "Sunny",
      humidity: "50%",
      wind: "6 km/h"
    },
    attractions: [
      { name: "Fushimi Inari Shrine", image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=300&q=80" },
      { name: "Kinkaku-ji (Golden Pavilion)", image: "https://images.unsplash.com/photo-1490761902450-974dd8b8d846?auto=format&fit=crop&w=300&q=80" },
      { name: "Arashiyama Bamboo Grove", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80" }
    ],
    tips: [
      "Get to popular spots like Fushimi Inari at sunrise to avoid crowds.",
      "Get an ICOCA/SUICA card for seamless subway, bus, and convenience store payments.",
      "Always carry cash, as small traditional stores do not accept credit cards."
    ],
    coordinates: { x: 70, y: 48 }
  },
  {
    id: "switzerland",
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
    ],
    price: 1400,
    rating: 4.9,
    reviewsCount: 1120,
    category: "Mountain",
    tags: ["Mountain", "Nature", "Adventure", "Luxury"],
    description: "The Swiss Alps form part of the Alps mountain range, offering majestic snowy peaks, pristine crystal lakes, and quaint mountain villages. Perfect for skiers in winter and hikers in summer.",
    bestTime: "June to September / December to March",
    averageBudget: "Luxury",
    duration: "7 Days",
    weather: {
      temp: "14°C",
      condition: "Rainy/Windy",
      humidity: "80%",
      wind: "15 km/h"
    },
    attractions: [
      { name: "Matterhorn", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=300&q=80" },
      { name: "Interlaken Lakes", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80" },
      { name: "Jungfraujoch - Top of Europe", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300&q=80" }
    ],
    tips: [
      "Purchase a Swiss Travel Pass for unlimited train, bus, and boat rides.",
      "Supermarkets like Coop and Migros are ideal for budget meals.",
      "Always check the peak mountain webcams before buying cable car tickets."
    ],
    coordinates: { x: 43, y: 39 }
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80"
    ],
    price: 1800,
    rating: 4.9,
    reviewsCount: 750,
    category: "Beach",
    tags: ["Beach", "Romantic", "Relaxation", "Luxury"],
    description: "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It's known for beaches, blue lagoons, and extensive reefs.",
    bestTime: "November to April",
    averageBudget: "Luxury",
    duration: "5 Days",
    weather: {
      temp: "31°C",
      condition: "Sunny",
      humidity: "70%",
      wind: "9 km/h"
    },
    attractions: [
      { name: "Male City Mosque", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=300&q=80" },
      { name: "Banana Reef Diving", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80" },
      { name: "Vaadhoo Island bioluminescent beach", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=300&q=80" }
    ],
    tips: [
      "Seaplanes only fly during daylight hours, so schedule flights accordingly.",
      "The Maldives is a Muslim country, alcohol is restricted to private resort islands.",
      "Bring coral-safe reef-friendly sunscreen to protect marine ecosystems."
    ],
    coordinates: { x: 57, y: 65 }
  },
  {
    id: "new-york",
    name: "New York City",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
    ],
    price: 1300,
    rating: 4.8,
    reviewsCount: 2840,
    category: "City",
    tags: ["City", "Culture", "Adventure", "Family"],
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial, and cultural centers.",
    bestTime: "September to November",
    averageBudget: "Luxury",
    duration: "5 Days",
    weather: {
      temp: "20°C",
      condition: "Sunny",
      humidity: "50%",
      wind: "11 km/h"
    },
    attractions: [
      { name: "Times Square", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=300&q=80" },
      { name: "Central Park", image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=300&q=80" },
      { name: "Empire State Building", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80" }
    ],
    tips: [
      "Get a MetroCard or use OMNY contactless tap to ride the subway.",
      "Tipping 18-20% is customary in sit-down restaurants and bars.",
      "Walk the High Line for an elevated urban park experience."
    ],
    coordinates: { x: 28, y: 38 }
  }
];
