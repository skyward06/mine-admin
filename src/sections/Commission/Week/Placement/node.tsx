import type { NodeProps } from 'src/sections/Placement/List/type';

import { useContext } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';
import { customizeFullName } from 'src/utils/helper';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';

import NodeContext from 'src/sections/Placement/List/nodeContext';

export function StandardNode({
  id,
  placementPosition,
  username,
  fullName,
  commissions,
  createdAt,
}: NodeProps) {
  const router = useRouter();

  const { visibleMap, expandTree, collapseTree } = useContext(NodeContext);

  const commission = commissions.reduce(
    (prev: any, save: any) => ({ ...prev, [save.memberId]: save }),
    {}
  );

  return (
    <Card
      sx={{
        p: 2,
        minWidth: 200,
        borderRadius: 1.5,
        textAlign: 'left',
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        border: `3px solid ${commission[id]?.commission && 'red'}`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ background: 'translation' }}>
        <Stack>
          <ListItemText
            primary={customizeFullName(fullName)}
            secondary={username}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              component: 'span',
              typography: 'caption',
            }}
            sx={{
              cursor: 'pointer',
              '&:hover': { color: (theme) => theme.vars.palette.Alert.errorIconColor },
            }}
            onClick={() => router.push(paths.dashboard.members.edit(id))}
          />
        </Stack>
        <Stack>
          <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
            {formatDate(createdAt)}
          </Typography>
          <Stack direction="row" justifyContent="flex-end">
            {placementPosition !== 'NONE' && (
              <Label
                variant="soft"
                color={placementPosition === 'LEFT' ? 'primary' : 'info'}
                sx={{ width: '30px', height: '30px', borderRadius: '50%' }}
              >
                {placementPosition?.charAt(0)}
              </Label>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between" columnGap={1}>
        <Stack>
          <Typography variant="caption" color="gray" component="div" noWrap sx={{ mt: 1 }}>
            L {Math.min(commission[id]?.maxL || 0, 9)}/{commission[id]?.pkgL || 0}
          </Typography>
        </Stack>
        <Stack>
          {visibleMap[id] !== 3 && (
            <Iconify
              icon={`mdi:${visibleMap[id] === 1 ? 'plus' : 'minus'}-circle-outline`}
              sx={{ mt: 0.8, cursor: 'pointer' }}
              onClick={() => {
                if (visibleMap[id] === 1) expandTree(id);
                else if (visibleMap[id] === 2) collapseTree(id);
              }}
            />
          )}
        </Stack>
        <Stack>
          <Typography variant="caption" color="gray" component="div" noWrap sx={{ mt: 1 }}>
            {Math.min(commission[id]?.maxR || 0, 9)}/{commission[id]?.pkgR || 0} R
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
