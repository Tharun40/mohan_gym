export const INITIAL_PLANS = [
  {
    id: "plan-basic",
    name: "Basic Plan",
    price: 799,
    duration: "3 Months",
    durationMonths: 3,
    description: "Essential floor access for focused training and guided workout charts.",
    features: [
      "Full Gym Floor Access",
      "Locker Room & Showers",
      "Workout Chart Included",
      "Standard Equipment Access"
    ],
    popular: false,
    active: true
  },
  {
    id: "plan-premium",
    name: "Premium Plan",
    price: 1499,
    duration: "6 Months",
    durationMonths: 6,
    description: "Our most popular comprehensive fitness and diet coaching regimen.",
    features: [
      "Full Gym Floor Access",
      "Locker Room & Showers",
      "Custom Diet Chart Included",
      "1 Free Trainer Consultation",
      "Recovery Lounge Access"
    ],
    popular: true,
    active: true
  },
  {
    id: "plan-platinum",
    name: "Platinum Plan",
    price: 2799,
    duration: "1 Year",
    durationMonths: 12,
    description: "The ultimate elite performance membership with all charts and VIP perks.",
    features: [
      "Unlimited All-Zone Access",
      "Workout + Diet Chart Included",
      "2 Personal Training Sessions",
      "Priority Slot Booking",
      "Free Guest Pass Every Month",
      "Steam & Recovery Access"
    ],
    popular: false,
    active: true
  }
];

export const INITIAL_ADDONS = [
  {
    id: "addon-admission",
    name: "Admission Fee",
    price: 300,
    description: "One-time registration & onboarding kit"
  },
  {
    id: "addon-workout",
    name: "Workout Chart",
    price: 200,
    description: "Personalized exercise routine & set guidelines"
  },
  {
    id: "addon-diet",
    name: "Diet Chart",
    price: 300,
    description: "Custom nutrition blueprint & macro split"
  }
];

export const INITIAL_TRAINERS = [
  {
    id: "trainer-1",
    name: "Mohan Raj",
    specialization: "Head Strength Coach & Master Trainer",
    experience: "12+ Years",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80",
    bio: "Founder of Mohan Gym with over a decade of shaping national physique competitors and elite powerlifters.",
    programs: ["Strength Sculpt", "Hypertrophy Mastery"],
    active: true,
    instagram: "@mohan_fitness"
  },
  {
    id: "trainer-2",
    name: "Kavitha Selvan",
    specialization: "Conditioning & Functional Mobility",
    experience: "7+ Years",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    bio: "Specializes in high-intensity conditioning, posture realignment, and athletic agility protocols.",
    programs: ["Athletic Burn", "Mobility Reset"],
    active: true,
    instagram: "@kavitha_trains"
  },
  {
    id: "trainer-3",
    name: "Vikram Sengupta",
    specialization: "Body Transformation & Nutrition",
    experience: "9+ Years",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    bio: "Expert in customized contest prep, metabolic conditioning, and lean muscle mass acceleration.",
    programs: ["Lean Physique", "Powerlifting Block"],
    active: true,
    instagram: "@vikram_iron"
  }
];

export const INITIAL_USERS = [
  {
    id: "user-admin",
    name: "Mohan Raj (Admin)",
    email: "admin@mohangym.com",
    phone: "+91 98765 43210",
    role: "admin",
    fitnessGoals: "Gym Management & Athletic Mastery",
    emergencyContact: "+91 98765 00000",
    createdAt: "2024-01-01"
  },
  {
    id: "user-member-1",
    name: "Tharun",
    email: "member@mohangym.com",
    phone: "+91 98401 23456",
    role: "member",
    fitnessGoals: "Hypertrophy, Strength & Lean Muscle Mass",
    emergencyContact: "+91 94440 98765",
    createdAt: "2026-01-15"
  },
  {
    id: "user-member-2",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 97112 34567",
    role: "member",
    fitnessGoals: "Weight Loss & Endurance",
    emergencyContact: "+91 98111 22334",
    createdAt: "2026-02-01"
  },
  {
    id: "user-member-3",
    name: "Ananya Iyer",
    email: "ananya@example.com",
    phone: "+91 96543 89012",
    role: "member",
    fitnessGoals: "Mobility & Strength Conditioning",
    emergencyContact: "+91 99887 76655",
    createdAt: "2026-02-10"
  }
];

export const INITIAL_MEMBERSHIPS = [
  {
    id: "mem-1",
    userId: "user-member-1",
    planId: "plan-premium",
    planName: "Premium Plan",
    price: 1499,
    addonsSelected: [
      { id: "addon-admission", name: "Admission Fee", price: 300 },
      { id: "addon-diet", name: "Diet Chart", price: 300 }
    ],
    totalPaid: 2099,
    startDate: "2026-02-12",
    endDate: "2026-08-12",
    status: "active",
    createdAt: "2026-02-12"
  },
  {
    id: "mem-2",
    userId: "user-member-2",
    planId: "plan-basic",
    planName: "Basic Plan",
    price: 799,
    addonsSelected: [
      { id: "addon-admission", name: "Admission Fee", price: 300 },
      { id: "addon-workout", name: "Workout Chart", price: 200 }
    ],
    totalPaid: 1299,
    startDate: "2026-02-01",
    endDate: "2026-05-01",
    status: "active",
    createdAt: "2026-02-01"
  },
  {
    id: "mem-3",
    userId: "user-member-3",
    planId: "plan-platinum",
    planName: "Platinum Plan",
    price: 2799,
    addonsSelected: [],
    totalPaid: 2799,
    startDate: "2025-02-10",
    endDate: "2026-02-10",
    status: "expired",
    createdAt: "2025-02-10"
  }
];

