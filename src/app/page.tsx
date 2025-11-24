'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dumbbell, Camera, TrendingUp, Utensils } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se usuário já está logado
    const savedUser = localStorage.getItem('fitmacro_user');
    const savedProfile = localStorage.getItem('fitmacro_profile');
    
    if (savedUser && savedProfile) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
        <div className="text-center space-y-6 max-w-4xl">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl">
              <Dumbbell className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            FitMacro
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
            Seu app completo de nutrição e treino com inteligência artificial
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <Camera className="w-8 h-8 mb-3 text-blue-300" />
              <h3 className="font-semibold mb-2">Câmera IA</h3>
              <p className="text-sm text-blue-200">Calcule calorias por foto</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <Utensils className="w-8 h-8 mb-3 text-blue-300" />
              <h3 className="font-semibold mb-2">2000+ Alimentos</h3>
              <p className="text-sm text-blue-200">Biblioteca completa</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <Dumbbell className="w-8 h-8 mb-3 text-blue-300" />
              <h3 className="font-semibold mb-2">Treinos IA</h3>
              <p className="text-sm text-blue-200">Personalizados para você</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <TrendingUp className="w-8 h-8 mb-3 text-blue-300" />
              <h3 className="font-semibold mb-2">Acompanhamento</h3>
              <p className="text-sm text-blue-200">Progresso em tempo real</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-6 rounded-xl font-semibold shadow-xl"
              onClick={() => router.push('/auth/cadastro')}
            >
              Começar Agora
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl font-semibold"
              onClick={() => router.push('/auth/login')}
            >
              Já tenho conta
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="text-sm text-blue-200 mt-8">
            ✨ Junte-se a milhares de usuários transformando seus corpos
          </p>
        </div>
      </div>
    </div>
  );
}
