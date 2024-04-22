import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1200px)");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("token", data.token);
        // Başarılı giriş durumu
        navigate("/dashboard");
      } else {
        // Hatalı giriş durumu
        alert("Hatalı giriş!");
      }
    } catch (error) {
      // Hata durumu
      console.error("Giriş yapılırken bir hata oluştu:", error);
    }
  };

  return (
    
    <DashboardBox
    width="80%"
    height="80%"
    p="1rem"
    m="7rem"
    ml="10rem"
    overflow="hidden">
      <FlexBetween m="0rem 10rem" p="2rem"  sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }} >
    <Box
    width="100%"
    textAlign="center"
     sx={{
      
      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
    }}>
      <Box
        width="100%"

        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary" textAlign="center">
          RetroLuks
        </Typography>
      </Box>

      <Box

        p="1rem"
        m="0.5rem auto"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          RetroLuks Yönetici Paneline Hoş Geldiniz! 
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
           
            sx={{
              backgroundColor: palette.primary[800], // Arka plan rengini buradan ayarlayabiliriz
              mb:"0.5rem"
            }}
            
          />
          <TextField
            type="password"
            placeholder="Şifre"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            
            sx={{
              backgroundColor: palette.primary[800], // Arka plan rengini buradan ayarlayabiliriz
              mb: "2rem,"
            }}
          />
          <Button  variant="contained" color="primary" type="submit"  sx={{
                mt: "1rem",
                backgroundColor: palette.tertiary[500],
                color: palette.primary.main,
                "&:hover": { color: palette.primary.main },
              }}>
            Giriş
          </Button>
        </form>
      </Box>
    </Box>
  
</FlexBetween>
</DashboardBox>
);
};

export default LoginPage;
