import { useContext } from "react";
import {
  AccessibilityContext,
  type AccessibilityContextProps,
} from "../contexts/AccessibilityContext";

export const useAccessibility = (): AccessibilityContextProps => {
  const context = useContext(AccessibilityContext);

  if (context === undefined) {
    throw new Error(
      "useAccessibility debe ser usado dentro de un AccessibilityProvider"
    );
  }

  return context;
};
