# @asistoya/shared

Tipos TypeScript, validadores Zod y servicios compartidos para el ecosistema AsistoYa.

## Instalación

```bash
npm install @asistoya/shared
```

## Uso

### Tipos

```typescript
import { 
  Student, 
  Course, 
  AttendanceRecord,
  Teacher,
  School,
  User,
  Notification
} from '@asistoya/shared';

const student: Student = {
  id: '123',
  code: 'STU001',
  name: 'Juan Pérez',
  grade: '5to',
  schoolId: 'school-uuid',
  // ...
};
```

### Constantes

```typescript
import { 
  ROLES, 
  ATTENDANCE_STATUS, 
  ERROR_CODES,
  PAGINATION 
} from '@asistoya/shared';

if (user.role === ROLES.TEACHER) {
  // ...
}

if (record.status === ATTENDANCE_STATUS.PRESENT) {
  // ...
}
```

### Validadores (Zod)

```typescript
import { 
  createStudentSchema,
  markAttendanceSchema,
  loginSchema,
  z 
} from '@asistoya/shared';

// Validar datos
const result = createStudentSchema.safeParse(data);
if (!result.success) {
  console.error(result.error.issues);
}

// Inferir tipos
type CreateStudentData = z.infer<typeof createStudentSchema>;
```

### Tipos de Request/Response

```typescript
import {
  // Requests
  CreateStudentRequest,
  MarkAttendanceRequest,
  LoginRequest,
  
  // Responses
  StudentResponse,
  LoginResponse,
  PaginatedApiResponse
} from '@asistoya/shared';
```

### Servicios

```typescript
import { 
  studentService, 
  attendanceService,
  authService 
} from '@asistoya/shared';

// Obtener estudiantes
const students = await studentService.getBySchool('school-id');

// Marcar asistencia
await attendanceService.mark({
  studentCode: 'STU001',
  status: 'present',
  date: '2024-01-15'
});
```

### Errores

```typescript
import { 
  AppError, 
  NotFoundError, 
  ValidationError,
  UnauthorizedError 
} from '@asistoya/shared';

throw new NotFoundError('Student', 'Student not found');
throw new ValidationError('email', 'Invalid email format');
```

## Estructura

```
src/
├── types/              # Tipos TypeScript
│   ├── student.ts      # Tipos de estudiante
│   ├── course.ts       # Tipos de curso
│   ├── attendance.ts   # Tipos de asistencia
│   ├── teacher.ts      # Tipos de profesor
│   ├── school.ts       # Tipos de escuela
│   ├── user.ts         # Tipos de usuario
│   ├── notification.ts # Tipos de notificación
│   ├── dashboard.ts    # Tipos de dashboard
│   ├── requests.ts     # DTOs de request
│   ├── responses.ts    # DTOs de response
│   ├── realtime.ts     # Tipos de tiempo real
│   ├── constants.ts    # Constantes
│   ├── common.ts       # Tipos comunes
│   └── supabase.ts     # Tipos de Supabase
├── validators/         # Validadores Zod
│   ├── student.validator.ts
│   ├── teacher.validator.ts
│   ├── course.validator.ts
│   ├── attendance.validator.ts
│   ├── school.validator.ts
│   ├── auth.validator.ts
│   ├── notification.validator.ts
│   ├── report.validator.ts
│   └── common.validator.ts
└── services/           # Servicios compartidos
    ├── studentService.ts
    ├── courseService.ts
    ├── attendanceService.ts
    ├── authService.ts
    ├── notificationService.ts
    └── errors.ts
```

## Tipos Disponibles

### Entidades
- `Student` - Datos de estudiantes
- `Course` - Datos de cursos
- `Teacher` - Datos de profesores
- `School` - Datos de escuelas
- `User` - Datos de usuarios
- `AttendanceRecord` - Registros de asistencia
- `Notification` - Notificaciones

### Status y Enums
- `StudentStatus` - active, inactive, transferred, etc.
- `TeacherStatus` - active, inactive, on_leave
- `CourseStatus` - active, inactive, archived
- `AttendanceStatus` - present, late, absent, excused
- `UserRole` - admin, teacher, parent, student, ceo

### Constantes
- `ROLES` - Roles de usuario
- `ATTENDANCE_STATUS` - Estados de asistencia
- `ATTENDANCE_METHODS` - Métodos de marcado
- `ERROR_CODES` - Códigos de error
- `PAGINATION` - Configuración de paginación
- `School` - Datos de escuelas
- `User` - Datos de usuarios
- `Notification` - Notificaciones

## Desarrollo

```bash
# Instalar dependencias
npm install

# Build
npm run build

# Type check
npm run typecheck
```

## Publicar nueva versión

1. Actualizar versión en `package.json`
2. Crear release en GitHub
3. El workflow publicará automáticamente a npm

## Repositorios relacionados

- [asistoya-web](https://github.com/EnmanuelReynoso23/asistoya-web) - App Web
- [asistoya-mobile](https://github.com/EnmanuelReynoso23/asistoya-mobile) - App Móvil
- [asistoya-api](https://github.com/EnmanuelReynoso23/asistoya-api) - API Backend

