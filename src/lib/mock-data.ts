import type { WasteType, SeverityLevel, ReportStatus } from './constants';

// ===== Type Definitions =====
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  joinedAt: string;
  totalReports: number;
  resolvedReports: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  rank: number;
  level: number;
  earnedBadges: string[];
}

export interface Report {
  id: string;
  userId: string;
  userName: string;
  imageUrl: string;
  wasteType: WasteType;
  confidence: number;
  severity: SeverityLevel;
  location: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  status: ReportStatus;
  pointsAwarded: number;
  createdAt: string;
  updatedAt: string;
  department: string;
  estimatedCleanupTime: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  read: boolean;
  createdAt: string;
}

export interface Redemption {
  id: string;
  userId: string;
  voucherId: string;
  brand: string;
  value: string;
  pointsSpent: number;
  status: 'processed' | 'pending';
  redeemedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  points: number;
  reports: number;
  streak: number;
}

// ===== Waste Image URLs (solid color placeholders) =====
const wasteImages = [
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%2316a34a" opacity="0.15"%3E%3Crect width="400" height="300" rx="12"/%3E%3Ctext x="200" y="150" text-anchor="middle" dominant-baseline="central" font-size="48" fill="%2316a34a" opacity="0.6"%3E🗑️%3C/text%3E%3C/svg%3E',
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%230369a1" opacity="0.15"%3E%3Crect width="400" height="300" rx="12"/%3E%3Ctext x="200" y="150" text-anchor="middle" dominant-baseline="central" font-size="48" fill="%230369a1" opacity="0.6"%3E♻️%3C/text%3E%3C/svg%3E',
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23854d0e" opacity="0.15"%3E%3Crect width="400" height="300" rx="12"/%3E%3Ctext x="200" y="150" text-anchor="middle" dominant-baseline="central" font-size="48" fill="%23854d0e" opacity="0.6"%3E🍂%3C/text%3E%3C/svg%3E',
];

// ===== Mock Current User =====
export const mockCurrentUser: User = {
  id: 'user_001',
  name: 'Arjun Mehta',
  email: 'arjun.mehta@email.com',
  avatar: '',
  phone: '+91 98765 43210',
  joinedAt: '2025-08-15T10:30:00Z',
  totalReports: 23,
  resolvedReports: 18,
  totalPoints: 1450,
  currentStreak: 5,
  longestStreak: 14,
  rank: 4,
  level: 3,
  earnedBadges: ['first_report', 'ten_reports', 'streak_7', 'points_1000'],
};

