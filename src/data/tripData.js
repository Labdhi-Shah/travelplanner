/**
 * Static / Mock Data for Plan My Trip System
 * Frontend-only travel planning dataset with authentic details, images, and pricing in INR (₹).
 */

export const DESTINATIONS = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 1240,
    price: 850,
    airportCode: "DPS",
    airportCity: "Denpasar, Bali",
    description: "Tropical paradise known for iconic rice terraces, cliffside temples, pristine beaches, and vibrant culture.",
    highlights: ["Ubud Rice Terraces", "Uluwatu Sunset Temple", "Nusa Penida Cliffs", "Seminyak Beach Club"]
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    category: "City",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 2180,
    price: 950,
    airportCode: "DXB",
    airportCity: "Dubai",
    description: "Futuristic metropolis boasting dazzling skyscrapers, world-class luxury shopping, desert safaris, and beach resorts.",
    highlights: ["Burj Khalifa Sky Deck", "Desert Safari with BBQ", "Dubai Marina Yacht Cruise", "Palm Jumeirah"]
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    category: "City",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 3105,
    price: 1200,
    airportCode: "CDG",
    airportCity: "Paris",
    description: "The City of Light famed for haute cuisine, high fashion, legendary art museums, and timeless romantic architecture.",
    highlights: ["Eiffel Tower Summit", "Louvre Guided Art Tour", "Seine River Dinner Cruise", "Montmartre Bohemian Walk"]
  },
  {
    id: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 1890,
    price: 1400,
    airportCode: "ZRH",
    airportCity: "Zurich / Interlaken",
    description: "Breathtaking Alpine vistas, snow-capped peaks, crystal alpine lakes, scenic panoramic trains, and historic chalets.",
    highlights: ["Jungfraujoch Top of Europe", "Interlaken Lake Cruise", "Matterhorn Glaciers", "Scenic Alpine Express"]
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 1540,
    price: 1600,
    airportCode: "MLE",
    airportCity: "Male",
    description: "Crystal-clear turquoise atolls, pristine overwater villas, vibrant coral reefs, and sublime tropical serenity.",
    highlights: ["Overwater Bungalow Stay", "Manta Ray Coral Snorkel", "Private Sandbank Picnic", "Sunset Dolphin Safari"]
  },
  {
    id: "london",
    name: "London",
    country: "UK",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 2650,
    price: 1100,
    airportCode: "LHR",
    airportCity: "London",
    description: "Historic royal landmarks, legendary West End musicals, bustling riverside markets, and world-renowned museums.",
    highlights: ["Tower of London & Crown Jewels", "London Eye Scenic Flight", "West End Musical Experience", "British Museum"]
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 1980,
    price: 1050,
    airportCode: "KIX",
    airportCity: "Osaka / Kyoto",
    description: "Thousands of classical Buddhist temples, serene bamboo groves, traditional wooden machiya houses, and geisha traditions.",
    highlights: ["Fushimi Inari Torii Gates", "Arashiyama Bamboo Grove", "Kinkaku-ji Golden Pavilion", "Traditional Tea Ceremony"]
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviewsCount: 3420,
    price: 450,
    airportCode: "GOI",
    airportCity: "Goa",
    description: "Sun-drenched golden beaches, Portuguese heritage architecture, vibrant beach shacks, seafood delicacies, and water sports.",
    highlights: ["Palolem & Calangute Beaches", "Old Goa Portuguese Cathedrals", "Dudhsagar Waterfall Jeep Trek", "Sunset Catamaran Cruise"]
  }
];

export const CATEGORIES = ["All", "Beach", "City", "Mountain", "Cultural"];

export const TRIP_TYPES = [
  { id: "Solo", label: "Solo", icon: "👤", desc: "For independent explorers" },
  { id: "Couple", label: "Couple", icon: "💑", desc: "For romantic getaways" },
  { id: "Family", label: "Family", icon: "👨‍👩‍👦", desc: "Family-friendly adventure" },
  { id: "Friends", label: "Friends", icon: "👥", desc: "Group fun & memories" }
];

