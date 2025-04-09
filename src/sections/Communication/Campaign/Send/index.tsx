import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useQuery } from 'src/routes/hooks';

import { CampaignListType } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';

import SendForm from './SendForm';
import { Templates } from './Templates';
import { MemberListView } from './MemberList';
import { useCreateCampaign, useFetchTemplateById } from '../../useApollo';

interface Props {
  open: UseBooleanReturn;
}

export default function CreateCampaign({ open }: Props) {
  const [step, setStep] = useState<number>(0);
  const [templateId, setTemplateId] = useState<string>();
  const [emails, setEmails] = useState<string[]>();
  const [sender, setSender] = useState<string>();
  const [listExtra, setListExtra] = useState<string>('');
  const [listType, setListType] = useState<CampaignListType>(CampaignListType.All);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { setQueryParams: setQuery }] = useQuery();

  const { template, fetchTemplateById } = useFetchTemplateById();
  const { loading, createCampaign } = useCreateCampaign();

  useEffect(() => {
    fetchTemplateById({ variables: { data: { id: templateId ?? '' } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  const handleClose = () => {
    open.onFalse();
    setStep(0);
    setQuery({});
  };

  const handleSendCampaign = async () => {
    try {
      if (!sender) {
        toast.warning('Sender is required');
        return;
      }

      const { data } = await createCampaign({
        variables: {
          data: {
            sender,
            listType,
            listExtra,
            body: template?.body ?? '',
            subject: template?.subject ?? '',
          },
        },
      });

      if (data) {
        toast.success('Successfully sent!');
        setStep(0);
        open.onFalse();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open.value} onClose={handleClose}>
      <DialogTitle>
        {step === 0 && 'Select Email Template'}
        {step === 1 && 'Member List'}
        {step === 2 && 'Send'}
      </DialogTitle>
      <DialogContent>
        <Paper sx={{ py: 2 }}>
          {step === 0 && <Templates setTemplateId={setTemplateId} />}
          {step === 1 && (
            <MemberListView
              setEmails={setEmails}
              setListType={setListType}
              setListExtra={setListExtra}
            />
          )}
          {step === 2 && (
            <SendForm
              template={template!}
              emails={emails ?? []}
              listType={listType}
              setSender={setSender}
            />
          )}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button variant="soft" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setStep(step - 1);
            setQuery({});
          }}
          disabled={step === 0}
        >
          Previous
        </Button>
        {step === 2 ? (
          <LoadingButton
            variant="contained"
            color="primary"
            loading={loading}
            onClick={handleSendCampaign}
          >
            Send
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (step === 0 && !templateId) {
                toast.error('You must select the email template!');
                return;
              }

              setStep(step + 1);
              setQuery({});
            }}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
