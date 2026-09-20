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
  const API_BASE_URL = 'https://hackthon-dgcm.onrender.com/api/auth';

  const syncLoginState = (loginData, cleanEmail) => {
    setIsLoggedIn(true);
    const backendUser = loginData?.data?.user || {};
    const token = loginData?.data?.token;
    if (token) {
      localStorage.setItem('ts_token', token);
    }
    const fullName = `${backendUser.firstName || ''} ${backendUser.lastName || ''}`.trim() || backendUser.email || cleanEmail || 'Traveler';
    setUser(prev => ({
      ...prev,
      id: backendUser.id || prev?.id,
      firstName: backendUser.firstName || '',
      lastName: backendUser.lastName || '',
      name: fullName,
      email: backendUser.email || cleanEmail,
      phone: backendUser.phoneNumber || prev?.phone || '',
      city: backendUser.city || prev?.city || '',
      country: backendUser.country || prev?.country || '',
      avatar: prev?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      preferences: prev?.preferences || ["Adventure", "Culture"],
      notifications: prev?.notifications || { emailAlerts: true, marketing: false, tripUpdates: true }
    }));
  };

  const loginUser = async (email, password) => {
    const cleanEmail = (email || '').trim();
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      if (res.ok && data?.success) {
        syncLoginState(data, cleanEmail);
        return { success: true, data };
      }

      const errorMsg = data?.message || (res.statusText ? `Error ${res.status}: ${res.statusText}` : `Invalid email or password`);
      return { success: false, message: errorMsg };
    } catch (err) {
      return { success: false, message: err.message || 'Unable to connect to server. Please check your internet connection.' };
    }
  };

  const registerUser = async (signupData) => {
    try {
      const payload = typeof signupData === 'object' && signupData !== null
        ? {
            firstName: (signupData.firstName || '').trim(),
            lastName: (signupData.lastName || '').trim(),
            email: (signupData.email || '').trim(),
            phoneNumber: (signupData.phoneNumber || '').trim(),
            city: (signupData.city || '').trim(),
            country: (signupData.country || '').trim(),
            password: signupData.password || '',
            confirmPassword: signupData.confirmPassword || ''
          }
        : {
            firstName: 'Traveler',
            lastName: '',
            email: String(signupData || '').trim(),
            phoneNumber: '+1 555-012-3456',
            city: 'New York',
            country: 'United States',
            password: '',
            confirmPassword: ''
          };

      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      if (res.ok && data?.success) {
        setIsLoggedIn(true);
        const backendUser = data.data?.user || {};
        const token = data.data?.token;
        if (token) {
          localStorage.setItem('ts_token', token);
        }
        const fullName = `${backendUser.firstName || payload.firstName || ''} ${backendUser.lastName || payload.lastName || ''}`.trim() || backendUser.email || 'Traveler';
        setUser(prev => ({
          ...prev,
          id: backendUser.id || prev?.id,
          firstName: backendUser.firstName || payload.firstName || '',
          lastName: backendUser.lastName || payload.lastName || '',
          name: fullName,
          email: backendUser.email || payload.email,
          phone: backendUser.phoneNumber || payload.phoneNumber || "+1 (555) 012-3456",
          city: backendUser.city || payload.city || "",
          country: backendUser.country || payload.country || "United States",
          avatar: prev?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
          preferences: prev?.preferences || ["Adventure", "Culture"],
          notifications: prev?.notifications || { emailAlerts: true, marketing: false, tripUpdates: true }
        }));
        return { success: true, data };
      }
      const errorMsg = data?.message || (res.statusText ? `Error ${res.status}: ${res.statusText}` : `Registration failed with status ${res.status}`);
      return { success: false, message: errorMsg };
    } catch (err) {
      return { success: false, message: err.message || 'Unable to connect to server. Please check your internet connection.' };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: (email || '').trim() })
      });
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      if (res.ok && data?.success) {
        return { success: true, message: data.message };
      }
      const errorMsg = data?.message || (res.statusText ? `Error ${res.status}: ${res.statusText}` : `Failed to send reset instructions (${res.status})`);
      return { success: false, message: errorMsg };
    } catch (err) {
      return { success: false, message: err.message || 'Unable to connect to server. Please check your internet connection.' };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('ts_token');
    localStorage.removeItem('ts_user');
    setUser(mockUser);
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

  const [currentCheckout, setCurrentCheckout] = useState(() => {
    const saved = localStorage.getItem('ts_current_checkout');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentCheckout) {
      localStorage.setItem('ts_current_checkout', JSON.stringify(currentCheckout));
    }
  }, [currentCheckout]);

  // Booking Operations
  const addBooking = (bookingData) => {
    const newBooking = {
      id: bookingData.id || `booking-${Date.now()}`,
      reference: bookingData.reference || `TS-${Math.floor(1000 + Math.random() * 9000)}`,
      status: bookingData.status || 'Confirmed',
      createdAt: new Date().toISOString(),
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
    return newBooking;
  };

  const createPendingBooking = (bookingData) => {
    const pendingBooking = {
      id: bookingData.id || `booking-${Date.now()}`,
      reference: bookingData.reference || `TS-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending Payment',
      createdAt: new Date().toISOString(),
      ...bookingData
    };

    setBookings(prev => {
      const exists = prev.find(b => b.id === pendingBooking.id);
      if (exists) {
        return prev.map(b => b.id === pendingBooking.id ? { ...b, ...pendingBooking } : b);
      }
      return [pendingBooking, ...prev];
    });

    setCurrentCheckout(pendingBooking);
    return pendingBooking;
  };

  const confirmBookingPayment = (bookingId, paymentDetails = {}) => {
    let updatedBooking = null;

    setBookings(prev => prev.map(book => {
      if (book.id === bookingId || book.reference === bookingId) {
        updatedBooking = {
          ...book,
          status: 'Confirmed',
          paymentStatus: 'Success',
          paymentId: paymentDetails.paymentId || paymentDetails.payment_id || `PAY-${Date.now()}`,
          amountPaid: paymentDetails.amountPaidINR || book.totalAmountINR || book.price,
          paidAt: paymentDetails.paymentDate || new Date().toISOString(),
          paymentMethod: 'Instant Online Confirmation',
          ...paymentDetails
        };
        return updatedBooking;
      }
      return book;
    }));

    // Update in trips as well if attached to a trip
    setTrips(prev => prev.map(trip => {
      if (trip.bookings && trip.bookings.some(b => b.id === bookingId || b.reference === bookingId)) {
        return {
          ...trip,
          bookings: trip.bookings.map(b => (b.id === bookingId || b.reference === bookingId) ? {
            ...b,
            status: 'Confirmed',
            paymentStatus: 'Success',
            paymentId: paymentDetails.paymentId || paymentDetails.payment_id || `PAY-${Date.now()}`,
            amountPaid: paymentDetails.amountPaidINR || b.totalAmountINR || b.price
          } : b)
        };
      }
      return trip;
    }));

    if (updatedBooking) {
      setCurrentCheckout(updatedBooking);
    }
    return updatedBooking;
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
      currentCheckout,
      setCurrentCheckout,
      syncLoginState,
      loginUser,
      registerUser,
      forgotPassword,
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
      createPendingBooking,
      confirmBookingPayment,
      cancelBooking
    }}>
      {children}
    </TravelContext.Provider>
  );
};
