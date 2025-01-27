import { Row } from "@tanstack/react-table";
import clsx from "clsx";

type Props<TData> = {
  row: Row<TData>;
  displayOnhover?: boolean;
  className?: string;
};

export default function RowActions<TData>({
  row,
  className,
  displayOnhover = true,
}: Props<TData>) {
  const rowActions = row.getRowActions();
  return (
    <div
      role="cell"
      className={clsx(
        "sticky right-0 z-30 flex h-full max-w-28 justify-end gap-1 whitespace-nowrap bg-inherit px-3 py-2",
        {
          "opacity-0": displayOnhover,
          "group-hover:opacity-100": displayOnhover,
        },
        className,
      )}
    >
      {rowActions
        .filter(({ isHidden }) =>
          typeof isHidden === "function" ? !isHidden(row) : !isHidden,
        )
        .map(({ Component, onAction, name }) => (
          <Component key={name} row={row} onClick={() => onAction(row)} />
        ))}
    </div>
  );
}
