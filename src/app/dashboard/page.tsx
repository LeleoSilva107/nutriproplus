'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Trophy,
  Settings,
  LogOut,
  Flame,
  Droplet,
  Dumbbell,
  Apple,
  TrendingUp,
  Target,
  Award,
  Menu,
  X,
} from 'lucide-react';
import { authService } from '@/lib/auth/auth';
import { User, UserProgress, Achievement } from '@/lib/types';
import { getProgress, saveProgress, addXP, unlockAchievement, getQuizData } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { AchievementPopup } from '@/components/popups/AchievementPopup';
import { ProgressBar } from '@/components/progress/ProgressBar';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [achievementToShow, setAchievementToShow] = useState<Achievement | null>(null);
  const [dailyQuote] = useState(
    [
      'Cada treino te deixa mais próximo da sua melhor versão.',
      'Você já é incrível, só vai provar isso de novo hoje.',
      'Consistência é a chave para o sucesso.',
      'Seu único limite é você mesmo.',
      'Transformação acontece um dia de cada vez.',
    ][Math.floor(Math.random() * 5)]
  );

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/auth');
      return;
    }

    setUser(currentUser);

    // Carrega ou inicializa progresso
    let userProgress = getProgress(currentUser.id);
    if (!userProgress) {
      const { initializeProgress } = require('@/lib/utils');
      userProgress = initializeProgress(currentUser.id);
      saveProgress(userProgress);
    }

    // Verifica se completou o quiz
    const quizData = getQuizData();
    if (quizData && !userProgress.achievements.find((a) => a.id === 'quiz_complete')?.unlocked) {
      userProgress = unlockAchievement(userProgress, 'quiz_complete');
      saveProgress(userProgress);
      const achievement = userProgress.achievements.find((a) => a.id === 'quiz_complete');
      if (achievement) setAchievementToShow(achievement);
    }

    setProgress(userProgress);
  }, [router]);

  const handleLogout = () => {
    authService.logout();
    router.push('/');
  };

  const handleWaterIntake = () => {
    if (!progress || !user) return;

    const today = new Date().toISOString().split('T')[0];
    const waterToday = progress.waterIntake.filter((d) => d === today).length;

    if (waterToday < 8) {
      const updatedProgress = {
        ...progress,
        waterIntake: [...progress.waterIntake, today],
      };

      const progressWithXP = addXP(updatedProgress, 5);
      saveProgress(progressWithXP);
      setProgress(progressWithXP);
    }
  };

  const handleWorkout = () => {
    if (!progress || !user) return;

    const today = new Date().toISOString().split('T')[0];
    if (!progress.workoutDays.includes(today)) {
      const updatedProgress = {
        ...progress,
        workoutDays: [...progress.workoutDays, today],
      };

      const progressWithXP = addXP(updatedProgress, 20);
      saveProgress(progressWithXP);
      setProgress(progressWithXP);
    }
  };

  const handleMealLog = () => {
    if (!progress || !user) return;

    const now = new Date().toISOString();
    const updatedProgress = {
      ...progress,
      mealLogs: [...progress.mealLogs, now],
    };

    const progressWithXP = addXP(updatedProgress, 10);
    saveProgress(progressWithXP);
    setProgress(progressWithXP);
  };

  if (!user || !progress) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1E1E] dark:to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-[#00C781] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const xpForNextLevel = progress.level * 100;
  const xpProgress = progress.xp % 100;
  const waterToday = progress.waterIntake.filter(
    (d) => d === new Date().toISOString().split('T')[0]
  ).length;

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'achievements', label: 'Conquistas', icon: Trophy },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1E1E] dark:to-black">
      {/* Achievement Popup */}
      <AnimatePresence>
        {achievementToShow && (
          <AchievementPopup
            achievement={achievementToShow}
            onClose={() => setAchievementToShow(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Header */}
      <header className="lg:hidden border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">N+</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#00C781] to-[#00A86B] bg-clip-text text-transparent">
              NutriPro+
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            x: sidebarOpen ? 0 : '-100%',
          }}
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-[#1E1E1E] border-r border-gray-200 dark:border-gray-800 lg:translate-x-0 transition-transform`}
        >
          <div className="flex flex-col h-full">
            {/* Logo (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N+</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#00C781] to-[#00A86B] bg-clip-text text-transparent">
                NutriPro+
              </span>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nível {progress.level}</p>
                </div>
              </div>

              {/* XP Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">XP</span>
                  <span className="font-semibold text-[#00C781]">
                    {xpProgress}/{xpForNextLevel}
                  </span>
                </div>
                <ProgressBar current={xpProgress} total={xpForNextLevel} />
              </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white shadow-lg'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Sair</span>
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Overlay (Mobile) */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-6xl mx-auto"
              >
                {/* Welcome Section */}
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Olá, {user.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg italic">"{dailyQuote}"</p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <Flame className="w-8 h-8" />
                      <span className="text-3xl font-bold">{progress.level}</span>
                    </div>
                    <p className="text-white/80">Nível Atual</p>
                  </div>

                  <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <Droplet className="w-8 h-8 text-blue-500" />
                      <span className="text-3xl font-bold">{waterToday}/8</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Copos de Água</p>
                  </div>

                  <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <Dumbbell className="w-8 h-8 text-orange-500" />
                      <span className="text-3xl font-bold">{progress.workoutDays.length}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Treinos Feitos</p>
                  </div>

                  <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <Trophy className="w-8 h-8 text-[#FFD700]" />
                      <span className="text-3xl font-bold">
                        {progress.achievements.filter((a) => a.unlocked).length}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Conquistas</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWaterIntake}
                    disabled={waterToday >= 8}
                    className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-left hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Droplet className="w-10 h-10 text-blue-500 mb-3" />
                    <h3 className="font-bold text-lg mb-1">Beber Água</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+5 XP por copo</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWorkout}
                    className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-6 text-left hover:shadow-lg transition-all"
                  >
                    <Dumbbell className="w-10 h-10 text-orange-500 mb-3" />
                    <h3 className="font-bold text-lg mb-1">Registrar Treino</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+20 XP</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMealLog}
                    className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 text-left hover:shadow-lg transition-all"
                  >
                    <Apple className="w-10 h-10 text-green-500 mb-3" />
                    <h3 className="font-bold text-lg mb-1">Registrar Refeição</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+10 XP</p>
                  </motion.button>
                </div>

                {/* Plano Alimentar */}
                <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-xl flex items-center justify-center">
                      <Apple className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Plano Alimentar de Hoje</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Personalizado para seu objetivo
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {['Café da Manhã', 'Almoço', 'Lanche', 'Jantar'].map((meal, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                      >
                        <span className="font-semibold">{meal}</span>
                        <span className="text-sm text-[#00C781]">Ver receitas →</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Treino do Dia */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Treino de Hoje</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Treino de força - 45 minutos
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {['Aquecimento - 5 min', 'Supino - 4x12', 'Agachamento - 4x15', 'Alongamento - 5 min'].map(
                      (exercise, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {i + 1}
                          </div>
                          <span className="font-medium">{exercise}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Suas Conquistas 🏆</h1>

                <div className="grid md:grid-cols-2 gap-4">
                  {progress.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`rounded-2xl p-6 border-2 transition-all ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-[#00C781]/10 to-[#00A86B]/10 border-[#00C781]'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                            achievement.unlocked
                              ? 'bg-gradient-to-br from-[#00C781] to-[#00A86B]'
                              : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {achievement.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[#FFD700] font-bold">+{achievement.xp} XP</span>
                            {achievement.unlocked && achievement.unlockedAt && (
                              <span className="text-xs text-gray-500">
                                • {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Configurações ⚙️</h1>

                <div className="space-y-4">
                  <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-lg mb-4">Perfil</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Nome</label>
                        <p className="font-semibold">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">E-mail</label>
                        <p className="font-semibold">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-lg mb-4">Preferências</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Notificações</span>
                        <button className="w-12 h-6 bg-[#00C781] rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Modo Escuro</span>
                        <button className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/quiz')}
                    className="w-full bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Refazer Quiz de Personalização
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
