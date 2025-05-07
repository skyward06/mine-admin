import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';

import { Form, Field } from 'src/components/Form';

import { Schema, type SchemaType } from './schema';

interface Props {
  setWhen: Function;
}

export default function ProContent({ setWhen }: Props) {
  const defaultValues: SchemaType = {
    minute: '*',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
  };

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (newData) => {
    setWhen(
      `${newData.minute} ${newData.hour} ${newData.dayOfMonth} ${newData.month} ${newData.dayOfWeek}`
    );
  });

  return (
    <Stack mb={2}>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack direction="row" spacing={2}>
          <Field.Text name="minute" sx={{ width: 80 }} size="small" />
          <Field.Text name="hour" sx={{ width: 80 }} size="small" />
          <Field.Text name="dayOfMonth" sx={{ width: 80 }} size="small" />
          <Field.Text name="month" sx={{ width: 80 }} size="small" />
          <Field.Text name="dayOfWeek" sx={{ width: 80 }} size="small" />
        </Stack>
      </Form>
    </Stack>
  );
}
