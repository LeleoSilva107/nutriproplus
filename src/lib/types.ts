// Types para o NutriPro+

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface QuizData {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  goal: 'lose' | 'gain' | 'maintain';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  restrictions: string[];
}

export interface NutritionPlan {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  imc: number;
  imcCategory: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  xp: number;
}

export interface UserProgress {
  userId: string;
  level: number;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  waterIntake: number[];
  workoutDays: string[];
  mealLogs: string[];
  achievements: Achievement[];
  lastLogin: string;
}

export type PlanType = 'free' | 'pro' | 'elite';

export interface Subscription {
  userId: string;
  plan: PlanType;
  startDate: string;
  endDate?: string;
}
