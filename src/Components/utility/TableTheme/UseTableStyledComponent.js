import React from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useOnlyIcon } from "../../Layout/NavContext";
import {
  getStyledTableCellDesign,
  getStyledTableRowDesign,
  getPagenationStyle,
  getMenuItemStyle,
} from "./UseTableTheme";

export const UseTableStyledComponent = () => {
  const { palette, color, colorX, colorY } = useOnlyIcon();

  const StyledTableCellDesign = getStyledTableCellDesign(
    palette,
    tableCellClasses
  );
  const StyledTableCell = (props) => {
    const { sx, ...other } = props;
    return <TableCell sx={{ ...StyledTableCellDesign, ...sx }} {...other} />;
  };

  const StyledTableRowDesign = getStyledTableRowDesign({ palette });
  const StyledTableRow = (props) => {
    return <TableRow sx={StyledTableRowDesign} {...props} />;
  };

  const pagenationStyle = getPagenationStyle({ palette });
  const menuItemStyle = getMenuItemStyle({ palette, color, colorX, colorY });

  return { StyledTableCell, StyledTableRow, pagenationStyle, menuItemStyle };
};

