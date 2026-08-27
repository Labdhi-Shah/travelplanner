export const mockUser = {
  name: "Emily Watson",
  email: "emily.watson@example.com",
  phone: "+1 (555) 019-2834",
  country: "United States",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  preferences: ["Culture", "Nature", "Luxury", "Photography"],
  notifications: {
    emailAlerts: true,
    marketing: false,
    tripUpdates: true
  }
};

export const initialTrips = [
  {
    id: "trip-japan-2026",
    name: "Spring Cherry Blossom Tour",
    destinationId: "kyoto",
    destinationName: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-05-22",
    endDate: "2026-06-03",
    travelers: {
      adults: 2,
      children: 0
    },
    preferences: ["Culture", "Nature", "Photography"],
    budget: {
      range: "Medium",
      limit: 5000,
      spent: 1250
    },
    status: "Upcoming", // Upcoming, Ongoing, Completed
    route: ["Tokyo", "Hakone", "Kyoto", "Osaka"],
    activities: [
      { id: "act-1", day: 1, time: "14:00", title: "Ryokan Check-in & Rest", cost: 0, notes: "Collect keys and unpack. Check out mineral baths.", location: "Gion Ryokan" },
      { id: "act-2", day: 1, time: "18:30", title: "Traditional Kaiseki Dinner", cost: 120, notes: "Multi-course dinner served in-room.", location: "Ryokan Dining Hall" },
      { id: "act-3", day: 2, time: "06:30", title: "Fushimi Inari Shrine Hike", cost: 0, notes: "Rise early to beat the massive tour buses.", location: "Fushimi Inari Shrine" },
      { id: "act-4", day: 2, time: "12:00", title: "Zen Garden Stroll & Tea Ceremony", cost: 35, notes: "Participate in powdered matcha ceremony.", location: "Kinkaku-ji Gardens" },
      { id: "act-5", day: 3, time: "09:00", title: "Arashiyama Bamboo Walk", cost: 0, notes: "Nice walk, then visit monkey park.", location: "Arashiyama" }
    ],
    bookings: [
      { id: "book-1", category: "Flights", reference: "NH-8402", title: "ANA Flight: LAX to NRT", date: "2026-05-22", location: "Narita Airport", price: 980, status: "Confirmed" },
      { id: "book-2", category: "Hotels", reference: "RY-9321", title: "Gion Ryokan Traditional Stay", date: "2026-05-27", location: "Kyoto", price: 450, status: "Confirmed" }
    ],
    expenses: [
      { id: "exp-1", title: "Train Bullet Pass (JR)", category: "Transportation", amount: 350, date: "2026-05-15" },
      { id: "exp-2", title: "Boutique Ryokan deposit", category: "Hotels", amount: 450, date: "2026-05-18" },
      { id: "exp-3", title: "Dinner bookings", category: "Food", amount: 200, date: "2026-05-20" },
      { id: "exp-4", title: "Shibuya Sky tickets", category: "Activities", amount: 50, date: "2026-05-21" },
      { id: "exp-5", title: "Souvenir shopping", category: "Shopping", amount: 200, date: "2026-05-23" }
    ]
  },
  {
    id: "trip-bali-2025",
    name: "Summer Wellness Getaway",
    destinationId: "bali",
    destinationName: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    startDate: "2025-08-10",
    endDate: "2025-08-15",
    travelers: {
      adults: 1,
      children: 0
    },
    preferences: ["Relaxation", "Adventure"],
    budget: {
      range: "Low",
      limit: 1500,
      spent: 1420
    },
    status: "Completed",
    route: ["Ubud", "Seminyak"],
    activities: [
      { id: "act-b1", day: 1, time: "15:00", title: "Resort Check-in", cost: 0, notes: "Welcome massage included.", location: "Maya Ubud Resort" },
      { id: "act-b2", day: 2, time: "09:00", title: "White Water Rafting", cost: 45, notes: "Exciting trip on Ayung River.", location: "Ayung River, Ubud" }
    ],
    bookings: [
      { id: "book-b1", category: "Hotels", reference: "MU-4830", title: "Maya Ubud Jungle Villa", date: "2025-08-10", location: "Ubud", price: 720, status: "Completed" }
    ],
    expenses: [
      { id: "exp-b1", title: "Villa Booking", category: "Hotels", amount: 720, date: "2025-08-05" },
      { id: "exp-b2", title: "Flights to Denpasar", category: "Flights", amount: 500, date: "2025-07-20" },
      { id: "exp-b3", title: "Spa Day Treatment", category: "Activities", amount: 120, date: "2025-08-12" },
      { id: "exp-b4", title: "Local Diners", category: "Food", amount: 80, date: "2025-08-14" }
    ]
  }
];

export const initialBookings = [
  {
    id: "booking-f1",
    category: "Flights",
    reference: "TS-8840",
    title: "Air France: JFK to CDG",
    date: "2026-09-15",
    location: "Paris, France",
    price: 850,
    status: "Confirmed"
  },
  {
    id: "booking-h1",
    category: "Hotels",
    reference: "RH-9430",
    title: "Hotel Regina Louvre (Double Room)",
    date: "2026-09-15",
    location: "Paris, France",
    price: 1400,
    status: "Confirmed"
  },
  {
    id: "booking-a1",
    category: "Activities",
    reference: "TS-EX33",
    title: "Private Guided Tour: Eiffel & Louvre",
    date: "2026-09-16",
    location: "Paris, France",
    price: 320,
    status: "Confirmed"
  }
];
export const initialSavedPlaces = [
  {
    id: "bali",
    name: "Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    category: "Destinations"
  },
  {
    id: "grace-hotel",
    name: "Grace Hotel Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    category: "Hotels"
  }
];
