import { Navigate, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Leaf, LogOut, BarChart3 } from 'lucide-react';
import Footer from './Footer';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('clenzo_admin_authenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('clenzo_admin_authenticated');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-2xl transition-all duration-300 glass-strong shadow-soft-lg"
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-green">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
              CLENZO <span className="text-xs font-semibold text-gray-500 ml-1 bg-gray-100 px-2 py-0.5 rounded-md">Admin Portal</span>
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-green-700 bg-green-50"
            >
              <BarChart3 className="w-4 h-4" />
              Municipal Dashboard
            </Link>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 flex-1 max-w-7xl w-full mx-auto">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
