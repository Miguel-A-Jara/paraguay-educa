import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../components/common/PageHeader";

const Recursos = () => {
  // Datos simulados
  const resources = [
    { id: 1, title: "Matemáticas Básicas", type: "PDF", level: "Primaria" },
    {
      id: 2,
      title: "Historia del Paraguay",
      type: "Video",
      level: "Secundaria",
    },
    {
      id: 3,
      title: "Guaraní Comunicativo",
      type: "Audio",
      level: "Todo público",
    },
    {
      id: 4,
      title: "Ciencias Naturales",
      type: "Interactivo",
      level: "Primaria",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Recursos | Paraguay Educa</title>
      </Helmet>

      <PageHeader
        title="Biblioteca de Recursos"
        breadcrumbs={[{ label: "Recursos" }]}
      />

      <Box component="section">
        <Typography paragraph>
          Explora nuestra colección de materiales educativos adaptados. Utiliza
          los filtros para encontrar lo que necesitas.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {resources.map((res) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={res.id}>
              <Card>
                {/* Placeholder image con alt text descriptivo */}
                <Box
                  sx={{
                    height: 140,
                    bgcolor: "grey.300",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    [Imagen de portada: {res.title}]
                  </Typography>
                </Box>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={res.type}
                      size="small"
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                    <Chip label={res.level} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {res.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Descripción breve del recurso educativo accesible.
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    aria-label={`Descargar ${res.title}`}
                  >
                    Acceder al material
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Recursos;
