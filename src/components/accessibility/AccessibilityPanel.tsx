import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Tooltip,
  Divider,
} from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import CloseIcon from "@mui/icons-material/Close";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import { type ColorMode, type FontSizeMode } from "../../styles/theme";
import { useAccessibility } from "../../hooks/useAccessibility";

export const AccessibilityPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const {
    colorMode,
    setColorMode,
    fontSize,
    setFontSize,
    reducedMotion,
    toggleReducedMotion,
    resetAccessibility,
  } = useAccessibility();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Botón Flotante de Accesibilidad */}
      <Tooltip title="Opciones de Accesibilidad" placement="left">
        <Fab
          color="primary"
          aria-label="Abrir menú de accesibilidad"
          onClick={handleOpen}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1300, // Encima de casi todo
          }}
        >
          <AccessibilityNewIcon />
        </Fab>
      </Tooltip>

      {/* Panel de Control (Dialog) */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="accessibility-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          id="accessibility-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Herramientas de Accesibilidad
          <Button onClick={handleClose} size="small" aria-label="Cerrar panel">
            <CloseIcon />
          </Button>
        </DialogTitle>

        <Divider />

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* 1. Selector de Contraste / Daltónicos */}
            <FormControl fullWidth>
              <InputLabel id="color-mode-label">Modo de Color</InputLabel>
              <Select
                labelId="color-mode-label"
                value={colorMode}
                label="Modo de Color"
                onChange={(e) => setColorMode(e.target.value as ColorMode)}
              >
                <MenuItem value="normal">🎨 Normal (Paraguay)</MenuItem>
                <MenuItem value="highContrast">🌓 Alto Contraste</MenuItem>
                <MenuItem value="protanopia">🔴 Protanopia (Sin rojo)</MenuItem>
                <MenuItem value="deuteranopia">
                  🟢 Deuteranopia (Sin verde)
                </MenuItem>
                <MenuItem value="tritanopia">🔵 Tritanopia (Sin azul)</MenuItem>
              </Select>
            </FormControl>

            {/* 2. Tamaño de Fuente */}
            <Box>
              <Typography gutterBottom variant="body2" id="font-size-label">
                Tamaño de Texto
              </Typography>
              <ToggleButtonGroup
                value={fontSize}
                exclusive
                onChange={(_, newSize) => {
                  if (newSize) setFontSize(newSize as FontSizeMode);
                }}
                aria-labelledby="font-size-label"
                fullWidth
                size="small"
              >
                <ToggleButton value="small" aria-label="Texto pequeño">
                  A-
                </ToggleButton>
                <ToggleButton value="normal" aria-label="Texto normal">
                  A
                </ToggleButton>
                <ToggleButton value="large" aria-label="Texto grande">
                  A+
                </ToggleButton>
                <ToggleButton value="extraLarge" aria-label="Texto muy grande">
                  A++
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* 3. Reducción de Movimiento */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FormatSizeIcon fontSize="small" color="action" />
                <Typography variant="body2">Reducir Animaciones</Typography>
              </Box>
              <Switch
                checked={reducedMotion}
                onChange={toggleReducedMotion}
                inputProps={{ "aria-label": "Reducir animaciones" }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: 2, justifyContent: "space-between" }}>
          <Button onClick={resetAccessibility} color="warning" size="small">
            Restablecer
          </Button>
          <Button onClick={handleClose} variant="contained" autoFocus>
            Listo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
