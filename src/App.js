import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import LogIn from "./scenes/login/Login";
import RegisterForm from "./scenes/login/Logup";
import FinancialPlanForm from "./scenes/formFinanceStrategy/form";
import Formulario from "./components/Chat";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation(); // Hook para obtener la ruta actual

  // Definir rutas que no deben mostrar ni el sidebar ni el topbar
  const noSidebarOrTopbarRoutes = ["/", "/register"];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Mostrar Sidebar solo si no está en las rutas de login o registro */}
          {!noSidebarOrTopbarRoutes.includes(location.pathname) && (
            <Sidebar isSidebar={isSidebar} />
          )}
          <main className="content">
            {/* Mostrar Topbar solo si no está en las rutas de login o registro */}
            {!noSidebarOrTopbarRoutes.includes(location.pathname) && (
              <Topbar setIsSidebar={setIsSidebar} />
            )}
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/finance-form" element={<FinancialPlanForm/>}/>
              <Route path="/ia" element={<Formulario/>}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
