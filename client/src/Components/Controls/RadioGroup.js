import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from "@material-ui/core";

export default function RadioGroup(props) {

  const { id, name, label, value, onChange, items } = props;

  return (
    <FormControl>
      <FormLabel required>{label}</FormLabel>
      <MuiRadioGroup row
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {
          items.map(
            (item) => (
              <FormControlLabel key={item.id} value={item.value} control={<Radio />} label={item.label} />
            )
          )
        }
      </MuiRadioGroup>
    </FormControl>
  )
}
