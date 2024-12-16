import { useEffect, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import {
  FormContainer,
  FormField,
  FormHeader,
} from "../../../shared/common/Form";
import { Button } from "@mui/material";
import DataTable from "../../../shared/common/DataTable";
import { getModules } from "../services/getModules";
import { GridColDef } from "@mui/x-data-grid";

const Module = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const processRowUpdate = (newRow: { rawId: any; }) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((prev) =>
      prev.map((row) => (row.rawId === newRow.rawId ? updatedRow : row))
    );
    return updatedRow;
  };

  const fetchModulesData = async () => {
    try {
      const data = await getModules();
      const dynamicColumns:GridColDef[] = Object.keys(data[0] || {}).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        flex: 1,
        editable: key !== "rawId",
      }));

      setColumns(dynamicColumns);
      setRows(data);
    } catch (error) {
      alert("Failed to fetch modules. Please check your authentication.");
    }
  };

  useEffect(() => {
    fetchModulesData();
  }, []);

  function handleRowEditStop(params: any, event: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <FormContainer>
      <div className="space-y-2">
        <div className="flex justify-between">
          <FormHeader title="Modules" />
          <Button startIcon={<CloseOutlined />}>Close</Button>
        </div>
        <FormField style={{ height: 100, width: 250 }}>
          <DataTable
            rows={rows}
            columns={columns}
            rowModesModel={rowModesModel}
            setRows={setRows}
            setRowModesModel={setRowModesModel}
            processRowUpdate={processRowUpdate}
            handleRowEditStop={handleRowEditStop}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
            }}
            disableColumnMenu
            checkboxSelection
            pageSizeOptions={[25, 50, 100]}
            pagination
            toolbarSlotProps={{ setRows, setRowModesModel }}
          />
        </FormField>
      </div>
    </FormContainer>
  );
};

export default Module;
