import CancelIcon from "@mui/icons-material/Cancel";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IngredientRow from "../ingredient-row";
import { IngredientType } from "../../../../types/ModelTypes";

const Ingredient: React.FC<any> = ({ data, id }) => {

  /**
   * this function handles remove one Ingredient from Ingredient component
   * @param name
   * @author Bilal
   */
  const onRemove = (name: string) => {
    data?.removeIngredient(id, name);
  };

  const onChange = (childIndex: string, value: IngredientType) => {
    data.onChange(id, childIndex, value);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, width: "139.75ch" }} className="node-item">
        <CardHeader
          className="node-item-header ingredient"
          title={<Typography variant="h6">Ingredients</Typography>}
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
          {data.children?.map((node: any, index: number) => (
            <IngredientRow
              data={node}
              isConnectable={true}
              index={node.id}
              key={"ingredient-children-" + index}
              onChange={onChange}
              onRemove={onRemove}
            />
          ))}
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
    </div>
  );
};

export default Ingredient;
