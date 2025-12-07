import { DynamicThemeProvider } from "./components/accessibility/DynamicThemeProvider";
import { AccessibilityPanel } from "./components/accessibility/AccessibilityPanel";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { AccessibilityProvider } from "./contexts/AccessibilityProvider";

function App() {
  return (
    <AccessibilityProvider>
      <DynamicThemeProvider>
        {/* Aquí iría el Router en el futuro, por ahora un Layout básico */}

        <Box sx={{ minHeight: "100vh", py: 4 }}>
          <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h1" gutterBottom>
                Paraguay Educa
              </Typography>
              <Typography variant="h2" color="primary" gutterBottom>
                Bienvenido a la plataforma inclusiva
              </Typography>
              <Typography paragraph>
                Esta es una demostración del sistema de accesibilidad. Utiliza
                el botón flotante en la esquina inferior derecha para probar:
              </Typography>
              <ul>
                <li>
                  <Typography>
                    Modos de daltónicos (Protanopia, etc.)
                  </Typography>
                </li>
                <li>
                  <Typography>Alto contraste para baja visión.</Typography>
                </li>
                <li>
                  <Typography>Escalado de fuentes dinámico.</Typography>
                </li>
              </ul>

              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button variant="contained" color="primary">
                  Botón Principal
                </Button>
                <Button variant="outlined" color="secondary">
                  Botón Secundario
                </Button>
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h2" gutterBottom>
                Prueba de Legibilidad
              </Typography>
              <Typography>
                El contraste de este texto cambiará según el modo seleccionado
                para garantizar que cumpla con las normas WCAG AA o AAA.
              </Typography>
            </Paper>
          </Container>

          {/* Panel siempre visible/disponible */}
          <AccessibilityPanel />
        </Box>
      </DynamicThemeProvider>
    </AccessibilityProvider>
  );
}

export default App;
