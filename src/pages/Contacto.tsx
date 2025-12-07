import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Snackbar,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { PageHeader } from "../components/common/PageHeader";

// 1. Esquema de Validación Local para Contacto
const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.email("Correo electrónico inválido"),
  asunto: z.string().min(5, "El asunto debe ser descriptivo"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormType = z.infer<typeof contactSchema>;

const Contacto = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    defaultValues: { nombre: "", email: "", asunto: "", mensaje: "" },
  });

  const onSubmit = async (data: ContactFormType) => {
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Mensaje enviado:", data);
    setOpenSnackbar(true);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Paraguay Educa</title>
        <meta
          name="description"
          content="Contáctanos para dudas, sugerencias o soporte técnico."
        />
      </Helmet>

      <PageHeader title="Contacto" breadcrumbs={[{ label: "Contacto" }]} />

      <Box sx={{ pb: 4 }}>
        <Typography paragraph sx={{ mb: 4, maxWidth: 800 }}>
          ¿Tienes alguna duda sobre la plataforma o sugerencias para mejorar la
          accesibilidad? Estamos aquí para escucharte. Completa el formulario o
          visítanos.
        </Typography>

        <Grid container spacing={4}>
          {/* COLUMNA 1: Formulario */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Formulario de contacto"
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      name="nombre"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          label="Nombre Completo"
                          fullWidth
                          error={!!errors.nombre}
                          helperText={errors.nombre?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          label="Correo Electrónico"
                          fullWidth
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Controller
                      name="asunto"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          label="Asunto"
                          fullWidth
                          error={!!errors.asunto}
                          helperText={errors.asunto?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Controller
                      name="mensaje"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          label="Mensaje"
                          fullWidth
                          multiline
                          rows={4}
                          error={!!errors.mensaje}
                          helperText={errors.mensaje?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                      endIcon={<SendIcon />}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* COLUMNA 2: Información de Contacto */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={1}
              sx={{
                p: 4,
                height: "100%",
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ borderBottom: "1px solid rgba(255,255,255,0.3)", pb: 2 }}
              >
                Información Institucional
              </Typography>

              {/* Uso de etiqueta <address> para semántica correcta */}
              <Box component="address" sx={{ fontStyle: "normal" }}>
                <List>
                  <ListItem disablePadding sx={{ mb: 3 }}>
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                      <LocationOnIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Dirección
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Avda. Mariscal López 1234
                          <br />
                          Edificio La Esperanza, Piso 4<br />
                          Asunción, Paraguay
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding sx={{ mb: 3 }}>
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                      <PhoneIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Teléfono
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          <a
                            href="tel:+59521123456"
                            style={{
                              color: "inherit",
                              textDecoration: "underline",
                            }}
                          >
                            +595 21 123 456
                          </a>
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding sx={{ mb: 3 }}>
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                      <EmailIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Correo Electrónico
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          <a
                            href="mailto:contacto@paraguayeduca.com.py"
                            style={{
                              color: "inherit",
                              textDecoration: "underline",
                            }}
                          >
                            contacto@paraguayeduca.com.py
                          </a>
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                      <AccessTimeIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          Horario de Atención
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Lunes a Viernes
                          <br />
                          08:00 AM - 17:00 PM
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Feedback flotante (Snackbar) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Contacto;
