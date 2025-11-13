'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Crown, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PlansPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePlanClick = (planUrl: string, planName: string) => {
    setLoading(planName);
    setTimeout(() => {
      window.location.href = planUrl;
    }, 500);
  };

  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Perfeito para começar sua jornada',
      icon: Zap,
      color: 'from-gray-400 to-gray-600',
      features: [
        'Acesso ao quiz personalizado',
        'Cálculo de IMC e calorias',
        'Dicas semanais de nutrição',
        'Acesso à comunidade',
        'Receitas básicas',
      ],
      cta: 'Começar Grátis',
      url: '/auth',
      popular: false,
    },
    {
      name: 'Pro',
      price: 'R$ 47',
      period: '/mês',
      description: 'Para quem leva a sério sua transformação',
      icon: Star,
      color: 'from-[#00C781] to-[#00A86B]',
      features: [
        'Tudo do plano Gratuito',
        'Plano alimentar completo personalizado',
        'Treinos detalhados com vídeos',
        'Sistema de conquistas e níveis',
        'Acompanhamento diário de progresso',
        'Registro de refeições e água',
        'Suporte por email',
        'Atualizações mensais do plano',
      ],
      cta: 'Assinar Pro',
      url: 'https://pay.kiwify.com.br/VVE5mFN',
      popular: true,
    },
    {
      name: 'Elite',
      price: 'R$ 97',
      period: '/mês',
      description: 'Experiência premium completa',
      icon: Crown,
      color: 'from-[#FFD700] to-[#FFA500]',
      features: [
        'Tudo do plano Pro',
        'Suporte individual prioritário',
        'Consultoria nutricional mensal',
        'Ajustes personalizados ilimitados',
        'Acesso a lives exclusivas',
        'Grupo VIP no WhatsApp',
        'Planos de suplementação',
        'Relatórios detalhados de progresso',
      ],
      cta: 'Assinar Elite',
      url: 'https://pay.kiwify.com.br/VVE5mFN',
      popular: false,
    },
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

      {/* Plans Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Escolha seu{' '}
            <span className="bg-gradient-to-r from-[#00C781] to-[#00A86B] bg-clip-text text-transparent">
              Plano
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Invista na sua saúde e bem-estar. Todos os planos incluem garantia de 7 dias.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 shadow-xl border-2 transition-all hover:scale-105 ${
                plan.popular
                  ? 'border-[#00C781] md:-mt-4 md:mb-4'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Mais Popular
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                <plan.icon className="w-8 h-8 text-white" />
              </div>

              {/* Plan Info */}
              <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => {
                  if (plan.name === 'Gratuito') {
                    window.location.href = plan.url;
                  } else {
                    handlePlanClick(plan.url, plan.name);
                  }
                }}
                disabled={loading === plan.name}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#00C781] to-[#00A86B] text-white hover:shadow-2xl hover:shadow-[#00C781]/50'
                    : 'border-2 border-gray-300 dark:border-gray-700 hover:border-[#00C781] hover:bg-[#00C781]/10'
                } ${loading === plan.name ? 'opacity-50 cursor-wait' : ''}`}
              >
                {loading === plan.name ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Carregando...
                  </span>
                ) : (
                  plan.cta
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-[#00C781]/10 to-[#00A86B]/10 rounded-3xl p-8 border-2 border-[#00C781]/30"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00C781] to-[#00A86B] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Garantia de 7 Dias</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Experimente sem riscos! Se não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do seu investimento.
              Sem perguntas, sem complicações.
            </p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Posso cancelar a qualquer momento?',
                a: 'Sim! Você pode cancelar sua assinatura a qualquer momento, sem taxas ou multas.',
              },
              {
                q: 'Como funciona o suporte?',
                a: 'Plano Pro tem suporte por email em até 24h. Plano Elite tem suporte prioritário e grupo VIP.',
              },
              {
                q: 'Posso mudar de plano depois?',
                a: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
              >
                <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
