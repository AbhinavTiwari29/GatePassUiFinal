import React from 'react'

import { styled  } from '@mui/material/styles';
import { TextField, TextareaAutosize } from '@mui/material';

const AddressTextArea = styled((props: any) => <TextareaAutosize {...props} minRows={4} aria-label="maximum height" />)(({ theme }) => ({
    '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
      color: theme.palette.text.secondary,
      opacity: '0.8',
    },
    '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
      color: theme.palette.text.secondary,
      opacity: '1',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[200],
    },
  }));

export default AddressTextArea

