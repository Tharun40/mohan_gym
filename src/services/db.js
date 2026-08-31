import { supabase, isSupabaseConfigured } from "./supabase";
import {
  INITIAL_PLANS,
  INITIAL_ADDONS,
  INITIAL_TRAINERS,
  INITIAL_USERS,
  INITIAL_MEMBERSHIPS,
  INITIAL_PAYMENTS,
  INITIAL_ATTENDANCE,
  WORKOUT_ROUTINE,
  DIET_PLAN
} from "./seedData";

// LocalStorage Keys
const KEYS = {
  PLANS: "mohangym_plans",
  ADDONS: "mohangym_addons",
  TRAINERS: "mohangym_trainers",
  USERS: "mohangym_users",
  MEMBERSHIPS: "mohangym_memberships",
  PAYMENTS: "mohangym_payments",
  ATTENDANCE: "mohangym_attendance",
};

// Helper to initialize local storage if empty
const getLocalData = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
};

// Database Service with Supabase + LocalStorage Fallback
export const db = {
  // --- PLANS ---
  async getPlans() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("membership_plans").select("*").order("price", { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    return getLocalData(KEYS.PLANS, INITIAL_PLANS);
  },

  async savePlan(plan) {
    const plans = getLocalData(KEYS.PLANS, INITIAL_PLANS);
    let updated;
    if (plan.id) {
      updated = plans.map((p) => (p.id === plan.id ? { ...p, ...plan } : p));
    } else {
      const newPlan = { ...plan, id: `plan-${Date.now()}`, active: true };
      updated = [...plans, newPlan];
    }
    setLocalData(KEYS.PLANS, updated);

    if (isSupabaseConfigured) {
      await supabase.from("membership_plans").upsert(plan);
    }
    return updated;
  },

  async deletePlan(planId) {
    const plans = getLocalData(KEYS.PLANS, INITIAL_PLANS);
    const updated = plans.filter((p) => p.id !== planId);
    setLocalData(KEYS.PLANS, updated);

    if (isSupabaseConfigured) {
      await supabase.from("membership_plans").delete().eq("id", planId);
    }
    return updated;
  },

  // --- ADD-ONS ---
  async getAddons() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("addons").select("*");
      if (!error && data && data.length > 0) return data;
    }
    return getLocalData(KEYS.ADDONS, INITIAL_ADDONS);
  },

  // --- TRAINERS ---
  async getTrainers() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("trainers").select("*").order("created_at", { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    return getLocalData(KEYS.TRAINERS, INITIAL_TRAINERS);
  },

  async saveTrainer(trainer) {
    const trainers = getLocalData(KEYS.TRAINERS, INITIAL_TRAINERS);
    let updated;
    if (trainer.id) {
      updated = trainers.map((t) => (t.id === trainer.id ? { ...t, ...trainer } : t));
    } else {
      const newTrainer = { ...trainer, id: `trainer-${Date.now()}`, active: true };
      updated = [...trainers, newTrainer];
    }
    setLocalData(KEYS.TRAINERS, updated);

    if (isSupabaseConfigured) {
      await supabase.from("trainers").upsert(trainer);
    }
    return updated;
  },

  async deleteTrainer(trainerId) {
    const trainers = getLocalData(KEYS.TRAINERS, INITIAL_TRAINERS);
    const updated = trainers.filter((t) => t.id !== trainerId);
    setLocalData(KEYS.TRAINERS, updated);

    if (isSupabaseConfigured) {
      await supabase.from("trainers").delete().eq("id", trainerId);
    }
    return updated;
  },

  // --- USERS & PROFILES ---
  async getUsers() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("profiles").select("*");
      if (!error && data && data.length > 0) return data;
    }
    return getLocalData(KEYS.USERS, INITIAL_USERS);
  },

  async updateUser(user) {
    const users = getLocalData(KEYS.USERS, INITIAL_USERS);
    const updated = users.map((u) => (u.id === user.id ? { ...u, ...user } : u));
    setLocalData(KEYS.USERS, updated);

    if (isSupabaseConfigured) {
      await supabase.from("profiles").upsert(user);
    }
    return user;
  },

  // --- MEMBERSHIPS ---
  async getMemberships() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("memberships").select("*");
      if (!error && data && data.length > 0) return data;
    }
    return getLocalData(KEYS.MEMBERSHIPS, INITIAL_MEMBERSHIPS);
  },

  async getMembershipForUser(userId) {
    const memberships = await this.getMemberships();
    return memberships.find((m) => m.userId === userId && m.status === "active") || memberships.find((m) => m.userId === userId) || null;
  },

  async createMembership(membershipData) {
    const memberships = getLocalData(KEYS.MEMBERSHIPS, INITIAL_MEMBERSHIPS);
    const newMembership = {
      ...membershipData,
      id: `mem-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active"
    };
    // Deactivate previous active memberships for this user
    const updated = memberships.map((m) => (m.userId === membershipData.userId ? { ...m, status: "expired" } : m));
    updated.unshift(newMembership);
    setLocalData(KEYS.MEMBERSHIPS, updated);

    if (isSupabaseConfigured) {
      await supabase.from("memberships").insert(newMembership);
    }
    return newMembership;
  },

  async updateMembershipStatus(membershipId, status) {
    const memberships = getLocalData(KEYS.MEMBERSHIPS, INITIAL_MEMBERSHIPS);
    const updated = memberships.map((m) => (m.id === membershipId ? { ...m, status } : m));
    setLocalData(KEYS.MEMBERSHIPS, updated);

    if (isSupabaseConfigured) {
      await supabase.from("memberships").update({ status }).eq("id", membershipId);
    }
    return updated;
  },

  // --- PAYMENTS ---
  async getPayments() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("payments").select("*").order("date", { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
    return getLocalData(KEYS.PAYMENTS, INITIAL_PAYMENTS);
  },

  async recordPayment(paymentData) {
    const payments = getLocalData(KEYS.PAYMENTS, INITIAL_PAYMENTS);
    const newPayment = {
      ...paymentData,
      id: `PAY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Successful"
    };
    payments.unshift(newPayment);
    setLocalData(KEYS.PAYMENTS, payments);

    if (isSupabaseConfigured) {
      await supabase.from("payments").insert(newPayment);
    }
    return newPayment;
  },

  async updatePaymentStatus(paymentId, status) {
    const payments = getLocalData(KEYS.PAYMENTS, INITIAL_PAYMENTS);
    const updated = payments.map((p) => (p.id === paymentId ? { ...p, status } : p));
    setLocalData(KEYS.PAYMENTS, updated);

    if (isSupabaseConfigured) {
      await supabase.from("payments").update({ status }).eq("id", paymentId);
    }
    return updated;
  },

  // --- ATTENDANCE ---
  async getAttendance() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("attendance").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
    return getLocalData(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  },

  async recordCheckIn(userId, userName) {
    const records = getLocalData(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateStr = now.toISOString().split("T")[0];

    const newRecord = {
      id: `att-${Date.now()}`,
      userId,
      userName,
      date: dateStr,
      checkIn: timeStr,
      checkOut: null
    };

    records.unshift(newRecord);
    setLocalData(KEYS.ATTENDANCE, records);

    if (isSupabaseConfigured) {
      await supabase.from("attendance").insert(newRecord);
    }
    return newRecord;
  },

  async recordCheckOut(attendanceId) {
    const records = getLocalData(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const updated = records.map((r) => (r.id === attendanceId ? { ...r, checkOut: timeStr } : r));
    setLocalData(KEYS.ATTENDANCE, updated);

    if (isSupabaseConfigured) {
      await supabase.from("attendance").update({ check_out: timeStr }).eq("id", attendanceId);
    }
    return updated;
  },

  // --- WORKOUT & DIET ---
  getWorkoutRoutine() {
    return WORKOUT_ROUTINE;
  },

  getDietPlan() {
    return DIET_PLAN;
  }
};
