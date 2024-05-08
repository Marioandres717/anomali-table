import { useEffect, useMemo, useState } from "react";
import { TableBase, IndeterminateCheckbox, ExpandableRow } from "./components";
import { TableAnomali } from "./templates";
import {
  ColumnFiltersState,
  ColumnOrderState,
  ExpandedState,
  PaginationState,
  RowSelectionState,
  TableOptions,
  VisibilityState,
  createColumnHelper,
  getExpandedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DEFAULT_TABLE_CONFIG } from "./configs/table.config";
import { MockData } from "./mocks/handlers";

const columnHelper = createColumnHelper<MockData>();

function App() {
  const [data, setData] = useState<MockData[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const config = useMemo<TableOptions<MockData>>(
    () => ({
      ...DEFAULT_TABLE_CONFIG,
      getExpandedRowModel: getExpandedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      manualPagination: false,
      enableRowSelection: true,
      enableExpanding: true,
      state: {
        pagination,
        rowSelection,
        columnVisibility,
        expanded,
        columnOrder,
        columnFilters,
      },
      onPaginationChange: setPagination,
      onRowSelectionChange: setRowSelection,
      onExpandedChange: setExpanded,
      onColumnOrderChange: setColumnOrder,
      onColumnVisibilityChange: setColumnVisibility,
      onColumnFiltersChange: setColumnFilters,
      columns: [
        columnHelper.display({
          id: "expander",
          maxSize: 30,
          enableSorting: false,
          enableResizing: false,
          header: () => <div style={{ width: 15 }} />,
          cell: ({ row }) => (
            <ExpandableRow
              isExpanded={row.getIsExpanded()}
              toggleExpanded={() => row.toggleExpanded()}
            />
          ),
        }),
        columnHelper.display({
          id: "selection",
          maxSize: 40,
          enableSorting: false,
          enableResizing: false,
          enableHiding: false,
          header({ table }) {
            return (
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />
            );
          },
          cell({ row }) {
            return (
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
            );
          },
        }),
        columnHelper.accessor("id", {
          id: "id",
          header: "ID",
          maxSize: 100,
          enableSorting: true,
          enableResizing: true,
          meta: {
            align: "right",
          },
        }),
        columnHelper.accessor("name", {
          id: "name",
          header: "Name",
          maxSize: 200,
          enableSorting: true,
          enableResizing: true,
        }),
        columnHelper.accessor("email", {
          id: "email",
          header: "Email",
          maxSize: 200,
          enableSorting: true,
          enableResizing: true,
        }),
        columnHelper.accessor("address", {
          id: "address",
          header: "Address",
          maxSize: 200,
          enableSorting: true,
          enableResizing: true,
        }),
        columnHelper.accessor("date", {
          id: "date",
          header: "Date",
          maxSize: 200,
          enableSorting: true,
          enableResizing: true,
        }),
        columnHelper.accessor("subscription", {
          id: "subscription",
          header: "Subscription",
          maxSize: 200,
          enableSorting: true,
          enableResizing: true,
        }),
      ],
      data: data,
    }),
    [
      pagination,
      data,
      rowSelection,
      columnVisibility,
      expanded,
      columnOrder,
      columnFilters,
    ]
  );

  useEffect(() => {
    fetchData({ skip: 0, limit: 100 }).then((data) => setData(data));
  }, []);

  return (
    <TableBase options={config}>
      {(table) => (
        <TableAnomali
          theme={"dark"}
          tableInstance={table}
          expandableRowComponent={() => <h1>FOOBAR</h1>}
        />
      )}
    </TableBase>
  );
}

const fetchData = async ({
  skip = 0,
  limit = 10,
}: {
  skip: number;
  limit: number;
}) => {
  const response = await fetch("/api?skip=" + skip + "&limit=" + limit);
  const data = await response.json();
  return data;
};

export default App;
