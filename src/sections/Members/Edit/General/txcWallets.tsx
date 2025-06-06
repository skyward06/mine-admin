import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fetchXmlData } from 'src/utils/helper';

import { TXC_WALLET, ASSET_INFO_PATH } from 'src/consts';

import { Field } from 'src/components/Form';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';

interface Props {
  wallets: any[];
}

interface Wallet {
  id: string;
  payoutId?: string;
  address?: string;
  percent?: number;
  isDefault?: boolean;
}

export default function TXCWallets({ wallets }: Props) {
  const { watch, control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'txcWallets' });

  const forms = fields as Wallet[];

  useEffect(() => {
    if (fields.length === 0) {
      wallets.forEach(({ id, payoutId, address, percent, note, isDefault }) => {
        append({
          id,
          payoutId,
          address,
          percent: percent || 0,
          note: note || '',
          isDefault,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    wallets.forEach(({ payoutId, address, note, percent, isDefault }, index) => {
      setValue(`txcWallets[${index}].payoutId`, payoutId);
      setValue(`txcWallets[${index}].address`, address);
      setValue(`txcWallets[${index}].note`, note);
      setValue(`txcWallets[${index}].percent`, percent / 100);
      setValue(`txcWallets[${index}].isDefault`, isDefault);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets]);

  const addWallet = () => {
    append({
      note: '',
      address: '',
      isDefault: !fields.length,
      payoutId: TXC_WALLET[1].id,
      percent: fields.length ? 0 : 100,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const handleGenerate = async () => {
    try {
      const assetId = watch('assetId');

      const response = await fetchXmlData(`${ASSET_INFO_PATH}${assetId}`);

      if (response) {
        append({
          note: '',
          isDefault: !fields.length,
          payoutId: TXC_WALLET[1].id,
          percent: fields.length ? 0 : 100,
          address: response.getElementsByTagName('publicKey').item(0)?.textContent,
        });
      } else {
        toast.error("Can't find the address from this Coin ID");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pb: 2 }}>
        <Typography variant="subtitle1">TXC Wallets</Typography>

        <IconButton color="default" onClick={handleGenerate}>
          <Iconify icon="streamline:ai-generate-variation-spark-solid" />
        </IconButton>
      </Stack>

      {forms?.map((item, index) => (
        <Stack sx={{ mb: 2 }} key={item.id}>
          <Stack key={item.id} sx={{ mb: 2 }}>
            <Box
              key={item.id}
              rowGap={2}
              columnGap={1}
              display="grid"
              sx={{ mb: 2, gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '30% 50% auto' } }}
            >
              <Field.Select
                name={`txcWallets[${index}].payoutId`}
                label="Payout"
                defaultValue={item.payoutId}
                size="small"
              >
                {TXC_WALLET.map((option) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.method}
                  </MenuItem>
                ))}
              </Field.Select>

              <Field.Text
                name={`txcWallets[${index}].address`}
                label="Address"
                size="small"
                defaultValue={item.address}
              />

              <Field.Text
                name={`txcWallets[${index}].percent`}
                label="Percent"
                type="number"
                size="small"
                defaultValue={item.percent}
              />
            </Box>

            <Box
              display="grid"
              columnGap={2}
              sx={{ gridTemplateColumns: { xs: '60% 15% auto', sm: '70% 15% auto' } }}
            >
              <Field.Text name={`txcWallets[${index}].note`} label="Note" size="small" />

              <Field.Switch name={`txcWallets[${index}].isDefault`} label="Default" />

              <Button color="error" onClick={() => handleRemove(index)}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </Button>
            </Box>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </Stack>
      ))}
      <IconButton
        color="default"
        sx={{
          borderRadius: 0,
          '&:hover': { background: 'transparent', color: '#00A76F' },
        }}
        onClick={addWallet}
      >
        <Iconify icon="bxs:plus-circle" sx={{ mr: 1 }} />
        <Typography>Add Item</Typography>
      </IconButton>
    </Card>
  );
}