export const BUDGET_PRESETS = [
  { label: "₹25,000", value: 25000 },
  { label: "₹50,000", value: 50000 },
  { label: "₹75,000", value: 75000 },
  { label: "₹1,00,000+", value: 100000 },
  { label: "₹1,50,000", value: 150000 }
];

export const PREFERENCES = [
  { id: "Relaxing", label: "Relaxing", icon: "🌴" },
  { id: "Adventure", label: "Adventure", icon: "🧗" },
  { id: "Romantic", label: "Romantic", icon: "💖" },
  { id: "Family", label: "Family", icon: "👨‍👩‍👧" },
  { id: "Cultural", label: "Cultural", icon: "🏛️" },
  { id: "Shopping", label: "Shopping", icon: "🛍️" },
  { id: "Food", label: "Food", icon: "🍜" },
  { id: "Nightlife", label: "Nightlife", icon: "🍸" }
];

export const TRANSPORTS = [
  { id: "Flight", label: "Flight", icon: "✈", desc: "Speed & international reach", baseCost: 0 },
  { id: "Train", label: "Train", icon: "🚆", desc: "Scenic & relaxing transit", baseCost: 4500 },
  { id: "Bus", label: "Bus", icon: "🚌", desc: "Budget & intercity express", baseCost: 2500 },
  { id: "Car", label: "Car", icon: "🚗", desc: "Private chauffeur / rental", baseCost: 8000 }
];

export const ORIGIN_CITIES = [
  "Ahmedabad",
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Kolkata",
  "Chennai"
];

export const CABIN_CLASSES = [
  { id: "Economy", label: "Economy", multiplier: 1.0 },
  { id: "Premium Economy", label: "Premium Economy", multiplier: 1.35 },
  { id: "Business", label: "Business", multiplier: 2.2 },
  { id: "First Class", label: "First Class", multiplier: 3.4 }
];

