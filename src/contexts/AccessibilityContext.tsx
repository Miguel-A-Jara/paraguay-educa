import { createContext } from "react";
import type { ColorMode, FontSizeMode } from "../styles/theme";

// Definimos la interfaz aquí para que sea importable por otros archivos si es necesario
export interface AccessibilityContextProps {
  colorMode: ColorMode;
  fontSize: FontSizeMode;
  reducedMotion: boolean;
  setColorMode: (mode: ColorMode) => void;
  setFontSize: (size: FontSizeMode) => void;
  toggleReducedMotion: () => void;
  resetAccessibility: () => void;
}

// Creamos el contexto.
// Es 'undefined' inicialmente para forzar el uso dentro del Provider.
export const AccessibilityContext = createContext<
  AccessibilityContextProps | undefined
>(undefined);
