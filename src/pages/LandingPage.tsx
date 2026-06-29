import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Shield, Zap, MapPin, Leaf,
  Trophy, BarChart3, Clock, ChevronRight, Star,
} from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import { FEATURES, LANDING_STATS, HOW_IT_WORKS } from '@/lib/constants';
import { cn, formatNumber } from '@/lib/utils';

/* ===== Animated Counter ===== */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

/* ===== Floating Particle ===== */
function FloatingParticle({ delay, x, y, emoji }: { delay: number; x: string; y: string; emoji: string }) {
  return (
    <motion.div
      className="absolute text-2xl md:text-3xl pointer-events-none select-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -15, 0, 10, 0],
        rotate: [0, 5, -5, 3, 0],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {emoji}
    </motion.div>
  );
}

/* ===== Hero Section ===== */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Floating particles */}
      <FloatingParticle delay={0} x="10%" y="20%" emoji="♻️" />
      <FloatingParticle delay={1} x="85%" y="15%" emoji="🌿" />
      <FloatingParticle delay={2} x="75%" y="70%" emoji="🗑️" />
      <FloatingParticle delay={3} x="15%" y="75%" emoji="🌍" />
      <FloatingParticle delay={1.5} x="50%" y="10%" emoji="✨" />
      <FloatingParticle delay={2.5} x="90%" y="50%" emoji="🌱" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/60 text-green-700 text-sm font-medium mb-6 backdrop-blur-sm border border-green-200/50">
            <Sparkles className="w-4 h-4" />
            AI-Powered Waste Reporting Platform
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight"
        >
          Report Waste.
          <br />
          <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Earn Rewards.
          </span>
          <br />
          Clean Your City.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Snap a photo of untreated waste. Our AI identifies the type, GPS pins the location, and municipal authorities are notified instantly. You earn reward points for every verified report.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-primary text-base font-semibold"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-gray-700 hover:text-green-700 glass hover:bg-white/80 transition-all"
          >
            Learn More
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-400"
        >
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-500" />
            Secure & Private
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-green-500" />
            AI-Powered
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-green-500" />
            GPS Enabled
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L48 55C96 50 192 40 288 42C384 44 480 58 576 65C672 72 768 72 864 65C960 58 1056 44 1152 40C1248 36 1344 42 1392 45L1440 48V120H0Z" fill="white" fillOpacity="0.5" />
          <path d="M0 80L48 77C96 74 192 68 288 68C384 68 480 74 576 78C672 82 768 84 864 80C960 76 1056 66 1152 64C1248 62 1344 68 1392 71L1440 74V120H0Z" fill="white" fillOpacity="0.8" />
        </svg>
      </div>
    </section>
  );
}

/* ===== Stats Section ===== */
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {LANDING_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center stat-card"
            >
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Features Section ===== */
function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={ref} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything you need to make a{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              difference
            </span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Powerful features designed to make waste reporting effortless and rewarding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 group-hover:scale-110 transition-all">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== How It Works ===== */
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-transparent to-green-50/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How it works
          </h2>
          <p className="text-gray-500 mt-3">Four simple steps to a cleaner city</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-green-200 via-green-300 to-green-200" />

          {HOW_IT_WORKS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-soft-lg flex items-center justify-center text-3xl mx-auto mb-4 relative z-10">
                {step.emoji}
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center z-20">
                {step.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CTA Section ===== */
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-3xl gradient-primary p-12 md:p-16 text-center relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Join the movement
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join 10,000+ citizens making a difference
          </h2>
          <p className="text-green-100 text-lg max-w-xl mx-auto mb-8">
            Start reporting waste today and earn rewards while helping your city stay clean and green.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-green-700 font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ===== Landing Page ===== */
export default function LandingPage() {
  return (
    <PageTransition>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </PageTransition>
  );
}
