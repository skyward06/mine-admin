import type { NodeProps } from 'src/sections/Placement/List/type';

import { useContext } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';

import NodeContext from 'src/sections/Placement/List/nodeContext';

export function StandardNode({
  id,
  placementPosition,
  username,
  fullName,
  commissions,
}: NodeProps) {
  const router = useRouter();

  const [firstName, lastName] = fullName ? fullName.split(' ') : ['', ''];

  const { visibleMap, expandTree, collapseTree } = useContext(NodeContext);

  const commission = commissions.reduce(
    (prev: any, save: any) => ({ ...prev, [save.memberId]: save }),
    {}
  );

  console.log('commission => ', commission);

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
      }}
    >
      <Typography
        variant="subtitle2"
        noWrap
        sx={{
          mb: 0.5,
          cursor: 'pointer',
          '&:hover': { color: (theme) => theme.vars.palette.Alert.errorIconColor },
        }}
        onClick={() => router.push(paths.dashboard.members.edit(id))}
      >
        {`${firstName} ${lastName.length && lastName[0].toUpperCase()}.`}
      </Typography>

      <Stack direction="row" justifyContent="space-between" sx={{ background: 'translation' }}>
        <Typography
          variant="caption"
          component="div"
          noWrap
          sx={{ color: 'text.secondary', mt: 0.5 }}
        >
          {username}
        </Typography>

        <Stack direction="row" columnGap={1}>
          <Stack>
            {placementPosition && (
              <Label
                variant={placementPosition === 'LEFT' ? 'soft' : 'outlined'}
                color="info"
                sx={{ fontSize: 10, border: placementPosition === 'LEFT' ? 'none' : 1 }}
              >
                {placementPosition}
              </Label>
            )}
          </Stack>
          <Stack>
            {visibleMap[id] !== 3 && (
              <Iconify
                icon={`mdi:${visibleMap[id] === 1 ? 'plus' : 'minus'}-circle-outline`}
                sx={{ mt: 0.15, cursor: 'pointer' }}
                onClick={() => {
                  if (visibleMap[id] === 1) expandTree(id);
                  else if (visibleMap[id] === 2) collapseTree(id);
                }}
              />
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between" sx={{ background: 'translation' }}>
        <Stack direction="row" columnGap={1}>
          <Typography
            variant="caption"
            color="red"
            fontWeight="bold"
            component="div"
            noWrap
            sx={{ mt: 1 }}
          >
            Left:
          </Typography>
          <Typography variant="caption" color="gray" component="div" noWrap sx={{ mt: 1 }}>
            {commission[id]?.calculatedLeftPoint || 0}
          </Typography>
        </Stack>
        <Stack direction="row" columnGap={1}>
          <Typography
            variant="caption"
            color="#006899"
            fontWeight="bold"
            component="div"
            noWrap
            sx={{ mt: 1 }}
          >
            Right:
          </Typography>
          <Typography variant="caption" color="gray" component="div" noWrap sx={{ mt: 1 }}>
            {commission[id]?.calculatedRightPoint || 0}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ background: 'translation' }} columnGap={1}>
        <Typography
          variant="caption"
          color="#006899"
          fontWeight="bold"
          component="div"
          noWrap
          sx={{ mt: 1 }}
        >
          Commissions:
        </Typography>

        <Typography
          variant="caption"
          component="div"
          noWrap
          sx={{ color: 'text.secondary', mt: 1 }}
        >
          {commission[id]?.commission || 0}
        </Typography>
      </Stack>
    </Card>
  );
}
