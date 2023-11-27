import DashboardBox from '@/components/DashboardBox';
import  { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
type Props = {}

const Row1 = (props: Props) => {
  const { palette } = useTheme();
  // const { data } = useGetKpisQuery();
  // console.log("data:", data);
  return (
    <>
    <DashboardBox gridArea="a">
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area 
          type="monotone" 
          dataKey="uv"stroke={palette.primary.main} 
          fillOpacity={1} 
          fill="url(#colorRevenue)"/>
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
    
    
    <DashboardBox gridArea="b"></DashboardBox>
    <DashboardBox gridArea="c"></DashboardBox>
    </>
  )
}

export default Row1