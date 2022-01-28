import React from "react";
import { InputLabel, MenuItem, Select as MuiSelect, FormControl, FormHelperText } from "@material-ui/core";

export default function Select(props) {
  
  const { id, name, label, value, error=null, onChange, options, ...other } = props;

  return (
    <FormControl
      variant="outlined" {...(error && {error: true})}>
        <InputLabel required>{label}</InputLabel>
        <MuiSelect
          id={id}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          {...other}
        >
          {
            options.map(
              item => (<MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>)
            )
          }
        </MuiSelect>
        {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
