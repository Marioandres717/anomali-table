import { Table } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { Icon } from "./icon";
import { useOnclickOutside } from "../hooks/useOnClickOutside";
import { useOnCloseEscape } from "../hooks/useOnCloseEscape";
import TableSettings from "./tableSettings";

type Props<T> = {
  table: Table<T>;
};

export function SettingsDropdown<T>({ table }: Props<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [toggleSettings, setToggleSettings] = useState(false);

  useOnclickOutside(dropdownRef, () => setToggleSettings(false));
  useOnCloseEscape(toggleSettings, () => setToggleSettings(false));

  function toggleSettingsHandler() {
    setToggleSettings(!toggleSettings);
  }

  return (
    <div
      data-test-id="table-settings-dropdown"
      ref={dropdownRef}
      className="relative"
    >
      <div
        role="button"
        tabIndex={0}
        className={`flex h-6 w-6 rounded-[3px] p-1 outline-none ${toggleSettings ? "bg-black-10 dark:bg-black-90" : ""}`}
        onClick={toggleSettingsHandler}
        onKeyDown={toggleSettingsHandler}
      >
        <Icon icon="settings" size={16} className="dark:fill-white" />
      </div>
      {toggleSettings && (
        <TableSettings table={table} className="absolute right-0 top-7 z-20" />
      )}
    </div>
  );
}