'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import {
  Flame,
  Droplet,
  TrendingUp,
  Camera,
  Dumbbell,
  UtensilsCrossed,
  User,
  Settings,
  Crown,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, logout } = useAuth();
  const [todayProgress, setTodayProgress] = useState({
    calories: 850,
    protein: 65,
    carbs: 80,
    fat: 25,
    water: 1200,
  });

  useEffect(() => {
    if (!user || !profile) {
      router.push('/auth/login');
    }
  }, [user, profile, router]);

  if (!user || !profile) return null;

  const caloriesPercent = (todayProgress.calories / profile.dailyCalories) * 100;
  const proteinPercent = (todayProgress.protein / profile.dailyProtein) * 100;
  const carbsPercent = (todayProgress.carbs / profile.dailyCarbs) * 100;
  const fatPercent = (todayProgress.fat / profile.dailyFat) * 100;
  const waterPercent = (todayProgress.water / profile.dailyWater) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Olá, {user.name}! 👋</h1>
              <p className="text-blue-100 text-sm">
                {profile.goal === 'emagrecer' && 'Foco no emagrecimento'}
                {profile.goal === 'ganhar_massa' && 'Foco em ganhar massa'}
                {profile.goal === 'manter' && 'Foco em manter o peso'}
              </p>
            </div>
            <div className="flex gap-2">
              {!user.isPremium && (
                <Link href="/premium">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                    <Crown className="w-4 h-4 mr-2" />
                    Premium
                  </Button>
                </Link>
              )}
              <Link href="/perfil">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/configuracoes">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Calories */}
          <Card className="p-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Calorias</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayProgress.calories}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Meta</p>
                <p className="text-lg font-semibold text-gray-700">
                  {profile.dailyCalories}
                </p>
              </div>
            </div>
            <Progress value={caloriesPercent} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">
              {Math.round(caloriesPercent)}% da meta diária
            </p>
          </Card>

          {/* Water */}
          <Card className="p-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Droplet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Água</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayProgress.water}ml
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Meta</p>
                <p className="text-lg font-semibold text-gray-700">
                  {profile.dailyWater}ml
                </p>
              </div>
            </div>
            <Progress value={waterPercent} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">
              {Math.round(waterPercent)}% da meta diária
            </p>
          </Card>

          {/* Weight Goal */}
          <Card className="p-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Peso Atual</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {profile.weight}kg
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">IMC</p>
                <p className="text-lg font-semibold text-gray-700">
                  {(profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)}
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-xl">
              <p className="text-xs text-green-700 font-medium">
                Continue assim! Você está no caminho certo 🎯
              </p>
            </div>
          </Card>
        </div>

        {/* Macros */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Macronutrientes de Hoje
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Protein */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Proteínas</span>
                <span className="text-sm text-gray-600">
                  {todayProgress.protein}g / {profile.dailyProtein}g
                </span>
              </div>
              <Progress value={proteinPercent} className="h-2 bg-red-100" />
            </div>

            {/* Carbs */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Carboidratos</span>
                <span className="text-sm text-gray-600">
                  {todayProgress.carbs}g / {profile.dailyCarbs}g
                </span>
              </div>
              <Progress value={carbsPercent} className="h-2 bg-yellow-100" />
            </div>

            {/* Fat */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Gorduras</span>
                <span className="text-sm text-gray-600">
                  {todayProgress.fat}g / {profile.dailyFat}g
                </span>
              </div>
              <Progress value={fatPercent} className="h-2 bg-purple-100" />
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/camera">
            <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-xl transition-shadow cursor-pointer rounded-2xl">
              <Camera className="w-8 h-8 mb-3" />
              <h4 className="font-semibold mb-1">Câmera IA</h4>
              <p className="text-xs text-blue-100">Calcular calorias</p>
              {!user.isPremium && (
                <div className="mt-2 bg-yellow-500 text-gray-900 text-xs px-2 py-1 rounded-lg inline-flex items-center">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </div>
              )}
            </Card>
          </Link>

          <Link href="/treinos">
            <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white hover:shadow-xl transition-shadow cursor-pointer rounded-2xl">
              <Dumbbell className="w-8 h-8 mb-3" />
              <h4 className="font-semibold mb-1">Treinos</h4>
              <p className="text-xs text-purple-100">Ver exercícios</p>
            </Card>
          </Link>

          <Link href="/dietas">
            <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white hover:shadow-xl transition-shadow cursor-pointer rounded-2xl">
              <UtensilsCrossed className="w-8 h-8 mb-3" />
              <h4 className="font-semibold mb-1">Dietas</h4>
              <p className="text-xs text-green-100">Planos alimentares</p>
            </Card>
          </Link>

          <Card
            className="p-6 bg-gradient-to-br from-orange-600 to-orange-700 text-white hover:shadow-xl transition-shadow cursor-pointer rounded-2xl"
            onClick={() => alert('Adicionar refeição em breve!')}
          >
            <Plus className="w-8 h-8 mb-3" />
            <h4 className="font-semibold mb-1">Adicionar</h4>
            <p className="text-xs text-orange-100">Registrar refeição</p>
          </Card>
        </div>

        {/* Recent Meals */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Refeições de Hoje
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">Café da Manhã</p>
                <p className="text-sm text-gray-600">2 ovos, aveia, banana</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">450 kcal</p>
                <p className="text-xs text-gray-500">P: 25g | C: 45g | G: 15g</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">Almoço</p>
                <p className="text-sm text-gray-600">Frango, arroz, brócolis</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">400 kcal</p>
                <p className="text-xs text-gray-500">P: 40g | C: 35g | G: 10g</p>
              </div>
            </div>

            <Button variant="outline" className="w-full rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Refeição
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex justify-around items-center">
          <Link href="/dashboard">
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-blue-900">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Início</span>
            </Button>
          </Link>
          <Link href="/treinos">
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <Dumbbell className="w-5 h-5" />
              <span className="text-xs">Treinos</span>
            </Button>
          </Link>
          <Link href="/camera">
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <Camera className="w-5 h-5" />
              <span className="text-xs">Câmera</span>
            </Button>
          </Link>
          <Link href="/dietas">
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <UtensilsCrossed className="w-5 h-5" />
              <span className="text-xs">Dietas</span>
            </Button>
          </Link>
          <Link href="/perfil">
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <User className="w-5 h-5" />
              <span className="text-xs">Perfil</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
