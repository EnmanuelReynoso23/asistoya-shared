/**
 * Dashboard Types
 * Shared types for dashboard components
 */

/**
 * Dashboard KPIs
 */
export interface DashboardKPIs {
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  todayAttendance: {
    present: number;
    late: number;
    absent: number;
    percentage: number;
  };
  monthlyStats: {
    avgAttendance: number;
    trend: 'up' | 'down' | 'stable';
    changePercentage: number;
  };
  alerts: {
    critical: number;
    warning: number;
    info: number;
  };
}

/**
 * Dashboard alert
 */
export interface DashboardAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: 'attendance' | 'performance' | 'system' | 'security';
  title: string;
  message: string;
  timestamp: string;
  actionRequired: boolean;
  status: 'new' | 'acknowledged' | 'resolved';
}

/**
 * Top performing student
 */
export interface TopStudent {
  code: string;
  name: string;
  photo?: string;
  attendanceRate: number;
  currentStreak: number;
  grade: string;
}

/**
 * Attendance summary
 */
export interface AttendanceSummary {
  date: string;
  presentPercentage: number;
  absentPercentage: number;
  latePercentage: number;
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

/**
 * Weekly attendance data
 */
export interface WeeklyAttendanceData {
  week: string;
  present: number;
  late: number;
  absent: number;
}


