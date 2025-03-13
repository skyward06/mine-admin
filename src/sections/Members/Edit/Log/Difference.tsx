// @ts-ignore
import ReactJsonViewCompare from 'react-json-view-compare';

interface Props {
  before: any;
  after: any;
}

export default function Difference({ before, after }: Props) {
  return <ReactJsonViewCompare oldData={before} newData={after} />;
}
