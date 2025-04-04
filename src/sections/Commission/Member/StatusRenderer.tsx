import type { CustomCellRendererProps } from '@ag-grid-community/react';

import axios from 'axios';
import { useState } from 'react';

import Stack from '@mui/material/Stack';

import { CONFIG } from 'src/config';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';
import { FileThumbnail } from 'src/components/FileThumbnail';

import type { WeeklyCommission } from '../type';

export default function StatusRenderer({ data }: CustomCellRendererProps<WeeklyCommission>) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleExport = async (fileData: any, fileType: string) => {
    setLoading(true);

    const token = localStorage.getItem(CONFIG.storageTokenKey);

    const { data: file } = await axios.get(`${fileData.url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'arraybuffer',
    });

    const blob = new Blob([file], { type: fileType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileData.originalName}`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setLoading(false);
  };

  return (
    <Stack direction="row" spacing={1}>
      {data?.qualified && (
        <Label variant="soft" color="success" mt={0.8}>
          Qualified
        </Label>
      )}
      {data?.invoice && (
        <Label variant="soft" color="secondary" mt={0.8}>
          Peer
        </Label>
      )}
      {data?.invoice &&
        data.invoice.proof?.files?.map((item) => (
          <FileThumbnail
            file="png"
            sx={{ width: 24, cursor: 'pointer' }}
            onClick={() => handleExport(item, item.mimeType)}
          />
        ))}

      {loading && <Iconify icon="eos-icons:bubble-loading" sx={{ mt: 1 }} />}
    </Stack>
  );
}
