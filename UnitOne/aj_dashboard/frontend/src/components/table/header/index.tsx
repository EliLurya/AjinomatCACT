import { TableCell, TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";

/**
 * table's header
 * @param columns
 * @constructor
 * @author Amr
 */
const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  actions,
  showStaticColumn = true,
}) => {
  return (
    <TableHead>
      <TableRow>
        {showStaticColumn && <TableCell align="center">#</TableCell>}

        {(columns || [])?.map((column: TableColumns, index: number) =>
          column.isHidden ? (
            ""
          ) : (
            <TableCell key={column.label + index} align="center">
              {column.label}
            </TableCell>
          )
        )}
        {actions && actions?.length > 0 ? (
          <TableCell align="center">Properties</TableCell>
        ) : (
          ""
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
