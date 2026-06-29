import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Trophy, Search, Sparkles, Flame, User as UserIcon } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import { mockLeaderboard, mockWeeklyLeaderboard } from '@/lib/mock-data';
import { cn, getInitials } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<'weekly' | 'all-time'>('weekly');
  const [search, setSearch] = useState('');

  const boardData = tab === 'weekly' ? mockWeeklyLeaderboard : mockLeaderboard;

  // Filter rankings
  const filteredData = boardData.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // Top 3
  const topThree = filteredData.slice(0, 3);
  const remaining = filteredData.slice(3);

  return (
    <PageTransition className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Noida Leaderboard</h1>
          <p className="text-sm text-gray-500">Compete with fellow citizens to keep Noida clean and green</p>
        </div>

        {/* Tab Toggle */}
        <div className="inline-flex bg-gray-100 rounded-xl p-1 text-xs font-semibold">
          <button
            onClick={() => setTab('weekly')}
            className={cn('px-4 py-2 rounded-lg transition-colors', tab === 'weekly' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500')}
          >
            Weekly
          </button>
          <button
            onClick={() => setTab('all-time')}
            className={cn('px-4 py-2 rounded-lg transition-colors', tab === 'all-time' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500')}
          >
            All-Time
          </button>
        </div>
      </div>

      {/* Podium (Top 3 Users) */}
      <div className="grid grid-cols-3 gap-4 items-end pt-8 pb-4 max-w-lg mx-auto">
        {/* Rank 2 */}
        {topThree[1] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center space-y-2"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm shadow-soft">
                {getInitials(topThree[1].name)}
              </div>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">🥈</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-xs text-gray-900 truncate w-24">{topThree[1].name}</h3>
              <p className="text-xs text-green-700 font-bold">{topThree[1].points} pts</p>
            </div>
          </motion.div>
        )}

        {/* Rank 1 */}
        {topThree[0] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center space-y-2 relative -translate-y-4"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center text-yellow-700 font-bold text-base shadow-soft-lg animate-bounce-subtle">
                {getInitials(topThree[0].name)}
              </div>
              <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500 w-8 h-8 drop-shadow-md animate-float" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-gray-900 truncate w-28">{topThree[0].name}</h3>
              <p className="text-sm text-green-700 font-extrabold">{topThree[0].points} pts</p>
            </div>
          </motion.div>
        )}

        {/* Rank 3 */}
        {topThree[2] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center space-y-2"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-700 font-bold text-sm shadow-soft">
                {getInitials(topThree[2].name)}
              </div>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">🥉</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-xs text-gray-900 truncate w-24">{topThree[2].name}</h3>
              <p className="text-xs text-green-700 font-bold">{topThree[2].points} pts</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Rankings List */}
      <div className="glass-strong rounded-3xl p-5 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search citizens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 text-xs focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
          />
        </div>

        <div className="space-y-2.5">
          {remaining.map((u) => {
            const isSelf = user && u.userId === user.id;
            return (
              <motion.div
                key={u.userId}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex items-center justify-between p-3.5 rounded-2xl border transition-all',
                  isSelf ? 'bg-green-50 border-green-200 shadow-soft' : 'bg-white border-gray-100 hover:bg-gray-50/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-xs font-bold text-gray-400 text-center">#{u.rank}</span>
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-semibold border border-gray-200">
                    {getInitials(u.name)}
                  </div>
                  <span className={cn('text-xs font-semibold text-gray-800', isSelf && 'text-green-800')}>{u.name}</span>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" /> {u.reports} Reports
                  </span>
                  <span className="text-green-700 font-extrabold">{u.points} XP</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