export const MOCK_FLIGHTS = {
  bali: [
    {
      id: "fl-bali-1",
      airline: "Singapore Airlines",
      flightNumber: "SQ-504",
      departureTime: "08:15",
      arrivalTime: "15:00",
      stops: "1 Stop",
      duration: "6h 45m",
      priceAdult: 28500,
      priceChild: 21500,
      tag: "Best Value"
    },
    {
      id: "fl-bali-2",
      airline: "Garuda Indonesia",
      flightNumber: "GA-882",
      departureTime: "11:30",
      arrivalTime: "17:40",
      stops: "Non-stop",
      duration: "6h 10m",
      priceAdult: 35000,
      priceChild: 26000,
      tag: "Fastest"
    }
  ],
  dubai: [
    {
      id: "fl-dubai-1",
      airline: "Emirates",
      flightNumber: "EK-539",
      departureTime: "04:30",
      arrivalTime: "06:45",
      stops: "Non-stop",
      duration: "3h 45m",
      priceAdult: 24500,
      priceChild: 18500,
      tag: "Popular"
    },
    {
      id: "fl-dubai-2",
      airline: "Air India Express",
      flightNumber: "IX-191",
      departureTime: "19:00",
      arrivalTime: "21:35",
      stops: "Non-stop",
      duration: "3h 35m",
      priceAdult: 18500,
      priceChild: 14000,
      tag: "Budget Choice"
    }
  ],
  paris: [
    {
      id: "fl-paris-1",
      airline: "Air France",
      flightNumber: "AF-217",
      departureTime: "02:15",
      arrivalTime: "11:30",
      stops: "1 Stop",
      duration: "9h 15m",
      priceAdult: 42000,
      priceChild: 32000,
      tag: "Recommended"
    },
    {
      id: "fl-paris-2",
      airline: "Lufthansa",
      flightNumber: "LH-761",
      departureTime: "03:50",
      arrivalTime: "12:10",
      stops: "1 Stop",
      duration: "8h 50m",
      priceAdult: 48000,
      priceChild: 36000,
      tag: "Premium Service"
    }
  ],
  switzerland: [
    {
      id: "fl-swiss-1",
      airline: "Swiss International",
      flightNumber: "LX-155",
      departureTime: "01:45",
      arrivalTime: "10:30",
      stops: "1 Stop",
      duration: "9h 15m",
      priceAdult: 46000,
      priceChild: 35000,
      tag: "Top Rated"
    },
    {
      id: "fl-swiss-2",
      airline: "Qatar Airways",
      flightNumber: "QR-559",
      departureTime: "05:00",
      arrivalTime: "14:15",
      stops: "1 Stop",
      duration: "10h 15m",
      priceAdult: 39500,
      priceChild: 30000,
      tag: "Great Value"
    }
  ],
  maldives: [
    {
      id: "fl-mald-1",
      airline: "IndiGo",
      flightNumber: "6E-1127",
      departureTime: "10:10",
      arrivalTime: "13:00",
      stops: "Non-stop",
      duration: "2h 50m",
      priceAdult: 19500,
      priceChild: 15000,
      tag: "Direct Flight"
    },
    {
      id: "fl-mald-2",
      airline: "SriLankan Airlines",
      flightNumber: "UL-192",
      departureTime: "07:30",
      arrivalTime: "12:45",
      stops: "1 Stop",
      duration: "5h 15m",
      priceAdult: 16800,
      priceChild: 13000,
      tag: "Budget Friendly"
    }
  ],
  london: [
    {
      id: "fl-lon-1",
      airline: "British Airways",
      flightNumber: "BA-138",
      departureTime: "07:20",
      arrivalTime: "15:45",
      stops: "Non-stop",
      duration: "9h 25m",
      priceAdult: 49000,
      priceChild: 38000,
      tag: "Direct"
    },
    {
      id: "fl-lon-2",
      airline: "Virgin Atlantic",
      flightNumber: "VS-355",
      departureTime: "02:40",
      arrivalTime: "11:20",
      stops: "Non-stop",
      duration: "9h 40m",
      priceAdult: 45000,
      priceChild: 35000,
      tag: "Popular"
    }
  ],
  kyoto: [
    {
      id: "fl-kyo-1",
      airline: "All Nippon Airways (ANA)",
      flightNumber: "NH-830",
      departureTime: "01:30",
      arrivalTime: "14:15",
      stops: "1 Stop",
      duration: "9h 45m",
      priceAdult: 41000,
      priceChild: 31000,
      tag: "Best Service"
    },
    {
      id: "fl-kyo-2",
      airline: "Singapore Airlines",
      flightNumber: "SQ-406",
      departureTime: "23:05",
      arrivalTime: "13:20",
      stops: "1 Stop",
      duration: "11h 15m",
      priceAdult: 37500,
      priceChild: 29000,
      tag: "Value Pick"
    }
  ],
  goa: [
    {
      id: "fl-goa-1",
      airline: "IndiGo",
      flightNumber: "6E-551",
      departureTime: "09:40",
      arrivalTime: "11:20",
      stops: "Non-stop",
      duration: "1h 40m",
      priceAdult: 5800,
      priceChild: 4500,
      tag: "Morning Express"
    },
    {
      id: "fl-goa-2",
      airline: "Air India",
      flightNumber: "AI-664",
      departureTime: "16:15",
      arrivalTime: "18:00",
      stops: "Non-stop",
      duration: "1h 45m",
      priceAdult: 6500,
      priceChild: 5200,
      tag: "Evening Direct"
    }
  ]
};

