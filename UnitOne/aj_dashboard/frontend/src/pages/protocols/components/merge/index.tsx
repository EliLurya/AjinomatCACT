import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Handle, Position } from "reactflow";
import Grid from "@mui/material/Grid";
import target from "../../../../images/target.svg";
import source from "../../../../images/source.svg";
import ProtocolTimePicker from "../protocols/components/time-picker";
import dayjs from "dayjs";

const Merge: React.FC<any> = ({ data, isConnectable, id }) => {
  // Handle changes in input values
  const handleChange = (newValue: any, childId: string) => {
    // Call the parent's onChange function with updated value
    data.onChange(id, childId, newValue.toString());
  };

  return (
    <div>
      {/* Merge node */}
      <Card sx={{ maxWidth: 345, width: 250 }} className="node-item ">
        <CardHeader
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
        <CardContent>
          {/* The layout */}
          <Grid container spacing={1} alignItems={"center"}>
            {/* Map over each child input */}
            {(data.children || []).map((input: any, index: number) => (
              <>
                {/* Target handle on the left */}
                <Grid item xs={2} key={`merge-target-${index}`}>
                  <Handle
                    onConnect={data.onConnect}
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
                {/* Input field */}
                <Grid item xs={8} key={`process-field-${index}`}>
                  <ProtocolTimePicker
                    {...(input.props || {})}
                    value={dayjs(input.data.value)}
                    locale="en_US"
                    data={input.data}
                    size="small"
                    onChange={(newValue: any) =>
                      handleChange(newValue, input.id)
                    }
                  />
                </Grid>
                {/* Source handle on the right */}
                <Grid item xs={2} key={`process-source-${index}`}>
                  <Handle
                    onConnect={data.onConnect}
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
          </Grid>
        </CardContent>
        {/* A button for adding child inputs */}
        <CardActions disableSpacing className="node-item-actions">
          <IconButton
            aria-label="add to favorites"
            onClick={() => data.addAction(id)}
          >
            <AddCircleIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Merge;
