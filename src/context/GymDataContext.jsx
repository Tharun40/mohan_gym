import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { db } from "../services/db";

const GymDataContext = createContext(null);

export function GymDataProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [addons, setAddons] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [members, setMembers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [payments, setPayments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      const [
        loadedPlans,
        loadedAddons,
        loadedTrainers,
        loadedUsers,
        loadedMemberships,
        loadedPayments,
        loadedAttendance
      ] = await Promise.all([
        db.getPlans(),
        db.getAddons(),
        db.getTrainers(),
        db.getUsers(),
        db.getMemberships(),
        db.getPayments(),
        db.getAttendance()
      ]);

      setPlans(loadedPlans);
      setAddons(loadedAddons);
      setTrainers(loadedTrainers);
      setMembers(loadedUsers);
      setMemberships(loadedMemberships);
      setPayments(loadedPayments);
      setAttendance(loadedAttendance);
    } catch (e) {
      console.error("Failed to load gym data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // --- PLAN ACTIONS ---
  const savePlan = async (planData) => {
    const updated = await db.savePlan(planData);
    setPlans(updated);
    return updated;
  };

  const deletePlan = async (planId) => {
    const updated = await db.deletePlan(planId);
    setPlans(updated);
    return updated;
  };

  const togglePlanActive = async (planId) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;
    const updated = await db.savePlan({ ...plan, active: !plan.active });
    setPlans(updated);
  };

  // --- TRAINER ACTIONS ---
  const saveTrainer = async (trainerData) => {
    const updated = await db.saveTrainer(trainerData);
    setTrainers(updated);
    return updated;
  };

  const deleteTrainer = async (trainerId) => {
    const updated = await db.deleteTrainer(trainerId);
    setTrainers(updated);
    return updated;
  };

  // --- ATTENDANCE ACTIONS ---
  const recordCheckIn = async (userId, userName) => {
    await db.recordCheckIn(userId, userName);
    const updated = await db.getAttendance();
    setAttendance(updated);
    return updated;
  };

  const recordCheckOut = async (attendanceId) => {
    await db.recordCheckOut(attendanceId);
    const updated = await db.getAttendance();
    setAttendance(updated);
    return updated;
  };

  // --- MEMBER STATUS ACTIONS ---
  const toggleMemberStatus = async (userId) => {
    const userMembership = memberships.find((m) => m.userId === userId && m.status === "active");
    if (userMembership) {
      await db.updateMembershipStatus(userMembership.id, "expired");
    } else {
      const anyMembership = memberships.find((m) => m.userId === userId);
      if (anyMembership) {
        await db.updateMembershipStatus(anyMembership.id, "active");
      }
    }
    const updated = await db.getMemberships();
    setMemberships(updated);
  };

  // --- CHECKOUT & PAYMENT FLOW ---
  const processCheckoutPayment = async ({
    userId,
    userName,
    plan,
    selectedAddons = [],
    paymentMethod = "UPI",
    customMonths
  }) => {
    // 1. Calculate duration
    const months = customMonths || plan.durationMonths || 3;
    const startDate = new Date().toISOString().split("T")[0];
    const endDateObj = new Date();
    endDateObj.setMonth(endDateObj.getMonth() + months);
    const endDate = endDateObj.toISOString().split("T")[0];

    // 2. Calculate Total
    const addonsTotal = selectedAddons.reduce((sum, item) => sum + Number(item.price), 0);
    const totalAmount = Number(plan.price) + addonsTotal;

    // 3. Create Membership Record
    const newMembership = await db.createMembership({
      userId,
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      addonsSelected: selectedAddons,
      totalPaid: totalAmount,
      startDate,
      endDate,
      status: "active"
    });

    // 4. Create Payment Record
    const addonsSummary = selectedAddons.length > 0
      ? selectedAddons.map((a) => `${a.name} (₹${a.price})`).join(", ")
      : "None";

    const newPayment = await db.recordPayment({
      userId,
      userName,
      membershipId: newMembership.id,
      planName: plan.name,
      addonsSummary,
      amount: totalAmount,
      status: "Successful",
      paymentMethod,
      paymentReference: `PAY-${Date.now().toString().slice(-6)}`
    });

    // 5. Refresh reactive state
    await refreshData();

    return {
      membership: newMembership,
      payment: newPayment
    };
  };

  return (
    <GymDataContext.Provider
      value={{
        plans,
        addons,
        trainers,
        members,
        memberships,
        payments,
        attendance,
        loading,
        refreshData,
        savePlan,
        deletePlan,
        togglePlanActive,
        saveTrainer,
        deleteTrainer,
        recordCheckIn,
        recordCheckOut,
        toggleMemberStatus,
        processCheckoutPayment
      }}
    >
      {children}
    </GymDataContext.Provider>
  );
}

export function useGymData() {
  const context = useContext(GymDataContext);
  if (!context) {
    throw new Error("useGymData must be used within a GymDataProvider");
  }
  return context;
}
