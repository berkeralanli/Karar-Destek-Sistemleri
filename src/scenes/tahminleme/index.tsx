import { useMemo, useState } from 'react';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetMonthlyProfitAllYearsQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import RevenueTargetInput from '../../components/revenueTargetInput';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function getMonthName(monthNumber: number): string {
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  return monthNames[monthNumber - 1];
}

const calculateWeightedRevenue = (
  monthlyData: Array<{ month: number; totalRevenue: number }>, 
  growthExpectation: number
) => {
  const weights = [0.08, 0.07, 0.07, 0.06, 0.07, 0.06, 0.08, 0.07, 0.12, 0.07, 0.14, 0.10];
  const growthFactor = growthExpectation / 100;
  const growthAdjustedRevenue = (8664883 * (1 + growthFactor));
  const weightedRevenue = monthlyData.map((item, index) => {
    const monthlyWeightedRevenue = Math.round(growthAdjustedRevenue * weights[index]);
    return {
      Ay: getMonthName(item.month).substring(0, 3),
      sonYilGelirleri: item.totalRevenue,
      gelecekYilGelirleri: monthlyWeightedRevenue,
    };
  });

  return weightedRevenue;
};
const Tahminleme = () => {  

  const { palette } = useTheme();
  const { data: monthlyProfitAllYears } = useGetMonthlyProfitAllYearsQuery();
  const [weightedData, setWeightedData] = useState<Array<{ Ay: string; sonYilGelirleri: number; gelecekYilGelirleri: number; }>>([]);
  const [dollarWeightedData, setDollarWeightedData] = useState<Array<{
    gelecekYilGelirleriDolar: number;
    Ay: string;
    sonYilGelirleri: number;
    gelecekYilGelirleri: number;
  }> >([]);
  

  const handleRevenueTargetSubmit = (growth: number, exchangeRate: number) => {
    if (monthlyProfitAllYears) {
      const weightedRevenue = calculateWeightedRevenue(monthlyProfitAllYears, growth);
    
      setWeightedData(weightedRevenue);
    
      const dollarWeightedData = weightedRevenue.map((item) => ({
        ...item,
        gelecekYilGelirleriDolar: Math.round(item.gelecekYilGelirleri / exchangeRate),
      }));
    
      setDollarWeightedData(dollarWeightedData);
    }
  };

  const transformedAllMonthlyData = useMemo(() => {
    if (monthlyProfitAllYears) {
      const initialTransformedData = monthlyProfitAllYears.map((item) => ({
        Ay: getMonthName(item.month).substring(0, 3),
        sonYilGelirleri: item.totalRevenue,
        gelecekYilGelirleri: 0, // Varsayılan değeri sıfır olarak ayarla
        gelecekYilGelirleriDolar: 0, // Varsayılan dolar cinsinden değeri sıfır olarak ayarla
      }));
  
      // Ağırlıklı gelir verilerini ekleyelim
      if (weightedData.length > 0) {
        weightedData.forEach((data, index) => {
          initialTransformedData[index].gelecekYilGelirleri = data.gelecekYilGelirleri;
          initialTransformedData[index].gelecekYilGelirleriDolar = dollarWeightedData[index]?.gelecekYilGelirleriDolar || 0;
        });
      }
  
      return initialTransformedData;
    }
    return [];
  }, [monthlyProfitAllYears, weightedData, dollarWeightedData]);

  return (
    <DashboardBox 
    width="100%"
    height="750px"
    p="1rem"
    overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Büyüme Beklentisi ve Dolar Bazında Gösterim </Typography>
          <Typography variant="h6">
            En son yılın ay bazlı gelirleri. Ayların toplam gelire olan ağırlıklarına göre gelecek yıl için büyüme beklentisinde değişen ve aynı zamanda dolar cinsinden takip edilebilecek bir grafik.
          </Typography>
        </Box>
        <RevenueTargetInput onSubmit={handleRevenueTargetSubmit} />
      </FlexBetween>
    <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={400}
          data={transformedAllMonthlyData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorToplamGelir" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[800]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={palette.primary[800]} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAgirlikliGelir" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[500]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={palette.primary[500]} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAgirlikliGelirDolar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[200]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={palette.primary[200]} stopOpacity={0}/>
              </linearGradient>
              
          </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="Ay" axisLine={false} tickLine={false} style={{ fontSize: "10px"}}/>
          <YAxis  axisLine={false} tickLine={false} style={{ fontSize: "10px"}} />
          <Tooltip
            formatter={(value) => ` ₺${value.toLocaleString("tr-TR")} `}
            labelFormatter={(label) => `${label}`}
          />
          <Legend />
          <Bar dataKey="sonYilGelirleri" fill="url(#colorToplamGelir)" activeBar={<Rectangle stroke="blue" />} />
          <Bar dataKey="gelecekYilGelirleri" fill="url(#colorAgirlikliGelir)" activeBar={<Rectangle stroke="blue" />} />
          <Bar dataKey="gelecekYilGelirleriDolar"  fill="url(#colorAgirlikliGelirDolar)" activeBar={<Rectangle stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </DashboardBox>
  );};

export default Tahminleme;
