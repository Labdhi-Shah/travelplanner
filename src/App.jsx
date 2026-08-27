import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TravelProvider } from './context/TravelContext';

// Layout wrappers
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public views
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import Hotels from './pages/Hotels';
import Flights from './pages/Flights';
import Experiences from './pages/Experiences';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Personal Dashboard views
import DashboardHome from './pages/DashboardHome';
import MyTrips from './pages/MyTrips';
import CreateTrip from './pages/CreateTrip';
import ItineraryPage from './pages/ItineraryPage';
import SavedPlaces from './pages/SavedPlaces';
import Bookings from './pages/Bookings';
import Favorites from './pages/Favorites';
import Budget from './pages/Budget';
import Profile from './pages/Profile';
import TripDashboard from './pages/TripDashboard';

export default function App() {
  return (
    <TravelProvider>
      <Routes>
        {/* Public site layout & pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard layout & pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="my-trips" element={<MyTrips />} />
          <Route path="create-trip" element={<CreateTrip />} />
          <Route path="itinerary" element={<ItineraryPage />} />
          <Route path="saved-places" element={<SavedPlaces />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="budget" element={<Budget />} />
          <Route path="profile" element={<Profile />} />
          <Route path="trip/:id" element={<TripDashboard />} />
        </Route>
      </Routes>
    </TravelProvider>
  );
}
