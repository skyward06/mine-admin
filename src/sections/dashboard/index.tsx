import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import StatisticsTable from 'src/sections/Statistics/Statistics';

import Summary from './Summary';

export default function Dashboard() {
  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ pb: 2 }}>
        Dashboard
      </Typography>

      <Summary />
      <StatisticsTable />
    </DashboardContent>
  );
}
