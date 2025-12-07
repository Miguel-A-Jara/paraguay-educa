import { createTheme, type ThemeOptions } from "@mui/material/styles";

// =============================================================================
// 1. DEFINICIÓN DE TIPOS Y CONSTANTES
// =============================================================================

export type ColorMode =
  | "normal"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "highContrast";
export type FontSizeMode = "small" | "normal" | "large" | "extraLarge";

// Factores de escala para la tipografía (Base es 14px en MUI por defecto)
const fontScales: Record<FontSizeMode, number> = {
  small: 12, // Para usuarios que prefieren densidad
  normal: 14, // Estándar
  large: 16, // +15% aprox
  extraLarge: 18, // +30% aprox - WCAG Recomienda textos grandes para baja visión
};

// =============================================================================
// 2. PALETAS DE COLORES (WCAG AA Compliance)
// =============================================================================
// Nota: Usamos colores que mantienen un ratio de contraste > 4.5:1 con blanco/negro según corresponda.

const palettes = {
  // Modo Estándar (Basado en la bandera de Paraguay pero optimizado)
  normal: {
    primary: { main: "#0038A8" }, // Azul fuerte
    secondary: { main: "#D52B1E" }, // Rojo fuerte
    background: { default: "#F4F6F8", paper: "#FFFFFF" },
    text: { primary: "#121212", secondary: "#424242" },
  },
  // Protanopia (Ceguera al rojo) - Usamos Azules y Amarillos
  protanopia: {
    primary: { main: "#4B0092" }, // Violeta oscuro (Distinguible)
    secondary: { main: "#FFC20A" }, // Amarillo Oro (Alto brillo)
    background: { default: "#F0F0F0", paper: "#FFFFFF" },
    text: { primary: "#000000", secondary: "#262626" },
  },
  // Deuteranopia (Ceguera al verde) - Similar a Protanopia, enfoque en Azul/Naranja
  deuteranopia: {
    primary: { main: "#004D40" }, // Teal oscuro
    secondary: { main: "#D81B60" }, // Rosa fuerte (Distinguible del Teal)
    background: { default: "#F0F0F0", paper: "#FFFFFF" },
    text: { primary: "#000000", secondary: "#262626" },
  },
  // Tritanopia (Ceguera al azul) - Usamos Rojos y Turquesas
  tritanopia: {
    primary: { main: "#D55E00" }, // Vermillion
    secondary: { main: "#009E73" }, // Verde azulado
    background: { default: "#F5F5F5", paper: "#FFFFFF" },
    text: { primary: "#000000", secondary: "#333333" },
  },
  // Alto Contraste (WCAG AAA target)
  highContrast: {
    primary: { main: "#FFFF00" }, // Amarillo puro
    secondary: { main: "#00FFFF" }, // Cyan
    background: { default: "#000000", paper: "#121212" }, // Fondo negro
    text: { primary: "#FFFFFF", secondary: "#FFFF00" }, // Texto blanco/amarillo
    divider: "#FFFFFF",
  },
};

// =============================================================================
// 3. GENERADOR DE TEMA
// =============================================================================

export const getAppTheme = (
  mode: ColorMode = "normal",
  fontSize: FontSizeMode = "normal"
) => {
  const isHighContrast = mode === "highContrast";

  const themeOptions: ThemeOptions = {
    // Configuración de Paleta
    palette: {
      mode: isHighContrast ? "dark" : "light",
      ...palettes[mode],
      // Aseguramos que los colores de error/warning sean accesibles
      error: { main: isHighContrast ? "#FF8080" : "#D32F2F" },
      warning: { main: isHighContrast ? "#FFD700" : "#ED6C02" },
      info: { main: isHighContrast ? "#80D8FF" : "#0288D1" },
      success: { main: isHighContrast ? "#69F0AE" : "#2E7D32" },
    },

    // Configuración de Tipografía Escalable
    typography: {
      // fontSize afecta al cálculo de rem en todo el sitio
      fontSize: fontScales[fontSize],
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: "2.5rem", fontWeight: 700 }, // Títulos claros
      h2: { fontSize: "2rem", fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 }, // Botones más legibles sin mayúsculas forzadas
    },

    // Breakpoints personalizados (Mobile-first)
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960, // Ajustado para tablets comunes
        lg: 1280,
        xl: 1920,
      },
    },

    // Overrides de Componentes para Accesibilidad
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            // Focus ring visible para navegación por teclado
            "&:focus-visible": {
              outline: "3px solid #000",
              outlineOffset: "2px",
              boxShadow: isHighContrast ? "0 0 0 4px #FFFF00" : "none",
            },
            minHeight: 48, // Área táctil mínima (WCAG 2.5.5)
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "underline", // Los enlaces deben subrayarse para no depender solo del color
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined", // Mejor contraste de bordes que 'standard'
        },
      },
    },
  };

  return createTheme(themeOptions);
};