// ===== Mock Reports =====
export const mockReports: Report[] = [
  {
    id: 'RPT-001',
    userId: 'user_001',
    userName: 'Arjun Mehta',
    imageUrl: wasteImages[0],
    wasteType: 'plastic',
    confidence: 94,
    severity: 'high',
    location: 'Sector 15, Noida',
    latitude: 28.5851,
    longitude: 77.3100,
    address: 'Near Metro Station, Sector 15, Noida, UP 201301',
    description: 'Large pile of plastic waste near the metro station entrance.',
    status: 'resolved',
    pointsAwarded: 50,
    createdAt: '2026-06-28T09:15:00Z',
    updatedAt: '2026-06-29T14:30:00Z',
    department: 'Solid Waste Management',
    estimatedCleanupTime: '4-6 hours',
  },
  {
    id: 'RPT-002',
    userId: 'user_001',
    userName: 'Arjun Mehta',
    imageUrl: wasteImages[1],
    wasteType: 'organic',
    confidence: 88,
    severity: 'medium',
    location: 'Connaught Place, Delhi',
    latitude: 28.6315,
    longitude: 77.2167,
    address: 'Block A, Connaught Place, New Delhi 110001',
    description: 'Organic waste dumped near park entrance.',
    status: 'verified',
    pointsAwarded: 30,
    createdAt: '2026-06-27T14:20:00Z',
    updatedAt: '2026-06-28T10:00:00Z',
    department: 'Environmental Protection',
    estimatedCleanupTime: '2-3 hours',
  },
  {
    id: 'RPT-003',
    userId: 'user_002',
    userName: 'Priya Sharma',
    imageUrl: wasteImages[2],
    wasteType: 'construction',
    confidence: 91,
    severity: 'critical',
    location: 'MG Road, Bangalore',
    latitude: 12.9756,
    longitude: 77.6050,
    address: 'MG Road, Shanthala Nagar, Bangalore 560001',
    description: 'Construction debris blocking the footpath. Pedestrians forced to walk on road.',
    status: 'submitted',
    pointsAwarded: 0,
    createdAt: '2026-06-29T08:45:00Z',
    updatedAt: '2026-06-29T08:45:00Z',
    department: 'Municipal Works',
    estimatedCleanupTime: '8-12 hours',
  },
  {
    id: 'RPT-004',
    userId: 'user_003',
    userName: 'Rahul Verma',
    imageUrl: wasteImages[0],
    wasteType: 'ewaste',
    confidence: 86,
    severity: 'high',
    location: 'Banjara Hills, Hyderabad',
    latitude: 17.4156,
    longitude: 78.4347,
    address: 'Road No. 12, Banjara Hills, Hyderabad 500034',
    description: 'Old computer monitors and electronic parts dumped near residential area.',
    status: 'assigned',
    pointsAwarded: 0,
    createdAt: '2026-06-26T11:30:00Z',
    updatedAt: '2026-06-28T16:00:00Z',
    department: 'Environmental Protection',
    estimatedCleanupTime: '6-8 hours',
  },
  {
    id: 'RPT-005',
    userId: 'user_004',
    userName: 'Sneha Patel',
    imageUrl: wasteImages[1],
    wasteType: 'mixed',
    confidence: 78,
    severity: 'medium',
    location: 'Andheri West, Mumbai',
    latitude: 19.1362,
    longitude: 72.8362,
    address: 'Lokhandwala Complex, Andheri West, Mumbai 400053',
    description: 'Mixed waste pile growing near the community garden.',
    status: 'cleaning',
    pointsAwarded: 0,
    createdAt: '2026-06-25T16:00:00Z',
    updatedAt: '2026-06-29T09:00:00Z',
    department: 'Solid Waste Management',
    estimatedCleanupTime: '3-5 hours',
  },
  {
    id: 'RPT-006',
    userId: 'user_005',
    userName: 'Aditya Kumar',
    imageUrl: wasteImages[2],
    wasteType: 'hazardous',
    confidence: 92,
    severity: 'critical',
    location: 'Koramangala, Bangalore',
    latitude: 12.9352,
    longitude: 77.6245,
    address: '5th Block, Koramangala, Bangalore 560095',
    description: 'Chemical containers and paint cans discarded near water drain.',
    status: 'submitted',
    pointsAwarded: 0,
    createdAt: '2026-06-29T07:00:00Z',
    updatedAt: '2026-06-29T07:00:00Z',
    department: 'Public Health',
    estimatedCleanupTime: '12-24 hours',
  },
  {
    id: 'RPT-007',
    userId: 'user_001',
    userName: 'Arjun Mehta',
    imageUrl: wasteImages[0],
    wasteType: 'plastic',
    confidence: 96,
    severity: 'low',
    location: 'Hauz Khas, Delhi',
    latitude: 28.5494,
    longitude: 77.2001,
    address: 'Hauz Khas Village, New Delhi 110016',
    description: 'Plastic bags and bottles scattered near the lake area.',
    status: 'resolved',
    pointsAwarded: 50,
    createdAt: '2026-06-20T10:00:00Z',
    updatedAt: '2026-06-22T15:00:00Z',
    department: 'Environmental Protection',
    estimatedCleanupTime: '1-2 hours',
  },
  {
    id: 'RPT-008',
    userId: 'user_006',
    userName: 'Kavita Reddy',
    imageUrl: wasteImages[1],
    wasteType: 'medical',
    confidence: 89,
    severity: 'critical',
    location: 'T. Nagar, Chennai',
    latitude: 13.0418,
    longitude: 80.2341,
    address: 'Thyagaraya Nagar, Chennai 600017',
    description: 'Discarded syringes and medical waste found near bus stop.',
    status: 'verified',
    pointsAwarded: 0,
    createdAt: '2026-06-29T06:30:00Z',
    updatedAt: '2026-06-29T12:00:00Z',
    department: 'Public Health',
    estimatedCleanupTime: '4-6 hours',
  },
  {
    id: 'RPT-009',
    userId: 'user_001',
    userName: 'Arjun Mehta',
    imageUrl: wasteImages[2],
    wasteType: 'organic',
    confidence: 82,
    severity: 'low',
    location: 'Lajpat Nagar, Delhi',
    latitude: 28.5700,
    longitude: 77.2400,
    address: 'Central Market, Lajpat Nagar, New Delhi 110024',
    description: 'Vegetable and fruit waste from market vendors.',
    status: 'resolved',
    pointsAwarded: 30,
    createdAt: '2026-06-18T08:00:00Z',
    updatedAt: '2026-06-19T12:00:00Z',
    department: 'Solid Waste Management',
    estimatedCleanupTime: '2-3 hours',
  },
  {
    id: 'RPT-010',
    userId: 'user_007',
    userName: 'Vikram Singh',
    imageUrl: wasteImages[0],
    wasteType: 'construction',
    confidence: 90,
    severity: 'high',
    location: 'Whitefield, Bangalore',
    latitude: 12.9698,
    longitude: 77.7500,
    address: 'ITPL Main Road, Whitefield, Bangalore 560066',
    description: 'Construction rubble from demolished building left on road.',
    status: 'submitted',
    pointsAwarded: 0,
    createdAt: '2026-06-29T10:15:00Z',
    updatedAt: '2026-06-29T10:15:00Z',
    department: 'Municipal Works',
    estimatedCleanupTime: '24-48 hours',
  },
  {
    id: 'RPT-011',
    userId: 'user_001',
    userName: 'Arjun Mehta',
    imageUrl: wasteImages[1],
    wasteType: 'plastic',
    confidence: 93,
    severity: 'medium',
    location: 'Saket, Delhi',
    latitude: 28.5244,
    longitude: 77.2167,
    address: 'Select Citywalk Road, Saket, New Delhi 110017',
    description: 'Plastic waste from street food vendors.',
    status: 'rejected',
    pointsAwarded: 0,
    createdAt: '2026-06-15T19:00:00Z',
    updatedAt: '2026-06-16T09:00:00Z',
    department: 'Solid Waste Management',
    estimatedCleanupTime: '1-2 hours',
  },
  {
    id: 'RPT-012',
    userId: 'user_008',
    userName: 'Meera Iyer',
    imageUrl: wasteImages[2],
    wasteType: 'mixed',
    confidence: 75,
    severity: 'medium',
    location: 'Jubilee Hills, Hyderabad',
    latitude: 17.4325,
    longitude: 78.4073,
    address: 'Road No. 36, Jubilee Hills, Hyderabad 500033',
    description: 'Mixed household waste dumped on vacant plot.',
    status: 'cleaning',
    pointsAwarded: 0,
    createdAt: '2026-06-28T13:00:00Z',
    updatedAt: '2026-06-29T11:00:00Z',
    department: 'Solid Waste Management',
    estimatedCleanupTime: '3-4 hours',
  },
];

