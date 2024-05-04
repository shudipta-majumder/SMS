export const getStyledTableCellDesign = (palette, tableCellClasses) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "600",
    color: "white",
    backgroundColor: palette.customColors.tableHeaderBg,
    ".MuiTableSortLabel-root": {
      "&:hover": {
        color: palette.table.texthover,
      },
    },
    ".MuiButtonBase-root.MuiTableSortLabel-root.Mui-active": {
      color: palette.table.texthover,
    },
    ".MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiTableSortLabel-icon": {
      color: palette.table.texthover,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "500",
    padding: "0px 10px",
    color: palette.table.text,
  },
});

export const getStyledTableRowDesign = ({ palette }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: palette.table.rownth,
  },
  "&:last-of-type td, &:last-of-type th": {
    border: 0,
  },
  "td ": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: palette.table.rowhover,
  },
});

export const getPagenationStyle = ({ palette }) => ({
  "& .MuiTablePagination-spacer": {
    order: 2,
  },
  "& .MuiTablePagination-selectLabel": {
    order: 0,
  },
  "& .MuiTablePagination-select": {
    order: 1,
  },
  "& .MuiTablePagination-displayedRows": {
    order: 3,
  },
  "& .MuiTablePagination-actions": {
    order: 4,
  },
  color: palette.table.text,
  ".MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiSelect-icon": {
    color: palette.table.text,
  },
  ".MuiButtonBase-root.Mui-disabled": {
    color: "#bdbdbd",
  },
});

export const getMenuItemStyle = ({ palette, color, colorX, colorY }) => ({
  MenuProps: {
    sx: {
      ".MuiTablePagination-menuItem": {
        ml: "3px",
        mr: "3px",
        mb: "3px",
        borderRadius: "5px",
        color: palette.table.text,
        ":hover": {
          backgroundColor: colorY,
        },
      },
      ".MuiTablePagination-menuItem.Mui-selected": {
        ml: "3px",
        mr: "3px",
        color: "white",
        borderRadius: "5px",
        backgroundColor: colorX,
        ":hover": {
          backgroundColor: color,
        },
      },
      ".MuiPaper-root": {
        backgroundColor: palette.table.bg,
      },
    },
  },
});
