import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import  { useGetMostSellers2022Query, useGetMostSellers2023Query } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
type Props = {}

const Row1 = (props: Props) => {
  const { palette } = useTheme();
  const { data: data2022 } = useGetMostSellers2022Query();
  const { data: data2023 } = useGetMostSellers2023Query();

  const transformedData2022 = useMemo(() => {
    if (data2022) {
      return data2022.map((item) => ({
        id: item._id, // Örnek olarak _id kullanıldı, gerçek verilere göre düzenlenmeli
        name: item.ProductDescription.length > 16 ? item.ProductDescription.slice(0, 16) + '...' : item.ProductDescription,
        revenue: item.totalRevenue,
        quantity: item.totalQuantity,
      }));
    }
    return [];
  }, [data2022]);

  const transformedData2023 = useMemo(() => {
    if (data2023) {
      return data2023.map((item) => ({
        id: item._id, // Örnek olarak _id kullanıldı, gerçek verilere göre düzenlenmeli
        name: item.ProductDescription.length > 16 ? item.ProductDescription.slice(0, 16) + '...' : item.ProductDescription,
        revenue: item.totalRevenue,
        quantity: item.totalQuantity,
      }));
    }
    return [];
  }, [data2023]);

  return (
    <>
    <DashboardBox gridArea="a">
    <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={transformedData2022}
          margin={{
            top: 15,
            right: 25,
            left: 2,
            bottom: 60,
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
          style={{ fontSize:"10px"}} />
          <YAxis 
          tickLine={false}
          axisLine={{strokeWidth:"0"}}
          style={{ fontSize:"10px"}}
          domain={[10000,350000]}/>
          
          <Tooltip />
          <Area 
          type="monotone" 
          dataKey="revenue"
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1} 
          fill="url(#colorRevenue)"/>
          <Area 
          type="monotone" 
          dataKey="quantity"
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1} 
          fill="url(#colorQuantity)"/>
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
    
    
    <DashboardBox gridArea="b">
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={transformedData2023}
          margin={{
            top: 25,
            right: 20,
            left: 2,
            bottom: 5,
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
          style={{ fontSize:"10px"}} />
         <YAxis 
          tickLine={false}
          axisLine={{strokeWidth:"0"}}
          style={{ fontSize:"10px"}}
          domain={[10000,350000]}/>
          
          <Tooltip />
          <Area 
          type="monotone" 
          dataKey="revenue"
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1} 
          fill="url(#colorRevenue)"/>
          <Area 
          type="monotone" 
          dataKey="quantity"
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1} 
          fill="url(#colorQuantity)"/>
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox gridArea="c"></DashboardBox>
    </>
  )
}

export default Row1