// ===== Mock Leaderboard =====
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'user_010', name: 'Nisha Gupta', avatar: '', points: 3250, reports: 65, streak: 22 },
  { rank: 2, userId: 'user_011', name: 'Rohan Das', avatar: '', points: 2890, reports: 58, streak: 15 },
  { rank: 3, userId: 'user_012', name: 'Ananya Singh', avatar: '', points: 2450, reports: 49, streak: 18 },
  { rank: 4, userId: 'user_001', name: 'Arjun Mehta', avatar: '', points: 1450, reports: 23, streak: 5 },
  { rank: 5, userId: 'user_013', name: 'Deepak Joshi', avatar: '', points: 1380, reports: 28, streak: 8 },
  { rank: 6, userId: 'user_003', name: 'Rahul Verma', avatar: '', points: 1200, reports: 24, streak: 3 },
  { rank: 7, userId: 'user_014', name: 'Sakshi Tiwari', avatar: '', points: 1100, reports: 22, streak: 10 },
  { rank: 8, userId: 'user_005', name: 'Aditya Kumar', avatar: '', points: 980, reports: 20, streak: 6 },
  { rank: 9, userId: 'user_004', name: 'Sneha Patel', avatar: '', points: 850, reports: 17, streak: 4 },
  { rank: 10, userId: 'user_006', name: 'Kavita Reddy', avatar: '', points: 720, reports: 14, streak: 7 },
  { rank: 11, userId: 'user_015', name: 'Manish Rao', avatar: '', points: 680, reports: 13, streak: 2 },
  { rank: 12, userId: 'user_007', name: 'Vikram Singh', avatar: '', points: 590, reports: 12, streak: 5 },
  { rank: 13, userId: 'user_008', name: 'Meera Iyer', avatar: '', points: 470, reports: 10, streak: 3 },
  { rank: 14, userId: 'user_016', name: 'Pooja Nair', avatar: '', points: 380, reports: 8, streak: 1 },
  { rank: 15, userId: 'user_017', name: 'Karthik M', avatar: '', points: 290, reports: 6, streak: 2 },
];

