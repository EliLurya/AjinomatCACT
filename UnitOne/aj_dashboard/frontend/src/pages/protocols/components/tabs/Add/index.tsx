import List from "@mui/material/List";
import { Autocomplete, Divider, ListItem, TextField } from "@mui/material";
import options from "../../protocols/partials/options";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState, useEffect } from "react";
import { http } from "../../../../../plugins/axios";
import { getEndpoint } from "../../../../../common/http";

const AddTab: React.FC<any> = ({ addProtocol }) => {
  //List of options to be displayed
  const [optionsList, setOptionsList] = useState<any>([]);
  const [prtocessList, setPrtocessList] = useState<any>([]);
  const [prtocessOptionsList, setPrtocessOptionsList] = useState<any>([]);
  const processOptions = options.find((opt) => opt.label === "Process");
  // Handle selection of a process option
  const [selectedProcess, setSelectedProcess] = useState<any | null>(null);

  // Fetch list of process options
  useEffect(() => {
    http<any>(getEndpoint("cooking_process"), {}).then((response) => {
      setPrtocessList([...response.data.payload]);
    });
  }, []);
  // Build the list of process options based on fetched data
  useEffect(() => {
    setPrtocessOptionsList(
      prtocessList
        //Map's parameter of process
        .map((process: any) => {
          if (process?.parameters?.length) {
            return {
              label: process?.name,
              protocol: "process",
              inputs: process?.parameters
              //Map's input
                ?.map((parameter: any) => {
                  if (parameter.name !== "target_state") {
                    return {
                      type: "TimePicker",
                      props: {
                        name: parameter?.name,
                        unit: parameter?.unit,
                        format: "hh:mm",
                        style: {
                          height: "45px",
                        },
                      },
                    };
                  }
                }) // Remove undefined entries
                .filter((notUndefined: any) => notUndefined !== undefined),
            };
          }
        }) // Remove undefined entries
        .filter((notUndefined: any) => notUndefined !== undefined)
    );
  }, [prtocessList]);
  //handle autocomplete click
  const handleAutocompleteClick = (nestedNode: any) => {
    addProtocol(nestedNode);
    setSelectedProcess(null);
  };
  // Update the list of options based on process options
  useEffect(() => {
    setOptionsList(
      options.map((op) =>
        op.label === "Process"
          ? { ...op, ["children"]: prtocessOptionsList }
          : op
      )
    );
  }, [prtocessOptionsList]);

  return (
    <List>
      {/* Header */}
      <ListItem className="justify-center">Add Protocol</ListItem>
      <Divider />
      {/* Map's options and render each */}
      {options.map((node, index) => (
        <React.Fragment key={`protocol-list-item-${index}`}>
          {/* If isn't "process", does not use with autocomplete */}
          {node.label !== "Process" ? (
            <ListItem disablePadding>
              <ListItemButton onClick={() => addProtocol(node)}>
                <ListItemText primary={node.label} />
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ) : (
            //Autocomplete
            <ListItem disablePadding style={{ marginLeft: "18px" }}>
              <Autocomplete
                style={{ width: "75%", marginRight: "4.1rem" }}
                options={processOptions?.children || []}
                getOptionLabel={(option) => option.label}
                value={selectedProcess}
                onChange={(_, newValue) => {
                  if (newValue) {
                    handleAutocompleteClick(newValue);
                  }
                }}
                // Filter options based on input value (startsWith)
                filterOptions={(options, { inputValue }) =>
                  options.filter((option) =>
                    option.label
                      .toLowerCase()
                      .startsWith(inputValue.toLowerCase())
                  )
                }
                // Render an input field for Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Process"
                    label="Process"
                    variant="standard"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,                      
                    }}
                    // Display the selected process label as the input value
                    value={selectedProcess ? selectedProcess.label : ""}
                  />
                )}
              />
            </ListItem>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default AddTab;
