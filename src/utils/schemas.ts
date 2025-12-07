import { z } from "zod";

// Lista de Departamentos del Paraguay
export const DEPARTAMENTOS = [
  "Asunción (Distrito Capital)",
  "Concepción",
  "San Pedro",
  "Cordillera",
  "Guairá",
  "Caaguazú",
  "Caazapá",
  "Itapúa",
  "Misiones",
  "Paraguarí",
  "Alto Paraná",
  "Central",
  "Ñeembucú",
  "Amambay",
  "Canindeyú",
  "Presidente Hayes",
  "Boquerón",
  "Alto Paraguay",
] as const; // 'as const' para que Zod lo acepte como literal

// Regex Helpers
// Formato CI: 1.234.567 (Con puntos opcionales o forzados, aquí forzamos puntos para el ejercicio)
const ciRegex = /^(?:\d{1,3}\.)?\d{3}\.\d{3}$/;
// Formato Tel: 09XX XXXXXX o +595 9XX XXXXXX (simplificado)
const phoneRegex = /^(\+595|0)9[6-9][1-6]\s\d{6}$/;
// Password: 1 mayúscula, 1 minúscula, 1 número, 1 especial, min 8
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const registroSchema = z
  .object({
    nombre: z
      .string()
      .min(1, "El nombre es requerido")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios"),

    cedula: z
      .string()
      .min(1, "La Cédula es requerida")
      .regex(ciRegex, "Formato inválido. Use puntos (Ej: 1.234.567)"),

    email: z
      .string()
      .min(1, "El correo es requerido")
      .email("Formato de correo electrónico inválido"),

    telefono: z
      .string()
      .min(1, "El teléfono es requerido")
      .regex(
        phoneRegex,
        "Formato: 09XX XXXXXX o +595 9XX XXXXXX (incluya espacios)"
      ),

    fechaNacimiento: z.string().refine((val) => {
      const date = new Date(val);
      const now = new Date();
      // Calcular edad
      let age = now.getFullYear() - date.getFullYear();
      const m = now.getMonth() - date.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < date.getDate())) {
        age--;
      }
      return age >= 13;
    }, "Debes ser mayor de 13 años para registrarte"),

    departamento: z.enum(DEPARTAMENTOS, {
      errorMap: () => ({ message: "Seleccione un departamento válido" }),
    }),

    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(
        passwordRegex,
        "Debe tener mayúscula, minúscula, número y símbolo (!@#$%^&*)"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // El error aparecerá en este campo
  });

// Extraemos el tipo de TypeScript automáticamente del esquema
export type RegistroFormType = z.infer<typeof registroSchema>;
