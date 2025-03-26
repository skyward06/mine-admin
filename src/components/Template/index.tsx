import handlebars from 'handlebars';
import { useState, useEffect } from 'react';
import { Editor, EditorProvider } from 'react-simple-wysiwyg';

import { SAMPLE_VARS } from 'src/consts';

interface Props {
  body: any;
}

export default function EmailTemplateView({ body }: Props) {
  const [html, setHtml] = useState<any>('');

  document.getElementsByClassName('rsw-ce')[0]?.setAttribute('contenteditable', 'false');

  useEffect(() => {
    setHtml(body);
  }, [body]);

  return (
    <EditorProvider>
      <Editor value={handlebars.compile(html)(SAMPLE_VARS)} />
    </EditorProvider>
  );
}
