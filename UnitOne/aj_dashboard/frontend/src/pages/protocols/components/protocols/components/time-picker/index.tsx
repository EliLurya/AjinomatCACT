import { TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  InputLabel,
  FormControl,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  Theme,
} from "@mui/material";

const ProtocolTimePicker: React.FC<any> = ({
  props,
  onChange,
  data,
  value,
  extra,
}) => {
  const [localValue, setLocalValue] = useState<any>(data.value);
  /**
   * handle the changes of input
   * @param event
   * @author Amr
   */
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = event.target.value;

  // Remove all characters that are not numbers or a single "."
  const sanitizedValue = inputValue.replace(/[^0-9.]/g, "");

  // Create a regular expression to check for multiple decimal points
  const hasMultipleDecimalPoints = /[.].*[.]/.test(sanitizedValue);
  const isValid =
    !sanitizedValue.includes("-") && !sanitizedValue.includes("=");

  // If the input value is valid and doesn't have multiple decimal points, update the input field's value
  if (isValid && !hasMultipleDecimalPoints) {
    setLocalValue(sanitizedValue);
    onChange(sanitizedValue);
  } else {
    // If the input is not valid or has multiple decimal points, reset the input field's value
    setLocalValue(localValue); 
  }
};




  /**
   * update local values and the node's value as well
   * @param _value
   * @author Amr
   */
 

  console.log("extra", extra);

  return (
    <FormControl sx={{ m: 1 }} variant="outlined" size="small">
      <InputLabel size="small" id="process-options-label">
        {extra?.name || ""}
      </InputLabel>
      <OutlinedInput
        className={"number-input"}
        type="text"
        value={localValue}
        onChange={handleChange}
        onKeyPress={(event) => {
          const charCode = event.which ? event.which : event.keyCode;
          if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
            event.preventDefault(); // Prevent input of non-numeric characters
          }
        }}
        name="time"
        id="outlined-adornment-weight"
        endAdornment={
          <InputAdornment position="end">
            {extra?.unit?.slice(0, 3) || "min"}
          </InputAdornment>
        }
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
          autocomplete: "off",
        }}
      />
    </FormControl>
  );
};

export default ProtocolTimePicker;
