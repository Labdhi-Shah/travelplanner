import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useTravel } from '../context/TravelContext';

export default function DashboardLayout() {
  const { isLoggedIn } = useTravel();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // For testing convenience, we do not restrict access. However, we can add a check if needed.
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      {/* Main Page Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 min-h-screen ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Header Dashboard Nav */}
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        {/* Dynamic page content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
