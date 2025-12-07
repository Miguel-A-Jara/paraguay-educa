import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface PageHeaderProps {
  title: string;
  breadcrumbs: { label: string; path?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
}) => {
  return (
    <Box component="header" sx={{ mb: 4 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="migas de pan"
        sx={{ mb: 2 }}
      >
        <Link component={RouterLink} to="/" color="inherit" underline="hover">
          Inicio
        </Link>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return isLast ? (
            <Typography
              key={crumb.label}
              color="text.primary"
              aria-current="page"
            >
              {crumb.label}
            </Typography>
          ) : (
            <Link
              key={crumb.label}
              component={RouterLink}
              to={crumb.path || "#"}
              color="inherit"
              underline="hover"
            >
              {crumb.label}
            </Link>
          );
        })}
      </Breadcrumbs>

      <Typography
        variant="h1"
        component="h1"
        tabIndex={-1}
        sx={{ outline: "none" }}
      >
        {title}
      </Typography>
    </Box>
  );
};
