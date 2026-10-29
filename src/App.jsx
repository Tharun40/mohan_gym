import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GymDataProvider } from "./context/GymDataContext";

// Public Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MembershipPage from "./pages/MembershipPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

// Route Guards
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

// Member Dashboard Pages
import MemberLayout from "./pages/dashboard/MemberLayout";
import MemberOverview from "./pages/dashboard/MemberOverview";
import MemberProfile from "./pages/dashboard/MemberProfile";
import MemberMembership from "./pages/dashboard/MemberMembership";
import MemberPayments from "./pages/dashboard/MemberPayments";
import MemberAttendance from "./pages/dashboard/MemberAttendance";
import MemberWorkout from "./pages/dashboard/MemberWorkout";
import MemberDiet from "./pages/dashboard/MemberDiet";

// Admin Dashboard Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminMemberships from "./pages/admin/AdminMemberships";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminTrainers from "./pages/admin/AdminTrainers";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GymDataProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />

            {/* Member Dashboard (Protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MemberLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<MemberOverview />} />
              <Route path="profile" element={<MemberProfile />} />
              <Route path="membership" element={<MemberMembership />} />
              <Route path="payments" element={<MemberPayments />} />
              <Route path="attendance" element={<MemberAttendance />} />
              <Route path="workout" element={<MemberWorkout />} />
              <Route path="diet" element={<MemberDiet />} />
            </Route>

            {/* Admin Console (Protected & Restricted to Admin Role) */}
            <Route path="/admin/login" element={<Navigate to="/login" replace />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="members" element={<AdminMembers />} />
              <Route path="memberships" element={<AdminMemberships />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="trainers" element={<AdminTrainers />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </GymDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
