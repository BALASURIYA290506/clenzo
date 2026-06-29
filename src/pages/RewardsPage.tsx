import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Wallet, Award, ArrowUpRight, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import PageTransition from '@/components/layout/PageTransition';
import { VOUCHERS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function RewardsPage() {
  const { user } = useAuth();
  const { redemptions, addRedemption } = useApp();
  const [redeemingVoucher, setRedeemingVoucher] = useState<any | null>(null);
  const [successVoucher, setSuccessVoucher] = useState<any | null>(null);
  const [insufficientPoints, setInsufficientPoints] = useState<boolean>(false);

  if (!user) return null;

  // Simple point subtraction trigger
  const handleRedeem = (voucher: any) => {
    if (user.totalPoints < voucher.pointsCost) {
      setInsufficientPoints(true);
      setTimeout(() => setInsufficientPoints(false), 3000);
      return;
    }
    setRedeemingVoucher(voucher);
  };

  const confirmRedeem = async () => {
    if (!redeemingVoucher) return;

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    // Deduct points from user profile mock state locally
    user.totalPoints -= redeemingVoucher.pointsCost;

    // Add local redemption entry
    addRedemption({
      id: `rdm_${Date.now()}`,
      userId: user.id,
      voucherId: redeemingVoucher.id,
      brand: redeemingVoucher.brand,
      value: redeemingVoucher.value,
      pointsSpent: redeemingVoucher.pointsCost,
      status: 'processed',
      redeemedAt: new Date().toISOString(),
    });

    setSuccessVoucher(redeemingVoucher);
    setRedeemingVoucher(null);

    setTimeout(() => {
      setSuccessVoucher(null);
    }, 3000);
  };

  return (
    <PageTransition className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Eco Rewards Portal</h1>
        <p className="text-sm text-gray-500">Convert your community cleanup points into vouchers, cash, or donations</p>
      </div>

      {/* Point Wallet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-3xl gradient-primary p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-soft-lg">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-green-100 flex items-center gap-1">
                <Wallet className="w-4 h-4" /> Live Wallet Balance
              </span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Level {user.level} Citizen</span>
            </div>
            
            <div>
              <span className="text-4xl md:text-5xl font-extrabold flex items-baseline gap-1">
                {user.totalPoints} <span className="text-xs font-normal text-green-100">Points</span>
              </span>
              <p className="text-xs text-green-100/80 mt-1">100 points = ₹10 INR value equivalent</p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/20 flex gap-6 text-xs text-green-100">
            <div>
              <span className="opacity-75 block">Conversion Rate</span>
              <strong className="text-white text-sm">₹{Math.floor(user.totalPoints / 10)} Cash Value</strong>
            </div>
            <div>
              <span className="opacity-75 block">Reports Approved</span>
              <strong className="text-white text-sm">{user.resolvedReports} Reports</strong>
            </div>
          </div>
        </div>

        {/* Gamified Achievements Promo */}
        <div className="glass-strong rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Eco Streak Rewards</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Earn double points for maintaining a 7-day reporting streak. Level up your citizen score to unlock higher rewards.
            </p>
          </div>
          <div className="text-[10px] text-green-800 bg-green-50 rounded-xl p-3 mt-4">
            Streak Bonus multiplier current: <strong>1.5x</strong>
          </div>
        </div>
      </div>

      {/* Insufficient points alert */}
      <AnimatePresence>
        {insufficientPoints && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            Insufficient points balance. Snap more waste photos and resolve issues to earn points!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success redeeming toast */}
      <AnimatePresence>
        {successVoucher && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-700 flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <strong className="block">Redemption Successful! 🎉</strong>
              Your {successVoucher.brand} {successVoucher.value} voucher code has been emailed to you.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vouchers Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Available Redemptions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {VOUCHERS.map((v) => {
            const BrandIcon = v.icon;
            return (
              <motion.div
                key={v.id}
                whileHover={{ y: -2 }}
                className="glass-card rounded-2xl p-4 flex flex-col justify-between text-center relative overflow-hidden group cursor-pointer"
                onClick={() => handleRedeem(v)}
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-3 bg-gradient-to-tr shadow-soft', v.gradient)}>
                  <BrandIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">{v.brand}</span>
                  <span className="text-lg font-bold text-gray-900 block mt-0.5">{v.value}</span>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-center gap-1">
                  <span className="text-xs font-extrabold text-green-700">{v.pointsCost}</span>
                  <span className="text-[10px] text-gray-400">Pts</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Redemption History */}
      <div className="glass-strong rounded-3xl p-5 space-y-4">
        <span className="text-sm font-bold text-gray-800">Redemption History</span>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] uppercase text-gray-400 font-bold">
                <th className="pb-3">Voucher</th>
                <th className="pb-3">Value</th>
                <th className="pb-3">Points Spent</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Redeemed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {redemptions.map((r) => (
                <tr key={r.id} className="table-row-hover">
                  <td className="py-3 font-semibold text-gray-900">{r.brand}</td>
                  <td className="py-3">{r.value}</td>
                  <td className="py-3 font-bold text-green-700">{r.pointsSpent} pts</td>
                  <td className="py-3">
                    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize bg-green-50 border-green-100 text-green-700')}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 text-right text-gray-400">{formatDate(r.redeemedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redemption confirmation modal overlay */}
      <AnimatePresence>
        {redeemingVoucher && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-strong rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-soft-xl"
            >
              <h3 className="text-lg font-bold text-gray-900">Confirm Redemption</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Are you sure you want to redeem <strong>{redeemingVoucher.pointsCost} points</strong> for a{' '}
                <strong>{redeemingVoucher.brand} {redeemingVoucher.value}</strong> voucher?
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={confirmRedeem}
                  className="py-2.5 rounded-xl btn-primary font-bold text-xs"
                >
                  Confirm Redemption
                </button>
                <button
                  onClick={() => setRedeemingVoucher(null)}
                  className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-xs text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
