import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../components/common/PageHeader";
import ForumIcon from "@mui/icons-material/Forum";
import EventIcon from "@mui/icons-material/Event";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`community-tabpanel-${index}`}
      aria-labelledby={`community-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Comunidad = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <>
      <Helmet>
        <title>Comunidad | Paraguay Educa</title>
      </Helmet>
      <PageHeader
        title="Comunidad Educativa"
        breadcrumbs={[{ label: "Comunidad" }]}
      />

      <Paper
        square
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Secciones de la comunidad"
        >
          <Tab
            icon={<ForumIcon />}
            label="Foros"
            id="community-tab-0"
            aria-controls="community-tabpanel-0"
            iconPosition="start"
          />
          <Tab
            icon={<EventIcon />}
            label="Eventos"
            id="community-tab-1"
            aria-controls="community-tabpanel-1"
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        <Typography variant="h2" fontSize="1.5rem" gutterBottom>
          Foros de Discusión
        </Typography>
        <List>
          <ListItem disablePadding sx={{ mb: 2, display: "block" }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" color="primary">
                ¿Cómo adaptar materiales para dislexia?
              </Typography>
              <Typography variant="caption">
                Publicado por María G. • 12 respuestas
              </Typography>
            </Paper>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" color="primary">
                Grupo de estudio: Matemáticas 3er grado
              </Typography>
              <Typography variant="caption">
                Publicado por Profe Juan • 5 participantes
              </Typography>
            </Paper>
          </ListItem>
        </List>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h2" fontSize="1.5rem" gutterBottom>
          Próximos Eventos
        </Typography>
        <Typography>No hay eventos programados para esta semana.</Typography>
      </TabPanel>
    </>
  );
};

export default Comunidad;
