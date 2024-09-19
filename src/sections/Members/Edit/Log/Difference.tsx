import { isEqual } from 'lodash';

import {
  Card,
  Stack,
  Paper,
  useTheme,
  Typography,
  tableRowClasses,
  tableCellClasses,
} from '@mui/material';

import { Label } from 'src/components/Label';

interface Props {
  before: any;
  after: any;
  action: string;
  compare?: boolean;
  defaultStyles: any;
}

export default function Difference({
  before,
  after,
  action,
  compare = false,
  defaultStyles,
}: Props) {
  const theme = useTheme();

  const { sponsor: beforeSponsor, memberWallets: beforeMemberWallets, ...beforeRest } = before;
  const { sponsor: afterSponsor, memberWallets: afterMemberWallets, ...afterRest } = after;

  const rest = action === 'after' ? afterRest : beforeRest;
  const sponsor = action === 'after' ? afterSponsor : beforeSponsor;
  const memberWallets = action === 'after' ? afterMemberWallets : beforeMemberWallets;

  return (
    <Card
      sx={{
        borderRadius: 1,
        mt: 2,
        p: 2,
        [`&.${tableRowClasses.selected}, &:hover`]: {
          backgroundColor: 'background.paper',
          boxShadow: theme.customShadows.z20,
          transition: theme.transitions.create(['background-color', 'box-shadow'], {
            duration: theme.transitions.duration.shortest,
          }),
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: theme.customShadows.z20,
          },
        },
        [`& .${tableCellClasses.root}`]: { ...defaultStyles },
      }}
    >
      {Object.keys(rest).map((item) => (
        <Stack direction="row" columnGap={2}>
          <Typography fontWeight="bold">{item}:</Typography>

          {compare && before[item] !== after[item] ? (
            <Label variant="soft" color="info">
              {rest[item]}
            </Label>
          ) : (
            <Typography>{rest[item]}</Typography>
          )}
        </Stack>
      ))}

      <Stack direction="row" columnGap={2}>
        <Typography fontWeight="bold">sponsor:</Typography>

        {compare && !isEqual(beforeSponsor, afterSponsor) ? (
          <Label variant="soft" color="info">
            {sponsor?.fullName}
          </Label>
        ) : (
          <Typography>{sponsor?.fullName}</Typography>
        )}
      </Stack>

      <Typography fontWeight="bold">memberWallets:</Typography>

      {memberWallets.map((item: any, no: number) => (
        <Paper sx={{ pl: 2, pb: 1 }}>
          {Object.keys(item).map((row: any, index: number) => (
            <Stack direction="row" columnGap={2}>
              <Typography fontWeight="bold">{row}:</Typography>

              {compare && !isEqual(beforeMemberWallets[no][row], afterMemberWallets[no][row]) ? (
                <Label variant="soft" color="info">
                  {row === 'payout' ? item[row].method : item[row]}
                </Label>
              ) : (
                <Typography>{row === 'payout' ? item[row].method : item[row]}</Typography>
              )}
              {/* <Typography>{row === 'payout' ? item[row].method : item[row]}</Typography> */}
            </Stack>
          ))}
        </Paper>
      ))}
    </Card>
  );
}
