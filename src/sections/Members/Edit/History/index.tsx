import type { Member } from 'src/__generated__/graphql';

import Grid from '@mui/material/Unstable_Grid2';

import Table from './Table';
import { Reward } from './Reward';
import { OverView } from './OverView';
import { Personal } from './Personal';

interface Props {
  currentMember: Member;
}

export default function HistoryView({ currentMember }: Props) {
  return (
    <Grid container>
      <Grid md={12} xl={8}>
        <Reward />
        <Table />
      </Grid>
      <Grid md={12} xl={4}>
        <OverView currentMember={currentMember} />
        <Personal currentMember={currentMember} />
      </Grid>
    </Grid>
  );
}
