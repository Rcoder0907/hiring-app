import React from "react";

import { IconButton } from '@mui/material';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const InputContainer = styled(TextField)`
  & label.Mui-focused {
    color: #283556;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #283556;
    }
    &:hover fieldset {
      border-color: #283556;
    }
  }
`;

const InputLabelContainer = styled(InputLabel)`
  margin-bottom: 0.5rem;
`;

const CustomInput = (props) => {
  return (
    <>
      <InputLabelContainer>{props?.title}</InputLabelContainer>
      <InputContainer {...props} className={props?.isClose ? "w-95" : "w-100"} />
      {(props?.error && !props?.hideErrorMessage) || props?.helperText ? (
        <FormHelperText className="error">
          {props?.error || props?.helperText}
        </FormHelperText>
      ) : null}
      {
        props?.isClose ?
          <IconButton color="error" size="large">
            <CloseRoundedIcon onClick={props?.handleCancel} />
          </IconButton>
        : null
      }
    </>
  )
}

export default CustomInput;