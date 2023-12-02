import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import { useGetMonthlyProfit2022Query, useGetMonthlyProfit2023Query } from '@/state/api';
import { Typography, useTheme } from '@mui/material';
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,  } from 'recharts';

type Props = {}
function getMonthName(monthNumber) {
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  return monthNames[monthNumber - 1];
}

const Row2 = () => {
    const { palette } = useTheme();
    
    const { data: monthlyData2022 } = useGetMonthlyProfit2022Query();
    const { data: monthlyData2023 } = useGetMonthlyProfit2023Query();

    const transformedMonthlyData2022 = useMemo(() => {
      if (monthlyData2022) {
          return monthlyData2022.map((item) => ({
            month: getMonthName(item.month).substring(0, 3),
            Gelir: item.totalRevenue,
            
        }));
    }
    return [];
  }, [monthlyData2022]);

  const transformedMonthlyData2023 = useMemo(() => {
    if (monthlyData2023) {
        return monthlyData2023.map((item) => ({
          month: getMonthName(item.month).substring(0, 3),
          Gelir: item.totalRevenue,
          
      }));
  }
  return [];
}, [monthlyData2023]);

 
  
  return (
    <>
    <DashboardBox gridArea="d">
    <BoxHeader 
    title='Aylara Göre Satış Toplamları' 
    subtitle='Grafik satışların ay bazlı gruplanıp toplanmasıyla elde ediliyor' 
    sideText='0.24%'/>
    <ResponsiveContainer width="100%" height="80%">
        <BarChart
          width={500}
          height={400}
          data={transformedMonthlyData2022}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
              </linearGradient>
              
          </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="month" axisLine={false} tickLine={false} style={{ fontSize: "10px"}}/>
          <YAxis  axisLine={false} tickLine={false} style={{ fontSize: "10px"}} />
          <Tooltip />
          <Bar dataKey="Gelir" fill="url(#colorRevenue)" />
        </BarChart>
      </ResponsiveContainer>
    </DashboardBox>
  
    
    <DashboardBox gridArea="e"></DashboardBox>
    <DashboardBox gridArea="f"></DashboardBox>
    </>
  )
}

export default Row2