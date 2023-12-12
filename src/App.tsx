import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "@/scenes/navbar";
import Dashboard from "./scenes/dashboard";
import Tahminleme from "./scenes/tahminleme";
import kullanici from "./scenes/kullanici";



function App(){

  const theme = useMemo(() => createTheme(themeSettings), [])


  return <div className="app">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/tahminleme"  element={ <Tahminleme/> } />
          <Route path="/login//"  element={ <Tahminleme/> } />
 

          </Routes>
        </Box>
    </ThemeProvider>
    </BrowserRouter>
  </div>
}
export default App;