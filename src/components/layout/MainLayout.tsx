import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useMediaQuery,
  Link,
  CssBaseline,
  ListItemButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import { AccessibilityPanel } from "../accessibility/AccessibilityPanel";

// Definición de las rutas para el menú
const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Recursos", path: "/recursos" },
  { label: "Comunidad", path: "/comunidad" },
  { label: "Nosotros", path: "/nosotros" },
  { label: "Contacto", path: "/contacto" },
];

export const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Contenido del Drawer (Menú Móvil)
  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Paraguay Educa
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Botón extra para registro en móvil */}
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/registro"
            sx={{ justifyContent: "center" }}
          >
            <Button variant="contained" fullWidth>
              Registrarse
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* 1. Skip Link (Accesibilidad Crucial) */}
      <Link
        tabIndex={1}
        href="#main-content"
        sx={{
          position: "absolute",
          left: -9999,
          top: 20,
          zIndex: 9999,
          backgroundColor: "background.paper",
          padding: 2,
          color: "primary.main",
          textDecoration: "none",
          "&:focus": {
            left: 20,
            outline: "3px solid",
          },
        }}
      >
        Saltar al contenido principal
      </Link>

      {/* 2. AppBar (Navegación Superior) */}
      <AppBar component="nav" position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="abrir menú de navegación"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            PARAGUAY EDUCA
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  aria-current={
                    location.pathname === item.path ? "page" : undefined
                  }
                  sx={{
                    textDecoration:
                      location.pathname === item.path ? "underline" : "none",
                    textUnderlineOffset: "5px",
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                component={RouterLink}
                to="/registro"
                variant="contained"
                color="secondary"
                sx={{ ml: 2 }}
              >
                Registrarse
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* 3. Drawer Móvil */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Mejor desempeño en móvil
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* 4. Contenido Principal */}
      <Box
        component="main"
        id="main-content" // ID para el Skip Link
        sx={{ flexGrow: 1, py: 3 }}
      >
        <Container maxWidth="lg">
          {/* Aquí se renderizarán las páginas */}
          <Outlet />
        </Container>
      </Box>

      {/* 5. Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "background.paper",
          py: 6,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" align="center" gutterBottom>
            Paraguay Educa - Plataforma de Recursos Educativos
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            {new Date().getFullYear()}
            {". Accesibilidad primero."}
          </Typography>
        </Container>
      </Box>

      {/* Panel de Accesibilidad Flotante (Global) */}
      <AccessibilityPanel />
    </Box>
  );
};
