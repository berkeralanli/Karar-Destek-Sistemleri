import DashboardBox from '@/components/DashboardBox';
import  { useGetMostSellers2022Query, useGetMostSellers2023Query, useGetyirmiIkiTotalRevenueQuery, useGetyirmiUcTotalRevenueQuery, useGetyirmiIkiTotalQuantityQuery, useGetyirmiUcTotalQuantityQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import FlexBetween from '@/components/FlexBetween';
import BoxHeader from '@/components/BoxHeader';
import { getMostSellers2022Response, GetMostSellers2023Response } from '@/state/types';

const pieData = [
  {name: "2023", value: 620},
  {name: "2022", value: 480},
 
]

const Row1 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[600], palette.primary[800]];

  const { data: data2022 } = useGetMostSellers2022Query();
  const { data: data2023 } = useGetMostSellers2023Query();
  const { data: totalRevenue2022 = { totalRevenue: 0 } } = useGetyirmiIkiTotalRevenueQuery();
  const { data: totalRevenue2023 = { totalRevenue: 0 } } = useGetyirmiUcTotalRevenueQuery();
  const { data: totalQuantity2022 = { totalQuantity: 0 } } = useGetyirmiIkiTotalQuantityQuery();
  const { data: totalQuantity2023 = { totalQuantity: 0 } } = useGetyirmiUcTotalQuantityQuery();

  let increase: number | null = null;
  let increaseTotalQuantity: number | null = null;
  let increaseProducts: number | null = null;
  

  if (
    typeof totalRevenue2022 === 'number' &&
    typeof totalRevenue2023 === 'number' &&
    typeof totalQuantity2022 === 'number' &&
    typeof totalQuantity2023 === 'number' &&
    Array.isArray(data2022) &&
    Array.isArray(data2023) &&
    data2022.every((item:getMostSellers2022Response ) => typeof item.totalRevenue === 'number' && typeof item.totalQuantity === 'number') &&
    data2023.every((item:GetMostSellers2023Response ) => typeof item.totalRevenue === 'number' && typeof item.totalQuantity === 'number')
  ) {
    increase = Math.round(((totalRevenue2023 - totalRevenue2022) / totalRevenue2022) * 100);
    increaseTotalQuantity = Math.round(((totalQuantity2023 - totalQuantity2022) / totalQuantity2022) * 100);
    const gelir2022 = data2022?.[0]?.totalRevenue ?? 0;
    const gelir2023 = data2023?.[0]?.totalRevenue ?? 0;
    increaseProducts = Math.round(((gelir2023 - gelir2022) / gelir2022) * 100);
  } else {
    console.error('Toplam gelir veya toplam miktar henüz elde edilemedi');
  }

  const transformedData2022 = useMemo(() => {
    if (data2022) {
      return data2022.map((item) => ({
        id: item.__id,
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
        id: item.__id,
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
          subtitle='En Çok Satış Yapılan 5 ürün' sideText={''}/>
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
          <Typography variant="h6">2023 Cirosu: ₺{totalRevenue2023?.toLocaleString()}.</Typography>
          <Typography m="0.5rem 0"variant="h6">2022 Cirosu: ₺{totalRevenue2022?.toLocaleString()}.</Typography>
         
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
          {pieData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index]} />
          ))}
        </Pie>
       
      </PieChart>
        <Box ml="-0.8rem"  flexBasis={"40%"} textAlign={"center"}>
        <Typography variant="h5"> Satış Miktarı Değişimi</Typography>
          <Typography m="0.5rem 0 " variant="h3" color={palette.primary[300]}>{`${increaseTotalQuantity}%`}</Typography>
          <Typography variant="h6">2023 Miktarı: {totalQuantity2023?.toLocaleString()}.</Typography>
          <Typography m="0.5rem 0"variant="h6">2022 Miktarı: {totalQuantity2022?.toLocaleString()}.</Typography>

        </Box>
        
      </FlexBetween>
    </DashboardBox>

    
    </>
  )
}

export default Row1