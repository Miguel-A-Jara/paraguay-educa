import { Typography, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";

const Nosotros = () => {
  return (
    <>
      <Helmet>
        <title>Inicio | Paraguay Educa</title>
      </Helmet>
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h1"
          component="h1"
          tabIndex={-1}
          sx={{ outline: "none" }}
        >
          Inicio
        </Typography>
        <Typography paragraph>
          Bienvenido a la plataforma de recursos educativos.
        </Typography>
      </Box>
    </>
  );
};

export default Nosotros;
