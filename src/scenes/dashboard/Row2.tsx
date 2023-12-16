import DashboardBox from '@/components/DashboardBox';
import Boxheader from '@/components/BoxHeader';
import  { useGetMostSellers2022Query, useGetMostSellers2023Query, useGetyirmiIkiTotalRevenueQuery, useGetyirmiUcTotalRevenueQuery, useGetyirmiIkiTotalQuantityQuery, useGetyirmiUcTotalQuantityQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import FlexBetween from '@/components/FlexBetween';
import BoxHeader from '@/components/BoxHeader';

const pieData = [
  {name: "2023", value: 620},
  {name: "2022", value: 480},
 
]
type Props = {}

const Row1 = () => {

  const { palette } = useTheme();
  const pieColors = [palette.primary[600], palette.primary[800]];

  const { data: data2022 } = useGetMostSellers2022Query();
  const { data: data2023 } = useGetMostSellers2023Query();
  const { data: totalRevenue2022 } = useGetyirmiIkiTotalRevenueQuery();
  const { data: totalRevenue2023 } = useGetyirmiUcTotalRevenueQuery();
  const { data: totalQuantity2022 } = useGetyirmiIkiTotalQuantityQuery();
  const { data: totalQuantity2023 } = useGetyirmiUcTotalQuantityQuery();


  const totalRevenue2022Rounded = Math.round(totalRevenue2022);
  const totalRevenue2023Rounded = Math.round(totalRevenue2023);
  const increase = Math.round(((totalRevenue2023 - totalRevenue2022) / totalRevenue2022) * 100);
  const increaseTotalQuantity = Math.round(((totalQuantity2023 - totalQuantity2022) / totalQuantity2022) * 100);
  console.log("🚀 ~ file: Row2.tsx:34 ~ Row1 ~ increaseTotalQuantity:", increaseTotalQuantity)
  const firstItemOfData2022 = data2022 && data2022.length > 0 ? data2022[0] : null;
  const firstItemOfData2023 = data2023 && data2023.length > 0 ? data2023[0] : null;
  
  const getTransformedFirstItems = () => {
    let transformedFirstItem2022 = null;
    let transformedFirstItem2023 = null;
  
    if (firstItemOfData2022) {
      transformedFirstItem2022 = {
        id: firstItemOfData2022._id,
        name: firstItemOfData2022.ProductDescription,
        Gelir: firstItemOfData2022.totalRevenue,
        Adet: firstItemOfData2022.totalQuantity,
      };

    }
  
    if (firstItemOfData2023) {
      transformedFirstItem2023 = {
        id: firstItemOfData2023._id,
        name: firstItemOfData2023.ProductDescription,
        Gelir: firstItemOfData2023.totalRevenue,
        Adet: firstItemOfData2023.totalQuantity,
      };

    }
  
    return { transformedFirstItem2022, transformedFirstItem2023 };
  };
  
  const { transformedFirstItem2022, transformedFirstItem2023 } = getTransformedFirstItems();
  
  const gelir2022 = transformedFirstItem2022?.Gelir;
  const gelir2023 = transformedFirstItem2023?.Gelir;
  const adet2022 = transformedFirstItem2022?.Adet;
  const adet2023 = transformedFirstItem2023?.Adet;
  



  // 2023 en cok satan urun ile 2023 en cok satan urun arasindaki gelir % farki
  const increaseProducts = Math.round(((gelir2023 - gelir2022) / gelir2022) * 100);
  const increaseQuantity = Math.round(((adet2023 - adet2022) / adet2022) * 100);

  
  const transformedData2022 = useMemo(() => {
    if (data2022) {
      return data2022.map((item) => ({
        id: item._id, // Örnek olarak _id kullanıldı, gerçek verilere göre düzenlenmeli
        name: item.ProductDescription.length > 10 ? item.ProductDescription.slice(0, 10) + '...' : item.ProductDescription,
        Gelir: item.totalRevenue,
        Adet: item.totalQuantity,
      }));
    }
    return [];
  }, [data2022]);

  const transformedData2023 = useMemo(() => {
    if (data2023) {
      return data2023.map((item) => ({
        id: item._id, // Örnek olarak _id kullanıldı, gerçek verilere göre düzenlenmeli
        name: item.ProductDescription.length > 1 ? item.ProductDescription.slice(0, 10) + '...' : item.ProductDescription,
        Gelir: item.totalRevenue,
        Adet: item.totalQuantity,
      }));
    }
    return [];
  }, [data2023]);

  return (
    <>
    <DashboardBox gridArea="d" >
    <BoxHeader
    title='2022 Yılı' 
    subtitle='En Çok Satış Yapılan 5 ürün'
/>
    <ResponsiveContainer width="100%" height="80%">
      
        <AreaChart
          width={500}
          height={400}
          data={transformedData2022}
          margin={{
            top: 15,
            right: 16,
            left: -5,
            bottom: -10,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
          dataKey="name"
          tickLine={false}
          style={{ fontSize:"8px"}} />
          <YAxis 
          tickLine={false}
          axisLine={{strokeWidth:"0"}}
          style={{ fontSize:"10px"}}
          domain={[10000,150000]}/>
          
          
          <Tooltip 
            formatter={(value) => ` ${value.toLocaleString("tr-TR")} `}
            labelFormatter={(label) => `${label}`}
          />
          <Area 
          type="monotone" 
          dataKey="Adet"
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1} 
          fill="url(#colorRevenue)"/>
          <Area 
          type="monotone" 
          dataKey="Gelir"
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1} 
          fill="url(#colorQuantity)"/>
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
    
    
    <DashboardBox gridArea="e">
    <BoxHeader
    title='2023 Yılı' 
    subtitle='En Çok Satış Yapılan 5 ürün' 
    sideText={`${increaseProducts}%`}/>
    <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          width={500}
          height={400}
          data={transformedData2023}
          margin={{
            top: 15,
            right: 10,
            left: -10,
            bottom: -10,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
          dataKey="name"
          tickLine={false}
          style={{ fontSize:"8px"}} />
         <YAxis 
          tickLine={false}
          axisLine={{strokeWidth:"0"}}
          style={{ fontSize:"10px"}}
          domain={[10000,350000]}/>
          
          <Tooltip 
            formatter={(value) => ` ${value.toLocaleString("tr-TR")} `}
            labelFormatter={(label) => `${label}`}
          />
          <Area 
          type="monotone" 
          dataKey="Adet"
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1} 
          fill="url(#colorRevenue)"/>
          <Area 
          type="monotone" 
          dataKey="Gelir"
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1} 
          fill="url(#colorQuantity)"/>
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>

    <DashboardBox gridArea="f">
    <Box mt="0.75rem" flexBasis={"40%"} textAlign={"center"}>
        <Typography variant="h4">2022 ve 2023 Yılı Karşılaştırması</Typography>
        <Typography mt="0.5rem" variant="h6">Ciro ve Miktar</Typography>
 </Box>

      <FlexBetween mt="0.25rem" ml="1rem"gap="1rem" pr="1rem">
   
        <Box ml="-0.5rem" flexBasis={"40%"} textAlign={"center"}>

          <Typography variant="h5"> Gelir Değişimi</Typography>
          <Typography m="0.5rem 0 " variant="h3" color={palette.primary[300]}>{`${increase}%`}</Typography>
          <Typography variant="h6">2023 Cirosu: ₺{totalRevenue2023Rounded?.toLocaleString("tr-TR")}.</Typography>
          <Typography m="0.5rem 0"variant="h6">2022 Cirosu: ₺{totalRevenue2022Rounded?.toLocaleString("tr-TR")}.</Typography>
         
        </Box>
        <PieChart 
    width={100} 
    height={150}
    margin={{
      top: 0,
      right: 0,
      left: 0,
      bottom: 20,
    }}
    >
        <Pie
          stroke='none'
          data={pieData}
          innerRadius={18}
          outerRadius={43}
          paddingAngle={2} 
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index]} />
          ))}
        </Pie>
       
      </PieChart>
        <Box ml="-0.8rem"  flexBasis={"40%"} textAlign={"center"}>
        <Typography variant="h5"> Satış Miktarı Değişimi</Typography>
          <Typography m="0.5rem 0 " variant="h3" color={palette.primary[300]}>{`${increaseTotalQuantity}%`}</Typography>
          <Typography variant="h6">2023 Miktarı: {totalQuantity2023?.toLocaleString("tr-TR")}.</Typography>
          <Typography m="0.5rem 0"variant="h6">2022 Miktarı: {totalQuantity2022?.toLocaleString("tr-TR")}.</Typography>
          
          {/* <Typography variant="h5">Toplam Satış Farkı</Typography>
          <Typography variant="h6">Satılan adette değişim {increaseTotalQuantity?.toLocaleString("tr-TR")}%.</Typography>
          <Typography m="0.4rem" variant="h5"> Ciro karşılaştırması </Typography>
          <Typography variant="h6">Kar oranı %{increaseProducts?.toLocaleString("tr-TR")}'a kadar çıkmıştır.</Typography> */}

        </Box>
        
      </FlexBetween>
    </DashboardBox>

    
    </>
  )
}

export default Row1