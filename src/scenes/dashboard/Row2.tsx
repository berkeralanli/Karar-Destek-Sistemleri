import DashboardBox from '@/components/DashboardBox';
import Boxheader from '@/components/BoxHeader';
import  { useGetMostSellers2022Query, useGetMostSellers2023Query } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import FlexBetween from '@/components/FlexBetween';
import BoxHeader from '@/components/BoxHeader';

const pieData = [
  {name: "Group A", value: 700},
  {name: "Group B", value: 300},
 
  
]
type Props = {}

const Row1 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[600]];
  const { data: data2022 } = useGetMostSellers2022Query();
  const { data: data2023 } = useGetMostSellers2023Query();

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
    sideText='0.24%'/>
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
          
          
          <Tooltip />
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
    sideText='0.24%'/>
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
          
          <Tooltip />
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
      <Boxheader title="2022 ve 2023 yılları"     subtitle='En Az Satış Yapılan 5 ürün' 
      sideText='0.24%'/>
      <FlexBetween mt="1rem" gap="1.5rem" pr="1rem">
    <PieChart 
    width={100} 
    height={150}
    margin={{
      top: 0,
      right: -10,
      left: 10,
      bottom: 0,
    }}
    >
        <Pie
          stroke='none'
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2} 
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index]} />
          ))}
        </Pie>
       
      </PieChart>
        
        <Box ml="-0.7rem" flexBasis={"40%"} textAlign={"center"}>
          <Typography variant="h4">Fark</Typography>
          <Typography m="0.5rem 0 " variant="h3" color={palette.primary[300]}>%70</Typography>
        <Typography variant="h6">Şirket geçen sene en çok kar sağlayan ürüne göre değişim yakalamıştır.</Typography>
        
        </Box>
        <Box ml="-0.7rem" flexBasis={"40%"} textAlign={"center"}>
          <Typography variant="h5">Adet Bazlı Satışlarda</Typography>
          <Typography variant="h6">Satılan toplam adet</Typography>
          <Typography m="0.4rem" variant="h5"> Ciro karşılaştırması </Typography>
        <Typography variant="h6">Kar oranı %109'a kadar çıkmıştır.</Typography>

        </Box>
        
      </FlexBetween>
    </DashboardBox>

    
    </>
  )
}

export default Row1