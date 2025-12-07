import React, { useMemo } from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { getAppTheme } from "../../styles/theme";
import { useAccessibility } from "../../hooks/useAccessibility";

export const DynamicThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { colorMode, fontSize, reducedMotion } = useAccessibility();

  // Generamos el tema solo cuando cambian las preferencias
  const theme = useMemo(() => {
    return getAppTheme(colorMode, fontSize);
  }, [colorMode, fontSize]);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline resetea estilos básicos y aplica el color de fondo del tema */}
      <CssBaseline />

      {/* Si reducedMotion está activo, forzamos la eliminación de animaciones CSS globales */}
      {reducedMotion && (
        <GlobalStyles
          styles={{
            "*, *::before, *::after": {
              animationDuration: "0.01ms !important",
              animationIterationCount: "1 !important",
              transitionDuration: "0.01ms !important",
              scrollBehavior: "auto !important",
            },
          }}
        />
      )}

      {children}
    </ThemeProvider>
  );
};
