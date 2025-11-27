/**
 * Supabase Course Service
 * Platform-agnostic course management service
 */

import type { Course, CourseStatus } from '@asistoya/shared-types';
import { getSupabase } from '../client';
import { logger } from '../logger';
import { DatabaseError, ValidationError, isPostgrestError, logError } from '../errors';

class CourseService {
  /**
   * Generate unique course code
   */
  async generateCourseCode(schoolId: string, grade: string, section: string): Promise<string> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.rpc('generate_course_code', {
        p_school_id: schoolId,
        p_grade: grade,
        p_section: section,
      });

      if (error) throw error;
      return data as string;
    } catch (error) {
      logger.error('CourseService', 'Error generating course code', { error });
      return `CRS-${grade}-${section}-${Date.now()}`;
    }
  }

  /**
   * Get all courses for a school
   */
  async getAllCourses(schoolId: string): Promise<Course[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('school_id', schoolId)
        .order('name', { ascending: true });

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToCourse);
    } catch (error) {
      logger.error('CourseService', 'Error getting all courses', { error });
      throw error;
    }
  }

  /**
   * Get course by code
   */
  async getCourseByCode(courseCode: string): Promise<Course | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('code', courseCode)
        .maybeSingle();

      if (error) {
        logger.error('CourseService', 'Error getting course by code', { error });
        return null;
      }

      return data ? this.mapDatabaseToCourse(data) : null;
    } catch (error) {
      logger.error('CourseService', 'Error getting course by code', { error });
      return null;
    }
  }

  /**
   * Get courses by teacher ID
   */
  async getCoursesByTeacher(teacherId: string): Promise<Course[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .or(`teacher_id.eq.${teacherId},teacher_ids.cs.{${teacherId}}`)
        .order('name', { ascending: true });

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToCourse);
    } catch (error) {
      logger.error('CourseService', 'Error getting courses by teacher', { error });
      throw error;
    }
  }

  /**
   * Create a new course
   */
  async createCourse(courseData: Partial<Course>): Promise<Course> {
    try {
      if (!courseData.name || courseData.name.trim().length === 0) {
        throw new ValidationError('name', 'El nombre del curso es requerido');
      }
      if (!courseData.grade || courseData.grade.trim().length === 0) {
        throw new ValidationError('grade', 'El grado es requerido');
      }
      if (!courseData.schoolId) {
        throw new ValidationError('schoolId', 'El ID del colegio es requerido');
      }

      const supabase = getSupabase();
      const code = courseData.code || await this.generateCourseCode(
        courseData.schoolId,
        courseData.grade,
        courseData.section || 'A'
      );

      const insertData = {
        code,
        name: courseData.name as string,
        description: courseData.description || null,
        grade: courseData.grade as string,
        section: courseData.section || null,
        school_id: courseData.schoolId as string,
        school_code: courseData.schoolCode || courseData.schoolId,
        teacher_id: courseData.teacherId || null,
        teacher_code: courseData.teacherCode || null,
        teacher_name: courseData.teacherName || null,
        teacher_ids: courseData.teacherIds || null,
        room: courseData.room || null,
        max_students: courseData.maxStudents || null,
        status: courseData.status || 'active',
      };

      const { data, error } = await supabase
        .from('courses')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      logger.success('CourseService', 'Curso creado', { code });
      return this.mapDatabaseToCourse(data);
    } catch (error) {
      logError('CourseService - createCourse', error);
      throw error;
    }
  }

  /**
   * Update course
   */
  async updateCourse(courseCode: string, updates: Partial<Course>): Promise<Course> {
    try {
      if (!courseCode || courseCode.trim().length === 0) {
        throw new ValidationError('courseCode', 'El código del curso es requerido');
      }

      const supabase = getSupabase();
      const dbUpdates = this.mapCourseToDatabase(updates);

      const { data, error } = await supabase
        .from('courses')
        .update(dbUpdates)
        .eq('code', courseCode)
        .select()
        .single();

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      return this.mapDatabaseToCourse(data);
    } catch (error) {
      logError('CourseService - updateCourse', error);
      throw error;
    }
  }

  /**
   * Delete course
   */
  async deleteCourse(courseCode: string): Promise<void> {
    try {
      if (!courseCode || courseCode.trim().length === 0) {
        throw new ValidationError('courseCode', 'El código del curso es requerido');
      }

      const supabase = getSupabase();
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('code', courseCode);

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      logger.success('CourseService', 'Curso eliminado', { code: courseCode });
    } catch (error) {
      logError('CourseService - deleteCourse', error);
      throw error;
    }
  }

  /**
   * Get courses count by school
   */
  async getCoursesCount(schoolId: string): Promise<number> {
    try {
      const supabase = getSupabase();
      const { count, error } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', schoolId)
        .eq('status', 'active');

      if (error) throw error;
      return count || 0;
    } catch (error) {
      logger.error('CourseService', 'Error getting courses count', { error });
      return 0;
    }
  }

  /**
   * Map database format to Course interface
   */
  private mapDatabaseToCourse(data: any): Course {
    return {
      id: data.id,
      code: data.code,
      name: data.name,
      description: data.description || undefined,
      grade: data.grade,
      section: data.section || undefined,
      schoolId: data.school_id,
      schoolCode: data.school_code,
      teacherId: data.teacher_id || undefined,
      teacherCode: data.teacher_code || undefined,
      teacherName: data.teacher_name || undefined,
      teacherIds: data.teacher_ids || undefined,
      teachers: data.teachers || undefined,
      schedule: data.schedule_details || undefined,
      room: data.room || undefined,
      maxStudents: data.max_students || undefined,
      totalStudents: data.total_students || 0,
      startDate: data.start_date || undefined,
      endDate: data.end_date || undefined,
      status: (data.status as CourseStatus) || 'active',
      settings: data.settings || undefined,
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.updated_at || new Date().toISOString(),
    };
  }

  /**
   * Map Course interface to database format
   */
  private mapCourseToDatabase(course: Partial<Course>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    if (course.name) result.name = course.name;
    if (course.description !== undefined) result.description = course.description;
    if (course.grade) result.grade = course.grade;
    if (course.section !== undefined) result.section = course.section;
    if (course.teacherId !== undefined) result.teacher_id = course.teacherId;
    if (course.teacherCode !== undefined) result.teacher_code = course.teacherCode;
    if (course.teacherName !== undefined) result.teacher_name = course.teacherName;
    if (course.teacherIds) result.teacher_ids = course.teacherIds;
    if (course.room !== undefined) result.room = course.room;
    if (course.maxStudents !== undefined) result.max_students = course.maxStudents;
    if (course.status) result.status = course.status;
    if (course.settings) result.settings = course.settings;

    return result;
  }
}

export const courseService = new CourseService();
export default courseService;


