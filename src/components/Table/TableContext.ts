import { createContext, useContext } from "react";

export const TableContext = createContext<any>(null);
export const useTableContext = () => useContext(TableContext);
