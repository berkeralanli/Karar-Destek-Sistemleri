import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter,  Navigate,  Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "@/scenes/navbar";
import Dashboard from "./scenes/dashboard";
import Tahminleme from "./scenes/tahminleme";
import LoginForm from "./scenes/loginPage";
import RegisterPage from "./scenes/kullanici";



function App(){

  const theme = useMemo(() => createTheme(themeSettings), [])
  const isLoggedIn = !!localStorage.getItem("token");


  return <div className="app">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route
                path="/dashboard"
                element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
              />
              <Route
                path="/tahminleme"
                element={isLoggedIn ? <Tahminleme /> : <Navigate to="/" replace />}
              />
              <Route
                path="/kullanici"
                element={isLoggedIn ? <RegisterPage /> : <Navigate to="/" replace />}
              />

 

          </Routes>
        </Box>
    </ThemeProvider>
    </BrowserRouter>
  </div>
}
export default App;