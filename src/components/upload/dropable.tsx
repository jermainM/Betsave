import React, { useState } from 'react';
import { Box, Button, styled, Typography } from '@mui/material';

export const DropableUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <DropableUploadContainer onDrop={handleDrop} onDragOver={handleDragOver}>
      <input
        type="file"
        style={{ display: 'none' }}
        id="file-input"
        onChange={handleFileSelect}
      />
      <LabelContainer>
        <Label htmlFor="file-input">Add file</Label>
        <Typography sx={{ color: '#627691' }}>or drop file here</Typography>
      </LabelContainer>

      {file && (
        <Typography sx={{ color: '#627691', mt: 1 }}>
          Selected: {file.name}
        </Typography>
      )}
    </DropableUploadContainer>
  );
};

const DropableUploadContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '120px',
  border: '1px dashed rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: 'transparent',
}));

const LabelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '16px',
}));

const Label = styled('label')(({ theme }) => ({
  color: '#1AE5A1',
  cursor: 'pointer',
}));
