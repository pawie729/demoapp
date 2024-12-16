import React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridSlots,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { Button, Box } from "@mui/material";
import {
  AddOutlined,
  CancelOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  SaveOutlined,
} from "@mui/icons-material";

interface CustomToolbarProps {
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  setRows,
  setRowModesModel,
}) => {
  const handleClick = () => {
    const userId = String(Math.random());
    setRows((oldRows) => [
      ...oldRows,
      { userId, id: "", title: "", body: "", isNew: true },
    ]);
    setRowModesModel((oldModel: any) => ({
      ...oldModel,
      [userId]: { mode: "edit", fieldToFocus: "title" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button startIcon={<AddOutlined />} onClick={handleClick}>
        New Module
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarFilterButton />
      <GridToolbarColumnsButton />
      <GridToolbarExport
        label="" // Removes the label
        icon={<DownloadOutlined />} // Replaces the default icon
      />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

type DataTableProps = {
  rows: any[];
  columns: GridColDef[];
  rowModesModel: GridRowModesModel;
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
  processRowUpdate: (newRow: any) => any;
  handleRowEditStop?: (params: any, event: any) => void; // Optional if not always used
  initialState?: any; // For pagination or other initial configs
  disableColumnMenu?: boolean;
  checkboxSelection?: boolean;
  pageSizeOptions?: number[];
  pagination?: boolean;
  toolbarSlots?: GridSlots["toolbar"];
  toolbarSlotProps?: any;
};

const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  rowModesModel,
  setRows,
  setRowModesModel,
  processRowUpdate,
  handleRowEditStop,
  initialState,
  disableColumnMenu = false,
  checkboxSelection = false,
  pageSizeOptions = [25, 50, 100],
  pagination = true,
  toolbarSlots,
  toolbarSlotProps,
}) => {
  const handleSaveClick = (rawId: GridRowId) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [rawId]: { mode: GridRowModes.View },
    }));
  };

  const handleDeleteClick = (rawId: GridRowId) => () => {
    setRows((prev) => prev.filter((row) => row.rawId !== rawId));
  };

  const handleCancelClick = (rawId: GridRowId) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [rawId]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
    const editedRow = rows.find((row) => row.rawId === rawId);
    if (editedRow?.isNew) {
      setRows((prev) => prev.filter((row) => row.rawId !== rawId));
    }
  };

  const updatedColumns: GridColDef[] = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params: { row: { rawId: any } }) => {
        const rawId = params.row.rawId;
        const isInEditMode = rowModesModel[rawId]?.mode === GridRowModes.Edit;

        return isInEditMode ? (
          <>
            <GridActionsCellItem
              icon={<SaveOutlined />}
              label="Save"
              onClick={handleSaveClick(rawId)}
            />
            <GridActionsCellItem
              icon={<CancelOutlined />}
              label="Cancel"
              onClick={handleCancelClick(rawId)}
            />
          </>
        ) : (
          <>
            <GridActionsCellItem
              icon={<EditOutlined />}
              label="Edit"
              onClick={handleSaveClick(rawId)}
            />
            <GridActionsCellItem
              icon={<DeleteOutlined />}
              label="Delete"
              onClick={handleDeleteClick(rawId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={updatedColumns}
      editMode="row"
      rowModesModel={rowModesModel}
      processRowUpdate={processRowUpdate}
      onRowEditStop={handleRowEditStop}
      disableColumnMenu={disableColumnMenu}
      checkboxSelection={checkboxSelection}
      initialState={initialState}
      pageSizeOptions={pageSizeOptions}
      pagination
      slots={{
        toolbar: (props) => (
          <CustomToolbar
            setRows={setRows}
            setRowModesModel={setRowModesModel}
            {...props}
          />
        ),
      }}
      slotProps={{
        toolbar: toolbarSlotProps,
      }}
      sx={{
        boxShadow: 1,
        borderColor: "primary",
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
      }}
    />
  );
};

export default DataTable;
