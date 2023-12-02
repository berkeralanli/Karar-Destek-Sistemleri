import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import YearSelector from '@/components/yearSelector';
import { useGetMonthlyProfit2022Query, useGetMonthlyProfit2023Query } from '@/state/api';
import { Typography, useTheme } from '@mui/material';
import { useMemo, useState } from 'react'
import { AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,  } from 'recharts';

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
  const [selectedYear, setSelectedYear] = useState(2022);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const { data: monthlyData2022 } = useGetMonthlyProfit2022Query();
  const { data: monthlyData2023 } = useGetMonthlyProfit2023Query();

  const transformedMonthlyData = useMemo(() => {
    const monthlyData = selectedYear === 2022 ? monthlyData2022 : monthlyData2023;

    if (monthlyData) {
      return monthlyData.map((item) => ({
        month: getMonthName(item.month).substring(0, 3),
        ToplamGelir: item.totalRevenue,
        ToplamAdet: item.totalQuantity.toLocaleString("tr-TR"),
      }));
    }
    return [];
  }, [monthlyData2022, monthlyData2023, selectedYear]);
  
  return (
    <>
    <DashboardBox gridArea="a">
   <YearSelector onSelectYear={handleYearSelect}></YearSelector>
    <BoxHeader 
    title='Aylara Göre Satış Toplamları' 
    subtitle='Grafik satışların ay bazlı gruplanıp toplanmasıyla elde ediliyor' 
    sideText='0.24%'/>
    <ResponsiveContainer width="100%" height="80%">
        <BarChart
          width={500}
          height={400}
          data={transformedMonthlyData}
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
          <Bar dataKey="ToplamGelir" fill="url(#colorRevenue)" />
        </BarChart>
      </ResponsiveContainer>
    </DashboardBox>
  
    
    <DashboardBox gridArea="b">
    <BoxHeader
    title='Yılı  ' 
    subtitle='Toplam gelir ve Toplam adetin gösterimi' 
    sideText='0.24%'/>
    <ResponsiveContainer width="100%" height="80%">
      
        <LineChart
          width={500}
          height={400}
          data={transformedMonthlyData}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis 
          dataKey="month"
          tickLine={false}
          style={{ fontSize:"8px"}} />
          <YAxis 
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "10px"}}
          />
          <YAxis 
          yAxisId="right"
          orientation='right'
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "10px"}}
          />
          
          <Tooltip />
          <Legend height={10} wrapperStyle={{
            margin: '0 0 10px 0 '
          }}/>

          <Line 
          yAxisId="left"
          type="monotone"
          dataKey="ToplamGelir"
          stroke={palette.tertiary[500]}/>
          <Line 
          yAxisId="right"
          type="monotone"
          dataKey="ToplamAdet"
          stroke={palette.primary.main}/>
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox gridArea="c"></DashboardBox>
    </>
  )
}

export default Row2