export const INITIAL_PAYMENTS = [
  {
    id: "PAY-2026-8901",
    userId: "user-member-1",
    userName: "Tharun",
    membershipId: "mem-1",
    planName: "Premium Plan",
    addonsSummary: "Admission Fee (₹300), Diet Chart (₹300)",
    amount: 2099,
    status: "Successful",
    paymentMethod: "UPI / Google Pay",
    paymentReference: "UPI-MOHAN-8921734",
    date: "2026-02-12"
  },
  {
    id: "PAY-2026-8742",
    userId: "user-member-2",
    userName: "Rahul Sharma",
    membershipId: "mem-2",
    planName: "Basic Plan",
    addonsSummary: "Admission Fee (₹300), Workout Chart (₹200)",
    amount: 1299,
    status: "Successful",
    paymentMethod: "Card (Visa)",
    paymentReference: "CC-VISA-991283",
    date: "2026-02-01"
  },
  {
    id: "PAY-2025-3410",
    userId: "user-member-3",
    userName: "Ananya Iyer",
    membershipId: "mem-3",
    planName: "Platinum Plan",
    addonsSummary: "None",
    amount: 2799,
    status: "Successful",
    paymentMethod: "NetBanking",
    paymentReference: "NB-HDFC-663810",
    date: "2025-02-10"
  }
];

export const INITIAL_ATTENDANCE = [
  { id: "att-1", userId: "user-member-1", userName: "Tharun", date: "2026-08-30", checkIn: "06:15 AM", checkOut: "07:45 AM" },
  { id: "att-2", userId: "user-member-1", userName: "Tharun", date: "2026-08-29", checkIn: "06:20 AM", checkOut: "07:50 AM" },
  { id: "att-3", userId: "user-member-1", userName: "Tharun", date: "2026-08-28", checkIn: "06:30 AM", checkOut: "08:00 AM" },
  { id: "att-4", userId: "user-member-1", userName: "Tharun", date: "2026-08-27", checkIn: "06:10 AM", checkOut: "07:35 AM" },
  { id: "att-5", userId: "user-member-1", userName: "Tharun", date: "2026-08-25", checkIn: "06:25 AM", checkOut: "07:55 AM" },
  { id: "att-6", userId: "user-member-2", userName: "Rahul Sharma", date: "2026-08-30", checkIn: "07:00 AM", checkOut: "08:15 AM" },
  { id: "att-7", userId: "user-member-3", userName: "Ananya Iyer", date: "2026-08-29", checkIn: "05:45 PM", checkOut: "07:00 PM" }
];

