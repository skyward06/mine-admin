import Grid from '@mui/material/Unstable_Grid2';

import Revenue from 'src/sections/Statistics/Chart/Revenue';
import HashRate from 'src/sections/Statistics/Chart/HashRate';
import TXCShared from 'src/sections/Statistics/Chart/TXCShared';
import TotalMiner from 'src/sections/Statistics/Chart/TotalMiner';
import Commission from 'src/sections/Statistics/Chart/Commission';
import MemberCount from 'src/sections/Statistics/Chart/MemberCount';
import MemberReward from 'src/sections/Statistics/Chart/MemberReward';
import MemberByCountry from 'src/sections/Statistics/Chart/MemberByCountry';

export default function Summary() {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <HashRate />
      </Grid>
      <Grid xs={12} md={6}>
        <TXCShared />
      </Grid>
      <Grid xs={12} md={4}>
        <MemberReward />
      </Grid>
      <Grid xs={12} md={4}>
        <Revenue />
      </Grid>
      <Grid xs={12} md={4}>
        <MemberCount />
      </Grid>
      <Grid xs={12} md={4}>
        <Commission />
      </Grid>
      <Grid xs={12} md={4}>
        <TotalMiner />
      </Grid>
      <Grid xs={12} md={4}>
        <MemberByCountry />
      </Grid>
    </Grid>
  );
}
