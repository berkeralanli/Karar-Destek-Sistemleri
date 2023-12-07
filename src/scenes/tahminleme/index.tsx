import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetMonthlyProfitAllYearsQuery } from '@/state/api';
import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

type Props = {}

const Tahminleme = (props: Props) => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const {data: monthlyProfitAllYears } = useGetMonthlyProfitAllYearsQuery();



  return (
    <DashboardBox 
    width="100%"
    height="100%"
    p="1rem"
    overflow="hidden">

      <FlexBetween m="1rem 2.5rem">
        <Box>
          <Typography variant="h3">Gelir ve Tahminleme</Typography>
          <Typography variant="h6">Basit makine öğrenmesi ve regresyon modeli ile 2 yılın verilerine bakılarak gelecek seneyi tahminleme </Typography>
        </Box>
        <Button
        onClick={}></Button>
      </FlexBetween>




    </DashboardBox>
  );};

export default Tahminleme;