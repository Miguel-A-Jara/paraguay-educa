import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Container,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Inicio | Paraguay Educa</title>
        <meta
          name="description"
          content="Plataforma de recursos educativos inclusiva para todos los estudiantes de Paraguay."
        />
      </Helmet>

      {/* 1. HERO SECTION */}
      <Box
        component="section"
        aria-labelledby="hero-title"
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: 8,
          borderRadius: 2,
          mb: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            id="hero-title"
            gutterBottom
            sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
          >
            Educación sin Barreras
          </Typography>
          <Typography
            variant="h5"
            component="p"
            paragraph
            sx={{ mb: 4, opacity: 0.9 }}
          >
            La primera plataforma de recursos educativos de Paraguay diseñada
            para todos. Accesible, gratuita y colaborativa.
          </Typography>
          <Button
            component={RouterLink}
            to="/registro"
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ fontWeight: "bold", px: 4, py: 1.5 }}
          >
            Comenzar Ahora
          </Button>
        </Container>
      </Box>

      {/* 2. SECCIONES PRINCIPALES (CARDS) */}
      <Box component="section" aria-labelledby="sections-title" sx={{ mb: 8 }}>
        <Typography
          variant="h2"
          id="sections-title"
          align="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Explora la Plataforma
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "Recursos Educativos",
              desc: "Materiales adaptados para todos los niveles.",
              icon: <SchoolIcon fontSize="large" />,
              link: "/recursos",
              color: "#1976d2",
            },
            {
              title: "Comunidad",
              desc: "Foros de discusión y grupos de estudio.",
              icon: <GroupIcon fontSize="large" />,
              link: "/comunidad",
              color: "#2e7d32",
            },
            {
              title: "Sobre Nosotros",
              desc: "Nuestra misión por la inclusión.",
              icon: <InfoIcon fontSize="large" />,
              link: "/nosotros",
              color: "#ed6c02",
            },
            {
              title: "Contacto",
              desc: "Estamos aquí para ayudarte.",
              icon: <ContactMailIcon fontSize="large" />,
              link: "/contacto",
              color: "#9c27b0",
            },
          ].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Box sx={{ color: item.color, mb: 2 }}>{item.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    component={RouterLink}
                    to={item.link}
                    size="small"
                    aria-label={`Ir a ${item.title}`}
                  >
                    Ver más
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 3. CARACTERÍSTICAS (FEATURES) */}
      <Box
        component="section"
        aria-labelledby="features-title"
        sx={{ bgcolor: "background.paper", py: 6, borderRadius: 2 }}
      >
        <Container>
          <Typography
            variant="h2"
            id="features-title"
            gutterBottom
            align="center"
          >
            ¿Por qué Paraguay Educa?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <AccessibilityNewIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    100% Accesible
                  </Typography>
                  <Typography>
                    Cumplimos con las normas WCAG AA. Soporte para lectores de
                    pantalla, navegación por teclado y modos de alto contraste.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Curriculum Nacional
                  </Typography>
                  <Typography>
                    Contenidos alineados con el programa del Ministerio de
                    Educación y Ciencias (MEC).
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
