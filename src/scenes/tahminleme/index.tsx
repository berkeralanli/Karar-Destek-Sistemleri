import React, { useMemo, useState } from 'react';
import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetMonthlyProfitAllYearsQuery, useGetTotalRevenueQuery } from '@/state/api';
import { Box, Button, Typography, useTheme } from '@mui/material';
import RevenueTargetInput from '../../components/revenueTargetInput';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function getMonthName(monthNumber) {
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  return monthNames[monthNumber - 1];
}

const calculateWeightedRevenue = (monthlyData, growthExpectation, totalRevenue) => {
  const weights = [0.08, 0.07, 0.07, 0.06, 0.07, 0.06, 0.08, 0.07, 0.12, 0.07, 0.14, 0.10];
  const growthFactor = growthExpectation / 100;
  const growthAdjustedRevenue = (8664883 * (1 + growthFactor)) / 100;
  const weightedRevenue = monthlyData.map((item, index) => {
    const monthlyWeightedRevenue = Math.round(growthAdjustedRevenue * weights[index]);
    return {
      Ay: getMonthName(item.month).substring(0, 3),
      ToplamGelir: item.totalRevenue,
      AgirlikliGelir: monthlyWeightedRevenue,
    };
  });

  return weightedRevenue;
};
const Tahminleme = () => {  
  const { data: totalRevenue } = useGetTotalRevenueQuery();
  console.log("🚀 ~ file: index.tsx:35 ~ Tahminleme ~ totalRevenue:", totalRevenue)
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: monthlyProfitAllYears } = useGetMonthlyProfitAllYearsQuery();
  const [weightedData, setWeightedData] = useState([]);

  const handleRevenueTargetSubmit = (growth, exchangeRate) => {
    const totalRevenueValue = totalRevenue?.value ?? 0; // Eğer totalRevenue verisi yoksa 0 kabul et
    const weightedRevenue = calculateWeightedRevenue(
      monthlyProfitAllYears,
      growth,
      totalRevenue
    );
    
    setWeightedData(weightedRevenue);
    
    
    console.log(`Büyüme Beklentisi: ${growth}, Dolar Kuru Beklentisi: ${exchangeRate}`);
    console.log('Aylık Ağırlıklı Gelir Verisi:', weightedRevenue);
  };

  const transformedAllMonthlyData = useMemo(() => {
    if (monthlyProfitAllYears) {
      const initialTransformedData = monthlyProfitAllYears.map((item) => ({
        Ay: getMonthName(item.month).substring(0, 3),
        ToplamGelir: item.totalRevenue,
      }));

      // Oluşturulan ağırlıklı gelir verisini ekleyelim
      if (weightedData.length > 0) {
        weightedData.forEach((data, index) => {
          initialTransformedData[index].AgirlikliGelir = data.AgirlikliGelir;
        });
      }

      return initialTransformedData;
    }
    return [];
  }, [monthlyProfitAllYears, weightedData]);

  return (
    <DashboardBox 
    width="100%"
    height="750px"
    p="1rem"
    overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            charted revenue and predicted revenue based on a simple linear
            regression model
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
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
              </linearGradient>
              
          </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="Ay" axisLine={false} tickLine={false} style={{ fontSize: "10px"}}/>
          <YAxis  axisLine={false} tickLine={false} style={{ fontSize: "10px"}} />
          

          <Legend />
          <Bar dataKey="ToplamGelir" fill="url(#colorRevenue)" activeBar={<Rectangle stroke="blue" />} />
          <Bar dataKey="AgirlikliGelir" fill="url(#colorRevenue)" activeBar={<Rectangle stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </DashboardBox>
  );};

export default Tahminleme;
