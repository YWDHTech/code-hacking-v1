import {
  Paper,
  Skeleton,
  Table as DataTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableColumnType, TableRowType } from "../../helpers/type";

type Props<T> = {
  columns: TableColumnType<T>[];
  rows: (T | TableRowType)[];
  hideIndex?: boolean;
  loading?: boolean;
  emptyTableMessage?: string;
};

export default function Table<T>({
  columns,
  rows,
  hideIndex,
  loading,
  emptyTableMessage,
}: Props<T>) {
  return (
    <TableContainer component={Paper}>
      <DataTable sx={{ width: "100%" }}>
        <TableHead
          sx={{
            backgroundColor: "action.hover",
          }}
        >
          {loading ? (
            <TableRow>
              {[1, 2, 3].map((i) => (
                <TableCell size={"small"} key={i}>
                  <Skeleton width={"100%"} />
                </TableCell>
              ))}
            </TableRow>
          ) : (
            <TableRow>
              {hideIndex ? null : (
                <TableCell
                  size={"small"}
                  sx={{ textTransform: "uppercase", fontSize: 12 }}
                  align={"left"}
                  variant={"head"}
                >
                  #
                </TableCell>
              )}
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  size={"small"}
                  sx={{ textTransform: "uppercase", fontSize: 12 }}
                  width={column.width}
                  align={column.align}
                  variant={"head"}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableHead>
        {loading ? (
          <TableBody>
            {[1, 2, 3].map((r) => (
              <TableRow key={r}>
                {[1, 2, 3].map((i) => (
                  <TableCell key={i}>
                    <Skeleton width={"100%"} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : rows.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={columns.length + (hideIndex ? 0 : 1)}
                align={"center"}
                variant={"body"}
              >
                {emptyTableMessage || "Nothing to show"}
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {rows.map((row: any, rIndex) => (
              <TableRow
                key={rIndex}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {hideIndex ? null : (
                  <TableCell align={"left"} variant={"body"}>
                    {rIndex + 1}
                  </TableCell>
                )}
                {columns.map((column, cIndex) => (
                  <TableCell
                    key={cIndex}
                    width={column.width}
                    align={column.align}
                    variant={"body"}
                  >
                    {column.render
                      ? column.render({
                          value: row[column.key],
                          colIndex: cIndex,
                          rowIndex: rIndex,
                          row,
                        })
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </DataTable>
    </TableContainer>
  );
}
