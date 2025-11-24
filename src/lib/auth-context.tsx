'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProfile } from './types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('fitmacro_user');
    const savedProfile = localStorage.getItem('fitmacro_profile');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulação de login (em produção, conectar com backend/Supabase)
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      isPremium: false,
      createdAt: new Date(),
    };
    
    setUser(mockUser);
    localStorage.setItem('fitmacro_user', JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulação de cadastro (em produção, conectar com backend/Supabase)
    const mockUser: User = {
      id: '1',
      email,
      name,
      isPremium: false,
      createdAt: new Date(),
    };
    
    setUser(mockUser);
    localStorage.setItem('fitmacro_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('fitmacro_user');
    localStorage.removeItem('fitmacro_profile');
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    if (profile) {
      const updatedProfile = { ...profile, ...newProfile };
      setProfile(updatedProfile);
      localStorage.setItem('fitmacro_profile', JSON.stringify(updatedProfile));
    } else if (user) {
      const fullProfile: UserProfile = {
        userId: user.id,
        age: 0,
        weight: 0,
        height: 0,
        gender: 'masculino',
        goal: 'manter',
        activityLevel: 'moderado',
        restrictions: [],
        dailyCalories: 2000,
        dailyProtein: 150,
        dailyCarbs: 200,
        dailyFat: 60,
        dailyWater: 2000,
        ...newProfile,
      } as UserProfile;
      setProfile(fullProfile);
      localStorage.setItem('fitmacro_profile', JSON.stringify(fullProfile));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
