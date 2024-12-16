import React, { useState, useEffect, useRef } from "react";

export interface TableColumn {
  field: string;
  headerName: string;
  editable?: boolean;
  isVisible?: boolean;
}
interface SimpleDataTableProps {
  rows: any[];
  columns: TableColumn[];
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
  pageSizeOptions?: number[];
  initialState?: { pagination: { paginationModel: { pageSize: number; page: number } } };
  setColumns: React.Dispatch<React.SetStateAction<any[]>>;
  EditModal?: React.FC<any>;
  AddModal?: React.FC<any>;
  processRowUpdate: any;
}
interface RowType {
  rawId: string;
  [key: string]: any;
}
const SimpleDataTable: React.FC<SimpleDataTableProps> = ({
  rows,
  columns,
  setRows,
  pageSizeOptions,
  initialState = { pagination: { paginationModel: { pageSize: 10, page: 0 } } },
  setColumns,
  EditModal,
  AddModal,
  processRowUpdate,
}) => {
  const [pageSize, setPageSize] = useState(initialState.pagination.paginationModel.pageSize);
  const [currentPage, setCurrentPage] = useState(initialState.pagination.paginationModel.page);
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({});
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);
  const totalRows = filteredRows ? filteredRows.length : 0;
  const paginatedRows = filteredRows ? filteredRows.slice(currentPage * pageSize, (currentPage + 1) * pageSize) : [];
  const handleOpenAddModal = () => setIsDialogOpen(true);
  const handleCloseAddModal = () => setIsDialogOpen(false);
  const handleEditRow = (row: RowType, event: React.MouseEvent) => {
    setSelectedRow(row);
    setIsDialogOpen(true);
  };
  const handleColumnResizeStart = (e: React.MouseEvent, field: string) => {
    setIsResizing(true);
    setResizingColumn(field);
    document.body.style.cursor = "col-resize";
  };
  const handleColumnResizeMove = (e: MouseEvent) => {
    if (isResizing && resizingColumn) {
      const newWidth = e.clientX - tableRef.current!.getBoundingClientRect().left;
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [resizingColumn]: newWidth,
      }));
    }
  };
  const handleColumnResizeEnd = () => {
    setIsResizing(false);
    setResizingColumn(null);
    document.body.style.cursor = "default";
  };
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleColumnResizeMove);
      document.addEventListener("mouseup", handleColumnResizeEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleColumnResizeMove);
      document.removeEventListener("mouseup", handleColumnResizeEnd);
    };
  }, [isResizing]);
  return (
    <div className="space-y-2 divide-y relative">

      <div className="md:overflow-x-auto w-full lg:h-[73vh] md:h-[60vh] smallScrollbar">
        <table ref={tableRef} className="w-full  ">
          <thead className="sticky py-3 top-0 text-text-primary bg-color-primary-100 z-10">
            <tr>
              <th className="p-1 w-8"></th>
              <th className="p-1 w-8"></th>
              {columns
                .filter((col) => col.isVisible !== false)
                .map((col) => (
                  <th
                    key={col.field}
                    className=" p-1 px-3 bg-color-primary-100"
                    style={{ width: columnWidths[col.field] || "auto" }}
                    onMouseDown={(e) => handleColumnResizeStart(e, col.field)}
                  >
                    {col.headerName}
                    {resizingColumn === col.field && (
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize"
                        style={{ right: "-5px", top: 0 }}
                      ></div>
                    )}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <tr key={row.rawId} className="hover:bg-color-secondary-10 hover:text-text-secondaryacent ">
                  <td className=" px-2 w-8 justify-center">
                    <button
                      type="button"
                      className="text-icon-secondaryacent hover:text-icon-primary duration-150"
                    />
                  </td>
                  <td className=" px-2 w-8 justify-center">
                    <button
                      type="button"
                      className=" text-icon-secondaryacent hover:text-icon-primary duration-150"
                    />
                  </td>
                  {columns
                    .filter((col) => col.isVisible !== false)
                    .map((col) => (
                      <td key={col.field} className="border border-border px-3 p-1 hover:outline-outline">
                        {row[col.field]}
                      </td>
                    ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="p-1 text-center">
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {EditModal && isDialogOpen && selectedRow && (
        <EditModal
        open={isDialogOpen} onClose={handleCloseAddModal}
        />
      )}
    </div>
  );
};
export default SimpleDataTable;
