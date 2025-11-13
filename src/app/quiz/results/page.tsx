'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Target, Flame, Droplet } from 'lucide-react';
import { getQuizData, calculateNutritionPlan } from '@/lib/utils';
import { NutritionPlan } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function QuizResultsPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const quizData = getQuizData();
    if (!quizData) {
      router.push('/quiz');
      return;
    }

    // Simula carregamento para efeito visual
    setTimeout(() => {
      const nutritionPlan = calculateNutritionPlan(quizData);
      setPlan(nutritionPlan);
      setLoading(false);
    }, 1500);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1E1E] dark:to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-full flex items-center justify-center"
          >
            <Target className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Calculando seu plano...</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Estamos personalizando tudo para você
          </p>
        </motion.div>
      </div>
    );
  }

  if (!plan) return null;

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

      {/* Results Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-full flex items-center justify-center"
            >
              <Target className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Seu plano está pronto! 🎉
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Aqui está o que calculamos especialmente para você
            </p>
          </motion.div>

          {/* IMC Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Seu IMC</h3>
                <p className="text-gray-600 dark:text-gray-400">Índice de Massa Corporal</p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-[#00C781]">{plan.imc}</span>
              <span className="text-xl text-gray-600 dark:text-gray-400">
                - {plan.imcCategory}
              </span>
            </div>
          </motion.div>

          {/* Calories Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-3xl p-8 shadow-xl text-white mb-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Meta Diária de Calorias</h3>
                  <p className="text-white/80">Baseado no seu objetivo</p>
                </div>
              </div>
              <div className="text-6xl font-bold mb-2">{plan.calories}</div>
              <p className="text-white/90">calorias por dia</p>
            </div>
          </motion.div>

          {/* Macronutrients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 mb-6"
          >
            <h3 className="text-2xl font-bold mb-6">Distribuição de Macronutrientes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {plan.protein}g
                </div>
                <div className="font-semibold text-gray-700 dark:text-gray-300">Proteínas</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">30% das calorias</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {plan.carbs}g
                </div>
                <div className="font-semibold text-gray-700 dark:text-gray-300">Carboidratos</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">45% das calorias</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl">
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {plan.fats}g
                </div>
                <div className="font-semibold text-gray-700 dark:text-gray-300">Gorduras</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">25% das calorias</div>
              </div>
            </div>
          </motion.div>

          {/* Hydration Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border-2 border-blue-200 dark:border-blue-800 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Não esqueça da hidratação!</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Beba pelo menos 2-3 litros de água por dia para melhores resultados
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/plans" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3"
              >
                Ver Planos
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link href="/auth" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full border-2 border-[#00C781] text-[#00C781] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#00C781]/10 transition-all"
              >
                Criar Conta
              </motion.button>
            </Link>
          </motion.div>

          {/* Motivational Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600 dark:text-gray-400 italic">
              "Cada treino te deixa mais próximo da sua melhor versão."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
