import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../components/common/PageHeader";

const Nosotros = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | Paraguay Educa</title>
      </Helmet>
      <PageHeader title="Quiénes Somos" breadcrumbs={[{ label: "Nosotros" }]} />

      <Box sx={{ maxWidth: 800 }}>
        <Typography paragraph>
          Somos una organización sin fines de lucro dedicada a reducir la brecha
          digital y educativa en Paraguay.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h6" component="h3">
                Nuestra Misión
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Garantizar que cada niño y niña en Paraguay tenga acceso a una
                educación de calidad, utilizando la tecnología como herramienta
                de inclusión social.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="h6" component="h3">
                Nuestra Visión
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Un Paraguay donde la educación sea verdaderamente universal,
                accesible y sin barreras para personas con discapacidad.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography variant="h6" component="h3">
                Equipo
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Contamos con un equipo multidisciplinario de pedagogos,
                desarrolladores y especialistas en accesibilidad.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default Nosotros;
