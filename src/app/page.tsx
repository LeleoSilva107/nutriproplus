'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Target, TrendingUp, Award, Heart, Zap, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const benefits = [
    {
      icon: Target,
      title: 'Planos Personalizados',
      description: 'Alimentação e treino adaptados aos seus objetivos',
    },
    {
      icon: TrendingUp,
      title: 'Acompanhamento Diário',
      description: 'Monitore seu progresso em tempo real',
    },
    {
      icon: Award,
      title: 'Conquistas e Motivação',
      description: 'Sistema de níveis e recompensas para te manter motivado',
    },
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      result: 'Perdi 12kg em 3 meses',
      text: 'O NutriPro+ mudou minha vida! Nunca imaginei que seria tão fácil seguir um plano.',
      avatar: '👩',
    },
    {
      name: 'João Santos',
      result: 'Ganhei 8kg de massa',
      text: 'Finalmente consegui ganhar massa muscular de forma saudável e sustentável.',
      avatar: '👨',
    },
    {
      name: 'Ana Costa',
      result: 'Mais energia e disposição',
      text: 'Não só emagreci, mas também melhorei minha saúde e bem-estar geral.',
      avatar: '👩‍🦰',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1E1E] dark:to-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00C781] to-[#00A86B] bg-clip-text text-transparent">
              NutriPro+
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/auth"
              className="text-gray-600 dark:text-gray-300 hover:text-[#00C781] transition-colors font-medium"
            >
              Entrar
            </Link>
            <Link
              href="/quiz"
              className="bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Começar
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#00C781]/10 text-[#00C781] px-4 py-2 rounded-full mb-6 text-sm font-semibold">
              <Heart className="w-4 h-4" />
              Transforme sua vida hoje
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transforme seu corpo{' '}
              <span className="bg-gradient-to-r from-[#00C781] to-[#00A86B] bg-clip-text text-transparent">
                e sua mente
              </span>{' '}
              com o NutriPro+
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Receba um plano alimentar e de treino personalizado em minutos.
              <br />
              Sua jornada para uma vida mais saudável começa agora.
            </p>

            <Link href="/quiz">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-[#00C781]/50 transition-all inline-flex items-center gap-3"
              >
                Comece Agora
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              ✨ Sem cartão de crédito necessário para começar
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20 bg-white dark:bg-[#1E1E1E] rounded-3xl my-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Por que escolher o{' '}
            <span className="bg-gradient-to-r from-[#00C781] to-[#00A86B] bg-clip-text text-transparent">
              NutriPro+
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tudo que você precisa para alcançar seus objetivos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-[#00C781] transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-2xl flex items-center justify-center mb-4">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 text-[#FFD700] px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <Users className="w-4 h-4" />
            +10.000 vidas transformadas
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Histórias de{' '}
            <span className="bg-gradient-to-r from-[#00C781] to-[#00A86B] bg-clip-text text-transparent">
              Sucesso
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Veja o que nossos membros estão alcançando
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-[#1E1E1E] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-full flex items-center justify-center text-3xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-[#00C781] font-semibold text-sm">
                    {testimonial.result}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#00C781] to-[#00A86B] rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para começar sua transformação?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Cada treino te deixa mais próximo da sua melhor versão.
            </p>
            <Link href="/quiz">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#00C781] px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-white/50 transition-all inline-flex items-center gap-3"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#00C781] to-[#00A86B] bg-clip-text text-transparent">
                  NutriPro+
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Transformando vidas através da saúde e bem-estar.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>
                  <Link href="/plans" className="hover:text-[#00C781] transition-colors">
                    Planos
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="hover:text-[#00C781] transition-colors">
                    Quiz
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-[#00C781] transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00C781] transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-[#00C781] transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00C781] transition-colors">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© 2024 NutriPro+. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
