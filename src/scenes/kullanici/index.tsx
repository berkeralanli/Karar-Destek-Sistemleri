import { useMemo, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import BoxHeader from "@/components/BoxHeader";
import { DataGrid } from "@mui/x-data-grid";
import { useGetUserQuery } from "@/state/api";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};


const RegisterPage = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: usersData, refetch} = useGetUserQuery();


  const transofrmedUserData = useMemo(() => {
    if (usersData) {
      return usersData.map((item) => ({
        id: item._id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
      }));
    }
    return [];
  }, [usersData]);

  const gridTemplateLargeScreens = `
  "form content"
  "form content"
  "form content"
  "form content"
  "form content"
  "form content"
  "form content"
  "form content"
  "form content"
  "form content"
`;

const gridTemplateSmallScreens = `
  "form"
  "form"
  "form"
  "form"
  "content"
  "content"
  "content"
  "content"
  "content"
  "content"
  "content"
  "content"
`;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageType, setPageType] = useState<string>("register");

  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleDeleteUser = async (values: { userEmail: unknown; }) => {
    try {
      // Burada inputtan alınan e-posta adresini state üzerinden alabilirsin
      const userEmail = values.userEmail;
  
      const deletedUserResponse = await fetch(
        "http://localhost:1337/deleteUser",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail }),
        }
      );
  
      const deletedUser = await deletedUserResponse.json();
  
      if (deletedUser.message === "Kullanıcı başarıyla silindi") {

        alert("Kullanıcı başarıyla silindi");

        await refetch();
      } else {
        alert("Kullanıcı silinirken bir hata oluştu");
      }
    } catch (error) {
      alert("Kullanıcı silinirken bir hata oluştu:");
    }
  };
  const register = async (values: { firstName: unknown; lastName: unknown; email: unknown; password: unknown; }, onSubmitProps: { resetForm: () => void; }) => {
    try {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,

      };
      
      const savedUserResponse = await fetch(
        "http://localhost:1337/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
  
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();
      await refetch();
  
      if (savedUser) {
        alert('Yeni Kayıt Başarıyla Gerçekleşti');
      }
    } catch (error) {
      alert("Kayıt sırasında hata:");

    }
  };
  
   
  const usersColumns= [
    {
    
      field: "firstName",
      headerName: "Ad",
      flex: 1,
    },
    {
      field:"lastName",
      headerName: "Soyad",
      flex: 1,
  },
    
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    
  ]; 


  return (
    <Box
    width="100%"
    height="80%"
    display="grid"
    gap="1.5rem"
    sx={
      isAboveMediumScreens
        ? {
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateAreas: gridTemplateLargeScreens,
          }
        : {
            gridTemplateAreas: gridTemplateSmallScreens,
          }
    }
  >
    <DashboardBox gridArea="form"
    width="100%"
    height="100%"
    p="2.5rem 0rem 0rem 0rem"
    mt="3rem"
    ml="0rem"
    overflow="hidden">
       <Typography fontWeight="bold" fontSize="32px" color={palette.grey[400]} textAlign="center" mb="0.3rem">
          Yönetici Ekleme Paneli
        </Typography>
        <Typography fontWeight="italic" fontSize="11px" color={palette.grey[700]} textAlign="center" >
        Bu alanda yönetici eklemek için bir form gönderebilir, yeni bir kullanıcı girişi sağlayabilirsiniz
        </Typography>
        
      <FlexBetween m="2rem 3rem -1rem 3rem" pt="1rem"  sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }} >
    <Box
    width="100%"
    textAlign="center"
     sx={{
      
      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
    }}> 
    <Formik
      onSubmit={register}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(1,minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <div>
              <TextField
                type="text"
                placeholder="Ad"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                fullWidth
                sx={{
                  backgroundColor: palette.primary[800],
                  mb: "2rem,",
                  borderRadius:"5px",
                }}
              />
            </div>
            <div>
              <TextField
                type="text"
                placeholder="Soyad"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                fullWidth
                sx={{
                  backgroundColor: palette.primary[800],
                  mb: "2rem,",
                  borderRadius:"5px",
                }}
              />
            </div>
            <div>
              <TextField
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                fullWidth
                sx={{
                  backgroundColor: palette.primary[800],
                  mb: "2rem,",
                  borderRadius:"5px",
                }}
              />
            </div>
            <div>
              <TextField
                type="password"
                placeholder="Şifre"
                name="password"
                value={values.password}
                onChange={handleChange}
                fullWidth
                sx={{
                  backgroundColor: palette.primary[800],
                  mb: "2rem,",
                  borderRadius:"5px",
                  
                }}
              />
            </div>
          </Box>

          <Box>
            <Button
              
              type="submit"
              sx={{
                width:"50%",
                borderRadius:"50px",
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.secondary[700],
                color: palette.primary[600],
                "&:hover": { color: palette.tertiary[500]},
              }}
            >
              {"KAYIT"}
            </Button>
            <Typography
              onClick={() => {
                setPageType("register");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary[200],
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary[200],
                },
              }}
            >

            </Typography>
          </Box>
        </form>
      )}
    </Formik>
   </Box>
   </FlexBetween>
   </DashboardBox>

 
    <DashboardBox gridArea="content
    "width="100%"
    height="90%"
    p="1rem"
    mt="5rem"
    overflow="hidden">
    <BoxHeader 
      title='Kayıtlı Kullanıcılar'
      sideText={`${transofrmedUserData?.length} Kullanıcı`}/>
       <Box
          mt="1.5rem"
          height="70%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              fontSize:'10px',
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              fontSize:'11px',
              borderBottom: `1px solid ${palette.grey[600]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
      <DataGrid
      columnHeaderHeight={25}
      rowHeight={35}
      hideFooter={true}
      rows={transofrmedUserData || []}
      columns={usersColumns}/>
 </Box>
 <Formik
  onSubmit={handleDeleteUser}
  initialValues={{ userEmail: '' }}
  validationSchema={yup.object().shape({
    userEmail: yup.string().email('Geçerli bir e-posta girin').required('E-posta zorunlu'),
  })}
>
  {({ values, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"


      >
        <TextField
          type="email"
          placeholder="Silinecek Kullanıcı E-postası"
          name="userEmail"
          value={values.userEmail}
          onChange={handleChange}
          
          
          sx={{
            backgroundColor: palette.primary[800],
            m: "2rem",
            borderRadius:"5px",
            width:"60%",

          }}
        />
        <Button
          type="submit"
          sx={{
            width: '20%',
            borderRadius: '50px',
            m: '2rem 0',
            p: '1rem',
            backgroundColor: palette.tertiary[500],
            color: palette.primary[500],
            '&:hover': { color: palette.tertiary[500] },
          }}
        >
          {'SİL'}
        </Button>
        <Typography
          onClick={() => handleDeleteUser(values)}
          sx={{
            textDecoration: 'underline',
            color: palette.primary[200],
            '&:hover': {
              cursor: 'pointer',
              color: palette.primary[200],
            },
          }}
        ></Typography>
      </Box>
    </form>
  )}
</Formik>

    </DashboardBox> 
</Box>
  );
};

export default RegisterPage;
