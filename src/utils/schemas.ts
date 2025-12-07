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
] as const;

// 1. REGEX ACTUALIZADO PARA TELÉFONO
// Explicación:
// ^(?:\+595\s?|0)  -> Empieza con +595 (con espacio opcional) O empieza con 0
// 9[6-9]\d         -> Sigue con 9, luego 6-9 (ej: 97, 98, 99), luego cualquier dígito (ej: 1) = Prefijo 971
// \s?              -> Espacio opcional
// \d{6}$           -> 6 dígitos finales
const phoneRegex = /^(?:\+595\s?|0)9[6-9]\d\s?\d{6}$/;

// 2. REGEX CI (Mantenemos el anterior que estaba bien, forzando puntos)
const ciRegex = /^(?:\d{1,3}\.)?\d{3}\.\d{3}$/;

// 3. REGEX PASSWORD
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
      .email("Formato de correo electrónico inválido")
      // VALIDACIÓN NUEVA: Debe terminar en .py
      .refine((val) => val.endsWith(".py"), {
        message: "El correo debe ser de un dominio paraguayo (.py)",
      }),

    telefono: z
      .string()
      .min(1, "El teléfono es requerido")
      .regex(phoneRegex, "Formato válido: +595 971 123456 o 0971 123456"),

    fechaNacimiento: z.string().refine((val) => {
      const date = new Date(val);
      const now = new Date();
      let age = now.getFullYear() - date.getFullYear();
      const m = now.getMonth() - date.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < date.getDate())) {
        age--;
      }
      return age >= 13;
    }, "Debes ser mayor de 13 años para registrarte"),

    departamento: z
      .enum(DEPARTAMENTOS, {
        error: () => ({ message: "Seleccione un departamento válido" }),
      })
      .or(
        z
          .literal("")
          .refine((val) => val, { error: "Seleccione un departamento" })
      ),

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
    path: ["confirmPassword"],
  });

export type RegistroFormType = z.infer<typeof registroSchema>;
