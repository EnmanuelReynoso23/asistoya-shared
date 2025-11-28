# @asistoya/shared

Tipos TypeScript y servicios compartidos para el ecosistema AsistoYa.

## Instalación

```bash
npm install @asistoya/shared
```

## Uso

```typescript
import { Student, Course, Attendance } from '@asistoya/shared';
import { attendanceService, studentService } from '@asistoya/shared';

// Tipos
const student: Student = {
  id: '123',
  name: 'Juan Pérez',
  // ...
};

// Servicios
const students = await studentService.getAll();
```

## Estructura

```
src/
├── types/           # Tipos TypeScript
│   ├── student.ts
│   ├── course.ts
│   ├── attendance.ts
│   ├── teacher.ts
│   └── ...
└── services/        # Servicios compartidos
    ├── studentService.ts
    ├── courseService.ts
    ├── attendanceService.ts
    └── ...
```

## Tipos disponibles

- `Student` - Datos de estudiantes
- `Course` - Datos de cursos
- `Teacher` - Datos de profesores
- `Attendance` - Registros de asistencia
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

