import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { isValidUrl } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';

import { CONFIG } from 'src/config';
import { PREPAID_TYPE, EXPLORER_PATH } from 'src/consts';
import { InvoiceStatusEnum } from 'src/__generated__/graphql';

import { Form } from 'src/components/Form';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { EmptyContent } from 'src/components/EmptyContent';

import LinkForm from 'src/sections/Commission/Member/LinkForm';
import { FileManagerNewFolderDialog } from 'src/sections/Sales/Upload';
import { FileRecentItem } from 'src/sections/Sales/List/FileRecentItem';
import { FileRecentItem as EditFileItem } from 'src/sections/Sales/Edit/FileRecentItem';

import { useUpdateInvoice } from '../useApollo';
import { Schema, type SchemaType } from './schema';

import type { Invoice } from './type';

interface Props {
  open: UseBooleanReturn;
  row: Invoice;
}

export default function Detail({ open, row }: Props) {
  const { id, name, status, description, proof, createdAt } = row;

  const noteEdit = useBoolean();
  const fileEdit = useBoolean();
  const linkEdit = useBoolean();

  const [note, setNote] = useState<any>();
  const [files, setFiles] = useState<any>();

  const { loading, updateInvoice } = useUpdateInvoice();

  const defaultValues = useMemo(
    () =>
      proof?.reflinks
        ? Schema.safeParse({ reflinks: proof.reflinks })?.data ?? ({} as SchemaType)
        : {
            reflinks: [
              {
                link: '',
                linkType: '',
              },
            ],
          },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [proof?.reflinks]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const saveNote = async () => {
    try {
      noteEdit.onToggle();

      if (noteEdit.value) {
        await updateInvoice({ variables: { data: { id, note } } });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const saveFile = async () => {
    fileEdit.onToggle();

    if (fileEdit.value) {
      await updateInvoice({
        variables: { data: { id, fileIds: files?.map((file: any) => file.id) } },
      });
    }
  };

  const onDelete = (fileId: string) => {
    setFiles(files?.filter((file: any) => fileId !== file.id));
  };

  const handleUpload = (data: any) => {
    setFiles((prev: any) => [...(prev ?? []), ...data.files]);
  };

  const onSubmit = handleSubmit(async (newData) => {
    if (linkEdit.value) {
      await updateInvoice({ variables: { data: { id, reflinks: newData.reflinks } } });

      if (!loading) {
        linkEdit.onFalse();
      }
    } else {
      linkEdit.onTrue();
    }
  });

  useEffect(() => {
    setNote(proof?.note);
    setFiles(proof?.files);
  }, [proof?.note, proof?.files]);

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 400 } }}
    >
      <ScrollBar
        sx={{
          borderRadius: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h6">{name}</Typography>
          <Stack direction="row" spacing={1}>
            <Typography>
              {status === InvoiceStatusEnum.Paid ? (
                <Iconify icon="mdi:receipt-text-pending" color="green" />
              ) : (
                <Iconify icon="lets-icons:check-fill" color="yellow" />
              )}
            </Typography>
            <Typography>{status === InvoiceStatusEnum.Pending ? 'Pending' : 'Paid'}</Typography>
          </Stack>
        </Stack>

        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1">Info</Typography>

          <Typography variant="body2">{description}</Typography>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Amount:
            </Typography>
            <Typography variant="body2">{proof?.amount}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Created At:
            </Typography>
            <Typography variant="body2">{formatDate(createdAt)}</Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Note</Typography>
            <IconButton onClick={saveNote}>
              <Iconify icon={noteEdit.value ? 'mage:check-circle-fill' : 'solar:pen-2-bold'} />
            </IconButton>
          </Stack>

          {noteEdit.value ? (
            <TextField size="small" value={note} onChange={(e) => setNote(e.target.value)} />
          ) : (
            <Typography variant="body2">{note}</Typography>
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Files</Typography>
            <IconButton onClick={saveFile}>
              <Iconify icon={fileEdit.value ? 'mage:check-circle-fill' : 'solar:pen-2-bold'} />
            </IconButton>
          </Stack>

          {fileEdit.value ? (
            <>
              <FileManagerNewFolderDialog handleUpdate={handleUpload} />
              <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', mt: 1 }}>
                {files?.map((file: any) => (
                  <EditFileItem key={file.id} file={file} onDelete={onDelete} />
                ))}
              </Box>
            </>
          ) : isEmpty(files) ? (
            <EmptyContent />
          ) : (
            files?.map((file: any) => <FileRecentItem key={file.id} file={file} />)
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Form methods={methods} onSubmit={onSubmit}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1">Reference Links</Typography>
              <IconButton type="submit">
                <Iconify icon={linkEdit.value ? 'mage:check-circle-fill' : 'solar:pen-2-bold'} />
              </IconButton>
            </Stack>

            {linkEdit.value ? (
              <LinkForm loading={loading} />
            ) : (
              proof?.reflinks?.map((item) => (
                <Stack direction="row" columnGap={1}>
                  <Typography>{item?.linkType}:</Typography>
                  <Typography
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    <Link
                      to={
                        (isValidUrl(item?.link ?? '')
                          ? item?.link
                          : item?.linkType === PREPAID_TYPE[2]
                            ? `${EXPLORER_PATH}${item.link}`
                            : `${CONFIG.SITE_PATH}/sales/${item?.link}`) ?? ''
                      }
                      target="_blank"
                    >
                      {item?.link}
                    </Link>
                  </Typography>
                </Stack>
              ))
            )}
          </Form>
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}
