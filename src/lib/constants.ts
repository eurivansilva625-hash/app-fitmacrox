// Constantes do FitMacro

export const APP_NAME = 'FitMacro';

export const COLORS = {
  primary: '#1e3a8a', // azul escuro
  secondary: '#ffffff',
  accent: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Qual é o seu objetivo principal?',
    type: 'single',
    options: [
      { value: 'emagrecer', label: 'Emagrecer' },
      { value: 'ganhar_massa', label: 'Ganhar massa muscular' },
      { value: 'manter', label: 'Manter o peso atual' },
    ],
  },
  {
    id: 2,
    question: 'Qual é o seu sexo?',
    type: 'single',
    options: [
      { value: 'masculino', label: 'Masculino' },
      { value: 'feminino', label: 'Feminino' },
      { value: 'outro', label: 'Outro' },
    ],
  },
  {
    id: 3,
    question: 'Qual é a sua idade?',
    type: 'number',
    placeholder: 'Digite sua idade',
  },
  {
    id: 4,
    question: 'Qual é o seu peso atual? (kg)',
    type: 'number',
    placeholder: 'Digite seu peso em kg',
  },
  {
    id: 5,
    question: 'Qual é a sua altura? (cm)',
    type: 'number',
    placeholder: 'Digite sua altura em cm',
  },
  {
    id: 6,
    question: 'Qual é o seu nível de atividade física?',
    type: 'single',
    options: [
      { value: 'sedentario', label: 'Sedentário (pouco ou nenhum exercício)' },
      { value: 'leve', label: 'Leve (exercício 1-3 dias/semana)' },
      { value: 'moderado', label: 'Moderado (exercício 3-5 dias/semana)' },
      { value: 'intenso', label: 'Intenso (exercício 6-7 dias/semana)' },
      { value: 'muito_intenso', label: 'Muito intenso (atleta/treino 2x ao dia)' },
    ],
  },
  {
    id: 7,
    question: 'Você tem alguma restrição alimentar?',
    type: 'multiple',
    options: [
      { value: 'lactose', label: 'Intolerância à lactose' },
      { value: 'gluten', label: 'Intolerância ao glúten' },
      { value: 'vegetariano', label: 'Vegetariano' },
      { value: 'vegano', label: 'Vegano' },
      { value: 'nenhuma', label: 'Nenhuma restrição' },
    ],
  },
  {
    id: 8,
    question: 'Quantas refeições você faz por dia?',
    type: 'single',
    options: [
      { value: '3', label: '3 refeições' },
      { value: '4', label: '4 refeições' },
      { value: '5', label: '5 refeições' },
      { value: '6', label: '6 ou mais refeições' },
    ],
  },
  {
    id: 9,
    question: 'Você já treinou antes?',
    type: 'single',
    options: [
      { value: 'iniciante', label: 'Não, sou iniciante' },
      { value: 'intermediario', label: 'Sim, tenho experiência moderada' },
      { value: 'avancado', label: 'Sim, treino há anos' },
    ],
  },
  {
    id: 10,
    question: 'Quanto tempo você pode dedicar aos treinos?',
    type: 'single',
    options: [
      { value: '30', label: '30 minutos por dia' },
      { value: '45', label: '45 minutos por dia' },
      { value: '60', label: '1 hora por dia' },
      { value: '90', label: 'Mais de 1 hora por dia' },
    ],
  },
];

export const ACTIVITY_MULTIPLIERS = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  muito_intenso: 1.9,
};

export const PREMIUM_FEATURES = [
  {
    icon: 'Camera',
    title: 'Câmera Inteligente',
    description: 'Calcule calorias automaticamente tirando fotos dos pratos',
  },
  {
    icon: 'Dumbbell',
    title: 'Treinos Avançados',
    description: 'Acesso a treinos personalizados com vídeos e timer',
  },
  {
    icon: 'UtensilsCrossed',
    title: 'Dietas Personalizadas',
    description: 'IA cria dietas sob medida para seu objetivo',
  },
  {
    icon: 'ChefHat',
    title: 'Criador de Receitas',
    description: 'Gere receitas saudáveis baseadas em suas preferências',
  },
  {
    icon: 'TrendingUp',
    title: 'Acompanhamento Semanal',
    description: 'Relatórios detalhados do seu progresso',
  },
  {
    icon: 'Sparkles',
    title: 'IA Personalizada',
    description: 'Dicas e sugestões personalizadas para você',
  },
];

export const PREMIUM_PLANS = [
  {
    id: 'monthly',
    name: 'Mensal',
    price: 29.90,
    period: 'mês',
    features: ['Todos os recursos Premium', 'Cancele quando quiser'],
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 239.90,
    pricePerMonth: 19.99,
    period: 'ano',
    discount: '33% de desconto',
    features: ['Todos os recursos Premium', 'Economize R$ 119,00/ano', 'Melhor custo-benefício'],
    recommended: true,
  },
];

export const SAMPLE_FOODS = [
  { id: '1', name: 'Peito de frango grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g', category: 'Proteínas' },
  { id: '2', name: 'Arroz branco cozido', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, serving: '100g', category: 'Carboidratos' },
  { id: '3', name: 'Batata doce cozida', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: '100g', category: 'Carboidratos' },
  { id: '4', name: 'Ovo cozido', calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: '100g', category: 'Proteínas' },
  { id: '5', name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: '100g', category: 'Frutas' },
  { id: '6', name: 'Aveia', calories: 389, protein: 17, carbs: 66, fat: 7, serving: '100g', category: 'Carboidratos' },
  { id: '7', name: 'Brócolis cozido', calories: 35, protein: 2.4, carbs: 7, fat: 0.4, serving: '100g', category: 'Vegetais' },
  { id: '8', name: 'Salmão grelhado', calories: 206, protein: 22, carbs: 0, fat: 13, serving: '100g', category: 'Proteínas' },
];
