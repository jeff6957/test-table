
export type SortOrder = 'descend' | 'ascend' | null;
export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

export interface ColumnsType<RecordType = any> {
  title: string;
  dataIndex: string;
  key?: string;
  fixed?: "left" | "right" | boolean;
  width?: number;
  defaultSortOrder?: SortOrder;
  sorter?: CompareFn<RecordType>
}

// export Data

export interface TableProps<RecordType = any> {
  columns: ColumnsType[];
  dataSource: readonly RecordType[];
  scroll?: {
    x?: number;
    y?: number;
  };
  pagination?:
    | false
    | {
        current?: number;
        pageSize?: number;
        total?: number;
      };
}

export interface TableHeaderProps {
  onScroll: (info: {
    currentTarget: HTMLDivElement;
    scrollLeft?: number;
  }) => void;
}

export interface TableBodyProps {
  onScroll: (info: {
    currentTarget: HTMLDivElement;
    scrollLeft?: number;
  }) => void;
}
