import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Handle, Position } from "reactflow";
import target from "../../../../images/target.svg";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import useProtocol from "../../partials/hooks";

const IngredientRow: React.FC<any> = ({
  data,
  isConnectable,
  index,
  onChange,
  onRemove,
}) => {
  // Fetch the list of ingredients from useProtocol
  const { ingredients } = useProtocol();
  // Set up state variables for ingredient amount, name, and unit
  const [amount, setAmount] = useState(data?.data?.value?.amount ?? "");
  const [name, setName] = useState(data?.data?.value?.name ?? "");
  const [unit, setUnit] = useState(data?.data?.value?.unit ?? "g");

  // Set the state for specific properties based on the property name
  const set = (name: string) => {
    const setMethods: any = {
      amount: setAmount,
      name: setName,
    };
    return setMethods[name];
  };

  // Handle changes in input fields and validate input before updating
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Check if the input starts with a decimal point and return if true
    if (inputValue[0] === ".") return;
    //Remove non-numeric characters
    const sanitizedValue: string = inputValue.replace(/[^0-9.]/g, "");
    // Ensure that there's only one decimal point
    const validValue: string = sanitizedValue.replace(/\.(?=.*\.)/g, "");
    set(event.target.name)(validValue);
    //Update onChange
    onChange(index, {
      name,
      amount,
      unit,
      [event.target.name]: validValue,
    });
  };

  // Handle key press to allow only numeric input and a single decimal point on input field
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Get the character code from the event
    const charCode: number = event.which || event.keyCode;
    // Get the current value of the input field and check if it contain "."
    const hasDecimalPoint: boolean = event.currentTarget.value?.includes(".");
    if (
      (charCode >= 48 && charCode <= 57) || // Numbers 0-9
      charCode === 8 // Backspace
    ) {
      return;
    }
    // Decimal point = 46
    if (charCode === 46 && !hasDecimalPoint) {
      return;
    }
    // Prevent input of other characters
    event.preventDefault();
  };

  // Check if a connection is valid
  const isValidConnection: (connection: any) => boolean = (connection: any) =>
    true;

  // Handle increasing ingredient amount
  const handelIncresing = (ingName: string) => {
    const newAmount: number = Number(amount) + 1;
    setAmount(newAmount);
    onChange(index, { name, amount: newAmount, unit, [ingName]: newAmount });
  };

  // Handle decreasing ingredient amount
  const handelDecresing = (ingName: string) => {
    //Make sure the input is not less than 1 (0 if you want)
    if (amount <= 1) {
      setAmount(1);
      return;
    }
    const newAmount: number = Number(amount) - 1;
    onChange(index, { name, amount: newAmount, unit, [ingName]: newAmount });
    setAmount(newAmount);
  };

  return (
    <Grid container spacing={0} className="ing-row">
      {/* Delete icon */}
      <Grid item xs={1} className="handle-container-nopdding handle-container">
        <IconButton aria-label="settings" onClick={() => onRemove(data?.id)}>
          <CancelIcon className="deleteingicon" sx={{ fontSize: 40 }} />
        </IconButton>
      </Grid>
      {/* Ingredient controls */}
      <Grid xs={10} container spacing={0} className="ing_controll">
        {/* Decrease amount */}
        <Grid
          xs={1}
          onClick={() => handelDecresing(name)}
          className="design-arrow-ingredient"
        >
          {/* Left arrow */}
          <ArrowLeftOutlinedIcon />
        </Grid>
        {/* Ingredient name */}
        <Grid item xs={6}>
          <FormControl sx={{ m: 2 }} variant="outlined" size="small">
            {/*  When a new value is selected from the Autocomplete dropdown,
                update the 'name' state and call the 'onChange' function 
                with the updated values for the ingredient. */}
            <Autocomplete
              value={name}
              options={ingredients.map(
                (ingredient: { name: any }) => ingredient.name
              )}
              onChange={(event, newValue) => {
                setName(newValue);
                onChange(index, { name: newValue, amount, unit });
              }}
              // Filter the available options in the Autocomplete by startWith
              filterOptions={(options, { inputValue }) =>
                options.filter((option) =>
                  option.toLowerCase().startsWith(inputValue.toLowerCase())
                )
              }
              // Render the input field for the Autocomplete component.
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="name"
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    ...params.inputProps,
                    "aria-label": "weight",
                    style: {
                      border: "none",
                    },
                  }}
                  sx={{
                    "& fieldset": { border: "none" },
                    width: "130%",
                    textAlign: "start",
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
        {/* Ingredient amount */}
        <Grid item xs={4}>
          <FormControl sx={{ m: 1 }} variant="outlined" size="small">
            <OutlinedInput
              className={"number-input"}
              type="text"
              value={amount}
              onChange={handleChange}
              name="amount"
              id="outlined-adornment-weight"
              endAdornment={
                <InputAdornment position="end">{unit}</InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
                autoComplete: "off",
              }}
              onKeyPress={handleKeyPress}
              sx={{
                "& fieldset": { border: "none" },
              }}
            />
          </FormControl>
        </Grid>
        {/* Increase amount */}
        <Grid
          xs={1}
          onClick={() => handelIncresing(name)}
          className="design-arrow-ingredient"
        >
          {/* Right arrow */}
          <ArrowRightOutlinedIcon />
        </Grid>
      </Grid>
      {/* Handle for connecting */}
      <Grid item xs={1} className="handle-container">
        <Handle
          type={data.type}
          position={Position.Right}
          id={index}
          isConnectable={isConnectable}
          className="handle-circle"
          onConnect={data.onConnect}
          style={{
            backgroundImage: `url(${target})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          isValidConnection={isValidConnection}
        />
      </Grid>
    </Grid>
  );
};

export default IngredientRow;
