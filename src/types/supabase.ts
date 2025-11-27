/**
 * Supabase Database Types
 * Auto-generated types for the Supabase database schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          course_code: string | null
          created_at: string | null
          date: string
          excuse_reason: string | null
          id: string
          latitude: number | null
          longitude: number | null
          marked_at: string | null
          marked_by: string | null
          method: string | null
          modified_at: string | null
          modified_by: string | null
          notes: string | null
          school_code: string
          school_id: string
          status: string
          student_code: string
          student_name: string
          teacher_code: string | null
          time: string | null
          updated_at: string | null
        }
        Insert: {
          course_code?: string | null
          created_at?: string | null
          date: string
          excuse_reason?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          marked_at?: string | null
          marked_by?: string | null
          method?: string | null
          modified_at?: string | null
          modified_by?: string | null
          notes?: string | null
          school_code: string
          school_id: string
          status: string
          student_code: string
          student_name: string
          teacher_code?: string | null
          time?: string | null
          updated_at?: string | null
        }
        Update: {
          course_code?: string | null
          created_at?: string | null
          date?: string
          excuse_reason?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          marked_at?: string | null
          marked_by?: string | null
          method?: string | null
          modified_at?: string | null
          modified_by?: string | null
          notes?: string | null
          school_code?: string
          school_id?: string
          status?: string
          student_code?: string
          student_name?: string
          teacher_code?: string | null
          time?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          end_date: string | null
          grade: string
          id: string
          max_students: number | null
          name: string
          room: string | null
          schedule: string | null
          schedule_details: Json | null
          school_code: string
          school_id: string
          section: string | null
          settings: Json | null
          start_date: string | null
          status: string | null
          teacher_code: string | null
          teacher_id: string | null
          teacher_ids: string[] | null
          teacher_name: string | null
          teachers: Json | null
          total_students: number | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          grade: string
          id?: string
          max_students?: number | null
          name: string
          room?: string | null
          schedule?: string | null
          schedule_details?: Json | null
          school_code: string
          school_id: string
          section?: string | null
          settings?: Json | null
          start_date?: string | null
          status?: string | null
          teacher_code?: string | null
          teacher_id?: string | null
          teacher_ids?: string[] | null
          teacher_name?: string | null
          teachers?: Json | null
          total_students?: number | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          grade?: string
          id?: string
          max_students?: number | null
          name?: string
          room?: string | null
          schedule?: string | null
          schedule_details?: Json | null
          school_code?: string
          school_id?: string
          section?: string | null
          settings?: Json | null
          start_date?: string | null
          status?: string | null
          teacher_code?: string | null
          teacher_id?: string | null
          teacher_ids?: string[] | null
          teacher_name?: string | null
          teachers?: Json | null
          total_students?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      device_tokens: {
        Row: {
          created_at: string | null
          device_id: string | null
          device_name: string | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          platform: string | null
          token: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          platform?: string | null
          token: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          platform?: string | null
          token?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          data: Json | null
          delivered: boolean | null
          delivery_method: string[] | null
          expires_at: string | null
          id: string
          message: string
          priority: string | null
          read: boolean | null
          read_at: string | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          delivered?: boolean | null
          delivery_method?: string[] | null
          expires_at?: string | null
          id?: string
          message: string
          priority?: string | null
          read?: boolean | null
          read_at?: string | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          delivered?: boolean | null
          delivery_method?: string[] | null
          expires_at?: string | null
          id?: string
          message?: string
          priority?: string | null
          read?: boolean | null
          read_at?: string | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      schools: {
        Row: {
          address: string
          admin_id: string | null
          city: string
          code: string
          country: string | null
          created_at: string | null
          email: string
          id: string
          logo: string | null
          name: string
          phone: string
          principal: string
          settings: Json | null
          state: string
          status: string | null
          subscription: Json | null
          total_students: number | null
          total_teachers: number | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address: string
          admin_id?: string | null
          city: string
          code: string
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          logo?: string | null
          name: string
          phone: string
          principal: string
          settings?: Json | null
          state: string
          status?: string | null
          subscription?: Json | null
          total_students?: number | null
          total_teachers?: number | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string
          admin_id?: string | null
          city?: string
          code?: string
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          logo?: string | null
          name?: string
          phone?: string
          principal?: string
          settings?: Json | null
          state?: string
          status?: string | null
          subscription?: Json | null
          total_students?: number | null
          total_teachers?: number | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          achievements: Json | null
          alerts: Json | null
          code: string
          course_code: string | null
          created_at: string | null
          date_of_birth: string | null
          enrollment_date: string | null
          face_id: string | null
          grade: string
          id: string
          name: string
          notes: Json | null
          parent_codes: string[] | null
          parent_contacts: Json | null
          parent_ids: string[] | null
          photo: string | null
          school_code: string
          school_id: string
          section: string | null
          stats: Json | null
          status: string | null
          student_code: string
          updated_at: string | null
        }
        Insert: {
          achievements?: Json | null
          alerts?: Json | null
          code: string
          course_code?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          enrollment_date?: string | null
          face_id?: string | null
          grade: string
          id?: string
          name: string
          notes?: Json | null
          parent_codes?: string[] | null
          parent_contacts?: Json | null
          parent_ids?: string[] | null
          photo?: string | null
          school_code: string
          school_id: string
          section?: string | null
          stats?: Json | null
          status?: string | null
          student_code: string
          updated_at?: string | null
        }
        Update: {
          achievements?: Json | null
          alerts?: Json | null
          code?: string
          course_code?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          enrollment_date?: string | null
          face_id?: string | null
          grade?: string
          id?: string
          name?: string
          notes?: Json | null
          parent_codes?: string[] | null
          parent_contacts?: Json | null
          parent_ids?: string[] | null
          photo?: string | null
          school_code?: string
          school_id?: string
          section?: string | null
          stats?: Json | null
          status?: string | null
          student_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      teachers: {
        Row: {
          address: string | null
          avatar: string | null
          code: string
          courses: string[] | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          hire_date: string | null
          id: string
          name: string
          permissions: Json | null
          phone: string | null
          school_code: string
          school_id: string
          specialization: string[] | null
          stats: Json | null
          status: string | null
          uid: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar?: string | null
          code: string
          courses?: string[] | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          hire_date?: string | null
          id?: string
          name: string
          permissions?: Json | null
          phone?: string | null
          school_code: string
          school_id: string
          specialization?: string[] | null
          stats?: Json | null
          status?: string | null
          uid?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar?: string | null
          code?: string
          courses?: string[] | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          hire_date?: string | null
          id?: string
          name?: string
          permissions?: Json | null
          phone?: string | null
          school_code?: string
          school_id?: string
          specialization?: string[] | null
          stats?: Json | null
          status?: string | null
          uid?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          active_role: string | null
          children: string[] | null
          classrooms: string[] | null
          created_at: string | null
          email: string | null
          id: string
          last_seen: string | null
          metadata: Json | null
          name: string | null
          onboarding_completed: boolean | null
          photo_url: string | null
          plan_id: string | null
          plan_selected_at: string | null
          role: string
          roles: string[] | null
          school_id: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          active_role?: string | null
          children?: string[] | null
          classrooms?: string[] | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_seen?: string | null
          metadata?: Json | null
          name?: string | null
          onboarding_completed?: boolean | null
          photo_url?: string | null
          plan_id?: string | null
          plan_selected_at?: string | null
          role: string
          roles?: string[] | null
          school_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          active_role?: string | null
          children?: string[] | null
          classrooms?: string[] | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_seen?: string | null
          metadata?: Json | null
          name?: string | null
          onboarding_completed?: boolean | null
          photo_url?: string | null
          plan_id?: string | null
          plan_selected_at?: string | null
          role?: string
          roles?: string[] | null
          school_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_course_code: {
        Args: { p_grade: string; p_school_id: string; p_section: string }
        Returns: string
      }
      generate_school_code: { Args: { p_school_name: string }; Returns: string }
      generate_student_code: { Args: { p_school_id: string }; Returns: string }
      generate_teacher_code: { Args: { p_school_id: string }; Returns: string }
      get_course_attendance_summary: {
        Args: { p_course_code: string; p_date: string }
        Returns: Json
      }
      get_courses_by_teacher: {
        Args: { p_teacher_id: string }
        Returns: {
          code: string
          grade: string
          id: string
          name: string
          school_id: string
          section: string
          total_students: number
        }[]
      }
      get_current_user_data: {
        Args: never
        Returns: {
          active_role: string | null
          children: string[] | null
          classrooms: string[] | null
          created_at: string | null
          email: string | null
          id: string
          last_seen: string | null
          metadata: Json | null
          name: string | null
          onboarding_completed: boolean | null
          photo_url: string | null
          plan_id: string | null
          plan_selected_at: string | null
          role: string
          roles: string[] | null
          school_id: string | null
          subscription_status: string | null
          updated_at: string | null
        }
      }
      is_admin: { Args: never; Returns: boolean }
      is_parent: { Args: never; Returns: boolean }
      is_school_admin: { Args: { school_id_param: string }; Returns: boolean }
      is_school_member: { Args: { school_id_param: string }; Returns: boolean }
      is_teacher: { Args: never; Returns: boolean }
      user_belongs_to_school: {
        Args: { check_school_id: string }
        Returns: boolean
      }
      user_has_any_role: { Args: { user_roles: string[] }; Returns: boolean }
      user_has_role: { Args: { check_role: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  TableName extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][TableName]["Row"]

export type TablesInsert<
  TableName extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][TableName]["Insert"]

export type TablesUpdate<
  TableName extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][TableName]["Update"]


