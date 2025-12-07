import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";

// Importamos nuestro esquema y datos
import {
  registroSchema,
  type RegistroFormType,
  DEPARTAMENTOS,
} from "../utils/schemas";

const Registro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistroFormType>({
    resolver: zodResolver(registroSchema),
    mode: "onTouched", // Validación al perder foco (mejor accesibilidad que onChange)
    defaultValues: {
      nombre: "",
      cedula: "",
      email: "",
      telefono: "",
      fechaNacimiento: "",
      departamento: "", // undefined para que el select muestre el placeholder
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegistroFormType) => {
    setIsSubmitting(true);
    // Simulación de envío a API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Datos validados y enviados:", data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset(); // Limpiar formulario

    // Enfocar el mensaje de éxito para lectores de pantalla
    setTimeout(() => {
      const successAlert = document.getElementById("success-alert");
      successAlert?.focus();
    }, 100);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Helmet>
        <title>Registro | Paraguay Educa</title>
      </Helmet>

      <Box sx={{ maxWidth: 800, mx: "auto", py: 4 }}>
        <Typography variant="h1" gutterBottom align="center">
          Crear Cuenta
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Únete a la comunidad educativa más grande del país.
        </Typography>

        {submitSuccess && (
          <Alert
            id="success-alert"
            severity="success"
            sx={{ mb: 3 }}
            tabIndex={-1}
            onClose={() => setSubmitSuccess(false)}
          >
            ¡Registro exitoso! Bienvenido a Paraguay Educa.
          </Alert>
        )}

        <Paper elevation={3} sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={3}>
              {/* Sección Datos Personales */}
              <Grid size={12}>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  color="primary"
                >
                  Datos Personales
                </Typography>
              </Grid>

              {/* Nombre Completo */}
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
                      // Accesibilidad automática gracias a MUI + RHF:
                      // aria-invalid se pone en true si hay error
                      // aria-describedby apunta al helperText
                    />
                  )}
                />
              </Grid>

              {/* Cédula */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="cedula"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      label="Cédula (C.I.)"
                      placeholder="Ej: 1.234.567"
                      fullWidth
                      error={!!errors.cedula}
                      helperText={errors.cedula?.message}
                    />
                  )}
                />
              </Grid>

              {/* Fecha Nacimiento */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      required
                      label="Fecha de Nacimiento"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.fechaNacimiento}
                      helperText={errors.fechaNacimiento?.message}
                    />
                  )}
                />
              </Grid>

              {/* Departamento */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="departamento"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      required
                      label="Departamento"
                      fullWidth
                      error={!!errors.departamento}
                      helperText={errors.departamento?.message}
                    >
                      {DEPARTAMENTOS.map((dep) => (
                        <MenuItem key={dep} value={dep}>
                          {dep}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Sección Contacto */}
              <Grid size={12}>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Contacto
                </Typography>
              </Grid>

              {/* Email */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      type="email"
                      label="Correo Electrónico"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>

              {/* Teléfono */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="telefono"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      label="Teléfono Móvil"
                      placeholder="09XX XXXXXX"
                      fullWidth
                      error={!!errors.telefono}
                      helperText={errors.telefono?.message}
                    />
                  )}
                />
              </Grid>

              {/* Sección Seguridad */}
              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Seguridad
                </Typography>
              </Grid>

              {/* Password */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      type={showPassword ? "text" : "password"}
                      label="Contraseña"
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="cambiar visibilidad de contraseña"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Confirm Password */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      type={showPassword ? "text" : "password"}
                      label="Confirmar Contraseña"
                      fullWidth
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                    />
                  )}
                />
              </Grid>

              <Grid size={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  endIcon={
                    isSubmitting ? <CircularProgress size={20} /> : <SendIcon />
                  }
                >
                  {isSubmitting ? "Registrando..." : "Completar Registro"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Registro;