export const MOCK_HOTELS = {
  bali: [
    {
      id: "ht-bali-1",
      name: "Bali Beach Resort & Spa",
      stars: 4,
      pricePerNight: 8500,
      location: "Seminyak Beachfront, Bali",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      amenities: ["Breakfast Included", "Free Wi-Fi", "Swimming Pool", "Beach Access", "Spa Center"],
      rating: 4.8
    },
    {
      id: "ht-bali-2",
      name: "Bali Luxury Resort & Cliff Villas",
      stars: 5,
      pricePerNight: 14000,
      location: "Uluwatu Cliffs, Bali",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      amenities: ["Breakfast", "Infinity Pool", "Luxury Spa", "Beach Access", "Butler Service"],
      rating: 4.9
    },
    {
      id: "ht-bali-3",
      name: "Ubud Rainforest Sanctuary Retreat",
      stars: 4,
      pricePerNight: 6800,
      location: "Ubud Valley, Bali",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      amenities: ["Breakfast Included", "River View", "Yoga Pavilion", "Free Wi-Fi", "Pool"],
      rating: 4.7
    }
  ],
  dubai: [
    {
      id: "ht-dubai-1",
      name: "Dubai Marina Grand Palace",
      stars: 4,
      pricePerNight: 9500,
      location: "Dubai Marina, UAE",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      amenities: ["Breakfast Included", "Free Wi-Fi", "Rooftop Pool", "Gym & Sauna", "Marina View"],
      rating: 4.7
    },
    {
      id: "ht-dubai-2",
      name: "Atlantis The Palm Luxury Resort",
      stars: 5,
      pricePerNight: 24000,
      location: "Palm Jumeirah, Dubai",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      amenities: ["Waterpark Access", "Private Beach", "Aquarium Access", "Breakfast", "Fine Dining"],
      rating: 4.9
    }
  ],
  paris: [
    {
      id: "ht-paris-1",
      name: "Hotel Regina Louvre Paris",
      stars: 4,
      pricePerNight: 12500,
      location: "1st Arrondissement, Paris",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      amenities: ["Breakfast Included", "Free Wi-Fi", "City View", "Concierge Service", "Bar Lounge"],
      rating: 4.8
    },
    {
      id: "ht-paris-2",
      name: "Eiffel View Palace Hotel",
      stars: 5,
      pricePerNight: 22000,
      location: "Trocadéro, Paris",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      amenities: ["Eiffel Tower Balcony View", "Michelin Dining", "Spa & Pool", "Breakfast", "Limousine"],
      rating: 4.9
    }
  ],
  switzerland: [
    {
      id: "ht-swiss-1",
      name: "Interlaken Alpine Lodge",
      stars: 4,
      pricePerNight: 11000,
      location: "Interlaken Central, Switzerland",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      amenities: ["Mountain View", "Swiss Breakfast", "Free Wi-Fi", "Ski Storage", "Sauna"],
      rating: 4.7
    },
    {
      id: "ht-swiss-2",
      name: "Grand Hotel Beau Rivage Palace",
      stars: 5,
      pricePerNight: 21500,
      location: "Jungfrau Region, Switzerland",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      amenities: ["Panoramic Glacier View", "Heated Pool", "Luxury Spa", "Gourmet Dining", "Breakfast"],
      rating: 4.9
    }
  ],
  maldives: [
    {
      id: "ht-mald-1",
      name: "Sun Siyam Vilu Lagoon Resort",
      stars: 4,
      pricePerNight: 15500,
      location: "South Nilandhe Atoll, Maldives",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
      amenities: ["Beach Villa", "All-Inclusive Breakfast", "Speedboat Transfer", "Snorkeling Gear", "Pool"],
      rating: 4.8
    },
    {
      id: "ht-mald-2",
      name: "Soneva Jani Luxury Overwater Villas",
      stars: 5,
      pricePerNight: 36000,
      location: "Noonu Atoll, Maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
      amenities: ["Private Water Slide", "Retractable Roof", "Butler Service", "Private Pool", "All Meals"],
      rating: 5.0
    }
  ],
  london: [
    {
      id: "ht-lon-1",
      name: "The Kensington Heritage Hotel",
      stars: 4,
      pricePerNight: 11800,
      location: "South Kensington, London",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      amenities: ["English Breakfast", "Free High-Speed Wi-Fi", "Underground 2 Min", "Fitness Room"],
      rating: 4.7
    },
    {
      id: "ht-lon-2",
      name: "The Mayfair Luxury Landmark",
      stars: 5,
      pricePerNight: 24500,
      location: "Mayfair, Central London",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      amenities: ["Afternoon High Tea", "Spa & Wellness Club", "Chauffeur Service", "Gourmet Restaurant"],
      rating: 4.9
    }
  ],
  kyoto: [
    {
      id: "ht-kyo-1",
      name: "Kyoto Ryokan Gion Garden",
      stars: 4,
      pricePerNight: 8900,
      location: "Gion Historical District, Kyoto",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      amenities: ["Traditional Tatami", "Onsen Hot Baths", "Japanese Breakfast", "Tea Garden", "Yukata Provided"],
      rating: 4.9
    },
    {
      id: "ht-kyo-2",
      name: "The Thousand Kyoto Modern Luxury",
      stars: 5,
      pricePerNight: 17500,
      location: "Shimogyo Ward, Kyoto",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      amenities: ["Architectural Design", "Zen Spa", "Fine Dining", "Breakfast Buffet", "Close to Station"],
      rating: 4.8
    }
  ],
  goa: [
    {
      id: "ht-goa-1",
      name: "Goa Beachfront Palms Resort",
      stars: 4,
      pricePerNight: 4800,
      location: "Candolim Beach, Goa",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      amenities: ["Buffet Breakfast", "Free Wi-Fi", "Swimming Pool", "Direct Beach Walk", "Live Music"],
      rating: 4.6
    },
    {
      id: "ht-goa-2",
      name: "Taj Exotica Heritage & Spa",
      stars: 5,
      pricePerNight: 13500,
      location: "Benaulim, South Goa",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      amenities: ["56-acre Mediterranean Estate", "Jiva Spa", "Golf Greens", "Seafood Grill", "Private Beach"],
      rating: 4.9
    }
  ]
};

