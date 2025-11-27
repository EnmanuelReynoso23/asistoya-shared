/**
 * Supabase Student Service
 * Platform-agnostic student management service
 */

import type { Student, StudentStats, StudentRow } from '@asistoya/shared-types';
import { getSupabase } from '../client';
import { logger } from '../logger';
import { DatabaseError, ValidationError, isPostgrestError, logError } from '../errors';

class StudentService {
  /**
   * Generate unique student code
   */
  async generateStudentCode(schoolId: string): Promise<string> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.rpc('generate_student_code', {
        p_school_id: schoolId
      });

      if (error) throw error;
      return data as string;
    } catch (error) {
      logger.error('StudentService', 'Error generating student code', { error });
      return `EST-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    }
  }

  /**
   * Get all students for a school
   */
  async getAllStudents(schoolId: string): Promise<Student[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('school_id', schoolId)
        .order('name', { ascending: true });

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToStudent);
    } catch (error) {
      logger.error('StudentService', 'Error getting all students', { error });
      throw error;
    }
  }

  /**
   * Get student by code
   */
  async getStudentByCode(studentCode: string): Promise<Student | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('student_code', studentCode)
        .maybeSingle();

      if (error) {
        logger.error('StudentService', 'Error getting student by code', { error });
        return null;
      }

      return data ? this.mapDatabaseToStudent(data) : null;
    } catch (error) {
      logger.error('StudentService', 'Error getting student by code', { error });
      return null;
    }
  }

  /**
   * Get students by parent code
   */
  async getStudentsByParentCode(parentCode: string): Promise<Student[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .contains('parent_codes', [parentCode]);

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToStudent);
    } catch (error) {
      logger.error('StudentService', 'Error getting students by parent code', { error });
      throw error;
    }
  }

  /**
   * Get students by course code
   */
  async getStudentsByCourseCode(courseCode: string): Promise<Student[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('course_code', courseCode)
        .order('name', { ascending: true });

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToStudent);
    } catch (error) {
      logger.error('StudentService', 'Error getting students by course code', { error });
      throw error;
    }
  }

  /**
   * Create a new student
   */
  async createStudent(studentData: Partial<Student>): Promise<Student> {
    try {
      if (!studentData.name || studentData.name.trim().length === 0) {
        throw new ValidationError('name', 'El nombre del estudiante es requerido');
      }
      if (!studentData.studentCode || studentData.studentCode.trim().length === 0) {
        throw new ValidationError('studentCode', 'El código del estudiante es requerido');
      }
      if (!studentData.grade || studentData.grade.trim().length === 0) {
        throw new ValidationError('grade', 'El grado es requerido');
      }
      if (!studentData.schoolId) {
        throw new ValidationError('schoolId', 'El ID del colegio es requerido');
      }

      const supabase = getSupabase();
      const insertData = {
        code: (studentData.code || studentData.studentCode) as string,
        student_code: studentData.studentCode as string,
        name: studentData.name as string,
        grade: studentData.grade as string,
        school_id: studentData.schoolId as string,
        school_code: studentData.schoolCode || studentData.schoolId,
        section: studentData.section || null,
        course_code: studentData.courseCode || null,
        photo: studentData.photo || null,
        parent_codes: studentData.parentCodes || [],
        parent_ids: studentData.parentIds || [],
        status: studentData.status || 'active',
      };

      const { data, error } = await supabase
        .from('students')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      return this.mapDatabaseToStudent(data);
    } catch (error) {
      logError('StudentService - createStudent', error);
      throw error;
    }
  }

  /**
   * Update student
   */
  async updateStudent(studentCode: string, updates: Partial<Student>): Promise<Student> {
    try {
      if (!updates || Object.keys(updates).length === 0) {
        throw new ValidationError('updates', 'No hay datos para actualizar');
      }

      if (!studentCode || studentCode.trim().length === 0) {
        throw new ValidationError('studentCode', 'El código del estudiante es requerido');
      }

      const supabase = getSupabase();
      const dbUpdates = this.mapStudentToDatabase(updates);

      const { data, error } = await supabase
        .from('students')
        .update(dbUpdates)
        .eq('student_code', studentCode)
        .select()
        .single();

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      return this.mapDatabaseToStudent(data);
    } catch (error) {
      logError('StudentService - updateStudent', error);
      throw error;
    }
  }

  /**
   * Delete student
   */
  async deleteStudent(studentCode: string): Promise<void> {
    try {
      if (!studentCode || studentCode.trim().length === 0) {
        throw new ValidationError('studentCode', 'El código del estudiante es requerido');
      }

      const supabase = getSupabase();
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('student_code', studentCode);

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      logger.success('StudentService', 'Estudiante eliminado', { code: studentCode });
    } catch (error) {
      logError('StudentService - deleteStudent', error);
      throw error;
    }
  }

  /**
   * Search students
   */
  async searchStudents(schoolId: string, searchTerm: string): Promise<Student[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('school_id', schoolId)
        .or(`name.ilike.%${searchTerm}%,code.ilike.%${searchTerm}%,student_code.ilike.%${searchTerm}%`)
        .order('name', { ascending: true });

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToStudent);
    } catch (error) {
      logger.error('StudentService', 'Error searching students', { error });
      throw error;
    }
  }

  /**
   * Get students count by school
   */
  async getStudentsCount(schoolId: string): Promise<number> {
    try {
      const supabase = getSupabase();
      const { count, error } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', schoolId)
        .eq('status', 'active');

      if (error) throw error;
      return count || 0;
    } catch (error) {
      logger.error('StudentService', 'Error getting students count', { error });
      return 0;
    }
  }

  /**
   * Map database format to Student interface
   */
  private mapDatabaseToStudent(data: any): Student {
    const stats: StudentStats = (data.stats as StudentStats) || {
      totalDays: 0,
      totalLate: 0,
      totalAbsent: 0,
      totalPresent: 0,
      currentStreak: 0,
      longestStreak: 0,
      attendanceRate: 0,
    };

    return {
      id: data.id,
      code: data.code,
      studentCode: data.student_code,
      name: data.name,
      email: data.email || undefined,
      photo: data.photo || undefined,
      grade: data.grade,
      section: data.section || undefined,
      courseCode: data.course_code || undefined,
      schoolId: data.school_id,
      schoolCode: data.school_code,
      dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
      enrollmentDate: data.enrollment_date ? new Date(data.enrollment_date) : undefined,
      parentCodes: data.parent_codes || [],
      parentIds: data.parent_ids || [],
      parentContacts: Array.isArray(data.parent_contacts) ? data.parent_contacts : [],
      faceId: data.face_id || undefined,
      status: data.status || 'active',
      stats,
      alerts: Array.isArray(data.alerts) ? data.alerts : [],
      achievements: Array.isArray(data.achievements) ? data.achievements : [],
      notes: Array.isArray(data.notes) ? data.notes : [],
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.updated_at || new Date().toISOString(),
    };
  }

  /**
   * Map Student interface to database format
   */
  private mapStudentToDatabase(student: Partial<Student>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    if (student.code) result.code = student.code;
    if (student.studentCode) result.student_code = student.studentCode;
    if (student.name) result.name = student.name;
    if (student.photo !== undefined) result.photo = student.photo;
    if (student.grade) result.grade = student.grade;
    if (student.section !== undefined) result.section = student.section;
    if (student.courseCode !== undefined) result.course_code = student.courseCode;
    if (student.parentCodes) result.parent_codes = student.parentCodes;
    if (student.parentIds) result.parent_ids = student.parentIds;
    if (student.status) result.status = student.status;

    return result;
  }

  /**
   * Subscribe to student changes (real-time)
   */
  subscribeToStudent(studentCode: string, callback: (student: Student | null) => void) {
    const supabase = getSupabase();
    const channel = supabase
      .channel(`student-${studentCode}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'students',
          filter: `student_code=eq.${studentCode}`,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            callback(null);
          } else {
            callback(this.mapDatabaseToStudent(payload.new));
          }
        }
      )
      .subscribe();

    return channel;
  }
}

export const studentService = new StudentService();
export default studentService;


