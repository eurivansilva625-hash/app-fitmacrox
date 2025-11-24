'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { QUIZ_QUESTIONS, ACTIVITY_MULTIPLIERS } from '@/lib/constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UserGoal, ActivityLevel } from '@/lib/types';

export default function QuizPage() {
  const router = useRouter();
  const { updateProfile, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const currentQuestion = QUIZ_QUESTIONS.find((q) => q.id === currentStep);
  const progress = (currentStep / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentStep]: value });
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateAndSave();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateAndSave = () => {
    // Extrair respostas
    const goal = answers[1] as UserGoal;
    const gender = answers[2] as 'masculino' | 'feminino' | 'outro';
    const age = parseInt(answers[3]);
    const weight = parseFloat(answers[4]);
    const height = parseFloat(answers[5]);
    const activityLevel = answers[6] as ActivityLevel;
    const restrictions = answers[7] || [];

    // Calcular TMB (Taxa Metabólica Basal) usando fórmula de Harris-Benedict
    let tmb = 0;
    if (gender === 'masculino') {
      tmb = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      tmb = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Aplicar multiplicador de atividade
    const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel];
    let dailyCalories = tmb * activityMultiplier;

    // Ajustar baseado no objetivo
    if (goal === 'emagrecer') {
      dailyCalories *= 0.85; // Déficit de 15%
    } else if (goal === 'ganhar_massa') {
      dailyCalories *= 1.15; // Superávit de 15%
    }

    // Calcular macros (proporção padrão)
    const dailyProtein = weight * 2; // 2g por kg
    const dailyFat = (dailyCalories * 0.25) / 9; // 25% das calorias
    const dailyCarbs = (dailyCalories - (dailyProtein * 4) - (dailyFat * 9)) / 4;

    // Salvar perfil
    updateProfile({
      age,
      weight,
      height,
      gender,
      goal,
      activityLevel,
      restrictions: Array.isArray(restrictions) ? restrictions : [restrictions],
      dailyCalories: Math.round(dailyCalories),
      dailyProtein: Math.round(dailyProtein),
      dailyCarbs: Math.round(dailyCarbs),
      dailyFat: Math.round(dailyFat),
      dailyWater: 2000, // 2L padrão
    });

    router.push('/dashboard');
  };

  const isAnswered = answers[currentStep] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm font-medium">
              Pergunta {currentStep} de {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-white text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQuestion?.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion?.type === 'single' && (
              <RadioGroup
                value={answers[currentStep]}
                onValueChange={handleAnswer}
              >
                {currentQuestion.options?.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-900 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer text-gray-700"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion?.type === 'multiple' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-900 transition-colors"
                  >
                    <Checkbox
                      id={option.value}
                      checked={answers[currentStep]?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const current = answers[currentStep] || [];
                        if (checked) {
                          handleAnswer([...current, option.value]);
                        } else {
                          handleAnswer(current.filter((v: string) => v !== option.value));
                        }
                      }}
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer text-gray-700"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {currentQuestion?.type === 'number' && (
              <Input
                type="number"
                placeholder={currentQuestion.placeholder}
                value={answers[currentStep] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                className="h-14 text-lg rounded-xl"
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12 rounded-xl border-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex-1 h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold"
            >
              {currentStep === QUIZ_QUESTIONS.length ? 'Finalizar' : 'Próxima'}
              {currentStep < QUIZ_QUESTIONS.length && (
                <ArrowRight className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
