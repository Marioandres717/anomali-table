import {
  Cell,
  Column,
  flexRender,
  RowData,
  TableState,
} from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import classNames from "classnames";

type Props<TData> = {
  cell: Cell<TData, RowData>;
  virtualColumn: VirtualItem<Element>;
  state?: TableState;
  className?: string;
};

export default function ColumnCell<TData>({
  cell,
  virtualColumn,
  className,
}: Props<TData>) {
  const { column, getContext } = cell;
  return (
    <div
      data-id={virtualColumn.key}
      role="cell"
      style={getColumnStyles({ ...column, ...virtualColumn })}
      className={classNames(
        "absolute left-0 top-0 flex min-h-9 items-center overflow-hidden border-r px-3 py-2 last:border-r-0 dark:border-black-92.5",
        column.columnDef.meta?.className,
        className,
      )}
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {flexRender(column.columnDef.cell, getContext())}
      </span>
    </div>
  );
}

function getColumnStyles<TData>({
  columnDef,
  size,
  start,
  getAfter,
  getIsPinned,
}: Column<TData, RowData> & VirtualItem<Element>) {
  const { minSize } = columnDef;
  const isPinned = getIsPinned();
  return {
    textAlign: columnDef.meta?.align,
    padding: columnDef.meta?.padding,
    width: size,
    minWidth: minSize,
    // maxWidth: maxSize,
    transform:
      !isPinned || isPinned === "left"
        ? `translate3d(${start}px, 0, 0)`
        : `translate3d(${getAfter(isPinned)}px, 0, 0)`,
  };
}
