import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Contexts & Styles
import { AccessibilityProvider } from "./contexts/AccessibilityProvider";
import { DynamicThemeProvider } from "./components/accessibility/DynamicThemeProvider";

// Layout & Pages
import { MainLayout } from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Recursos from "./pages/Recursos";
import Comunidad from "./pages/Comunidad";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <HelmetProvider>
      <AccessibilityProvider>
        <DynamicThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="registro" element={<Registro />} />
                <Route path="recursos" element={<Recursos />} />
                <Route path="comunidad" element={<Comunidad />} />
                <Route path="nosotros" element={<Nosotros />} />
                <Route path="contacto" element={<Contacto />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DynamicThemeProvider>
      </AccessibilityProvider>
    </HelmetProvider>
  );
}

export default App;
