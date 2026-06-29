import type { LucideIcon } from 'lucide-react';
import {
  Leaf, Recycle, Zap, MapPin, Trophy, BarChart3,
  AlertTriangle, CheckCircle2, Clock, XCircle, Shield,
  ShoppingBag, Coffee, Train, Banknote, Heart,
  Star, Flame, Target, Award, Crown, Medal,
} from 'lucide-react';

// Report statuses
export const REPORT_STATUSES = {
  submitted: { label: 'Submitted', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  verified: { label: 'Verified', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle2 },
  assigned: { label: 'Assigned', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: Shield },
  cleaning: { label: 'Cleaning', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Recycle },
  resolved: { label: 'Resolved', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
} as const;

export type ReportStatus = keyof typeof REPORT_STATUSES;

// Waste types
export const WASTE_TYPES = {
  organic: { label: 'Organic Waste', icon: '🍂', color: '#854d0e' },
  plastic: { label: 'Plastic Waste', icon: '♻️', color: '#0369a1' },
  ewaste: { label: 'E-Waste', icon: '💻', color: '#7c3aed' },
  construction: { label: 'Construction Debris', icon: '🧱', color: '#92400e' },
  mixed: { label: 'Mixed Waste', icon: '🗑️', color: '#525252' },
  hazardous: { label: 'Hazardous Waste', icon: '☢️', color: '#dc2626' },
  medical: { label: 'Medical Waste', icon: '🏥', color: '#be123c' },
} as const;

export type WasteType = keyof typeof WASTE_TYPES;

// Severity levels
export const SEVERITY_LEVELS = {
  low: { label: 'Low', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  critical: { label: 'Critical', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
} as const;

export type SeverityLevel = keyof typeof SEVERITY_LEVELS;

// Departments
export const DEPARTMENTS = [
  'Solid Waste Management',
  'Environmental Protection',
  'Public Health',
  'Urban Development',
  'Municipal Works',
] as const;

// Features for landing page
export const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Zap, title: 'AI Detection', description: 'Advanced AI identifies waste type, severity, and suggests the right department automatically.' },
  { icon: MapPin, title: 'GPS Tracking', description: 'Precise geolocation pinpoints waste locations for faster cleanup response.' },
  { icon: Clock, title: 'Real-time Updates', description: 'Track your report status from submission to resolution in real-time.' },
  { icon: Trophy, title: 'Earn Rewards', description: 'Get points for every verified report. Redeem for vouchers, cashback, or donations.' },
  { icon: BarChart3, title: 'Analytics', description: 'Municipal dashboards with insights on waste patterns and cleanup efficiency.' },
  { icon: Leaf, title: 'Eco Impact', description: 'See your environmental impact grow as you help keep your city clean.' },
];

// Stats for landing
export const LANDING_STATS = [
  { label: 'Reports Filed', value: 24850, suffix: '+' },
  { label: 'Waste Cleaned (kg)', value: 18200, suffix: '+' },
  { label: 'Active Citizens', value: 12400, suffix: '+' },
  { label: 'Cities Covered', value: 45, suffix: '' },
];

// Badges
export const BADGES = [
  { id: 'first_report', name: 'First Step', description: 'Submit your first report', icon: Star, requirement: 1, type: 'reports' as const },
  { id: 'ten_reports', name: 'Eco Warrior', description: 'Submit 10 reports', icon: Award, requirement: 10, type: 'reports' as const },
  { id: 'fifty_reports', name: 'Clean Champion', description: 'Submit 50 reports', icon: Crown, requirement: 50, type: 'reports' as const },
  { id: 'streak_7', name: 'Streak Master', description: '7-day reporting streak', icon: Flame, requirement: 7, type: 'streak' as const },
  { id: 'streak_30', name: 'Unstoppable', description: '30-day reporting streak', icon: Flame, requirement: 30, type: 'streak' as const },
  { id: 'top_10', name: 'Top Reporter', description: 'Reach top 10 on leaderboard', icon: Trophy, requirement: 10, type: 'rank' as const },
  { id: 'points_1000', name: 'Point Master', description: 'Earn 1000 points', icon: Target, requirement: 1000, type: 'points' as const },
  { id: 'first_redeem', name: 'Redeemer', description: 'Redeem your first reward', icon: Medal, requirement: 1, type: 'redemptions' as const },
];

// Vouchers
export interface Voucher {
  id: string;
  brand: string;
  icon: LucideIcon;
  value: string;
  pointsCost: number;
  color: string;
  gradient: string;
}

export const VOUCHERS: Voucher[] = [
  { id: 'amazon', brand: 'Amazon', icon: ShoppingBag, value: '₹100', pointsCost: 500, color: '#FF9900', gradient: 'from-amber-400 to-orange-500' },
  { id: 'swiggy', brand: 'Swiggy', icon: Coffee, value: '₹50', pointsCost: 250, color: '#FC8019', gradient: 'from-orange-400 to-red-400' },
  { id: 'metro', brand: 'Metro Pass', icon: Train, value: '1 Day', pointsCost: 200, color: '#1a73e8', gradient: 'from-blue-400 to-indigo-500' },
  { id: 'upi', brand: 'UPI Cashback', icon: Banknote, value: '₹200', pointsCost: 1000, color: '#6366f1', gradient: 'from-indigo-400 to-purple-500' },
  { id: 'donate', brand: 'Donate to NGO', icon: Heart, value: '₹50', pointsCost: 150, color: '#ec4899', gradient: 'from-pink-400 to-rose-500' },
];

// How it works steps
export const HOW_IT_WORKS = [
  { step: 1, title: 'Capture', description: 'Take a photo of untreated waste with your phone camera', emoji: '📸' },
  { step: 2, title: 'AI Analyzes', description: 'Our AI identifies waste type, severity, and the right department', emoji: '🤖' },
  { step: 3, title: 'Report Submitted', description: 'Your report with GPS location is sent to municipal authorities', emoji: '📍' },
  { step: 4, title: 'Earn Rewards', description: 'Get points when your report is verified and waste is cleaned', emoji: '🏆' },
];
