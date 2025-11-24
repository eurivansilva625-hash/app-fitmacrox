// Tipos do FitMacro

export type UserGoal = 'emagrecer' | 'ganhar_massa' | 'manter';
export type ActivityLevel = 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso';
export type WorkoutLevel = 'iniciante' | 'intermediario' | 'avancado';
export type DietType = 'low_carb' | 'cetogenica' | 'flexivel' | 'jejum_intermitente';

export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: Date;
}

export interface UserProfile {
  userId: string;
  age: number;
  weight: number;
  height: number;
  gender: 'masculino' | 'feminino' | 'outro';
  goal: UserGoal;
  activityLevel: ActivityLevel;
  restrictions: string[];
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  dailyWater: number;
}

export interface QuizAnswer {
  step: number;
  question: string;
  answer: string | number | string[];
}

export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  category: string;
}

export interface Meal {
  id: string;
  userId: string;
  date: Date;
  type: 'cafe' | 'almoco' | 'jantar' | 'lanche';
  foods: {
    foodId: string;
    quantity: number;
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  imageUrl?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  level: WorkoutLevel;
  duration: number;
  category: 'emagrecimento' | 'hipertrofia' | 'condicionamento';
  exercises: Exercise[];
  isPremium: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  videoUrl?: string;
  instructions: string;
}

export interface Diet {
  id: string;
  name: string;
  type: DietType;
  description: string;
  meals: DietMeal[];
  isPremium: boolean;
}

export interface DietMeal {
  type: 'cafe' | 'almoco' | 'jantar' | 'lanche';
  foods: string[];
  calories: number;
}

export interface DailyProgress {
  date: Date;
  caloriesConsumed: number;
  proteinConsumed: number;
  carbsConsumed: number;
  fatConsumed: number;
  waterConsumed: number;
  workoutCompleted: boolean;
}
