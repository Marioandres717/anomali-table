import { createColumnHelper, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { ExpandableColumn } from "../../components";
import { usePixaTable } from "../../hooks";
import { MockDataColumnDefs, MockData } from "../../mocks/handlers/mockData";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";

export const columnHelper = createColumnHelper<MockData>();

export const TableWithDynamicRowHeight: Story = {
  decorators: [
    (Story, context) => {
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          expandable: true,
          theme: context.globals.theme,
          data: context.loaded.data,
          columns: [
            columnHelper.display({
              id: "expander",
              maxSize: 40,
              enableSorting: false,
              enableResizing: false,
              meta: {
                className: "border-r-0",
              },
              cell: ({ row }) => (
                <ExpandableColumn
                  isExpanded={row.getIsExpanded()}
                  toggleExpanded={() => row.toggleExpanded()}
                />
              ),
            }),
            ...MockDataColumnDefs,
          ],
          state: {
            columnPinning: {
              left: ["expander"],
            },
            expanded: {
              "0": true,
              "1": true,
              "2": true,
              "4": true,
            },
          },
          layout: {
            rowHeight: "dynamic",
            enableVirtualization: false,
            maxHeight: 500,
          },
        }),
        [context.loaded.data, context.globals.theme],
      );
      const table = usePixaTable<MockData>(config);
      return (
        <Story
          args={{
            ...context.args,
            table: table as Table<unknown>,
          }}
        />
      );
    },
  ],
};
