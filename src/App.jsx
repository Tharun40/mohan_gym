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

// Launch configuration: Member portal, registration, and checkout are temporarily disabled for initial public launch.
// When PORTAL_ENABLED is false, visitors navigating directly to portal, checkout, or auth routes are safely redirected to the homepage.
// All files and imports are fully preserved for future implementation.
const PORTAL_ENABLED = false;

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GymDataProvider>
          <Routes>
            {/* Public Landing & Membership Flow */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/membership" element={<MembershipPage />} />

            {/* Launch Configuration: Portal, Checkout & Auth Routes */}
            {PORTAL_ENABLED ? (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
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
              </>
            ) : (
              <>
                {/* Temporarily disabled for initial public launch - redirect safely to homepage */}
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/register" element={<Navigate to="/" replace />} />
                <Route path="/checkout" element={<Navigate to="/" replace />} />
                <Route path="/payment-success" element={<Navigate to="/" replace />} />
                <Route path="/dashboard" element={<Navigate to="/" replace />} />
                <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
                <Route path="/admin" element={<Navigate to="/" replace />} />
                <Route path="/admin/*" element={<Navigate to="/" replace />} />
              </>
            )}

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </GymDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
