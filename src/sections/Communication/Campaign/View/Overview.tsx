import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatWeekNumber } from 'src/utils/format-time';

import { CampaignListType } from 'src/__generated__/graphql';

interface Props {
  subject: string;
  listType: string;
  listExtra: any;
}

export default function Overview({ subject, listType, listExtra }: Props) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" pb={2}>
      <Typography variant="subtitle1">Subject:</Typography>
      <Typography>{subject}</Typography>
      <Typography>
        ({listType}
        <>
          {listType === CampaignListType.Group && `: ${listExtra?.name ?? ''}`}
          {listType === CampaignListType.Custom && `: ${listExtra?.name ?? ''}`}
          {listType === CampaignListType.WeeklySponsor &&
            `: Week - ${formatWeekNumber(listExtra?.date)}`}
        </>
        )
      </Typography>
    </Stack>
  );
}
