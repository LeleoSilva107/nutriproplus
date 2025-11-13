'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Check, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Workout, Exercise } from '@/lib/types';

interface WorkoutPlayerProps {
  workout: Workout;
  userName: string;
  onComplete: () => void;
  onClose: () => void;
}

export function WorkoutPlayer({ workout, userName, onComplete, onClose }: WorkoutPlayerProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(3);
  const [isExercising, setIsExercising] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === workout.exercises.length - 1;

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      setIsExercising(true);
    }
  }, [countdown]);

  const handleCompleteExercise = () => {
    setCompletedExercises([...completedExercises, currentExercise.id]);
    
    if (isLastExercise) {
      setShowCongrats(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCountdown(3);
      setIsExercising(false);
    }
  };

  if (showCongrats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-[#00C781] to-[#00A86B] z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center text-white"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 mx-auto mb-6"
          >
            <Trophy className="w-24 h-24" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">🔥 Treino Completo, {userName}!</h1>
          <p className="text-2xl mb-2">+50 XP adicionado!</p>
          <p className="text-lg opacity-90">Você está cada vez mais forte! 💪</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{workout.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Progresso</span>
            <span className="font-semibold text-[#00C781]">
              {currentExerciseIndex + 1}/{workout.exercises.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentExerciseIndex + 1) / workout.exercises.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#00C781] to-[#00A86B]"
            />
          </div>
        </div>

        {/* Countdown */}
        <AnimatePresence mode="wait">
          {countdown !== null ? (
            <motion.div
              key="countdown"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-xl mb-4 text-gray-600 dark:text-gray-400">Prepare-se!</p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-8xl font-bold text-[#00C781]"
              >
                {countdown}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-[#00C781]/10 to-[#00A86B]/10 rounded-2xl p-6 border-2 border-[#00C781]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {currentExerciseIndex + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{currentExercise.name}</h3>
                    {currentExercise.reps && (
                      <p className="text-[#00C781] font-semibold">{currentExercise.reps} repetições</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">{currentExercise.instructions}</p>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Play className="w-4 h-4" />
                  <span>Duração: {Math.floor(currentExercise.duration / 60)} minutos</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCompleteExercise}
                className="w-full bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <Check className="w-5 h-5" />
                ✅ Concluí este exercício
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exercise List */}
        <div className="mt-8 space-y-2">
          {workout.exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                completedExercises.includes(exercise.id)
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : index === currentExerciseIndex
                  ? 'bg-[#00C781]/10 border border-[#00C781]'
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  completedExercises.includes(exercise.id)
                    ? 'bg-green-500 text-white'
                    : index === currentExerciseIndex
                    ? 'bg-[#00C781] text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {completedExercises.includes(exercise.id) ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className={`font-medium ${completedExercises.includes(exercise.id) ? 'line-through opacity-60' : ''}`}>
                {exercise.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
