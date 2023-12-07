import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetBestSellersAllQuery, useGetMostSellersCountryQuery } from '@/state/api'
import { Box, useTheme } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
;
import {  PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts'

type Props = {}

const Row3 = () => {
  const { palette } = useTheme();
  const { data: BestSellers } = useGetBestSellersAllQuery();
  const { data: mostSellersCountry } = useGetMostSellersCountryQuery();
  
  
  const transformedMostSellersCountry = useMemo(() => {
    if (mostSellersCountry) {
      return mostSellersCountry.map((item) => ({
       name:item.Country,
       value: item.salesPercentage,
      }));
    }
    
    return [];
  }, [mostSellersCountry]);

 
  
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
    

  return (
    <>
    <DashboardBox gridArea="g">
    <BoxHeader 
      title='Çok Satanlar'
      sideText={`${transformedDataBestSellers?.length} ürün`}/>
       <Box
          mt="0.5rem"
          p="0 0.5rem"
          height={220}
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
    title='Satış Yapılan Ülkeler' 
    subtitle='Grafik her ülkenin toplama olan ağırlıklarıyla hesaplanır' 
    sideText='0.24%'/>
    <ResponsiveContainer width="100%" height="80%">
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={transformedMostSellersCountry}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="name" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox gridArea="i"></DashboardBox>
    <DashboardBox gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3