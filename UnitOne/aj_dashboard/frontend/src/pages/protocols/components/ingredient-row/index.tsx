import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Handle, Position, useReactFlow } from "reactflow";
import target from "../../../../images/target.svg";
import { IngredientType } from "../../../../types/ModelTypes";
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
  const [value, setValue] = useState<IngredientType>(
    (data?.data.value ?? {}) as IngredientType
  );
  const [amount, setAmount] = useState(data?.data?.value?.amount ?? "");
  const [name, setName] = useState(data?.data?.value?.name ?? "");
  const [unit, setUnit] = useState(data?.data?.value?.unit ?? "g");

  /**
   * this object includes the set methods of component's states
   * so, you can call whatever set method you want by passing the name of state
   * @param name
   * @author Amr
   */
  const set = (name: string) => {
    const setMethods: any = {
      amount: setAmount,
      name: setName,
    };
    return setMethods[name];
  };

  /**
   * handle the changes of component's inputs
   * @param event
   * @author Amr
   */
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = event.target.value;
  if(inputValue[0] === '.')return
  // Remove any non-numeric characters except a single decimal point
  const sanitizedValue = inputValue.replace(/[^0-9.]/g, "");
  // Ensure that there's only one decimal point in the input
  const validValue = sanitizedValue.replace(/\.(?=.*\.)/g, "");
  set(event.target.name)(validValue);
  onChange(index, {
    name,
    amount,
    unit,
    [event.target.name]: validValue,
  });
};


const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const charCode = event.which || event.keyCode;
  const currentValue = event.currentTarget.value;
  const hasDecimalPoint = currentValue?.includes(".");
  if (
    (charCode >= 48 && charCode <= 57) || // Numbers 0-9
    charCode === 8 // Backspace
  ) {
    return;
  }
  // Allow a decimal point only if not already present and prevent any other key presses
  if (charCode === 46 && !hasDecimalPoint) {
    return;
  }
  event.preventDefault();
};

  const isValidConnection = (connection: any) => true;

  const handelIncresing = (ingName: string) => {
    /*  value <= 10 && handelItems(value,name) */
    let newAmount = Number(amount) + 1;
    setAmount(newAmount);
    onChange(index, { name, amount: newAmount, unit, [ingName]: newAmount });
  };

  const handelDecresing = (ingName: string) => {
    if (amount <= 1) {
      setAmount(1);
      return;
    }
    let newAmount = Number(amount) - 1;
    onChange(index, { name, amount: newAmount, unit, [ingName]: newAmount });
    setAmount(newAmount);
  };
  const { ingredients } = useProtocol();


  return (
    <Grid container spacing={0} className="ing-row">
      <Grid item xs={1} className="handle-container-nopdding handle-container">
        <IconButton aria-label="settings" onClick={() => onRemove(data?.id)}>
          <CancelIcon className="deleteingicon" sx={{ fontSize: 40 }} />
        </IconButton>
      </Grid>
      <Grid xs={10} container spacing={0} className="ing_controll">
        <Grid
          xs={1}
          onClick={() => handelDecresing(name)}
          className="design-arrow-ingredient"
        >
          <ArrowLeftOutlinedIcon />
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 2 }} variant="outlined" size="small">
            <Autocomplete
              value={name}
              options={ingredients.map(
                (ingredient: { name: any }) => ingredient.name
              )}
              onChange={(event, newValue) => {
                setName(newValue);
                onChange(index, { name: newValue, amount, unit });
              }}
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
              }}
              onKeyPress={handleKeyPress}
              sx={{
                "& fieldset": { border: "none" },
              }}
            />
          </FormControl>
        </Grid>
        <Grid
          xs={1}
          onClick={() => handelIncresing(name)}
          className="design-arrow-ingredient"
        >
          <ArrowRightOutlinedIcon />
        </Grid>
      </Grid>
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
