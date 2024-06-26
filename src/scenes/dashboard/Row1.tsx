import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import YearSelector from '@/components/yearSelector';
import { useGetMonthlyProfit2022Query, useGetMonthlyProfit2023Query, useGetyirmiIkiTotalRevenueQuery, useGetyirmiUcTotalRevenueQuery} from '@/state/api';
import { useTheme } from '@mui/material';
import { SetStateAction, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';

function getMonthName(monthNumber: number) {
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  return monthNames[monthNumber - 1];
}

const Row2 = () => {
  const { palette } = useTheme();
  const [selectedYear, setSelectedYear] = useState(2022);
  const handleYearSelect = (year: SetStateAction<number>) => {
    setSelectedYear(year);
  };

  
  const { data: monthlyData2022 } = useGetMonthlyProfit2022Query();
  const { data: monthlyData2023 } = useGetMonthlyProfit2023Query();
  const { data: totalRevenue2022 = { totalRevenue: 0 } } = useGetyirmiIkiTotalRevenueQuery();
  const { data: totalRevenue2023 = { totalRevenue: 0 } } = useGetyirmiUcTotalRevenueQuery();
  
  
  let increase: number | null = null;

    if (totalRevenue2022 && totalRevenue2023 && typeof totalRevenue2022 === 'number' && typeof totalRevenue2023 === 'number') {
      const increaseValue = Math.round(((totalRevenue2023 - totalRevenue2022) / totalRevenue2022) * 100);
      increase = isNaN(increaseValue) ? null : increaseValue;
    } else {
      console.error('Toplam gelir henüz elde edilemedi');
}



  const transformedMonthlyData = useMemo(() => {
    const monthlyData = selectedYear === 2022 ? monthlyData2022 : monthlyData2023;

    if (monthlyData) {
      return monthlyData.map((item) => ({
        Ay: getMonthName(item.month).substring(0, 3),
        ToplamGelir: item.totalRevenue,
        ToplamAdet: item.totalQuantity ? item.totalQuantity.toLocaleString("tr-TR") : 0,
        islemDegeri: Number((item.totalRevenue / item.totalQuantity).toFixed(2)),
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
    subtitle='Grafik Satışların Ay Bazlı Gruplanıp Toplanmasıyla Elde Ediliyor'
    sideText={`${increase}%`}/>
    <ResponsiveContainer width="100%" height="80%">
        <BarChart
          width={500}
          height={400}
          data={transformedMonthlyData}
          margin={{
            top: 15,
            right: 15,
            left: 5,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
              </linearGradient>
              
          </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="Ay" axisLine={false} tickLine={false} style={{ fontSize: "10px"}}/>
          <YAxis  axisLine={false} tickLine={false} style={{ fontSize: "10px"}} />
          <Tooltip 
            formatter={(value) => ` ₺${value.toLocaleString("tr-TR")} `}
            labelFormatter={(label) => `${label}`}
          />
          <Bar dataKey="ToplamGelir" fill="url(#colorRevenue)" />
        </BarChart>
      </ResponsiveContainer>
    </DashboardBox>
  
    
    <DashboardBox gridArea="b">
    <BoxHeader
          title={`${selectedYear} Yılı`}
          subtitle='Toplam Gelir ve Toplam Adetin Gösterimi' sideText={''}/>
    <ResponsiveContainer width="100%" height="80%">
      
        <LineChart
          width={500}
          height={400}
          data={transformedMonthlyData}
          margin={{
            top: 20,
            right: 0,
            left: 1,
            bottom: -10,
          }}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis 
          dataKey="Ay"
          tickLine={false}
          style={{ fontSize:"10px" }} />
          <YAxis 
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "10px"}}
          domain={[150000,1200000]}
          />
          <YAxis 
          yAxisId="right"
          orientation='right'
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "10px"}}
          domain={[250,800]}
          
           
          />
          
          <Tooltip 
            formatter={(value) => ` ${value.toLocaleString("tr-TR")} `}
            labelFormatter={(label) => `${label}`}
          />
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
    <DashboardBox gridArea="c">
    <BoxHeader 
    title='Ürün Satış Verimliliği' 
    subtitle='Aylık Ciro / Aylık Satılan Ürün'
    sideText='1.75+'/>
    <ResponsiveContainer width="100%" height="80%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 0,
            left: -20,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]}/>
          <XAxis 
            type="category"
            dataKey="Ay" 
            name="Ay" 
            axisLine={false}
            tickLine={false}
            style = {{fontSize: "10px"}}
            />
             <YAxis
            type="number" 
            dataKey="islemDegeri" 
            name="islemDegeri" 
            axisLine={false}
            tickLine={false}
            style = {{fontSize: "10px"}}
            domain={[1.2,2]}
            />

          <Tooltip />
          <Scatter name="Ürün Verimlilik Oranı" data={transformedMonthlyData} fill={palette.tertiary[500]} />
        </ScatterChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2