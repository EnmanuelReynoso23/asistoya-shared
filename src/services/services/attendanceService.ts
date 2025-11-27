/**
 * Supabase Attendance Service
 * Platform-agnostic attendance management service
 */

import type { 
  AttendanceRecord, 
  AttendanceStats, 
  MarkAttendanceInput,
  AttendanceStatus 
} from '@asistoya/shared-types';
import { getSupabase } from '../client';
import { logger } from '../logger';
import { DatabaseError, ValidationError, isPostgrestError, logError } from '../errors';

class AttendanceService {
  /**
   * Mark attendance for a student
   */
  async markAttendance(input: MarkAttendanceInput): Promise<AttendanceRecord> {
    try {
      if (!input.studentCode) {
        throw new ValidationError('studentCode', 'El código del estudiante es requerido');
      }
      if (!input.schoolId) {
        throw new ValidationError('schoolId', 'El ID del colegio es requerido');
      }
      if (!input.status) {
        throw new ValidationError('status', 'El estado de asistencia es requerido');
      }

      const supabase = getSupabase();
      const now = new Date();
      const date = input.date || now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0];

      const insertData = {
        student_code: input.studentCode,
        student_name: input.studentName,
        school_id: input.schoolId,
        school_code: input.schoolCode,
        course_code: input.courseCode || null,
        date,
        time,
        status: input.status,
        method: input.method || 'manual',
        teacher_code: input.teacherCode || null,
        notes: input.notes || null,
        latitude: input.latitude || null,
        longitude: input.longitude || null,
        marked_at: now.toISOString(),
      };

      const { data, error } = await supabase
        .from('attendance')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      logger.success('AttendanceService', 'Asistencia marcada', { 
        studentCode: input.studentCode, 
        status: input.status 
      });

      return this.mapDatabaseToAttendance(data);
    } catch (error) {
      logError('AttendanceService - markAttendance', error);
      throw error;
    }
  }

  /**
   * Get attendance for a student on a specific date
   */
  async getStudentAttendance(studentCode: string, date: string): Promise<AttendanceRecord | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('student_code', studentCode)
        .eq('date', date)
        .maybeSingle();

      if (error) {
        logger.error('AttendanceService', 'Error getting student attendance', { error });
        return null;
      }

      return data ? this.mapDatabaseToAttendance(data) : null;
    } catch (error) {
      logger.error('AttendanceService', 'Error getting student attendance', { error });
      return null;
    }
  }

  /**
   * Get attendance history for a student
   */
  async getStudentAttendanceHistory(
    studentCode: string, 
    startDate?: string, 
    endDate?: string
  ): Promise<AttendanceRecord[]> {
    try {
      const supabase = getSupabase();
      let query = supabase
        .from('attendance')
        .select('*')
        .eq('student_code', studentCode)
        .order('date', { ascending: false });

      if (startDate) {
        query = query.gte('date', startDate);
      }
      if (endDate) {
        query = query.lte('date', endDate);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToAttendance);
    } catch (error) {
      logger.error('AttendanceService', 'Error getting attendance history', { error });
      throw error;
    }
  }

  /**
   * Get attendance for a course on a specific date
   */
  async getCourseAttendance(courseCode: string, date: string): Promise<AttendanceRecord[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('course_code', courseCode)
        .eq('date', date)
        .order('student_name', { ascending: true });

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToAttendance);
    } catch (error) {
      logger.error('AttendanceService', 'Error getting course attendance', { error });
      throw error;
    }
  }

  /**
   * Get attendance for a school on a specific date
   */
  async getSchoolAttendance(schoolId: string, date: string): Promise<AttendanceRecord[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('school_id', schoolId)
        .eq('date', date)
        .order('student_name', { ascending: true });

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToAttendance);
    } catch (error) {
      logger.error('AttendanceService', 'Error getting school attendance', { error });
      throw error;
    }
  }

  /**
   * Update attendance record
   */
  async updateAttendance(
    attendanceId: string, 
    updates: Partial<AttendanceRecord>,
    modifiedBy?: string
  ): Promise<AttendanceRecord> {
    try {
      const supabase = getSupabase();
      const dbUpdates: Record<string, unknown> = {
        modified_at: new Date().toISOString(),
        modified_by: modifiedBy || null,
      };

      if (updates.status) dbUpdates.status = updates.status;
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
      if (updates.excuseReason !== undefined) dbUpdates.excuse_reason = updates.excuseReason;

      const { data, error } = await supabase
        .from('attendance')
        .update(dbUpdates)
        .eq('id', attendanceId)
        .select()
        .single();

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      return this.mapDatabaseToAttendance(data);
    } catch (error) {
      logError('AttendanceService - updateAttendance', error);
      throw error;
    }
  }

  /**
   * Get attendance statistics for a student
   */
  async getStudentStats(
    studentCode: string, 
    startDate?: string, 
    endDate?: string
  ): Promise<AttendanceStats> {
    try {
      const records = await this.getStudentAttendanceHistory(studentCode, startDate, endDate);

      const stats: AttendanceStats = {
        totalPresent: 0,
        totalLate: 0,
        totalAbsent: 0,
        totalExcused: 0,
        attendanceRate: 0,
        punctualityRate: 0,
      };

      records.forEach(record => {
        switch (record.status) {
          case 'present':
            stats.totalPresent++;
            break;
          case 'late':
            stats.totalLate++;
            break;
          case 'absent':
            stats.totalAbsent++;
            break;
          case 'excused':
            stats.totalExcused++;
            break;
        }
      });

      const total = records.length;
      if (total > 0) {
        stats.attendanceRate = ((stats.totalPresent + stats.totalLate) / total) * 100;
        stats.punctualityRate = (stats.totalPresent / (stats.totalPresent + stats.totalLate || 1)) * 100;
      }

      return stats;
    } catch (error) {
      logger.error('AttendanceService', 'Error getting student stats', { error });
      return {
        totalPresent: 0,
        totalLate: 0,
        totalAbsent: 0,
        totalExcused: 0,
        attendanceRate: 0,
        punctualityRate: 0,
      };
    }
  }

  /**
   * Get daily attendance summary for a school
   */
  async getDailySummary(schoolId: string, date: string) {
    try {
      const records = await this.getSchoolAttendance(schoolId, date);

      const summary = {
        date,
        present: 0,
        late: 0,
        absent: 0,
        excused: 0,
        total: records.length,
        percentage: 0,
      };

      records.forEach(record => {
        switch (record.status) {
          case 'present':
            summary.present++;
            break;
          case 'late':
            summary.late++;
            break;
          case 'absent':
            summary.absent++;
            break;
          case 'excused':
            summary.excused++;
            break;
        }
      });

      if (summary.total > 0) {
        summary.percentage = ((summary.present + summary.late) / summary.total) * 100;
      }

      return summary;
    } catch (error) {
      logger.error('AttendanceService', 'Error getting daily summary', { error });
      throw error;
    }
  }

  /**
   * Map database format to AttendanceRecord interface
   */
  private mapDatabaseToAttendance(data: any): AttendanceRecord {
    return {
      id: data.id,
      studentCode: data.student_code,
      studentName: data.student_name,
      courseCode: data.course_code || undefined,
      schoolCode: data.school_code,
      schoolId: data.school_id,
      date: data.date,
      time: data.time || undefined,
      status: data.status as AttendanceStatus,
      method: data.method || undefined,
      markedAt: data.marked_at || undefined,
      markedBy: data.marked_by || undefined,
      teacherCode: data.teacher_code || undefined,
      notes: data.notes || undefined,
      excuseReason: data.excuse_reason || undefined,
      latitude: data.latitude || undefined,
      longitude: data.longitude || undefined,
      modifiedAt: data.modified_at || undefined,
      modifiedBy: data.modified_by || undefined,
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.updated_at || new Date().toISOString(),
    };
  }

  /**
   * Subscribe to attendance changes for a course (real-time)
   */
  subscribeToAttendance(courseCode: string, date: string, callback: (records: AttendanceRecord[]) => void) {
    const supabase = getSupabase();
    const channel = supabase
      .channel(`attendance-${courseCode}-${date}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'attendance',
          filter: `course_code=eq.${courseCode}`,
        },
        async () => {
          // Refetch all attendance for the course on any change
          const records = await this.getCourseAttendance(courseCode, date);
          callback(records);
        }
      )
      .subscribe();

    return channel;
  }
}

export const attendanceService = new AttendanceService();
export default attendanceService;


