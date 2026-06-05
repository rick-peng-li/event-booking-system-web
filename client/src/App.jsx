import { Route, Routes } from "react-router-dom";

import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Approvals from "./pages/Approvals";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import Home from "./pages/Home";

import MyBookings from "./pages/MyBooking";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      
<Route path="/auth" element={<Auth />} />
     <Route
  path="/dashboard"
  element={
    <ProtectedRoute role="organizer">
      <Dashboard />
    </ProtectedRoute>
  }
/>

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/event-details"
        element={<EventDetails />}
      />
      
     <Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <Admin />
    </ProtectedRoute>
  }
/>
<Route
  path="/approvals"
  element={
    <ProtectedRoute role="admin">
      <Approvals />
    </ProtectedRoute>
  }
/>

    </Routes>
    
  );
}

export default App;