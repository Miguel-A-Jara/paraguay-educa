import React, { type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AccessibilityContext } from "./AccessibilityContext";
import type { ColorMode, FontSizeMode } from "../styles/theme";

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [colorMode, setColorMode] = useLocalStorage<ColorMode>(
    "paraguay-educa-theme",
    "normal"
  );

  const [fontSize, setFontSize] = useLocalStorage<FontSizeMode>(
    "paraguay-educa-fontsize",
    "normal"
  );

  const [reducedMotion, setReducedMotion] = useLocalStorage<boolean>(
    "paraguay-educa-motion",
    false
  );

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
