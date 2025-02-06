import Grid from '@mui/material/Unstable_Grid2';

import Table from './Table';
import { Reward } from './Reward';
import { OverView } from './OverView';
import { Personal } from './Personal';

export default function HistoryView() {
  return (
    <Grid container>
      <Grid md={12} xl={8}>
        <Reward />
        <Table />
      </Grid>
      <Grid md={12} xl={4}>
        <OverView />
        <Personal />
      </Grid>
    </Grid>
  );
}
