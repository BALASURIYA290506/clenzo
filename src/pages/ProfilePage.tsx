import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, BadgeCheck, FileText, CheckCircle2, Trophy, Compass } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import PageTransition from '@/components/layout/PageTransition';
import { BADGES, REPORT_STATUSES } from '@/lib/constants';
import { formatDate, formatTimeAgo, cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuth();
  const { reports } = useApp();
  const [statusFilter, setStatusFilter] = useState<'all' | 'resolved' | 'submitted'>('all');

  if (!user) return null;

  const userReports = reports.filter(r => r.userId === user.id);
  const filteredReports = userReports.filter(r => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  return (
    <PageTransition className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="glass-strong rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/30 rounded-full blur-2xl" />
        
        {/* Avatar */}
        <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center text-white text-3xl font-extrabold shadow-green flex-shrink-0">
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>

        {/* User Info Details */}
        <div className="space-y-4 flex-1">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
              {user.name} <BadgeCheck className="w-5 h-5 text-green-600 fill-green-100" />
            </h1>
            <p className="text-sm text-gray-500 font-semibold">Level {user.level} Citizen Partner</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 justify-center md:justify-start">
              <Mail className="w-4 h-4 text-gray-400" /> {user.email}
            </span>
            <span className="flex items-center gap-1.5 justify-center md:justify-start">
              <Phone className="w-4 h-4 text-gray-400" /> {user.phone}
            </span>
            <span className="flex items-center gap-1.5 justify-center md:justify-start">
              <Calendar className="w-4 h-4 text-gray-400" /> Joined {formatDate(user.joinedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 text-center">
          <span className="text-gray-400 text-xs font-semibold block uppercase">Earned points</span>
          <span className="text-2xl font-extrabold text-green-700 block mt-1">{user.totalPoints} pts</span>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <span className="text-gray-400 text-xs font-semibold block uppercase">Reports Filed</span>
          <span className="text-2xl font-extrabold text-gray-900 block mt-1">{user.totalReports}</span>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <span className="text-gray-400 text-xs font-semibold block uppercase">Cleanups Done</span>
          <span className="text-2xl font-extrabold text-emerald-600 block mt-1">{user.resolvedReports}</span>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <span className="text-gray-400 text-xs font-semibold block uppercase">Active Streak</span>
          <span className="text-2xl font-extrabold text-orange-600 block mt-1">{user.currentStreak} Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* History tab */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Your Reports</h2>
            
            {/* Simple Switcher */}
            <div className="flex gap-2 text-xs font-semibold">
              <button
                onClick={() => setStatusFilter('all')}
                className={cn('px-3 py-1 rounded-xl', statusFilter === 'all' ? 'bg-green-100 text-green-700' : 'text-gray-400')}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={cn('px-3 py-1 rounded-xl', statusFilter === 'resolved' ? 'bg-green-100 text-green-700' : 'text-gray-400')}
              >
                Resolved
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredReports.map((rpt) => {
              const statusInfo = REPORT_STATUSES[rpt.status] || REPORT_STATUSES.submitted;
              const StatusIcon = statusInfo.icon;
              return (
                <div key={rpt.id} className="glass-card rounded-2xl p-4 flex gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                      <img src={rpt.imageUrl} alt={rpt.wasteType} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900 text-sm capitalize">{rpt.wasteType} Waste</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5" /> {rpt.location} • {formatTimeAgo(rpt.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border', statusInfo.color)}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusInfo.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Achievement Details</h2>
          <div className="glass-strong rounded-3xl p-5 space-y-4">
            {BADGES.map((b) => {
              const isEarned = user.earnedBadges.includes(b.id);
              const BadgeIcon = b.icon;
              return (
                <div key={b.id} className="flex gap-3 items-center">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', isEarned ? 'badge-earned' : 'badge-locked')}>
                    <BadgeIcon className={cn('w-5 h-5', isEarned ? 'text-amber-600' : 'text-gray-400')} />
                  </div>
                  <div className="text-xs">
                    <strong className={cn('block', isEarned ? 'text-gray-800' : 'text-gray-400')}>{b.name}</strong>
                    <span className="text-[10px] text-gray-400">{b.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