export const MOCK_ACTIVITIES = {
  bali: [
    {
      id: "act-bali-1",
      name: "Ubud Cultural Tour & Sacred Monkey Forest",
      shortDescription: "Explore lush rice terraces, ancient monkey sanctuaries, and local craft villages.",
      pricePerPerson: 3200,
      duration: "Full Day (8 hrs)",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=600&q=80",
      tag: "Popular"
    },
    {
      id: "act-bali-2",
      name: "Nusa Penida Island & Snorkeling Tour",
      shortDescription: "Fast boat cruise to Kelingking T-Rex cliff, Crystal Bay, and manta ray snorkeling.",
      pricePerPerson: 4500,
      duration: "Full Day (9 hrs)",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
      tag: "Must Visit"
    },
    {
      id: "act-bali-3",
      name: "Iconic Bali Jungle Swing & Coffee Plantation",
      shortDescription: "Fly high over tropical palm valleys for iconic photos and taste Luwak coffee.",
      pricePerPerson: 2000,
      duration: "Half Day (4 hrs)",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tag: "Instagram Spot"
    },
    {
      id: "act-bali-4",
      name: "Tanah Lot & Uluwatu Sunset Temple Tour",
      shortDescription: "Witness magical ocean wave temples and the enchanting Kecak fire dance.",
      pricePerPerson: 2500,
      duration: "Evening (5 hrs)",
      image: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?auto=format&fit=crop&w=600&q=80",
      tag: "Cultural"
    },
    {
      id: "act-bali-5",
      name: "Seminyak Beach Day & Water Sports",
      shortDescription: "Jet ski, parasailing, and banana boat rides followed by chilled sunset lounge drinks.",
      pricePerPerson: 2800,
      duration: "Half Day (4 hrs)",
      image: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&w=600&q=80",
      tag: "Adventure"
    },
    {
      id: "act-bali-6",
      name: "Luxury Catamaran Sunset Dinner Cruise",
      shortDescription: "Sail the Bali coast with a gourmet international buffet, live band, and sunset views.",
      pricePerPerson: 5200,
      duration: "Evening (4 hrs)",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
      tag: "Romantic"
    }
  ],
  dubai: [
    {
      id: "act-dubai-1",
      name: "Burj Khalifa 124th & 125th Floor Observation Deck",
      shortDescription: "Ascend the world's tallest building in a high-speed elevator for 360° views.",
      pricePerPerson: 3800,
      duration: "2-3 hrs",
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80",
      tag: "Iconic"
    },
    {
      id: "act-dubai-2",
      name: "Premium Desert Safari with BBQ & Dune Bashing",
      shortDescription: "4x4 sand dune bashing, camel rides, quad biking, and Arabian BBQ banquet with belly dance.",
      pricePerPerson: 4200,
      duration: "Evening (6 hrs)",
      image: "https://images.unsplash.com/photo-1489516408517-0c0a15662682?auto=format&fit=crop&w=600&q=80",
      tag: "Top Rated"
    },
    {
      id: "act-dubai-3",
      name: "Dubai Marina Luxury Yacht Cruise with Dinner",
      shortDescription: "Glaze through lit skyscraper channels on an air-conditioned luxury vessel.",
      pricePerPerson: 5500,
      duration: "Evening (3 hrs)",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      tag: "Luxury"
    },
    {
      id: "act-dubai-4",
      name: "Aquaventure Waterpark & Lost Chambers Aquarium",
      shortDescription: "World-record thrilling water slides and 65,000 marine creature underwater tunnel.",
      pricePerPerson: 6500,
      duration: "Full Day (7 hrs)",
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=600&q=80",
      tag: "Family Fun"
    }
  ],
  paris: [
    {
      id: "act-paris-1",
      name: "Eiffel Tower Summit Skip-the-Line Access",
      shortDescription: "Priority lift directly to the summit platform overlooking all of Paris.",
      pricePerPerson: 4200,
      duration: "3 hrs",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
      tag: "Must Do"
    },
    {
      id: "act-paris-2",
      name: "Louvre Museum Masterpieces Guided Tour",
      shortDescription: "Skip the line and behold Mona Lisa, Venus de Milo, and Winged Victory.",
      pricePerPerson: 4800,
      duration: "Half Day (3.5 hrs)",
      image: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=600&q=80",
      tag: "Cultural"
    },
    {
      id: "act-paris-3",
      name: "Seine River Romantic 3-Course Dinner Cruise",
      shortDescription: "Sip French wine while gliding past illuminated monuments at night.",
      pricePerPerson: 6000,
      duration: "Evening (3 hrs)",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
      tag: "Romantic"
    },
    {
      id: "act-paris-4",
      name: "Palace of Versailles Guided Day Excursion",
      shortDescription: "Hall of Mirrors, Royal King Chambers, and magnificent classical fountains.",
      pricePerPerson: 5500,
      duration: "Full Day (7 hrs)",
      image: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=600&q=80",
      tag: "History"
    }
  ],
  switzerland: [
    {
      id: "act-swiss-1",
      name: "Jungfraujoch - Top of Europe Glacier Train",
      shortDescription: "Ascend to Europe's highest railway station, Ice Palace, and Sphinx observatory deck.",
      pricePerPerson: 12500,
      duration: "Full Day (8 hrs)",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
      tag: "Bucket List"
    },
    {
      id: "act-swiss-2",
      name: "Tandem Paragliding Flight over Interlaken",
      shortDescription: "Soar with an instructor over turquoise lakes with Jungfrau peaks in the background.",
      pricePerPerson: 8900,
      duration: "2 hrs",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
      tag: "Adventure"
    },
    {
      id: "act-swiss-3",
      name: "Mount Titlis Rotair Revolving Cable Car & Cliff Walk",
      shortDescription: "Europe's highest suspension bridge and perpetual glacier caves.",
      pricePerPerson: 7800,
      duration: "Full Day (6 hrs)",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
      tag: "Popular"
    },
    {
      id: "act-swiss-4",
      name: "Artisan Swiss Chocolate & Cheese Tasting Tour",
      shortDescription: "Master chocolatier workshop with unlimited authentic tastings.",
      pricePerPerson: 3200,
      duration: "Half Day (3 hrs)",
      image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80",
      tag: "Culinary"
    }
  ],
  maldives: [
    {
      id: "act-mald-1",
      name: "Manta Ray & Coral Garden Snorkeling Expedition",
      shortDescription: "Snorkel in clear turquoise waters alongside sea turtles and harmless reef sharks.",
      pricePerPerson: 4800,
      duration: "Half Day (4 hrs)",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tag: "Undersea"
    },
    {
      id: "act-mald-2",
      name: "Sunset Dolphin Watching Cruise with Champagne",
      shortDescription: "Watch pods of spinner dolphins leap alongside your traditional Dhoni boat.",
      pricePerPerson: 5500,
      duration: "Evening (2.5 hrs)",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
      tag: "Romantic"
    },
    {
      id: "act-mald-3",
      name: "Private Island Sandbank Gourmet Picnic",
      shortDescription: "Exclusive access to an uninhabited white sandbank with an umbrella lunch feast.",
      pricePerPerson: 9200,
      duration: "Half Day (4 hrs)",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
      tag: "Exclusive"
    }
  ],
  london: [
    {
      id: "act-lon-1",
      name: "Tower of London & Crown Jewels Tour",
      shortDescription: "Centuries of royal intrigue, Beefeater tour, and shimmering royal diamonds.",
      pricePerPerson: 3600,
      duration: "3 hrs",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
      tag: "Historical"
    },
    {
      id: "act-lon-2",
      name: "London Eye Flight & River Thames Cruise",
      shortDescription: "Panoramas of Big Ben and Parliament from 135 meters above the river.",
      pricePerPerson: 4100,
      duration: "3 hrs",
      image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=600&q=80",
      tag: "City Panorama"
    },
    {
      id: "act-lon-3",
      name: "Harry Potter Warner Bros Studio Tour",
      shortDescription: "Step into the Great Hall, Diagon Alley, and Hogwarts Express train set.",
      pricePerPerson: 7200,
      duration: "Full Day (7 hrs)",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
      tag: "World Famous"
    }
  ],
  kyoto: [
    {
      id: "act-kyo-1",
      name: "Fushimi Inari Torii Shrine Early Sunrise Walk",
      shortDescription: "Hike through 10,000 crimson gates on sacred Mount Inari with private guide.",
      pricePerPerson: 2600,
      duration: "Half Day (3 hrs)",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80",
      tag: "Iconic"
    },
    {
      id: "act-kyo-2",
      name: "Arashiyama Bamboo Grove & Golden Pavilion",
      shortDescription: "Walk through towering emerald bamboo groves and the shimmering Kinkaku-ji temple.",
      pricePerPerson: 3800,
      duration: "Full Day (6 hrs)",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
      tag: "Must Visit"
    },
    {
      id: "act-kyo-3",
      name: "Traditional Tea Ceremony & Kimono Wearing Experience",
      shortDescription: "Dress in fine silk kimono and learn the philosophical art of matcha preparation.",
      pricePerPerson: 3400,
      duration: "3 hrs",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
      tag: "Cultural"
    }
  ],
  goa: [
    {
      id: "act-goa-1",
      name: "Dudhsagar Waterfalls & Spice Plantation Safari",
      shortDescription: "4x4 jungle jeep safari through streams to India's tiered milky waterfall.",
      pricePerPerson: 2200,
      duration: "Full Day (8 hrs)",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
      tag: "Nature & Adventure"
    },
    {
      id: "act-goa-2",
      name: "Grand Island Scuba Diving & Dolphin Sightings",
      shortDescription: "Beginner scuba diving session in shallow reefs with underwater photos.",
      pricePerPerson: 3500,
      duration: "Half Day (5 hrs)",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
      tag: "Water Sports"
    },
    {
      id: "act-goa-3",
      name: "Sunset Catamaran Cruise with Mandovi River Views",
      shortDescription: "Goan folk dances, DJ music, and cocktails on tranquil evening waters.",
      pricePerPerson: 1800,
      duration: "Evening (2 hrs)",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tag: "Party & Fun"
    }
  ]
};
