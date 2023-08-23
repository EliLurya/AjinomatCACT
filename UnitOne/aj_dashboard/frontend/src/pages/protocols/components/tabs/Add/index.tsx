import List from "@mui/material/List";
import { Autocomplete, Collapse, Divider, ListItem, TextField } from "@mui/material";
import options from "../../protocols/partials/options";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState, useEffect } from "react";
import { http, useHttp } from "../../../../../plugins/axios";
import { addParamsToEndpoint, getEndpoint } from "../../../../../common/http";

const AddTab: React.FC<any> = ({ addProtocol }) => {
  const [optionsList, setOptionsList] = useState<any>([]);
  const [prtocessList, setPrtocessList] = useState<any>([]);
  const [prtocessOptionsList, setPrtocessOptionsList] = useState<any>([]);
  const processOptions = options.find((opt) => opt.label === "Process");



  useEffect(() => {
    http<any>(getEndpoint("cooking_process"), {}).then((response) => {
      setPrtocessList([...response.data.payload]);
    });
  }, []);
  useEffect(() => {
    setPrtocessOptionsList(
      prtocessList
        .map((process: any) => {
          if (process?.parameters?.length) {
            return {
              label: process?.name,
              protocol: "process",
              inputs: process?.parameters
                ?.map((parameter: any) => {
                  if (parameter.name != "target_state") {
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
                })
                .filter((notUndefined: any) => notUndefined !== undefined),
            };
          }
        })
        .filter((notUndefined: any) => notUndefined !== undefined)
    );
  }, [prtocessList]);
const [selectedProcess, setSelectedProcess] = useState<any | null>(null);

const handleAutocompleteClick = (nestedNode: any) => {
  addProtocol(nestedNode);
  setSelectedProcess(null);
};
  useEffect(() => {
    setOptionsList(
      options.map((op) =>
        op.label == "Process"
          ? { ...op, ["children"]: prtocessOptionsList }
          : op
      )
    );
  }, [prtocessOptionsList]);

  useEffect(() => {
    console.log("optionsList", optionsList);
  }, [optionsList]);

  return (
    <List>
      <ListItem className="justify-center">Add Protocol</ListItem>
      <Divider />
      {options.map((node, index) => (
        <React.Fragment key={`protocol-list-item-${index}`}>
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
            <ListItem disablePadding style={{ marginLeft: "15px" }}>
              <Autocomplete
                style={{ width:"66%" , marginRight:"65px"}}
                options={processOptions?.children || []}
                getOptionLabel={(option) => option.label}
                value={selectedProcess}
                onChange={(_, newValue) => {
                  if (newValue) {
                    handleAutocompleteClick(newValue);
                  }
                }}
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