// ===== Mock Weekly Leaderboard =====
export const mockWeeklyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'user_012', name: 'Ananya Singh', avatar: '', points: 350, reports: 7, streak: 7 },
  { rank: 2, userId: 'user_001', name: 'Arjun Mehta', avatar: '', points: 280, reports: 5, streak: 5 },
  { rank: 3, userId: 'user_010', name: 'Nisha Gupta', avatar: '', points: 250, reports: 5, streak: 5 },
  { rank: 4, userId: 'user_005', name: 'Aditya Kumar', avatar: '', points: 200, reports: 4, streak: 4 },
  { rank: 5, userId: 'user_014', name: 'Sakshi Tiwari', avatar: '', points: 180, reports: 4, streak: 4 },
  { rank: 6, userId: 'user_003', name: 'Rahul Verma', avatar: '', points: 150, reports: 3, streak: 3 },
  { rank: 7, userId: 'user_011', name: 'Rohan Das', avatar: '', points: 130, reports: 3, streak: 3 },
  { rank: 8, userId: 'user_006', name: 'Kavita Reddy', avatar: '', points: 100, reports: 2, streak: 2 },
  { rank: 9, userId: 'user_013', name: 'Deepak Joshi', avatar: '', points: 80, reports: 2, streak: 2 },
  { rank: 10, userId: 'user_007', name: 'Vikram Singh', avatar: '', points: 50, reports: 1, streak: 1 },
];

// ===== Mock Notifications =====
export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    userId: 'user_001',
    title: 'Report Resolved! 🎉',
    message: 'Your report RPT-001 at Sector 15, Noida has been resolved. You earned 50 points!',
    type: 'success',
    read: false,
    createdAt: '2026-06-29T14:30:00Z',
  },
  {
    id: 'notif_002',
    userId: 'user_001',
    title: 'Report Verified ✅',
    message: 'Your report RPT-002 at Connaught Place has been verified by the municipality.',
    type: 'info',
    read: false,
    createdAt: '2026-06-28T10:00:00Z',
  },
  {
    id: 'notif_003',
    userId: 'user_001',
    title: 'Streak Alert! 🔥',
    message: 'You\'re on a 5-day streak! Keep reporting to earn bonus points.',
    type: 'info',
    read: true,
    createdAt: '2026-06-27T08:00:00Z',
  },
  {
    id: 'notif_004',
    userId: 'user_001',
    title: 'Badge Earned! 🏆',
    message: 'Congratulations! You\'ve earned the "Points Master" badge for reaching 1000 points.',
    type: 'success',
    read: true,
    createdAt: '2026-06-25T12:00:00Z',
  },
];

// ===== Mock Redemptions =====
export const mockRedemptions: Redemption[] = [
  {
    id: 'rdm_001',
    userId: 'user_001',
    voucherId: 'amazon',
    brand: 'Amazon',
    value: '₹100',
    pointsSpent: 500,
    status: 'processed',
    redeemedAt: '2026-06-20T14:00:00Z',
  },
  {
    id: 'rdm_002',
    userId: 'user_001',
    voucherId: 'donate',
    brand: 'Donate to NGO',
    value: '₹50',
    pointsSpent: 150,
    status: 'processed',
    redeemedAt: '2026-06-10T10:00:00Z',
  },
  {
    id: 'rdm_003',
    userId: 'user_001',
    voucherId: 'swiggy',
    brand: 'Swiggy',
    value: '₹50',
    pointsSpent: 250,
    status: 'pending',
    redeemedAt: '2026-06-28T16:00:00Z',
  },
];

// ===== Chart Data =====
export const reportsOverTimeData = [
  { month: 'Jan', reports: 120, resolved: 95 },
  { month: 'Feb', reports: 180, resolved: 140 },
  { month: 'Mar', reports: 250, resolved: 200 },
  { month: 'Apr', reports: 310, resolved: 260 },
  { month: 'May', reports: 420, resolved: 380 },
  { month: 'Jun', reports: 480, resolved: 410 },
];

export const wasteTypeDistribution = [
  { name: 'Plastic', value: 35, fill: '#0369a1' },
  { name: 'Organic', value: 25, fill: '#854d0e' },
  { name: 'Mixed', value: 18, fill: '#525252' },
  { name: 'Construction', value: 10, fill: '#92400e' },
  { name: 'E-Waste', value: 7, fill: '#7c3aed' },
  { name: 'Hazardous', value: 3, fill: '#dc2626' },
  { name: 'Medical', value: 2, fill: '#be123c' },
];

export const severityBreakdown = [
  { name: 'Low', count: 180, fill: '#22c55e' },
  { name: 'Medium', count: 290, fill: '#eab308' },
  { name: 'High', count: 150, fill: '#f97316' },
  { name: 'Critical', count: 60, fill: '#ef4444' },
];
