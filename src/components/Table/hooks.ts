import { useEffect, useRef, useState } from "react";

import { CompareFn, ColumnsType, TableProps } from "./interface";

const ASCEND = "ascend";
const DESCEND = "descend";

const toMap = (data: ColumnsType[], key: string) => {
  const map: Record<string, any> = {};
  data.forEach((item: Record<string, any>, index) => {
    map[item[key] || index] = item;
  });
  return map;
};

interface SorterState {
  sortOrder: string;
  sortColKey: string;
  column: ColumnsType;
}

export const useSorter = (props: { columns: ColumnsType[] }) => {
  const { columns } = props;

  const sortStatesRef = useRef(toMap(columns, "dataIndex"));

  const [sorterState, setSorterState] = useState<SorterState>({} as SorterState);



  const triggerSorter = (key: string) => {
    let newSort = ASCEND;
    if (sorterState.sortOrder === ASCEND) {
      newSort = DESCEND;
    } else {
      newSort = ASCEND;
    }
    setSorterState({
      sortOrder: newSort,
      sortColKey: key,
      column: {...sortStatesRef.current[key]}
    });
  };

  return {sorterState, triggerSorter};
};




export const getSortData = (
  data: TableProps['dataSource'],
  sorterState: SorterState
) => {

  if(!sorterState.sortColKey) return data;
  const {
    column: { sorter },
    sortOrder,
  } = sorterState;

  if(!sorter) return data;

  const cloneData = data.slice();

  return cloneData.sort((record1, record2) => {
    const compareResult = sorter(record1, record2);

    if (compareResult !== 0) {
      return sortOrder === ASCEND ? compareResult : -compareResult;
    }

    return 0;
  });
};