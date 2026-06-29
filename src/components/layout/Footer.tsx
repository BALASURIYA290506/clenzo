import { Link } from 'react-router-dom';
import { Leaf, Globe, Heart, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
                CLENZO
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Empowering citizens to report waste and earn rewards. Together, we're building cleaner, greener cities for everyone.
            </p>
            <div className="flex gap-3 mt-4">
              {[Globe, Heart, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-green-50 flex items-center justify-center text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm text-gray-800 mb-3">Platform</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Report Waste', 'Leaderboard', 'Rewards'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-800 mb-3">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} CLENZO. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Built with 💚 for cleaner cities
          </p>
        </div>
      </div>
    </footer>
  );
}
