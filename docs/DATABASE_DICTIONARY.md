# 📚 AsistoYa - Diccionario de Base de Datos

> **Última actualización:** 1 de Diciembre 2025  
> **Proyecto Supabase:** Asistoya-asistencia  
> **Versión PostgreSQL:** 17.6.1

---

## 📋 Índice

1. [Tablas Principales](#tablas-principales)
2. [Funciones de Base de Datos](#funciones-de-base-de-datos)
3. [Tipos y Enums](#tipos-y-enums)
4. [Relaciones entre Tablas](#relaciones-entre-tablas)
5. [Políticas RLS](#políticas-rls)
6. [Extensiones Activas](#extensiones-activas)

---

## 📊 Tablas Principales

### 🔐 `users`
> Tabla principal de usuarios del sistema.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `uuid_generate_v4()` | ID único del usuario |
| `email` | `text` | SÍ | - | Email del usuario (único) |
| `name` | `text` | SÍ | - | Nombre completo |
| `role` | `text` | NO | - | Rol principal: `admin`, `teacher`, `parent`, `student`, `ceo` |
| `roles` | `text[]` | SÍ | `[]` | Array de roles que puede asumir |
| `active_role` | `text` | SÍ | - | Rol activo para la sesión actual |
| `school_id` | `uuid` | SÍ | - | FK a escuela asignada |
| `children` | `text[]` | SÍ | - | Array de códigos de hijos (para padres) |
| `classrooms` | `text[]` | SÍ | - | Array de aulas asignadas |
| `photo_url` | `text` | SÍ | - | URL de foto de perfil |
| `plan_id` | `text` | SÍ | - | ID del plan de suscripción |
| `onboarding_completed` | `boolean` | SÍ | `false` | Si completó onboarding |
| `subscription_status` | `text` | SÍ | `'inactive'` | Estado: active/inactive |
| `plan_selected_at` | `timestamptz` | SÍ | - | Fecha de selección de plan |
| `metadata` | `jsonb` | SÍ | `{}` | Datos adicionales |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `last_seen` | `timestamptz` | SÍ | `now()` | Última actividad |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**RLS:** ✅ Habilitado

---

### 🏫 `schools`
> Escuelas registradas en el sistema.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | ID único de la escuela |
| `name` | `text` | NO | - | Nombre de la escuela |
| `code` | `text` | NO | - | Código único (ej: `ESC-ABC123`) |
| `settings` | `jsonb` | SÍ | `{}` | Configuración de la escuela |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |

**RLS:** ✅ Habilitado

---

### 👨‍🏫 `teachers`
> Profesores vinculados a escuelas.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `uuid_generate_v4()` | ID único del profesor |
| `code` | `text` | NO | - | Código único (ej: `PROF-ABC-1234`) |
| `uid` | `uuid` | SÍ | - | FK a `users.id` |
| `name` | `text` | NO | - | Nombre completo |
| `email` | `text` | SÍ | - | Email del profesor |
| `phone` | `text` | SÍ | - | Teléfono |
| `avatar` | `text` | SÍ | - | URL de avatar |
| `school_id` | `uuid` | NO | - | FK a escuela |
| `school_code` | `text` | NO | - | Código de la escuela |
| `courses` | `text[]` | SÍ | `[]` | Códigos de cursos asignados |
| `specialization` | `text[]` | SÍ | `[]` | Especializaciones |
| `hire_date` | `date` | SÍ | - | Fecha de contratación |
| `date_of_birth` | `date` | SÍ | - | Fecha de nacimiento |
| `address` | `text` | SÍ | - | Dirección |
| `status` | `text` | SÍ | `'active'` | Estado: `active`, `inactive`, `on_leave` |
| `stats` | `jsonb` | SÍ | `{...}` | Estadísticas del profesor |
| `permissions` | `jsonb` | SÍ | `{...}` | Permisos asignados |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**Stats por defecto:**
```json
{
  "totalCourses": 0,
  "avgAttendance": 0,
  "totalStudents": 0,
  "punctualityScore": 0
}
```

**Permissions por defecto:**
```json
{
  "canManageGrades": true,
  "canExportReports": true,
  "canEditAttendance": true,
  "canMarkAttendance": true,
  "canViewAllStudents": false,
  "canSendNotifications": true
}
```

**RLS:** ✅ Habilitado

---

### 👨‍🎓 `students`
> Estudiantes registrados en escuelas.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `uuid_generate_v4()` | ID único |
| `code` | `text` | NO | - | Código corto (único) |
| `student_code` | `text` | NO | - | Código completo (único) |
| `name` | `text` | NO | - | Nombre completo |
| `photo` | `text` | SÍ | - | URL de foto |
| `grade` | `text` | NO | - | Grado escolar |
| `section` | `text` | SÍ | - | Sección/grupo |
| `course_code` | `text` | SÍ | - | Código del curso principal |
| `school_id` | `uuid` | NO | - | FK a escuela |
| `school_code` | `text` | NO | - | Código de la escuela |
| `date_of_birth` | `date` | SÍ | - | Fecha de nacimiento |
| `enrollment_date` | `date` | SÍ | - | Fecha de inscripción |
| `parent_codes` | `text[]` | SÍ | `[]` | Códigos de padres vinculados |
| `parent_ids` | `text[]` | SÍ | `[]` | IDs de padres vinculados |
| `parent_contacts` | `jsonb` | SÍ | `[]` | Información de contacto de padres |
| `face_id` | `text` | SÍ | - | ID para reconocimiento facial |
| `status` | `text` | SÍ | `'active'` | Estado del estudiante |
| `stats` | `jsonb` | SÍ | `{...}` | Estadísticas de asistencia |
| `notes` | `jsonb` | SÍ | `[]` | Notas sobre el estudiante |
| `email` | `text` | SÍ | - | Email (opcional) |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**Status posibles:** `active`, `inactive`, `transferred`, `graduated`, `withdrawn`, `on_leave`

**Stats por defecto:**
```json
{
  "totalDays": 0,
  "totalLate": 0,
  "totalAbsent": 0,
  "totalPresent": 0,
  "currentStreak": 0,
  "longestStreak": 0,
  "attendanceRate": 0
}
```

**RLS:** ✅ Habilitado

---

### 📚 `courses`
> Cursos/materias en las escuelas.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | ID único |
| `school_id` | `uuid` | SÍ | - | FK a escuela |
| `name` | `text` | NO | - | Nombre del curso |
| `teacher_id` | `uuid` | SÍ | - | Profesor principal (legacy) |
| `schedule` | `text` | SÍ | - | Horario del curso |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |

**RLS:** ✅ Habilitado

---

### 👥 `course_teachers`
> Relación muchos-a-muchos entre cursos y profesores.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | ID único |
| `course_id` | `uuid` | NO | - | FK a curso |
| `teacher_id` | `uuid` | NO | - | FK a profesor |
| `role` | `text` | SÍ | `'primary'` | Rol: `primary`, `assistant` |
| `assigned_at` | `timestamptz` | SÍ | `now()` | Fecha de asignación |
| `assigned_by` | `uuid` | SÍ | - | FK a usuario que asignó |
| `status` | `text` | SÍ | `'active'` | Estado de la asignación |
| `notes` | `text` | SÍ | - | Notas adicionales |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**RLS:** ✅ Habilitado

---

### 📝 `course_students`
> Relación muchos-a-muchos entre cursos y estudiantes.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `uuid_generate_v4()` | ID único |
| `course_id` | `uuid` | NO | - | FK a curso |
| `student_id` | `uuid` | NO | - | FK a estudiante |
| `student_code` | `text` | NO | - | Código del estudiante |
| `course_code` | `text` | NO | - | Código del curso |
| `enrollment_date` | `date` | SÍ | `CURRENT_DATE` | Fecha de inscripción |
| `status` | `text` | SÍ | `'active'` | Estado de inscripción |
| `final_grade` | `numeric` | SÍ | - | Calificación final |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**Status posibles:** `active`, `inactive`, `dropped`, `completed`

**RLS:** ✅ Habilitado

---

### ✅ `attendance_records`
> Registros de asistencia.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | ID único |
| `student_code` | `text` | NO | - | Código del estudiante |
| `student_name` | `text` | SÍ | - | Nombre del estudiante |
| `course_code` | `text` | SÍ | - | Código del curso |
| `teacher_code` | `text` | SÍ | - | Código del profesor |
| `school_id` | `text` | NO | - | ID de la escuela |
| `school_code` | `text` | SÍ | - | Código de la escuela |
| `date` | `date` | NO | - | Fecha del registro |
| `timestamp` | `timestamptz` | SÍ | - | Timestamp completo |
| `status` | `text` | SÍ | - | Estado de asistencia |
| `method` | `text` | SÍ | - | Método de registro |
| `latitude` | `float8` | SÍ | - | Latitud GPS |
| `longitude` | `float8` | SÍ | - | Longitud GPS |
| `notes` | `text` | SÍ | - | Notas |
| `excuse_reason` | `text` | SÍ | - | Razón de excusa |
| `marked_by` | `text` | SÍ | - | Quién marcó |
| `marked_at` | `timestamptz` | SÍ | `now()` | Cuándo se marcó |
| `entry_time` | `timestamptz` | SÍ | - | Hora de entrada |
| `entry_status` | `text` | SÍ | - | Estado de entrada |
| `exit_time` | `timestamptz` | SÍ | - | Hora de salida |
| `exit_status` | `text` | SÍ | - | Estado de salida |
| `exit_method` | `text` | SÍ | - | Método de salida |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**Status posibles:** `present`, `late`, `absent`, `excused`, `not_marked`

**RLS:** ✅ Habilitado

---

### 🎟️ `invite_codes`
> Códigos de invitación para vincular usuarios a escuelas.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `uuid_generate_v4()` | ID único |
| `code` | `text` | NO | - | Código de invitación (único) |
| `type` | `text` | NO | - | Tipo: `student`, `parent`, `teacher`, `admin` |
| `school_id` | `uuid` | NO | - | FK a escuela |
| `admin_user_id` | `uuid` | SÍ | - | FK a admin que lo creó |
| `max_uses` | `integer` | SÍ | `1` | Máximo de usos permitidos |
| `current_uses` | `integer` | SÍ | `0` | Usos actuales |
| `is_active` | `boolean` | SÍ | `true` | Si está activo |
| `description` | `text` | SÍ | - | Descripción del código |
| `metadata` | `jsonb` | SÍ | `{}` | Datos adicionales |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `expires_at` | `timestamptz` | SÍ | - | Fecha de expiración |
| `last_used_at` | `timestamptz` | SÍ | - | Último uso |

**RLS:** ✅ Habilitado

---

### 🔑 `access_codes`
> Códigos de acceso para autenticación rápida.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | ID único |
| `code` | `text` | NO | - | Código de acceso (único) |
| `user_id` | `uuid` | SÍ | - | FK a usuario |
| `role` | `text` | NO | - | Rol: `admin`, `teacher`, `parent`, `student` |
| `expires_at` | `timestamptz` | SÍ | `now() + 30 days` | Expiración |
| `used_at` | `timestamptz` | SÍ | - | Cuándo se usó |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `metadata` | `jsonb` | SÍ | `{}` | Datos adicionales |

**RLS:** ✅ Habilitado

---

### 📢 `announcements`
> Anuncios enviados a usuarios.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `uuid_generate_v4()` | ID único |
| `title` | `text` | NO | - | Título del anuncio |
| `message` | `text` | NO | - | Contenido del mensaje |
| `audience_type` | `text` | NO | - | Tipo de audiencia |
| `audience_filters` | `jsonb` | SÍ | `{}` | Filtros de audiencia |
| `priority` | `text` | NO | `'normal'` | Prioridad |
| `sent_by` | `uuid` | SÍ | - | FK a usuario que envió |
| `school_id` | `uuid` | NO | - | FK a escuela |
| `recipients_count` | `integer` | SÍ | `0` | Total de destinatarios |
| `successful_count` | `integer` | SÍ | `0` | Envíos exitosos |
| `failed_count` | `integer` | SÍ | `0` | Envíos fallidos |
| `scheduled_for` | `timestamptz` | SÍ | - | Programado para |
| `sent_at` | `timestamptz` | SÍ | `now()` | Fecha de envío |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**Audience types:** `all`, `grade`, `course`, `teachers`, `custom`

**Priority levels:** `low`, `normal`, `high`, `urgent`

**RLS:** ✅ Habilitado

---

### 🔔 `push_subscriptions`
> Suscripciones de notificaciones push.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `uuid_generate_v4()` | ID único |
| `user_id` | `uuid` | SÍ | - | FK a usuario |
| `school_id` | `uuid` | NO | - | FK a escuela |
| `subscription` | `jsonb` | NO | - | Datos de suscripción completos |
| `endpoint` | `text` | SÍ | - | URL del endpoint Web Push |
| `p256dh` | `text` | SÍ | - | Clave pública P-256 |
| `auth` | `text` | SÍ | - | Secreto de autenticación |
| `is_active` | `boolean` | SÍ | `true` | Si está activa |
| `platform` | `text` | SÍ | `'web'` | Plataforma: `web`, `android`, `ios` |
| `device_name` | `text` | SÍ | - | Nombre del dispositivo |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**RLS:** ✅ Habilitado

---

### 👤 `face_profiles`
> Perfiles de reconocimiento facial de estudiantes.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `uuid_generate_v4()` | ID único |
| `student_code` | `text` | NO | - | Código del estudiante (único) |
| `student_id` | `uuid` | SÍ | - | FK a estudiante |
| `school_id` | `uuid` | NO | - | FK a escuela |
| `embeddings` | `jsonb` | NO | - | Vectores de reconocimiento |
| `total_images` | `integer` | SÍ | `0` | Total de imágenes |
| `quality_score` | `numeric` | SÍ | - | Puntuación de calidad |
| `confidence_threshold` | `numeric` | SÍ | `0.6` | Umbral de confianza |
| `is_active` | `boolean` | SÍ | `true` | Si está activo |
| `is_verified` | `boolean` | SÍ | `false` | Si está verificado |
| `verified_by` | `uuid` | SÍ | - | FK a quien verificó |
| `verified_at` | `timestamptz` | SÍ | - | Fecha de verificación |
| `last_trained_at` | `timestamptz` | SÍ | `now()` | Último entrenamiento |
| `training_version` | `text` | SÍ | - | Versión del modelo |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**RLS:** ✅ Habilitado

---

### 📰 `news`
> Noticias y artículos del blog.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | ID único |
| `slug` | `text` | NO | - | URL amigable (único) |
| `title` | `text` | NO | - | Título |
| `date` | `date` | NO | - | Fecha de publicación |
| `summary` | `text` | NO | - | Resumen corto |
| `content` | `text` | SÍ | - | Contenido completo |
| `source_url` | `text` | SÍ | - | URL de fuente |
| `image_url` | `text` | SÍ | - | Imagen principal |
| `gallery` | `jsonb` | SÍ | `[]` | Galería de imágenes |
| `tags` | `text[]` | SÍ | `[]` | Etiquetas |
| `author` | `text` | SÍ | `'AsistoYA Team'` | Autor |
| `meta_description` | `text` | SÍ | - | Meta descripción SEO |
| `status` | `text` | SÍ | `'published'` | Estado |
| `views` | `integer` | SÍ | `0` | Vistas |
| `created_at` | `timestamptz` | SÍ | `now()` | Fecha de creación |
| `updated_at` | `timestamptz` | SÍ | `now()` | Última actualización |

**Status:** `draft`, `published`, `archived`

**RLS:** ✅ Habilitado

---

## ⚙️ Funciones de Base de Datos

### 🔐 Funciones de Autenticación y Roles

| Función | Retorno | Descripción |
|---------|---------|-------------|
| `get_user_role()` | `text` | Obtiene el rol del usuario actual |
| `get_user_school_id()` | `uuid` | Obtiene el school_id del usuario actual |
| `get_current_user_data()` | `users` | Obtiene todos los datos del usuario actual |
| `is_admin()` | `boolean` | Verifica si es admin |
| `is_ceo()` | `boolean` | Verifica si es CEO |
| `is_teacher()` | `boolean` | Verifica si es profesor |
| `is_parent()` | `boolean` | Verifica si es padre |
| `is_user_admin()` | `boolean` | Alias de is_admin() |
| `is_school_admin(school_id)` | `boolean` | Verifica si es admin de una escuela específica |
| `is_school_member(school_id)` | `boolean` | Verifica si pertenece a una escuela |
| `user_belongs_to_school(school_id)` | `boolean` | Verifica pertenencia a escuela |
| `user_has_role(role)` | `boolean` | Verifica si tiene un rol específico |
| `user_has_any_role(roles[])` | `boolean` | Verifica si tiene alguno de los roles |

### 🏫 Funciones de Escuela

| Función | Parámetros | Retorno | Descripción |
|---------|------------|---------|-------------|
| `create_school_and_admin` | `p_school_name`, `p_user_id`, `p_school_email?`, `p_school_phone?`, `p_school_address?`, `p_school_logo?` | `{success, school_id, school_code, message}` | Crea escuela y asigna admin |
| `generate_school_code` | `p_school_name` | `text` | Genera código único de escuela |
| `join_school_with_code` | `p_school_code`, `p_user_id` | `{success, school_id, school_name, message}` | Vincula profesor a escuela con código |

### 👨‍🏫 Funciones de Profesores

| Función | Parámetros | Retorno | Descripción |
|---------|------------|---------|-------------|
| `generate_teacher_code` | `p_school_id` | `text` | Genera código de profesor |
| `assign_courses_to_teacher` | `p_teacher_id`, `p_course_ids[]`, `p_role?`, `p_assigned_by?` | `{success, courses_assigned, message}` | Asigna múltiples cursos a profesor |
| `add_course_to_teacher` | `p_course_code`, `p_teacher_id` | `void` | Agrega curso al array del profesor |
| `remove_course_from_teacher` | `p_course_code`, `p_teacher_id` | `void` | Quita curso del array del profesor |
| `add_teacher_to_course` | `p_course_id`, `p_teacher_id`, `p_teacher_code`, `p_teacher_name` | `boolean` | Asigna profesor a curso |
| `remove_teacher_from_course` | `p_course_id`, `p_teacher_id` | `boolean` | Quita profesor de curso |
| `get_courses_by_teacher` | `p_teacher_id` | `table` | Lista cursos de un profesor |

### 👨‍🎓 Funciones de Estudiantes

| Función | Parámetros | Retorno | Descripción |
|---------|------------|---------|-------------|
| `generate_student_code` | `p_school_id` | `text` | Genera código de estudiante |
| `search_students` | `p_school_id`, `p_search_term` | `table` | Busca estudiantes por término |
| `get_student_attendance_stats` | `p_student_code`, `p_start_date`, `p_end_date` | `jsonb` | Estadísticas de asistencia |
| `get_student_attendance_summary` | `student_uuid` | `{present, late, absent}` | Resumen de asistencia |

### 📊 Funciones de Asistencia

| Función | Parámetros | Retorno | Descripción |
|---------|------------|---------|-------------|
| `get_course_attendance_summary` | `p_course_code`, `p_date` | `jsonb` | Resumen de asistencia por curso |
| `get_daily_attendance_report` | `p_school_id`, `p_date` | `jsonb` | Reporte diario de escuela |
| `update_attendance_streak` | `p_student_id` | `void` | Actualiza racha de asistencia |

### 👪 Funciones de Padres

| Función | Parámetros | Retorno | Descripción |
|---------|------------|---------|-------------|
| `get_parent_children_with_attendance` | `p_parent_id`, `p_days?` | `table` | Hijos con asistencia reciente |

### 📈 Funciones de Dashboard

| Función | Parámetros | Retorno | Descripción |
|---------|------------|---------|-------------|
| `get_admin_dashboard_stats` | `p_school_id` | `jsonb` | Estadísticas para admin |

### 🔑 Funciones de Códigos de Acceso

| Función | Parámetros | Retorno | Descripción |
|---------|------------|---------|-------------|
| `generate_access_code` | - | `text` | Genera código alfanumérico |
| `create_access_code_for_user` | `p_user_id`, `p_role`, `p_expires_days?` | `text` | Crea código para usuario |
| `validate_access_code` | `p_code` | `table` | Valida y retorna datos del código |
| `generate_course_code` | `p_school_id`, `p_grade`, `p_section` | `text` | Genera código de curso |

### 📰 Funciones de Noticias

| Función | Parámetros | Retorno | Descripción |
|---------|------------|---------|-------------|
| `increment_news_views` | `news_id` | `void` | Incrementa vistas de noticia |
| `delete_news_by_id` | `news_id` | `void` | Elimina noticia por ID |

### 🛠️ Funciones Utilitarias

| Función | Parámetros | Retorno | Descripción |
|---------|------------|---------|-------------|
| `format_time_12h` | `time_value` | `text` | Formatea hora a 12h |

---

## 🔗 Relaciones entre Tablas

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   schools   │────<│   users     │>────│  teachers   │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                    │
      │                   │                    │
      ▼                   ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│   courses   │<───>│  students   │<───>│ course_teachers │
└─────────────┘     └─────────────┘     └─────────────────┘
      │                   │                    
      │                   │                    
      ▼                   ▼                    
┌─────────────────┐ ┌───────────────────┐     
│ course_students │ │ attendance_records│     
└─────────────────┘ └───────────────────┘     
```

### Claves Foráneas Principales

| Tabla Origen | Columna | Tabla Destino |
|--------------|---------|---------------|
| `users` | `school_id` | `schools.id` |
| `teachers` | `uid` | `users.id` |
| `teachers` | `school_id` | `schools.id` |
| `students` | `school_id` | `schools.id` |
| `courses` | `school_id` | `schools.id` |
| `course_teachers` | `teacher_id` | `teachers.id` |
| `course_teachers` | `assigned_by` | `users.id` |
| `course_students` | `student_id` | `students.id` |
| `invite_codes` | `school_id` | `schools.id` |
| `invite_codes` | `admin_user_id` | `users.id` |
| `announcements` | `sent_by` | `users.id` |
| `announcements` | `school_id` | `schools.id` |
| `push_subscriptions` | `user_id` | `users.id` |
| `face_profiles` | `student_id` | `students.id` |
| `face_profiles` | `verified_by` | `users.id` |

---

## 🔒 Políticas RLS

Todas las tablas tienen **Row Level Security (RLS)** habilitado. Las políticas principales son:

### Patrón General

1. **Usuarios CEO** (`is_ceo()`) - Acceso completo a todas las tablas
2. **Usuarios Admin** - Acceso a datos de su escuela
3. **Profesores** - Acceso a sus cursos y estudiantes asignados
4. **Padres** - Acceso a datos de sus hijos
5. **Estudiantes** - Acceso solo a sus propios datos

### Funciones Helper para RLS

```sql
-- Verificar pertenencia a escuela
user_belongs_to_school(school_id) → boolean

-- Verificar rol
user_has_role('admin') → boolean

-- Verificar múltiples roles
user_has_any_role(ARRAY['admin', 'teacher']) → boolean
```

---

## 🧩 Extensiones Activas

| Extensión | Versión | Schema | Descripción |
|-----------|---------|--------|-------------|
| `plpgsql` | 1.0 | pg_catalog | Lenguaje procedural PL/pgSQL |
| `uuid-ossp` | 1.1 | extensions | Generación de UUIDs |
| `pgcrypto` | 1.3 | extensions | Funciones criptográficas |
| `pg_trgm` | 1.6 | extensions | Similitud de texto (trigrams) |
| `unaccent` | 1.1 | extensions | Remover acentos en búsquedas |
| `pg_stat_statements` | 1.11 | extensions | Estadísticas de queries |
| `pg_graphql` | 1.5.11 | graphql | Soporte GraphQL |
| `supabase_vault` | 0.3.1 | vault | Gestión de secretos |
| `wrappers` | 0.5.6 | extensions | Foreign data wrappers |

---

## 📝 Notas de Uso

### Generación de Códigos

```typescript
// Código de escuela: ESC-{INICIALES}-{RANDOM}
await supabase.rpc('generate_school_code', { p_school_name: 'Mi Escuela' })
// → "ESC-ME-ABC123"

// Código de profesor: PROF-{SCHOOL}-{SEQUENCE}
await supabase.rpc('generate_teacher_code', { p_school_id: '...' })
// → "PROF-ABC-0001"

// Código de estudiante: STU-{SCHOOL}-{SEQUENCE}
await supabase.rpc('generate_student_code', { p_school_id: '...' })
// → "STU-ABC-0001"
```

### Vinculación de Profesor a Escuela

```typescript
// El profesor usa el código de escuela para vincularse
const { data } = await supabase.rpc('join_school_with_code', {
  p_school_code: 'ESC-ABC123',
  p_user_id: userId
});
// → { success: true, school_id: '...', school_name: 'Escuela ABC', message: '...' }
```

### Asignación de Cursos

```typescript
// Admin asigna cursos a un profesor
await supabase.rpc('assign_courses_to_teacher', {
  p_teacher_id: teacherId,
  p_course_ids: ['course-1', 'course-2'],
  p_assigned_by: adminUserId
});
```

---

## 📚 Referencias

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL 17 Docs](https://www.postgresql.org/docs/17/)
- [AsistoYa - Flujo de Escuelas](./FLUJO_ESCUELA_ASISTOYA.md)

---

*Documento generado automáticamente. Para actualizaciones, sincronizar con Supabase.*