export const WORKOUT_ROUTINE = [
  {
    day: "Monday",
    muscleGroup: "Chest & Triceps",
    intensity: "High",
    exercises: [
      { name: "Barbell Incline Bench Press", sets: "4 Sets", reps: "8-10 Reps", rest: "90s" },
      { name: "Flat Dumbbell Press", sets: "4 Sets", reps: "10-12 Reps", rest: "75s" },
      { name: "Cable Chest Flyes (Low to High)", sets: "3 Sets", reps: "12-15 Reps", rest: "60s" },
      { name: "Weighted Tricep Dips", sets: "3 Sets", reps: "10-12 Reps", rest: "60s" },
      { name: "Overhead Rope Tricep Extension", sets: "4 Sets", reps: "12-15 Reps", rest: "45s" }
    ]
  },
  {
    day: "Tuesday",
    muscleGroup: "Back & Biceps",
    intensity: "High",
    exercises: [
      { name: "Conventional Deadlifts", sets: "4 Sets", reps: "6-8 Reps", rest: "120s" },
      { name: "Lat Pulldown (Wide Grip)", sets: "4 Sets", reps: "10-12 Reps", rest: "75s" },
      { name: "Barbell Bent-Over Rows", sets: "4 Sets", reps: "8-10 Reps", rest: "90s" },
      { name: "Incline Dumbbell Bicep Curls", sets: "3 Sets", reps: "10-12 Reps", rest: "60s" },
      { name: "Hammer Curls with Rope", sets: "3 Sets", reps: "12-15 Reps", rest: "45s" }
    ]
  },
  {
    day: "Wednesday",
    muscleGroup: "Legs & Core",
    intensity: "Maximum",
    exercises: [
      { name: "Barbell Back Squats", sets: "5 Sets", reps: "6-8 Reps", rest: "120s" },
      { name: "Romanian Deadlifts (Dumbbells)", sets: "4 Sets", reps: "10-12 Reps", rest: "90s" },
      { name: "Leg Press (Heavy Load)", sets: "4 Sets", reps: "12 Reps", rest: "75s" },
      { name: "Standing Calf Raises", sets: "4 Sets", reps: "15-20 Reps", rest: "45s" },
      { name: "Hanging Leg Raises", sets: "3 Sets", reps: "15 Reps", rest: "60s" }
    ]
  },
  {
    day: "Thursday",
    muscleGroup: "Shoulders & Traps",
    intensity: "Moderate-High",
    exercises: [
      { name: "Seated Dumbbell Shoulder Press", sets: "4 Sets", reps: "8-10 Reps", rest: "90s" },
      { name: "Lean-Away Cable Lateral Raises", sets: "4 Sets", reps: "12-15 Reps", rest: "60s" },
      { name: "Face Pulls with External Rotation", sets: "4 Sets", reps: "15 Reps", rest: "45s" },
      { name: "Barbell Shrugs", sets: "4 Sets", reps: "10-12 Reps", rest: "60s" }
    ]
  },
  {
    day: "Friday",
    muscleGroup: "Arms & Core Hypertrophy",
    intensity: "High",
    exercises: [
      { name: "EZ-Bar Preacher Curls", sets: "4 Sets", reps: "10-12 Reps", rest: "60s" },
      { name: "Skull Crushers (Lying Tricep Ext)", sets: "4 Sets", reps: "10-12 Reps", rest: "60s" },
      { name: "Concentration Curls", sets: "3 Sets", reps: "12-15 Reps", rest: "45s" },
      { name: "Cable Woodchoppers & Planks", sets: "3 Sets", reps: "15 Reps / 60s", rest: "45s" }
    ]
  },
  {
    day: "Saturday",
    muscleGroup: "Functional Conditioning & HIIT",
    intensity: "High",
    exercises: [
      { name: "Kettlebell Swings", sets: "4 Sets", reps: "20 Reps", rest: "45s" },
      { name: "Battle Ropes Waves", sets: "4 Sets", reps: "30 Seconds", rest: "45s" },
      { name: "Assault Bike Sprints", sets: "5 Rounds", reps: "20s Sprint / 40s Rest", rest: "60s" },
      { name: "Full Body Mobility & Stretch", sets: "1 Session", reps: "15 Minutes", rest: "None" }
    ]
  }
];

export const DIET_PLAN = {
  dailyTarget: {
    calories: "2,450 kcal",
    protein: "165g",
    carbs: "250g",
    fats: "65g"
  },
  meals: [
    {
      time: "07:30 AM",
      name: "Breakfast — Power Ignition",
      calories: 520,
      protein: "35g",
      items: [
        "4 Whole Eggs (boiled or omelette with spinach & mushrooms)",
        "2 Slices Whole Grain / Multigrain Toast with Almond Butter",
        "1 Cup Black Coffee or Green Tea with Lemon"
      ]
    },
    {
      time: "10:30 AM",
      name: "Mid-Morning — Sustained Energy",
      calories: 340,
      protein: "22g",
      items: [
        "1 Scoop Whey Isolate Protein with 250ml Almond Milk",
        "1 Medium Banana & Handful of Walnuts / Almonds"
      ]
    },
    {
      time: "01:30 PM",
      name: "Lunch — Lean Muscle Builder",
      calories: 680,
      protein: "48g",
      items: [
        "180g Grilled Chicken Breast or 200g Paneer / Tofu",
        "1 Cup Brown Rice or Quinoa",
        "Large Bowl Mixed Green Salad with Olive Oil drizzle",
        "1 Cup Steamed Broccoli & Zucchini"
      ]
    },
    {
      time: "05:00 PM",
      name: "Pre-Workout Fuel (60 mins before training)",
      calories: 280,
      protein: "14g",
      items: [
        "1 Cup Oats with Berries and Honey",
        "1 Cup Black Coffee / Pre-workout Drink"
      ]
    },
    {
      time: "08:30 PM",
      name: "Dinner — Overnight Recovery",
      calories: 630,
      protein: "46g",
      items: [
        "200g Grilled Fish (Salmon / Rohu) or Chickpea Salad Bowl",
        "2 Whole Wheat Chapatis / 1 Sweet Potato",
        "1 Bowl Dal / Lentil Soup",
        "Cucumber & Tomato Slices"
      ]
    }
  ]
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Arun Krishnan",
    role: "Member since 2024",
    transformation: "-14 kg in 5 months",
    quote: "Mohan Gym isn't just a place to lift weights; the coaching atmosphere and structured diet chart transformed my physique and daily energy completely.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Sneha Reddy",
    role: "Member since 2025",
    transformation: "+4 kg lean muscle",
    quote: "The coaches here care about strict form and progressive overload. The premium environment keeps you laser-focused every morning at 6 AM.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Dinesh Karthik",
    role: "Member since 2023",
    transformation: "Deadlift 100kg → 190kg",
    quote: "Top-tier equipment, impeccable hygiene, and coaches who know how to program powerlifting cycles. Best gym in town by a mile.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];
