import type { RootState } from 'src/store/store';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { customizeFullName } from 'src/utils/helper';
import { today, customizeDate } from 'src/utils/format-time';

import { popFirstAction } from 'src/store/slices/frontAction.slice';
import {
  FrontActionEnum,
  type FrontActionCreate12FreeBonusSale,
  type FrontActionUpdate12FreeBonusSale,
  type FrontActionRemove12FreeBonusSale,
} from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { ConfirmDialog } from 'src/components/Dialog';

import { useCreateSale, useRemoveSale, useUpdateSale } from '../Sales/useApollo';

export default function FreeShare() {
  const { loading: createLoading, createSale } = useCreateSale();
  const { loading: updateLoading, updateSale } = useUpdateSale();
  const { loading: removeLoading, removeSale } = useRemoveSale();
  const open = useBoolean();

  const frontActions = useSelector((state: RootState) => state.frontActions.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (frontActions?.length) {
      open.onTrue();
    } else {
      open.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frontActions]);

  if (!frontActions?.length) {
    return null;
  }

  const frontAction = frontActions[0];

  const createExtra = frontAction?.extra as FrontActionCreate12FreeBonusSale;
  const updateExtra = frontAction?.extra as FrontActionUpdate12FreeBonusSale;
  const removeExtra = frontAction?.extra as FrontActionRemove12FreeBonusSale;

  const handleCreateSale = async () => {
    const { data } = await createSale({
      variables: {
        data: {
          memberId: createExtra.memberId,
          orderedAt: customizeDate(today('YYYY-MM-DD')),
          packageId: createExtra.packageId,
          sponsorCnt: createExtra.sponsorCnt,
          paymentMethod: createExtra.paymentMethod,
          status: true,
        },
      },
    });

    if (data) {
      toast.success('Created successfully!');

      dispatch(popFirstAction());
    }
  };

  const handleUpdateSale = async () => {
    const { data } = await updateSale({
      variables: {
        data: {
          id: updateExtra.id,
          packageId: updateExtra.newPackageId,
          status: updateExtra.status,
        },
      },
    });

    if (data) {
      toast.success('Updated successfully!');

      dispatch(popFirstAction());
    }
  };

  const handleRemoveSale = async () => {
    const { data } = await removeSale({
      variables: {
        data: {
          id: removeExtra.id,
        },
      },
    });

    if (data) {
      toast.success('Removed successfully!');

      dispatch(popFirstAction());
    }
  };

  const content = (
    <>
      <Typography sx={{ mb: 2 }}>{frontAction?.message}</Typography>
      {frontAction?.action === FrontActionEnum.Create12Freebonussale && (
        <Stack direction="row" spacing={2}>
          <Stack>
            <Typography fontWeight={700} variant="body2">
              Full Name:
            </Typography>
            <Typography fontWeight={700} variant="body2">
              Package:
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body2">{customizeFullName(createExtra.fullName)}</Typography>
            <Typography variant="body2">{createExtra.packageName}</Typography>
          </Stack>
        </Stack>
      )}
      {frontAction?.action === FrontActionEnum.Update12Freebonussale && (
        <Stack direction="row" spacing={2}>
          <Stack>
            <Typography fontWeight={700} variant="body2">
              Old Package Name:
            </Typography>
            <Typography fontWeight={700} variant="body2">
              New Package Name:
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body2">{updateExtra.oldPackageName}</Typography>
            <Typography variant="body2">{updateExtra.newPackageName}</Typography>
          </Stack>
        </Stack>
      )}
    </>
  );

  return (
    <ConfirmDialog
      open
      onClose={() => {
        open.onFalse();
        dispatch(popFirstAction());
      }}
      title="1-2-Free Share"
      content={content}
      action={
        <LoadingButton
          variant="contained"
          color="success"
          loading={
            frontAction?.action === FrontActionEnum.Create12Freebonussale
              ? createLoading
              : frontAction?.action === FrontActionEnum.Update12Freebonussale
                ? updateLoading
                : removeLoading
          }
          onClick={async () => {
            if (frontAction?.action === FrontActionEnum.Create12Freebonussale) {
              await handleCreateSale();
            }

            if (frontAction?.action === FrontActionEnum.Update12Freebonussale) {
              await handleUpdateSale();
            }

            if (frontAction?.action === FrontActionEnum.Remove12Freebonussale) {
              await handleRemoveSale();
            }
          }}
        >
          OK
        </LoadingButton>
      }
    />
  );
}
