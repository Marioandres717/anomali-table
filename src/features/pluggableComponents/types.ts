import { Table, Header, Row } from "@tanstack/react-table";

export type PluggableComponents<TData> = {
  PageSize?: React.ComponentType<{ table: Table<TData> }>;
  ExpandableRow?: React.ComponentType<{ row: Row<TData> }>;
  Pagination?: React.ComponentType<{ table: Table<TData> }>;
  HeaderFilter?: React.ComponentType<{ header: Header<TData, unknown> }>;
};

export interface PluggableComponentsOptions<TData> {
  pluggableComponents?: PluggableComponents<TData>;
}

export interface PluggableComponentsTableInstance<TData> {
  getPluggableComponents: () => PluggableComponents<TData>;
  getPageSize: () => PluggableComponents<TData>["PageSize"];
  getPagination: () => PluggableComponents<TData>["Pagination"];
}

export interface PluggableComponentsHeaderInstance<TData> {
  getHeaderFilter: () => PluggableComponents<TData>["HeaderFilter"];
}

export interface PluggableComponentsRowInstance<TData> {
  getExpandableRow: () => PluggableComponents<TData>["ExpandableRow"];
}
