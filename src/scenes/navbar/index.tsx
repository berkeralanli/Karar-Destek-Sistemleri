import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';

const Navbar = () => {
  const { palette } = useTheme(); 
  const [selected, setSelected] = useState("dashboard");
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  if (isLoginPage) {
    // Login sayfasındaysanız Navbar'ı göstermeyin
    return null;
  }

  return (
    // sol taraf 

    <FlexBetween 
    mb="0.25rem" 
    p="0.5rem 0 rem" 
    color={palette.grey[300]}
    > <FlexBetween gap="0.75rem">
        <AcUnitIcon sx={{fontSize:"28px"}}/>
        <Typography variant='h4' fontSize="16px">
          RetroLuks
        </Typography>
      </FlexBetween> 
      <FlexBetween gap="2rem">
        <Box sx={{"&:hover": {
          color: palette.primary[100]
        }}}>
          <Link
          to="/dashboard"
          onClick={() => setSelected("dashboard")}
          style={{
            color:selected === "dashboard" ? "inherit" : palette.grey[700],
            textDecoration: "inherit"
          }}>
            dashboard
          </Link>
        </Box>
        <Box sx={{"&:hover": {
          color: palette.primary[100]
        }}}>
          <Link
          to="/tahminleme"
          onClick={() => setSelected("tahminleme")}
          style={{
            color:selected === "tahminleme" ? "inherit" : palette.grey[700],
            textDecoration: "inherit"
          }}>
            tahminleme
          </Link>
        </Box>
        <Box sx={{"&:hover": {
          color: palette.primary[100]
        }}}>
          <Link
          to="/kullanici"
          onClick={() => setSelected("kullanici")}
          style={{
            color:selected === "kullanici" ? "inherit" : palette.grey[700],
            textDecoration: "inherit"
          }}>
            kullanıcı
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
