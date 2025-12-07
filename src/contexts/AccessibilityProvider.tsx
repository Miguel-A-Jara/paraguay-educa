import React, { useState, type ReactNode } from "react";
import { AccessibilityContext } from "./AccessibilityContext";
import type { ColorMode, FontSizeMode } from "../styles/theme";

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado inicial
  const [colorMode, setColorMode] = useState<ColorMode>("normal");
  const [fontSize, setFontSize] = useState<FontSizeMode>("normal");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);

  const resetAccessibility = () => {
    setColorMode("normal");
    setFontSize("normal");
    setReducedMotion(false);
  };

  const value = {
    colorMode,
    setColorMode,
    fontSize,
    setFontSize,
    reducedMotion,
    toggleReducedMotion,
    resetAccessibility,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
