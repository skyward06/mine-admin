import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import TextField from '@mui/material/TextField';

import { CONFIG } from 'src/config';

import { CustomUpload } from 'src/components/Upload';

// ----------------------------------------------------------------------

type Props = {
  folderName?: string;
  handleUpdate: Function;
  onCreate?: () => void;
  onUpdate?: () => void;
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FileManagerNewFolderDialog({
  handleUpdate,
  onCreate,
  onUpdate,
  folderName,
  onChangeFolderName,
}: Props) {
  const [files, setFiles] = useState<(File | string)[]>([]);

  useEffect(() => {
    setFiles([]);
  }, []);

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);

      const token = localStorage.getItem(CONFIG.storageTokenKey);

      const formData = new FormData();

      // Append all accepted files to FormData
      acceptedFiles.forEach((file) => formData.append('payment', file));

      try {
        const { data } = await axios.post(`${CONFIG.SITE_URL}/api/upload/payment`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        });

        handleUpdate(data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  return (
    <>
      {(onCreate || onUpdate) && (
        <TextField
          fullWidth
          label="Folder name"
          value={folderName}
          onChange={onChangeFolderName}
          sx={{ mb: 3 }}
        />
      )}

      <CustomUpload
        multiple
        value={files}
        onDrop={handleDrop}
        onRemove={handleRemoveFile}
        accept={{ images: ['.png', '.jpg', '.jpeg'], files: ['.pdf'] }}
      />
    </>
  );
}
