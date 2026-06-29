import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy, Flame, TrendingUp, Sparkles, Clock, CheckCircle2,
  FileText, Shield, ArrowRight, Award, Plus, Compass
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import PageTransition from '@/components/layout/PageTransition';
import { BADGES, REPORT_STATUSES } from '@/lib/constants';
import { formatTimeAgo, cn } from '@/lib/utils';

export default function CitizenDashboard() {
  const { user } = useAuth();
  const { reports } = useApp();

  if (!user) return null;

  // Filter user reports
  const userReports = reports.filter(r => r.userId === user.id);
  const recentReports = userReports.slice(0, 4);

  // Compute stats
  const points = user.totalPoints;
  const level = user.level;
  const nextLevelPoints = (level + 1) * 500;
  const progressPercent = Math.min(100, (points / nextLevelPoints) * 100);

  return (
    <PageTransition className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-100/30 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Level {level} Citizen
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Hello, {user.name}! 👋
            </h1>
            <p className="text-gray-500 text-sm max-w-md">
              Thank you for keeping Noida clean. Your reports have helped resolve {user.resolvedReports} waste issues this month!
            </p>
          </div>

          <div className="mt-8 space-y-2 relative z-10">
            <div className="flex justify-between items-end text-xs font-medium">
              <span className="text-gray-400">Level Progress</span>
              <span className="text-green-700 font-bold">{points} / {nextLevelPoints} XP</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full gradient-primary rounded-full"
              />
            </div>
            <p className="text-[10px] text-gray-400">
              Earn {(nextLevelPoints - points)} more points to reach Level {level + 1}
            </p>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card rounded-2xl p-5 flex flex-col justify-between stat-card relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Flame className="w-5 h-5 animate-pulse-green" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{user.currentStreak} Days</p>
              <p className="text-xs text-gray-400">Active Streak</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-5 flex flex-col justify-between stat-card"
          >
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">Rank #{user.rank}</p>
              <p className="text-xs text-gray-400">Noida Leaderboard</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-5 flex flex-col justify-between stat-card"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{user.totalReports}</p>
              <p className="text-xs text-gray-400">Reports Filed</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-5 flex flex-col justify-between stat-card"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{user.resolvedReports}</p>
              <p className="text-xs text-gray-400">Resolved Waste</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Grid: Recent Reports & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Reports</h2>
            <Link to="/report" className="text-xs text-green-700 hover:text-green-800 font-semibold flex items-center gap-1">
              New Report <Plus className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentReports.length === 0 ? (
              <div className="glass-card rounded-2xl p-10 text-center text-gray-400 text-sm">
                No reports submitted yet. Snap a photo to clean Noida!
              </div>
            ) : (
              recentReports.map(rpt => {
                const statusInfo = REPORT_STATUSES[rpt.status] || REPORT_STATUSES.submitted;
                const StatusIcon = statusInfo.icon;
                return (
                  <motion.div
                    key={rpt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl p-4 flex gap-4 items-center justify-between"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                        <img src={rpt.imageUrl} alt={rpt.wasteType} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 text-sm capitalize">{rpt.wasteType} Waste</h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Compass className="w-3 h-3 text-gray-400" />
                          {rpt.location} • {formatTimeAgo(rpt.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border',
                        statusInfo.color
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Eco Badges</h2>
            <Link to="/profile" className="text-xs text-green-700 hover:text-green-800 font-semibold flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-strong rounded-3xl p-5 space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {BADGES.slice(0, 8).map(badge => {
                const isEarned = user.earnedBadges.includes(badge.id);
                return (
                  <div key={badge.id} className="flex flex-col items-center text-center space-y-1 group">
                    <div className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center transition-all',
                      isEarned ? 'badge-earned' : 'badge-locked'
                    )}>
                      <badge.icon className={cn('w-5 h-5', isEarned ? 'text-amber-600' : 'text-gray-400')} />
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium truncate w-full">{badge.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="p-3 bg-green-50/50 border border-green-100 rounded-xl flex items-center gap-3">
              <Award className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="text-[10px] text-green-800 leading-snug">
                <strong>Next Badge:</strong> Submit {BADGES.find(b => !user.earnedBadges.includes(b.id))?.requirement || 10} reports to unlock the next level badge!
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
