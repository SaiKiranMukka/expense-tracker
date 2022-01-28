import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {

  const { id, name, label, value, error=null, onChange, ...other } = props;

  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id={id}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && {error: true, helperText: error})}
      {...other}
    />
  )
}
