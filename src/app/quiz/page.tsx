'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { QuizData } from '@/lib/types';
import { calculateNutritionPlan, saveQuizData } from '@/lib/utils';
import { ProgressBar } from '@/components/progress/ProgressBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [quizData, setQuizData] = useState<Partial<QuizData>>({
    restrictions: [],
  });

  const totalSteps = 7;

  const updateData = (field: keyof QuizData, value: any) => {
    setQuizData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = () => {
    if (isQuizComplete()) {
      saveQuizData(quizData as QuizData);
      router.push('/quiz/results');
    }
  };

  const isQuizComplete = (): boolean => {
    return !!(
      quizData.name &&
      quizData.age &&
      quizData.gender &&
      quizData.height &&
      quizData.weight &&
      quizData.goal &&
      quizData.activityLevel
    );
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return !!quizData.name && !!quizData.age;
      case 1:
        return !!quizData.gender;
      case 2:
        return !!quizData.height && !!quizData.weight;
      case 3:
        return !!quizData.goal;
      case 4:
        return !!quizData.activityLevel;
      case 5:
        return true; // Restrições são opcionais
      case 6:
        return true; // Revisão final
      default:
        return false;
    }
  };

  const steps = [
    // Step 0: Nome e Idade
    <motion.div
      key="step0"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Vamos começar!</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Primeiro, conte um pouco sobre você
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Qual é o seu nome?</label>
          <input
            type="text"
            value={quizData.name || ''}
            onChange={(e) => updateData('name', e.target.value)}
            placeholder="Digite seu nome"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#00C781] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Qual é a sua idade?</label>
          <input
            type="number"
            value={quizData.age || ''}
            onChange={(e) => updateData('age', parseInt(e.target.value))}
            placeholder="Digite sua idade"
            min="15"
            max="100"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#00C781] focus:outline-none transition-colors"
          />
        </div>
      </div>
    </motion.div>,

    // Step 1: Gênero
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Qual é o seu gênero?</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Isso nos ajuda a calcular suas necessidades calóricas
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { value: 'male', label: 'Masculino', emoji: '👨' },
          { value: 'female', label: 'Feminino', emoji: '👩' },
          { value: 'other', label: 'Outro', emoji: '🧑' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => updateData('gender', option.value)}
            className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
              quizData.gender === option.value
                ? 'border-[#00C781] bg-[#00C781]/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-[#00C781]/50'
            }`}
          >
            <div className="text-4xl mb-2">{option.emoji}</div>
            <div className="font-semibold">{option.label}</div>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 2: Altura e Peso
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Suas medidas</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Precisamos saber sua altura e peso atual
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Altura (cm)</label>
          <input
            type="number"
            value={quizData.height || ''}
            onChange={(e) => updateData('height', parseInt(e.target.value))}
            placeholder="Ex: 170"
            min="100"
            max="250"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#00C781] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Peso (kg)</label>
          <input
            type="number"
            value={quizData.weight || ''}
            onChange={(e) => updateData('weight', parseInt(e.target.value))}
            placeholder="Ex: 70"
            min="30"
            max="300"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#00C781] focus:outline-none transition-colors"
          />
        </div>
      </div>
    </motion.div>,

    // Step 3: Objetivo
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Qual é o seu objetivo?</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Vamos personalizar seu plano baseado nisso
      </p>

      <div className="grid grid-cols-1 gap-4">
        {[
          {
            value: 'lose',
            label: 'Perder Gordura',
            description: 'Emagrecer de forma saudável',
            emoji: '🔥',
          },
          {
            value: 'gain',
            label: 'Ganhar Massa Muscular',
            description: 'Hipertrofia e força',
            emoji: '💪',
          },
          {
            value: 'maintain',
            label: 'Manter Peso',
            description: 'Equilíbrio e bem-estar',
            emoji: '⚖️',
          },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => updateData('goal', option.value)}
            className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 text-left ${
              quizData.goal === option.value
                ? 'border-[#00C781] bg-[#00C781]/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-[#00C781]/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{option.emoji}</div>
              <div>
                <div className="font-bold text-lg">{option.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 4: Nível de Atividade
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Nível de atividade física</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Com que frequência você se exercita?
      </p>

      <div className="grid grid-cols-1 gap-4">
        {[
          {
            value: 'sedentary',
            label: 'Sedentário',
            description: 'Pouco ou nenhum exercício',
          },
          {
            value: 'light',
            label: 'Levemente Ativo',
            description: '1-3 dias por semana',
          },
          {
            value: 'moderate',
            label: 'Moderadamente Ativo',
            description: '3-5 dias por semana',
          },
          {
            value: 'active',
            label: 'Muito Ativo',
            description: '6-7 dias por semana',
          },
          {
            value: 'very_active',
            label: 'Extremamente Ativo',
            description: 'Atleta ou trabalho físico intenso',
          },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => updateData('activityLevel', option.value)}
            className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 text-left ${
              quizData.activityLevel === option.value
                ? 'border-[#00C781] bg-[#00C781]/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-[#00C781]/50'
            }`}
          >
            <div className="font-bold">{option.label}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 5: Restrições Alimentares
    <motion.div
      key="step5"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Restrições alimentares</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Selecione todas que se aplicam (opcional)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          'Vegetariano',
          'Vegano',
          'Sem Glúten',
          'Sem Lactose',
          'Diabético',
          'Hipertenso',
        ].map((restriction) => {
          const isSelected = quizData.restrictions?.includes(restriction);
          return (
            <button
              key={restriction}
              onClick={() => {
                const current = quizData.restrictions || [];
                const updated = isSelected
                  ? current.filter((r) => r !== restriction)
                  : [...current, restriction];
                updateData('restrictions', updated);
              }}
              className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 text-left ${
                isSelected
                  ? 'border-[#00C781] bg-[#00C781]/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-[#00C781]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{restriction}</span>
                {isSelected && <Check className="w-5 h-5 text-[#00C781]" />}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>,

    // Step 6: Revisão
    <motion.div
      key="step6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Quase lá!</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Revise suas informações antes de continuar
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4 border-2 border-gray-200 dark:border-gray-700">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Nome:</span>
          <span className="font-semibold">{quizData.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Idade:</span>
          <span className="font-semibold">{quizData.age} anos</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Altura:</span>
          <span className="font-semibold">{quizData.height} cm</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Peso:</span>
          <span className="font-semibold">{quizData.weight} kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Objetivo:</span>
          <span className="font-semibold">
            {quizData.goal === 'lose'
              ? 'Perder Gordura'
              : quizData.goal === 'gain'
              ? 'Ganhar Massa'
              : 'Manter Peso'}
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#00C781]/10 to-[#00A86B]/10 rounded-2xl p-6 border-2 border-[#00C781]/30">
        <p className="text-center font-semibold text-[#00C781]">
          ✨ Seu plano personalizado está pronto para ser gerado!
        </p>
      </div>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1E1E] dark:to-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">N+</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00C781] to-[#00A86B] bg-clip-text text-transparent">
              NutriPro+
            </span>
          </Link>
        </div>
      </header>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Passo {step + 1} de {totalSteps}
              </span>
              <span className="text-sm font-semibold text-[#00C781]">
                {Math.round(((step + 1) / totalSteps) * 100)}%
              </span>
            </div>
            <ProgressBar current={step + 1} total={totalSteps} />
          </div>

          {/* Quiz Steps */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-800">
            <AnimatePresence mode="wait">{steps[step]}</AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  className="px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#00C781] transition-all font-semibold inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex-1 px-6 py-3 rounded-xl font-bold inline-flex items-center justify-center gap-2 transition-all ${
                  canProceed()
                    ? 'bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white hover:shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {step === totalSteps - 1 ? 'Finalizar' : 'Próximo'}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
