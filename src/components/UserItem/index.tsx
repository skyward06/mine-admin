import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';

import { CONFIG } from 'src/config';

import { Image } from '../Image';

interface Props {
  user: {
    username: string;
    email: string;
    avatar?: string | null;
  };
}

export default function UserItem({ user: { username, email, avatar } }: Props) {
  return (
    <Stack direction="row" spacing={2}>
      <Image
        src={avatar ?? `${CONFIG.SITE_PATH}/assets/avatar.png`}
        width={40}
        height={40}
        borderRadius={50}
      />
      <ListItemText
        primary={username}
        secondary={email}
        primaryTypographyProps={{ typography: 'body2' }}
        secondaryTypographyProps={{
          component: 'span',
          color: 'text.disabled',
        }}
      />
    </Stack>
  );
}
