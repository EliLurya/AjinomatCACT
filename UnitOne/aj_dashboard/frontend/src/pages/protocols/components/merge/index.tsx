import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import IngredientRow from "../ingredient-row";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Handle, Position } from "reactflow";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import target from "../../../../images/target.svg";
import source from "../../../../images/source.svg";
import ProtocolTimePicker from "../protocols/components/time-picker";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import ProtocolSelect from "../protocols/components/select";


const Merge: React.FC<any> = ({ data, isConnectable, id }) => {
  console.log(data);

  const [value, setValue] = useState<any>("");

  const handleChange = (newValue: any, childId: string) => {
    setValue(newValue.toString());
    data.onChange(id, childId, newValue?.toString());
  };

  const getComponent = (componentName: string) => {
    const _components: any = {
      TimePicker: ProtocolTimePicker,
      ProtocolSelect: ProtocolSelect,
    };
    return _components[componentName] as any;
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  const [note, setNote] = useState<boolean>(false);
  const handleMouseEnter = (event: React.MouseEvent, id: any) => {
    setNote(!note);
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345, width: 250 }} className="node-item ">
        <CardHeader
          onMouseEnter={(e) => handleMouseEnter(e, id)}
          onMouseLeave={(e) => handleMouseEnter(e, id)}
          className="node-item-header merge"
          title={<Typography variant="h6">Merge</Typography>}
          action={
            <IconButton
              aria-label="settings"
              className="icon"
              onClick={() => data.onClose(id)}
            >
              <CancelIcon />
            </IconButton>
          }
        />
        {note && (
          <Card sx={{ width: 250 }}>
            <CardHeader
              title={<Typography variant="h6">{id}</Typography>}
            ></CardHeader>
          </Card>
        )}
        <CardContent>
          <Grid container spacing={1} alignItems={"center"}>
            {(data.children || []).map((input: any, index: number) => (
              <>
                <Grid item xs={2} key={`merge-target-${index}`}>
                  <Handle
                    type="source"
                    position={Position.Left}
                    id={`${input.id}-target`}
                    isConnectable={isConnectable}
                    className="handle-circle target"
                    style={{
                      backgroundImage: `url(${source})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Grid>
                <Grid item xs={8} key={`process-field-${index}`}>
                  {React.createElement(getComponent(input.type), {
                    ...(input.props || {}),
                    value: dayjs(input.data.value),
                    locale: "en_US",
                    data: input.data,
                    size: "small",
                    
                    onChange: (newValue: any) =>
                      handleChange(newValue, input.id),
                  })}
                </Grid>
                <Grid item xs={2} key={`process-source-${index}`}>
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={`${input.id}-source`}
                    isConnectable={isConnectable}
                    className="handle-circle"
                    style={{
                      backgroundImage: `url(${target})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Grid>
              </>
            ))}
            {/*<Grid item xs >*/}
            {/*    <Handle type="source" position={Position.Right} id="merge-source" isConnectable={isConnectable}*/}
            {/*            className="handle-circle"*/}
            {/*            style={{*/}
            {/*                backgroundImage : `url(${target})`,*/}
            {/*                backgroundSize: 'cover',*/}
            {/*                backgroundPosition: 'center',*/}
            {/*            }}*/}
            {/*    />*/}
            {/*</Grid>*/}
          </Grid>
        </CardContent>
        <CardActions disableSpacing className="node-item-actions">
          <IconButton
            aria-label="add to favorites"
            onClick={() => data.addAction(id)}
          >
            <AddCircleIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/*<Handle*/}
      {/*    type="source"*/}
      {/*    position={Position.Bottom}*/}
      {/*    id="a"*/}
      {/*    style={handleStyle}*/}
      {/*    isConnectable={isConnectable}*/}
      {/*/>*/}
    </div>
  );
};

export default Merge;
