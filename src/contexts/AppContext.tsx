import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
  mockReports,
  mockNotifications,
  mockRedemptions,
  type Report,
  type Notification,
  type Redemption,
} from '@/lib/mock-data';
import type { ReportStatus } from '@/lib/constants';
import { useAuth } from '@/contexts/AuthContext';

interface AppContextType {
  reports: Report[];
  notifications: Notification[];
  redemptions: Redemption[];
  unreadCount: number;
  addReport: (report: Report) => void;
  updateReportStatus: (reportId: string, status: ReportStatus) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addRedemption: (redemption: Redemption) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [redemptions, setRedemptions] = useState<Redemption[]>(mockRedemptions);
  const { updateUserPoints } = useAuth();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addReport = useCallback((report: Report) => {
    setReports((prev) => [report, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        userId: report.userId,
        title: 'Report Submitted! 📝',
        message: `Your report at ${report.location} has been submitted successfully.`,
        type: 'success' as const,
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const updateReportStatus = useCallback((reportId: string, status: ReportStatus) => {
    setReports((prev) => {
      const targetReport = prev.find((r) => r.id === reportId);
      if (!targetReport) return prev;

      // Award points if resolved
      if (status === 'resolved' && targetReport.status !== 'resolved') {
        updateUserPoints(50, true);

        setNotifications((nPrev) => [
          {
            id: `notif_${Date.now()}`,
            userId: targetReport.userId,
            title: 'Report Resolved! 🎉',
            message: `Your report at ${targetReport.location} has been resolved. You earned 50 points!`,
            type: 'success' as const,
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...nPrev,
        ]);
      } else if (status === 'rejected' && targetReport.status !== 'rejected') {
        setNotifications((nPrev) => [
          {
            id: `notif_${Date.now()}`,
            userId: targetReport.userId,
            title: 'Report Rejected ❌',
            message: `Your report at ${targetReport.location} could not be verified by the department.`,
            type: 'warning' as const,
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...nPrev,
        ]);
      }

      return prev.map((r) =>
        r.id === reportId
          ? { ...r, status, updatedAt: new Date().toISOString(), pointsAwarded: status === 'resolved' ? 50 : r.pointsAwarded }
          : r
      );
    });
  }, [updateUserPoints]);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addRedemption = useCallback((redemption: Redemption) => {
    setRedemptions((prev) => [redemption, ...prev]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        reports,
        notifications,
        redemptions,
        unreadCount,
        addReport,
        updateReportStatus,
        markNotificationRead,
        markAllNotificationsRead,
        addRedemption,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
