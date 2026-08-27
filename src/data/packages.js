export const packages = [
  {
    id: "bali-escape",
    name: "Bali Escape & Wellness",
    destinationId: "bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    duration: "5 Days",
    durationDays: 5,
    travelers: "2 Travelers",
    rating: 4.8,
    price: 950,
    includedActivities: ["Spa Treatments", "Temple Tours", "Cooking Class", "Surfing Lesson"],
    hasHotel: true,
    hasFlight: true,
    hasTransport: true,
    overview: "Rejuvenate your mind, body, and soul in the tropical paradise of Bali. This curated package blends traditional Balinese wellness therapies, cultural exploration, and light beach adventures for the ultimate relaxing getaway.",
    inclusions: [
      "4 Nights in Luxury Ubud Eco-Resort",
      "Daily gourmet organic breakfast & dinner",
      "Private airport transfers and ground transport",
      "Full-day temple and rice terrace tour",
      "2-hour signature Balinese massage and flower bath",
      "Traditional Balinese cooking class"
    ],
    exclusions: [
      "International flights to Denpasar (DPS)",
      "Personal travel insurance",
      "Lunch meals not specified",
      "Tipping and gratuities for guides"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Tropical Welcome",
        description: "Land in Bali where your private chauffeur meets you. Check into your Ubud jungle eco-villa and enjoy a welcome candlelit organic dinner overlooking the river valley."
      },
      {
        day: 2,
        title: "Ubud Culture & Sacred Monkey Forest",
        description: "Explore the cultural heart of Ubud. Visit the historic Ubud Palace, walk through the lush Sacred Monkey Forest, and stroll along the panoramic Campuhan Ridge Walk at sunset."
      },
      {
        day: 3,
        title: "Tegallalang Rice Fields & Holy Water Temple",
        description: "Marvel at the emerald-green Tegallalang Rice Terraces. Proceed to Tirta Empul Temple for a traditional water purification ritual, followed by a cooking masterclass in a local village."
      },
      {
        day: 4,
        title: "Wellness Day & Spa Indulgence",
        description: "Dedicate your day to wellness. Participate in a morning yoga session, followed by a luxurious 2-hour spa treatment. Spend the afternoon relaxing by the infinity pool."
      },
      {
        day: 5,
        title: "Departure / Extension",
        description: "Savor a slow breakfast. Shop for souvenirs at the Ubud Art Market before transferring back to the airport for your flight home, or extend your stay to the beaches."
      }
    ],
    hotelDetails: {
      name: "Maya Ubud Resort & Spa",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "Sarah K.", rating: 5, comment: "Absolutely magical! The spa treatment was out of this world." },
      { name: "John D.", rating: 4.5, comment: "Beautiful resort and great itinerary. Wish it was longer!" }
    ]
  },
  {
    id: "european-explorer",
    name: "European Explorer: Paris & Rome",
    destinationId: "paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    duration: "10 Days",
    durationDays: 10,
    travelers: "2 Travelers",
    rating: 4.9,
    price: 2450,
    includedActivities: ["Eiffel Tower Skip-Line", "Louvre Guided Tour", "Colosseum Entry", "Wine Tasting"],
    hasHotel: true,
    hasFlight: false,
    hasTransport: true,
    overview: "Explore two of Europe's most romantic and historic capitals in one grand tour. Walk down the romantic Seine in Paris and step back in time at the ancient ruins of Rome.",
    inclusions: [
      "5 Nights in Paris Boutique Hotel (Saint-Germain)",
      "4 Nights in Rome Historic Center Hotel",
      "High-speed train ticket from Paris to Rome (First Class)",
      "Skip-the-line tickets for Eiffel Tower & Colosseum",
      "Louvre Museum guided highlights tour",
      "Daily continental breakfast"
    ],
    exclusions: [
      "Transatlantic flights",
      "City tourist taxes (paid at hotels)",
      "Luncheons and dinners",
      "Metro/Bus tickets for local transit"
    ],
    itinerary: [
      { day: 1, title: "Bonjour Paris", description: "Arrive in Paris, check into your boutique hotel in Saint-Germain. Enjoy a evening Seine River cruise with champagne." },
      { day: 2, title: "Louvre & Historic Paris", description: "Tour the Louvre with an expert guide. Stroll through Tuileries Garden and visit the Notre-Dame Cathedral area." },
      { day: 3, title: "Eiffel Tower & Arc de Triomphe", description: "Ascend to the summit of the Eiffel Tower. In the afternoon, walk the Champs-Élysées to the Arc de Triomphe." },
      { day: 4, title: "Palace of Versailles", description: "Take a short train ride to the opulent Palace of Versailles. Explore the Hall of Mirrors and the expansive fountains." },
      { day: 5, title: "Artistic Montmartre", description: "Discover the bohemian charm of Montmartre and Sacré-Cœur Basilica. Enjoy a portrait painting and bistro dinner." },
      { day: 6, title: "Train to Eternal City (Rome)", description: "Board the high-speed train passing through the stunning French countryside and Alps to Rome. Check-in and dinner." },
      { day: 7, title: "Ancient Rome & Colosseum", description: "Walk the footsteps of gladiators with skip-the-line entrance to the Colosseum, Roman Forum, and Palatine Hill." },
      { day: 8, title: "Vatican Museums & Sistine Chapel", description: "Marvel at Michelangelo's ceiling in the Sistine Chapel and tour the massive St. Peter's Basilica." },
      { day: 9, title: "Piazzas & Fountains", description: "Stroll to the Trevi Fountain (throw a coin!), Pantheon, and vibrant Piazza Navona. Enjoy a gelato-making class." },
      { day: 10, title: "Arrivederci Roma", description: "After a final espresso, transfer to Rome Fiumicino Airport for your departure home." }
    ],
    hotelDetails: {
      name: "Hotel Regina Louvre Paris & Hotel Artemide Rome",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "Michael T.", rating: 5, comment: "Perfect organization. The train ride between cities was beautiful." }
    ]
  },
  {
    id: "dubai-luxury",
    name: "Dubai Premium Desert & Gold Luxury",
    destinationId: "dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    duration: "6 Days",
    durationDays: 6,
    travelers: "2 Travelers",
    rating: 4.7,
    price: 1900,
    includedActivities: ["Burj Khalifa Sky Lounge", "Yacht Cruise", "Red Dune Desert Safari", "Helicopter Tour"],
    hasHotel: true,
    hasFlight: true,
    hasTransport: true,
    overview: "Experience the glittering jewel of the Middle East in pure luxury. From sky-high dining to dune-bashing in VIP style, this package delivers the absolute best of Dubai.",
    inclusions: [
      "5 Nights in a 5-star hotel (Palm Jumeirah)",
      "Daily buffet breakfast & VIP dining experiences",
      "Private limousine transfers throughout the trip",
      "Burj Khalifa 148th floor VIP lounge tickets",
      "Luxury shared 55ft yacht cruise with BBQ",
      "VIP Desert Safari with private camp seating and gourmet buffet"
    ],
    exclusions: [
      "Optional activities (Skydiving, etc.)",
      "Tourism Dirham fee",
      "Alcoholic drinks outside packages"
    ],
    itinerary: [
      { day: 1, title: "Limousine Arrival", description: "Land at DXB where a private luxury limousine transports you to your Palm Jumeirah beach resort." },
      { day: 2, title: "Modern Skyscrapers & Burj Khalifa", description: "Explore the Dubai Marina. Ascend the Burj Khalifa to the 148th Floor Sky Lounge. Watch the Fountain Show." },
      { day: 3, title: "VIP Red Dune Safari", description: "Sleep in, then head out in a 4x4 for high-speed dune bashing, sandboarding, camel rides, and a luxury bedouin camp dinner." },
      { day: 4, title: "Dubai Marina Yacht Cruise", description: "Board a luxury yacht for a 3-hour cruise around the Palm Jumeirah, Burj Al Arab, and Dubai Eye with live BBQ." },
      { day: 5, title: "Old Dubai & Gold Souk Tour", description: "Take a traditional Abra boat across the Creek. Bargain for treasures in the Gold and Spice Souks." },
      { day: 6, title: "Farewell Dubai", description: "Squeeze in some tax-free shopping at Mall of the Emirates before your private transfer to the airport." }
    ],
    hotelDetails: {
      name: "Atlantis The Palm",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "Elena R.", rating: 5, comment: "Staying at Atlantis was a dream. The service is unmatched!" }
    ]
  },
  {
    id: "japan-cultural",
    name: "Japan Cultural Journey: Tokyo & Kyoto",
    destinationId: "kyoto",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    duration: "8 Days",
    durationDays: 8,
    travelers: "2 Travelers",
    rating: 4.9,
    price: 2100,
    includedActivities: ["Tea Ceremony", "Shinkansen Tickets", "Samurai Museum", "Geisha District Tour"],
    hasHotel: true,
    hasFlight: false,
    hasTransport: true,
    overview: "Journey through Japan's historic past and futuristic present. Experience Tokyo's neon streets and Kyoto's peaceful wooden temples and shrines.",
    inclusions: [
      "4 Nights in Shinjuku, Tokyo (4-star)",
      "3 Nights in Gion, Kyoto (Boutique Ryokan)",
      "7-Day Ordinary Japan Rail Pass (JR Pass)",
      "Authentic Tea Ceremony with a tea master",
      "Private walking tour of Kyoto's Gion district",
      "Luggage transfer service between Tokyo and Kyoto"
    ],
    exclusions: [
      "International flights",
      "Daily lunches and dinner (except ryokan kaiseki dinner)",
      "Local subway fares in Tokyo/Kyoto"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Tokyo", description: "Arrive at Tokyo Haneda/Narita. Activate your JR pass and take the express train to Shinjuku. Rest and recover." },
      { day: 2, title: "Neon Tokyo & Meiji Shrine", description: "Visit the serene Meiji Shrine, walk the fashion streets of Harajuku, Shibuya Crossing, and see Shinjuku at night." },
      { day: 3, title: "Historic Asakusa & Skytree", description: "Explore Tokyo's oldest temple, Senso-ji, in Asakusa. Ride to the top of Tokyo Skytree for sweeping views of Mt. Fuji." },
      { day: 4, title: "Day Trip to Mt. Fuji & Hakone", description: "Ride the train to Hakone. Cruise Lake Ashi on a pirate ship and take the ropeway for mountain views, soaking in hot springs." },
      { day: 5, title: "Shinkansen to Kyoto & Ryokan Dinner", description: "Bullet train (Shinkansen) to Kyoto. Check into a traditional Ryokan. Enjoy an exquisite multi-course Kaiseki dinner." },
      { day: 6, title: "Kyoto Golden Pavilion & Bamboo Forest", description: "Visit Kinkaku-ji (Golden Pavilion), walk the paths of the Arashiyama Bamboo Grove, and explore Tenryu-ji Temple." },
      { day: 7, title: "Fushimi Inari & Gion Evening", description: "Hike the 10,000 orange Torii gates of Fushimi Inari. In the evening, do a walking tour of Gion Geisha District." },
      { day: 8, title: "Sayonara Japan", description: "Take the Haruka Express to Kansai Airport (KIX) or back to Tokyo for your flight home." }
    ],
    hotelDetails: {
      name: "Kyoto Ryokan Gion Sano",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "Takashi N.", rating: 5, comment: "The Ryokan experience was the highlight of our trip. Amazing food!" }
    ]
  },
  {
    id: "swiss-adventure",
    name: "Swiss Alps Mountain Adventure",
    destinationId: "switzerland",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    duration: "7 Days",
    durationDays: 7,
    travelers: "2 Travelers",
    rating: 4.8,
    price: 1850,
    includedActivities: ["Jungfraujoch Pass", "Lake Brienz Cruise", "Zermatt Cable Car", "Cheese Fondue Dinner"],
    hasHotel: true,
    hasFlight: false,
    hasTransport: true,
    overview: "Traverse high altitude peaks and emerald valleys on the Swiss mountain railway. Hike majestic glaciers, stay in rustic-luxe alpine chalets, and taste Switzerland's finest delicacies.",
    inclusions: [
      "6 Nights in Alpine Chalet Hotels (Interlaken & Zermatt)",
      "Swiss Travel Pass (Consecutive 8-Day 2nd class ticket)",
      "Cogwheel train ticket to Jungfraujoch (Top of Europe)",
      "Scenic cruise on Lake Brienz or Lake Thun",
      "Traditional Swiss cheese fondue dinner",
      "Daily breakfast buffet"
    ],
    exclusions: [
      "Airfare to Zurich/Geneva",
      "Mountain ski rentals",
      "Lunches and dinners not listed"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Interlaken", description: "Take the scenic train from Zurich airport to Interlaken, nestled between two lakes. Check into your chalet hotel." },
      { day: 2, title: "Jungfraujoch Glacier Expedition", description: "Ride the modern Eiger Express tri-cable gondola and cogwheel train to the top of Europe glacier station. Walk the ice palace." },
      { day: 3, title: "Lake Brienz Cruise & Lauterbrunnen", description: "Take a peaceful lake steamship cruise, then visit Lauterbrunnen, the valley of 72 waterfalls. See Staubbach Falls." },
      { day: 4, title: "Scenic Rail to Car-Free Zermatt", description: "Board the train to Zermatt, a luxury car-free alpine village situated at the foot of the iconic Matterhorn peak." },
      { day: 5, title: "Matterhorn Glacier Paradise", description: "Ride Europe's highest cable car to Matterhorn Glacier Paradise at 3,883m. Have a snow fight and visit the cinema lounge." },
      { day: 6, title: "Gornergrat Panorama & Fondue Night", description: "Ride the historic Gornergrat open-air cog railway for stunning Matterhorn views. Savor a traditional hot cheese fondue in the evening." },
      { day: 7, title: "Departure", description: "Enjoy a final morning looking at the peak before catching the train back to Zurich or Geneva airport." }
    ],
    hotelDetails: {
      name: "Grand Hotel Beau Rivage Interlaken",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "Claire L.", rating: 5, comment: "Breathtaking views. The Swiss Travel Pass saved us so much money!" }
    ]
  }
];
