import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser, initialTrips, initialBookings, initialSavedPlaces } from '../data/mockUser';

const TravelContext = createContext();

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};

export const TravelProvider = ({ children }) => {
  // Authentication states
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ts_user');
    return saved ? JSON.parse(saved) : mockUser;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('ts_logged_in') === 'true';
  });

  // Data states
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('ts_trips');
    return saved ? JSON.parse(saved) : initialTrips;
  });

  const [savedPlaces, setSavedPlaces] = useState(() => {
    const saved = localStorage.getItem('ts_saved_places');
    return saved ? JSON.parse(saved) : initialSavedPlaces;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('ts_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('ts_favorites');
    // Default favorites could be IDs of destinations/hotels
    return saved ? JSON.parse(saved) : ['bali', 'grace-hotel'];
  });

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('ts_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ts_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('ts_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('ts_saved_places', JSON.stringify(savedPlaces));
  }, [savedPlaces]);

  useEffect(() => {
    localStorage.setItem('ts_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('ts_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Auth Operations
  const loginUser = (email, password) => {
    // Basic mock authentication: any password works for the demo
    setIsLoggedIn(true);
    setUser(prev => ({
      ...prev,
      email: email,
      name: prev.name || email.split('@')[0]
    }));
    return { success: true };
  };

  const registerUser = (fullName, email, password) => {
    setIsLoggedIn(true);
    setUser({
      name: fullName,
      email: email,
      phone: "+1 (555) 012-3456",
      country: "United States",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      preferences: ["Adventure", "Culture"],
      notifications: { emailAlerts: true, marketing: false, tripUpdates: true }
    });
    return { success: true };
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
  };

  const updateProfile = (profileData) => {
    setUser(prev => ({
      ...prev,
      ...profileData
    }));
  };

  // Trip Operations
  const addTrip = (tripData) => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      activities: [],
      bookings: [],
      expenses: [],
      status: 'Upcoming',
      ...tripData,
      budget: {
        range: tripData.budgetRange || 'Medium',
        limit: tripData.budgetLimit || (tripData.budgetRange === 'Low' ? 1500 : tripData.budgetRange === 'Medium' ? 4000 : 8000),
        spent: 0
      }
    };
    setTrips(prev => [newTrip, ...prev]);
    return newTrip.id;
  };

  const updateTrip = (tripId, updatedFields) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        return { ...trip, ...updatedFields };
      }
      return trip;
    }));
  };

  const deleteTrip = (tripId) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripId));
  };

  // Itinerary (Activities) Operations within a Trip
  const addActivityToTrip = (tripId, activity) => {
    const newActivity = {
      id: `act-${Date.now()}`,
      cost: 0,
      notes: '',
      ...activity
    };
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        const updatedActivities = [...(trip.activities || []), newActivity];
        return {
          ...trip,
          activities: updatedActivities
        };
      }
      return trip;
    }));
  };

  const updateActivityInTrip = (tripId, activityId, updatedActivity) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        const updatedActivities = trip.activities.map(act => {
          if (act.id === activityId) {
            return { ...act, ...updatedActivity };
          }
          return act;
        });
        return {
          ...trip,
          activities: updatedActivities
        };
      }
      return trip;
    }));
  };

  const deleteActivityFromTrip = (tripId, activityId) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          activities: trip.activities.filter(act => act.id !== activityId)
        };
      }
      return trip;
    }));
  };

  // Budget (Expenses) Operations within a Trip
  const addExpenseToTrip = (tripId, expense) => {
    const newExpense = {
      id: `exp-${Date.now()}`,
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      ...expense
    };
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        const updatedExpenses = [...(trip.expenses || []), newExpense];
        const newSpent = updatedExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        return {
          ...trip,
          expenses: updatedExpenses,
          budget: {
            ...trip.budget,
            spent: newSpent
          }
        };
      }
      return trip;
    }));
  };

  const updateExpenseInTrip = (tripId, expenseId, updatedExpense) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        const updatedExpenses = trip.expenses.map(exp => {
          if (exp.id === expenseId) {
            return { ...exp, ...updatedExpense, amount: Number(updatedExpense.amount) };
          }
          return exp;
        });
        const newSpent = updatedExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        return {
          ...trip,
          expenses: updatedExpenses,
          budget: {
            ...trip.budget,
            spent: newSpent
          }
        };
      }
      return trip;
    }));
  };

  const deleteExpenseFromTrip = (tripId, expenseId) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        const updatedExpenses = trip.expenses.filter(exp => exp.id !== expenseId);
        const newSpent = updatedExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        return {
          ...trip,
          expenses: updatedExpenses,
          budget: {
            ...trip.budget,
            spent: newSpent
          }
        };
      }
      return trip;
    }));
  };

  // Favorites Operations
  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const isFavorite = (itemId) => {
    return favorites.includes(itemId);
  };

  // Saved Places (Destinations/Hotels list under Saved Places)
  const toggleSavedPlace = (place) => {
    setSavedPlaces(prev => {
      const exists = prev.some(item => item.id === place.id);
      if (exists) {
        return prev.filter(item => item.id !== place.id);
      } else {
        return [...prev, {
          id: place.id,
          name: place.name,
          location: place.country || place.location,
          image: place.image,
          rating: place.rating,
          category: place.category || 'Destinations'
        }];
      }
    });
  };

  const isSavedPlace = (placeId) => {
    return savedPlaces.some(item => item.id === placeId);
  };

  // Booking Operations
  const addBooking = (bookingData) => {
    const newBooking = {
      id: `booking-${Date.now()}`,
      reference: `TS-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed',
      ...bookingData
    };
    setBookings(prev => [newBooking, ...prev]);

    // If it's linked to an active trip, add it there too
    if (bookingData.tripId) {
      setTrips(prev => prev.map(trip => {
        if (trip.id === bookingData.tripId) {
          return {
            ...trip,
            bookings: [...(trip.bookings || []), newBooking]
          };
        }
        return trip;
      }));
    }
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.map(book => {
      if (book.id === bookingId) {
        return { ...book, status: 'Cancelled' };
      }
      return book;
    }));
    
    // Also cancel inside trips if present
    setTrips(prev => prev.map(trip => {
      if (trip.bookings && trip.bookings.some(b => b.id === bookingId)) {
        return {
          ...trip,
          bookings: trip.bookings.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b)
        };
      }
      return trip;
    }));
  };

  return (
    <TravelContext.Provider value={{
      user,
      isLoggedIn,
      trips,
      savedPlaces,
      bookings,
      favorites,
      loginUser,
      registerUser,
      logoutUser,
      updateProfile,
      addTrip,
      updateTrip,
      deleteTrip,
      addActivityToTrip,
      updateActivityInTrip,
      deleteActivityFromTrip,
      addExpenseToTrip,
      updateExpenseInTrip,
      deleteExpenseFromTrip,
      toggleFavorite,
      isFavorite,
      toggleSavedPlace,
      isSavedPlace,
      addBooking,
      cancelBooking
    }}>
      {children}
    </TravelContext.Provider>
  );
};
