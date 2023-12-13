import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetBestSellersAllQuery, useGetMostBuyingCustomersQuery, useGetMostSellersCountryQuery, useGetTotalRevenueQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import React, { useMemo, useState } from 'react';
import RevenueTargetInput from '@/components/TargetInput'; 
import {  Cell, Pie, PieChart } from 'recharts'

type Props = {}

const Row3 = () => {
  
  const { palette } = useTheme();
  
  const { data: BestSellers } = useGetBestSellersAllQuery();
  const { data: mostBuyingCustomers } = useGetMostBuyingCustomersQuery();
  const { data: mostSellersCountry } = useGetMostSellersCountryQuery();
  const { data: totalRevenue } = useGetTotalRevenueQuery();
  
  const pieColors = [palette.primary[300], palette.primary[700], palette.primary[800]];
  
  
  const transformedMostSellersCountry = useMemo(() => {
    if (mostSellersCountry && mostSellersCountry.length >= 3) {
      const firstItem = mostSellersCountry[0];
      const secondItem = mostSellersCountry[1];
      const thirdItem = mostSellersCountry[2];
      
      return [
        {
          name: firstItem.Country,
          value: firstItem.salesPercentage,
        },
        {
          name: secondItem.Country,
          value: secondItem.salesPercentage,
        },
        {
          name: thirdItem.Country,
          value: thirdItem.salesPercentage,
        },
      ];
    }
  
    return [];
  }, [mostSellersCountry]);
  const countriesData = transformedMostSellersCountry.slice(0, 3);


// setTarget
  const [target, setTarget] = useState(50000000);
  const handleTargetSubmit = (value) => {
    setTarget(value); // Yeni hedef ciroyu ayarla
  };
  const roundedTotalRevenue = Math.round(totalRevenue);
  const formattedTotalRevenue = new Intl.NumberFormat('tr-TR').format(roundedTotalRevenue);

  const percentageOfRevenue = Math.round((totalRevenue / target) * 100);
  const remaining = Math.round(target - totalRevenue)
  const formattedRemaining = new Intl.NumberFormat('tr-TR').format(remaining);
    const widthPercentage = `${percentageOfRevenue}%`;
    const managementSupportText = `
     Şirketin hedefi ₺${target.toLocaleString("tr-TR")}. Şu ana kadar ulaşılan ciro ₺${formattedTotalRevenue}. Şirketin hedef ciroya ulaşması için geriye sadece ₺${formattedRemaining} kaldı. Hedefler, şirketin büyümesine yol açar ve odaklanmayı sağlar.
    Yönetim olarak hedeflere ulaşmak için çalışmaya devam ediyoruz.
  `;



  const transformedDataMostBuyers = useMemo(() => {
    if (mostBuyingCustomers) {
      return mostBuyingCustomers.map((item) => ({
        id: item._id,
        Adet: item.totalQuantity.toLocaleString("tr-TR"),
        Ciro: new Intl.NumberFormat('tr-TR').format(item.totalRevenue),
        Urun: item.mostBoughtProduct,
      }));
    }
    return [];
  }, [mostBuyingCustomers]);


 
  
    const transformedDataBestSellers = useMemo(() => {
      if (BestSellers) {
        return BestSellers.map((item) => ({
          id: item._id,
          isim: item.ProductDescription,
          Fiyat: item.ProductPrice,
          Adet: item.totalQuantity.toLocaleString("tr-TR"),
          Ciro: new Intl.NumberFormat('tr-TR').format(item.totalRevenue),
        }));
      }
      return [];
    }, [BestSellers]);
    

    const productColumns = [
      {
      
        field: "isim",
        headerName: "Ürün",
        flex: 1.5,
      },
      {
        field:"Adet",
        headerName: "Adet",
        flex: 0.5,
    },
      
      {
        field: "Fiyat",
        headerName: "Fiyat",
        flex: 0.5,
        renderCell: (params: GridCellParams) => `₺${params.value}`,
        
      },
      
     
    {
      field:"Ciro",
      headerName: "Ciro",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `₺${params.value}`,
  },
    ]; 
    const buyersColumn = [
      {
      
        field: "id",
        headerName: "Müşteri id ",
        flex: 0.5,
      },
      {
        field:"Adet",
        headerName: "Toplam Adet",
        flex: 0.5,
    },
      
      {
        field: "Ciro",
        headerName: "Toplam Ciro",
        flex: 0.5,
        renderCell: (params: GridCellParams) => `₺${params.value}`,
        
      },
      
     
    {
      field:"Urun",
      headerName: "Müşterinin Favori Ürünü / Stok Kodu",
      flex: 0.5,
  },
    ];  

  return (
    <>
    <DashboardBox gridArea="g">
    <BoxHeader 
      title='Çok Satanlar'
      sideText={`${transformedDataBestSellers?.length} ürün`}/>
       <Box
          mt="1rem"
          p="0 0.5rem"
          height={230}
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
              fontSize:'10px',
              borderBottom: `1px solid ${palette.grey[800]} !important`,
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
      rows={transformedDataBestSellers || []}
      columns={productColumns}/>
      </Box>
    </DashboardBox>
    <DashboardBox gridArea="h">
    <BoxHeader 
      title='Zirvedeki Müşteriler'
      subtitle=' Detaylı Müşteri Analizi ve Favori ürünü '
      sideText={`${transformedDataMostBuyers?.length} Müşteri`}/>
       <Box
          mt="1.5rem"
          p="0 0.5rem"
          height={240}
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
              fontSize:'10px',
              borderBottom: `1px solid ${palette.grey[800]} !important`,
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
      rows={transformedDataMostBuyers || []}
      columns={buyersColumn}/>
      </Box>
    </DashboardBox>

    <DashboardBox gridArea="i">
    <BoxHeader 
      title="Ciro Hedefi Belirleme"
      subtitle='Aktif Olarak Hedef Cironun Belirlenmesi ve Günümüz Cirosu ile Karşılaştırılması '
      sideText={`İlerleme ${widthPercentage} `}/>
      <Box
      
      height="15px"
      margin="1.25rem 1rem 0.4rem 1rem"
      bgcolor={palette.primary[800]}
      borderRadius="1rem"
      >
        <Box
      height="15px"
      bgcolor={palette.primary[600]}
      borderRadius="1rem"
      width={widthPercentage}
      >
      </Box>
      </Box>
      <Typography margin="0 1rem" variant="h6">
      {managementSupportText}
      </Typography>
      <RevenueTargetInput onSubmit={handleTargetSubmit} />
    </DashboardBox>

    <DashboardBox gridArea="j">
    <BoxHeader 
      title="Ülkelerin Satış Ağırlıkları" 
      subtitle='En Yoğun Sipariş Alan 3 Ülke' 
      sideText='0.24%'
    />
    <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
      {countriesData.map((country, index) => (
        <div key={index}>
          <PieChart width={110} height={100}>
            <Pie
              stroke="none"
              data={[country]}
              innerRadius={18}
              outerRadius={35}
              paddingAngle={0} 
              dataKey="value"
            >
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
            </Pie>
             
          </PieChart>
          <Typography variant="h5">{country.name}  {country.value}%</Typography>
        </div>
      ))}
    </FlexBetween>
  </DashboardBox>
 
    </>
  )
}


export default Row3