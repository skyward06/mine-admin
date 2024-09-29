import { Card, Stack, Paper, useTheme, Typography, tableRowClasses } from '@mui/material';

interface Props {
  before: any;
  action: string;
}

export default function Empty({ before, action }: Props) {
  const theme = useTheme();

  const { placementParent, sponsor, memberWallets, ...rest } = before;

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
      }}
    >
      {action === 'before' ? (
        <>
          {Object.keys(rest).map((item) => (
            <Stack direction="row" columnGap={2}>
              <Typography fontWeight="bold">{item}:</Typography>
              <Typography>{rest[item] ?? ''}</Typography>
            </Stack>
          ))}

          <Stack direction="row" columnGap={2}>
            <Typography fontWeight="bold">sponsor:</Typography>

            <Typography>{sponsor?.fullName}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography fontWeight="bold">placement:</Typography>

            <Typography>{placementParent?.fullName}</Typography>
          </Stack>

          <Typography fontWeight="bold">memberWallets:</Typography>

          {memberWallets.map((item: any, no: number) => (
            <Paper sx={{ pl: 2, pb: 1 }}>
              {Object.keys(item).map((row: any, index: number) => (
                <Stack direction="row" columnGap={2}>
                  <Typography fontWeight="bold">{row}:</Typography>

                  <Typography>{row === 'payout' ? item[row].method : item[row]}</Typography>
                </Stack>
              ))}
            </Paper>
          ))}
        </>
      ) : (
        <Typography fontWeight="bold">Failed</Typography>
      )}
    </Card>
  );
}
