// @ts-ignore
import ReactJsonViewCompare from 'react-json-view-compare';

interface Props {
  action: string;
  before: any;
  after: any;
}

export default function Difference({ action, before, after }: Props) {
  return (
    <ReactJsonViewCompare
      oldData={action === 'signup' ? before.signupFormRequest : before}
      newData={action === 'signup' ? after.signupFormRequest : after}
    />
  );
}
