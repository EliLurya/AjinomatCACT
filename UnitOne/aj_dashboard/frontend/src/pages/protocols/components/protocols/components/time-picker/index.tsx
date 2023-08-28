import React, { useState } from "react";
import {
  InputLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

const ProtocolTimePicker: React.FC<any> = ({ onChange, data, extra }) => {
  // Manage the value displayed in the input field
  const [localValue, setLocalValue] = useState<any>(data.value);
  /**
   * handle the changes of input
   * @param event
   * @author Amr
   */

  // Input Validation
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    //prevent "." first
    if (inputValue[0] === ".") return;
    // Remove all characters that are not numbers or a single "."
    const sanitizedValue: string = inputValue.replace(/[^0-9.]/g, "");
    // Create a regular expression to check for multiple decimal points
    const hasMultipleDecimalPoints = /[.].*[.]/.test(sanitizedValue);
    //Check if "-" "=" exist in input field
    const isValid: boolean =
      !sanitizedValue.includes("-") && !sanitizedValue.includes("=");
    // If the input value is valid and doesn't have multiple decimal points, update the input field's value
    if (isValid && !hasMultipleDecimalPoints) {
      setLocalValue(sanitizedValue);
      onChange(sanitizedValue);
    } else {
      // If the input is not valid, do nothing
      setLocalValue(localValue);
    }
  };

  /**
   * update local values and the node's value as well
   * @param _value
   * @author Amr
   */

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
          // Check if the pressed key is not a period (46) and not a digit (48-57)
          const charCode:number = event.which ? event.which : event.keyCode;
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
