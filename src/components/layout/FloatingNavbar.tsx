import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Home, FileText, Trophy, Gift, BarChart3,
  Menu, X, Bell, LogOut, User, ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { cn, getInitials } from '@/lib/utils';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/report', label: 'Report', icon: FileText },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/rewards', label: 'Rewards', icon: Gift },
];

export default function FloatingNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount, notifications, markAllNotificationsRead } = useApp();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  const isLanding = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-2xl transition-all duration-300',
          scrolled || !isLanding
            ? 'glass-strong shadow-soft-lg'
            : 'glass'
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-green group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
              CLENZO
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isAuthenticated && navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'nav-link flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                  location.pathname === link.to
                    ? 'text-green-700 bg-green-50 active'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50/50'
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                    className="relative p-2 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {notifOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-80 glass-strong rounded-2xl shadow-soft-xl overflow-hidden"
                      >
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                          <h3 className="font-semibold text-sm">Notifications</h3>
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-xs text-green-600 hover:text-green-700 font-medium"
                          >
                            Mark all read
                          </button>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {notifications.slice(0, 5).map((n) => (
                            <div
                              key={n.id}
                              className={cn(
                                'px-4 py-3 border-b border-gray-50 last:border-0 transition-colors',
                                !n.read && 'bg-green-50/30'
                              )}
                            >
                              <p className="text-sm font-medium text-gray-800">{n.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold">
                      {getInitials(user?.name || 'U')}
                    </div>
                    <ChevronDown className={cn('w-4 h-4 text-gray-500 transition-transform hidden md:block', profileOpen && 'rotate-180')} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-56 glass-strong rounded-2xl shadow-soft-xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-100">
                          <p className="font-semibold text-sm">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-xl transition-colors"
                          >
                            <User className="w-4 h-4" /> Profile
                          </Link>
                          <button
                            onClick={logout}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full"
                          >
                            <LogOut className="w-4 h-4" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-xl btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-green-50 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && isAuthenticated && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="p-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      location.pathname === link.to
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50/50'
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Click-away overlay */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setNotifOpen(false); setProfileOpen(false); }}
        />
      )}
    </>
  );
}
