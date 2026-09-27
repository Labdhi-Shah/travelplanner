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
    id: "paris-explorer",
    name: "Paris Highlights & Cultural Tour",
    destinationId: "paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    duration: "6 Days",
    durationDays: 6,
    travelers: "2 Travelers",
    rating: 4.9,
    price: 1850,
    includedActivities: ["Eiffel Tower Skip-Line", "Louvre Guided Tour", "Seine Dinner Cruise", "Palace of Versailles"],
    hasHotel: true,
    hasFlight: false,
    hasTransport: true,
    overview: "Explore the City of Light with priority access to iconic landmarks, world-renowned museums, romantic river cruises, and charming bohemian quarters in Paris.",
    inclusions: [
      "5 Nights in Paris Boutique Hotel (Saint-Germain)",
      "Skip-the-line summit tickets for Eiffel Tower",
      "Louvre Museum guided highlights tour",
      "Seine River 3-course dinner cruise with champagne",
      "Guided day trip excursion to Palace of Versailles",
      "Daily continental breakfast buffet"
    ],
    exclusions: [
      "Transatlantic flights",
      "City tourist taxes (paid at hotel)",
      "Luncheons and dinners not specified",
      "Personal shopping expenses"
    ],
    itinerary: [
      { day: 1, title: "Bonjour Paris", description: "Arrive in Paris and check into your boutique hotel in Saint-Germain. Enjoy an evening Seine River cruise with champagne." },
      { day: 2, title: "Louvre & Historic Paris", description: "Tour the Louvre with an expert guide. Stroll through Tuileries Garden and visit the Notre-Dame Cathedral area." },
      { day: 3, title: "Eiffel Tower Summit & Arc de Triomphe", description: "Ascend to the summit of the Eiffel Tower. In the afternoon, stroll down the Champs-Élysées to the Arc de Triomphe." },
      { day: 4, title: "Palace of Versailles", description: "Take a scenic excursion to the opulent Palace of Versailles. Explore the Hall of Mirrors and magnificent classical gardens." },
      { day: 5, title: "Artistic Montmartre & Latin Quarter", description: "Discover the bohemian charm of Montmartre and Sacré-Cœur Basilica. Savor a farewell dinner in a traditional French bistro." },
      { day: 6, title: "Au Revoir Paris", description: "Enjoy a leisurely morning espresso and croissant before transferring to Charles de Gaulle Airport for your flight home." }
    ],
    hotelDetails: {
      name: "Hotel Regina Louvre Paris",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "Michael T.", rating: 5, comment: "Paris was extraordinary! The Louvre tour and Eiffel summit access were seamless." }
    ]
  },
  {
    id: "swiss-adventure",
    name: "Switzerland Alps Mountain Adventure",
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
  },
  {
    id: "maldives-retreat",
    name: "Maldives Luxury Overwater Retreat",
    destinationId: "maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    duration: "5 Days",
    durationDays: 5,
    travelers: "2 Travelers",
    rating: 4.9,
    price: 2200,
    includedActivities: ["Overwater Villa Stay", "Manta Ray Coral Snorkel", "Private Sandbank Picnic", "Sunset Dolphin Safari"],
    hasHotel: true,
    hasFlight: true,
    hasTransport: true,
    overview: "Escape to crystalline turquoise lagoons and powdery white sandbanks in the Maldives. Enjoy luxury overwater living, guided coral reef snorkeling, and romantic sunset dolphin cruises.",
    inclusions: [
      "4 Nights in Luxury Overwater Villa",
      "All-inclusive gourmet dining & beverage package",
      "Round-trip speedboat and seaplane transfers",
      "Guided manta ray and sea turtle snorkeling safari",
      "Private sunset dolphin cruise with champagne",
      "Complimentary water sports and paddleboards"
    ],
    exclusions: [
      "International flights to Male (MLE)",
      "Optional scuba diving certification courses",
      "Spa wellness treatments",
      "Personal expenses"
    ],
    itinerary: [
      { day: 1, title: "Seaplane Arrival & Overwater Check-in", description: "Arrive at Velana International Airport and board a scenic seaplane to your island resort. Settle into your private overwater villa." },
      { day: 2, title: "Coral Reef & Manta Ray Snorkel", description: "Embark on a guided boat tour to house reefs to swim alongside friendly sea turtles, colorful tropical fish, and manta rays." },
      { day: 3, title: "Private Sandbank Picnic Feast", description: "Take a short speedboat hop to an uninhabited white sandbank for an exclusive gourmet umbrella lunch surrounded by turquoise seas." },
      { day: 4, title: "Sunset Dolphin Watching Cruise", description: "Board a traditional Maldivian wooden Dhoni boat for an evening cruise to spot pods of playful spinner dolphins at golden hour." },
      { day: 5, title: "Farewell to Paradise", description: "Indulge in a final floating breakfast in your private villa pool before your scenic seaplane transfer back to Male." }
    ],
    hotelDetails: {
      name: "Soneva Jani Luxury Overwater Villas",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "Aarav P.", rating: 5, comment: "Pure heaven on earth. The overwater villa with ocean slide was unbelievable!" }
    ]
  },
  {
    id: "london-heritage",
    name: "London Royal Heritage & City Tour",
    destinationId: "london",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    duration: "6 Days",
    durationDays: 6,
    travelers: "2 Travelers",
    rating: 4.8,
    price: 1650,
    includedActivities: ["Tower of London & Crown Jewels", "London Eye Flight", "River Thames Cruise", "West End Musical"],
    hasHotel: true,
    hasFlight: false,
    hasTransport: true,
    overview: "Immerse yourself in centuries of British royal history, world-class theater, bustling riverside markets, and famous landmarks across London.",
    inclusions: [
      "5 Nights in Central London Boutique Hotel",
      "Daily traditional English breakfast",
      "Tower of London priority access with Crown Jewels",
      "London Eye scenic flight ticket",
      "River Thames hop-on hop-off cruise pass",
      "West End award-winning musical tickets"
    ],
    exclusions: [
      "International flights to London (LHR)",
      "Daily lunches and dinners not listed",
      "Airport transfers",
      "Personal travel insurance"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Royal London", description: "Arrive in London and transfer to your hotel in South Kensington. Take an evening walk around illuminated Westminster and Big Ben." },
      { day: 2, title: "Tower of London & Thames Cruise", description: "Explore the medieval Tower of London, see the glittering Crown Jewels, and embark on a panoramic Thames River cruise to Tower Bridge." },
      { day: 3, title: "Buckingham Palace & London Eye", description: "Watch the Changing of the Guard at Buckingham Palace, stroll St. James's Park, and board the London Eye for city views." },
      { day: 4, title: "British Museum & West End Theater", description: "Visit the British Museum to view the Rosetta Stone. In the evening, enjoy a celebrated West End musical with dinner." },
      { day: 5, title: "Covent Garden & Royal Parks", description: "Shop and dine in vibrant Covent Garden, walk Hyde Park, and enjoy traditional afternoon high tea in Mayfair." },
      { day: 6, title: "Departure", description: "Have a final full English breakfast before departing London with unforgettable memories of the British capital." }
    ],
    hotelDetails: {
      name: "The Kensington Heritage Hotel",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "David M.", rating: 5, comment: "Superbly organized! The hotel was right by the tube and the theater night was brilliant." }
    ]
  },
  {
    id: "kyoto-cultural",
    name: "Kyoto Cultural Journey & Ancient Temples",
    destinationId: "kyoto",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    duration: "6 Days",
    durationDays: 6,
    travelers: "2 Travelers",
    rating: 4.9,
    price: 1750,
    includedActivities: ["Tea Ceremony", "Fushimi Inari Torii Walk", "Arashiyama Bamboo Grove", "Gion Geisha District Tour"],
    hasHotel: true,
    hasFlight: false,
    hasTransport: true,
    overview: "Step into traditional Japan in ancient Kyoto. Wander through thousands of crimson torii gates, participate in an authentic tea ceremony, and stay in a boutique Japanese ryokan.",
    inclusions: [
      "5 Nights in Historic Gion Boutique Ryokan",
      "Daily traditional Japanese breakfast & 1 Kaiseki dinner",
      "Authentic tea master tea ceremony experience",
      "Private walking tour of Gion geisha district",
      "Guided exploration of Fushimi Inari & Arashiyama",
      "Kyoto City subway and bus passes"
    ],
    exclusions: [
      "International flights to Kansai (KIX)",
      "Daily lunches and dinners not listed",
      "Luggage shipping services",
      "Personal shopping expenses"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kyoto", description: "Arrive in Kyoto, check into your traditional boutique ryokan in Gion, and enjoy an evening stroll along the Shirakawa canal." },
      { day: 2, title: "Fushimi Inari Shrine & Tofuku-ji", description: "Take an early morning hike through the 10,000 vermilion Torii gates of Fushimi Inari Shrine, followed by Zen gardens at Tofuku-ji." },
      { day: 3, title: "Kinkaku-ji & Ryoan-ji Rock Garden", description: "Marvel at the Golden Pavilion (Kinkaku-ji) reflected across its mirror pond, then contemplate the world-famous Zen rock garden at Ryoan-ji." },
      { day: 4, title: "Arashiyama Bamboo Grove & Tenryu-ji", description: "Walk through the soaring green stalks of the Arashiyama Bamboo Grove, visit historic Tenryu-ji temple, and cross the Togetsukyo Bridge." },
      { day: 5, title: "Tea Ceremony & Gion Evening", description: "Participate in an authentic private matcha tea ceremony. In the twilight hours, take a guided atmospheric walk through the Gion district." },
      { day: 6, title: "Sayonara Kyoto", description: "Enjoy a peaceful ryokan breakfast in the garden before departing Kyoto with timeless cultural memories." }
    ],
    hotelDetails: {
      name: "Kyoto Ryokan Gion Sano",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "Takashi N.", rating: 5, comment: "The Ryokan experience was the highlight of our trip. Amazing hospitality and serenity!" }
    ]
  },
  {
    id: "goa-beach",
    name: "Goa Tropical Beach & Heritage Getaway",
    destinationId: "goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    duration: "5 Days",
    durationDays: 5,
    travelers: "2 Travelers",
    rating: 4.7,
    price: 750,
    includedActivities: ["Dudhsagar Waterfall Jeep Trek", "Old Goa Cathedrals Tour", "Sunset Catamaran Cruise", "Spice Plantation Lunch"],
    hasHotel: true,
    hasFlight: true,
    hasTransport: true,
    overview: "Unwind on golden beaches, savor coastal Goan delicacies, and explore Portuguese heritage architecture and cascading jungle waterfalls on this sunny Goan escape.",
    inclusions: [
      "4 Nights in 5-star beachfront resort",
      "Daily lavish buffet breakfast",
      "Private airport pickup and drop-off",
      "Dudhsagar waterfall 4x4 jeep safari",
      "Mandovi River sunset catamaran cruise",
      "Old Goa heritage churches guided walk"
    ],
    exclusions: [
      "Domestic flights to Goa (GOI)",
      "Water sports activities at beaches",
      "Alcoholic beverages outside dinner cruise",
      "Personal gratuities"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Sunny Goa", description: "Land at Goa Airport where your private chauffeur welcomes you. Check into your beachfront luxury resort and unwind by the sea." },
      { day: 2, title: "Old Goa Heritage & Spice Plantation", description: "Tour the historic Portuguese churches of Old Goa including the Basilica of Bom Jesus, followed by a traditional spice plantation buffet lunch." },
      { day: 3, title: "Dudhsagar Waterfall Jeep Trek", description: "Hop into an open-top 4x4 jeep through the Mollem jungle streams to the majestic multi-tiered Dudhsagar waterfall for a refreshing swim." },
      { day: 4, title: "Coastal Beaches & Sunset Cruise", description: "Spend a relaxing afternoon lounging on South Goa's pristine beaches, followed by an evening catamaran cruise along the Mandovi River." },
      { day: 5, title: "Departure", description: "Enjoy a final seaside tropical breakfast and coastal walk before your private transfer to Goa Airport." }
    ],
    hotelDetails: {
      name: "Taj Exotica Heritage & Spa Goa",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80"
    },
    reviews: [
      { name: "Pooja S.", rating: 5, comment: "Such a rejuvenating holiday! The resort was magnificent and Dudhsagar waterfall was breathtaking." }
    ]
  }
];
