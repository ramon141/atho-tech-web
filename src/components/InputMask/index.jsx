import { TextField } from '@mui/material';
import React from 'react';
import ReactInputMask from 'react-input-mask';

export default function InputMaskComponent({ mask, onlyNumbers, value, setValue, ...props }) {

  const onChangeValue = (e) => {
    if (onlyNumbers)
      setValue(e.target.value.replace(/\D/g, ''));
    else
      setValue(e.target.value);
  }

  return (
    <>
      <ReactInputMask mask={mask} value={value} onChange={onChangeValue}>
        {() => <TextField {...props} />}
      </ReactInputMask>
    </>
  )
}
