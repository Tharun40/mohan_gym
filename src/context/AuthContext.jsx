import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../services/db";
import { INITIAL_USERS } from "../services/seedData";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "mohangym_auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load auth user:", e);
    }
    // Default to initial member Tharun for instant evaluation, or null
    return INITIAL_USERS[1]; // Tharun (member)
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } catch (e) {
        console.error("Failed to save auth user:", e);
      }
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const users = await db.getUsers();
      const cleanEmail = email.trim().toLowerCase();
      const found = users.find((u) => u.email.toLowerCase() === cleanEmail);

      if (found) {
        setUser(found);
        setLoading(false);
        return { success: true, user: found };
      }

      // If email doesn't exist yet, but matches demo patterns:
      if (cleanEmail === "admin@mohangym.com" || cleanEmail.includes("admin")) {
        const adminUser = INITIAL_USERS[0];
        setUser(adminUser);
        setLoading(false);
        return { success: true, user: adminUser };
      }

      // Otherwise create/login temporary member
      const newMember = {
        id: `user-${Date.now()}`,
        name: cleanEmail.split("@")[0].toUpperCase(),
        email: cleanEmail,
        phone: "+91 98000 00000",
        role: "member",
        createdAt: new Date().toISOString().split("T")[0]
      };
      await db.updateUser(newMember);
      setUser(newMember);
      setLoading(false);
      return { success: true, user: newMember };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message || "Failed to login" };
    }
  };

  const register = async ({ name, email, phone, password }) => {
    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const users = await db.getUsers();
      const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

      if (existing) {
        setLoading(false);
        return { success: false, error: "An account with this email already exists." };
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email: cleanEmail,
        phone: phone || "+91 98000 00000",
        role: "member",
        fitnessGoals: "General Fitness & Hypertrophy",
        emergencyContact: "",
        createdAt: new Date().toISOString().split("T")[0]
      };

      await db.updateUser(newUser);
      setUser(newUser);
      setLoading(false);
      return { success: true, user: newUser };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message || "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    await db.updateUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "visitor",
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === "admin",
        isMember: user?.role === "member",
        login,
        register,
        logout,
        updateProfile,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
