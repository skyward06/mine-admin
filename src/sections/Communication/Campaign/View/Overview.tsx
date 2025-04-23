import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatWeekNumber } from 'src/utils/format-time';

import { CAMPAIGN_LIST_TYPE } from 'src/consts';
import { CampaignListType } from 'src/__generated__/graphql';

interface Props {
  sender: string;
  subject: string;
  listType: string;
  listExtra: any;
}

export default function Overview({ sender, subject, listType, listExtra }: Props) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" pb={2}>
      <Typography variant="subtitle1">Subject:</Typography>
      <Typography>{subject}</Typography>
      <Typography>
        ({CAMPAIGN_LIST_TYPE[listType as keyof typeof CAMPAIGN_LIST_TYPE]}
        <>
          {listType === CampaignListType.Group && `: ${listExtra?.name ?? ''}`}
          {listType === CampaignListType.Custom && `: ${listExtra?.name ?? ''}`}
          {listType === CampaignListType.WeeklySponsor &&
            `: Week - ${formatWeekNumber(listExtra?.date)}`}
        </>
        )
      </Typography>
      <Typography variant="subtitle1" ml={2}>
        Sender:
      </Typography>
      <Typography>{sender}</Typography>
    </Stack>
  );
}
