

import { useEffect, useState, useMemo, useRef } from 'react'
import { useEvent } from '../../hooks'

import { TableContext } from './TableContext'
import './index.less'

import { useSorter, getSortData } from './hooks'

import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Pagination from './Pagination'

import { TableProps } from './interface'

const Table: React.FC<TableProps> = (props) => {

  const {
    columns = [],
    dataSource,
    scroll,

    pagination
  } = props;

  const scrollWidth = useMemo(() => {
    return scroll && scroll.x ? scroll.x : 0
  }, [scroll])

  const tableRef = useRef<HTMLDivElement>(null)
  const tableHeaderRef = useRef<HTMLDivElement>(null)
  const tableBodyRef = useRef<HTMLDivElement>(null)

  const [isPingeLeft, setPingedLeft] = useState(false)
  const [isPingeRight, setPingedRight] = useState(false)

  const { sorterState, triggerSorter } = useSorter({columns})


  function forceScroll(scrollLeft: number, target: HTMLDivElement | ((left: number) => void)) {
    if (!target) {
      return;
    }
    if (typeof target === 'function') {
      target(scrollLeft);
    } else if (target.scrollLeft !== scrollLeft) {
      target.scrollLeft = scrollLeft;

      if (target.scrollLeft !== scrollLeft) {
        setTimeout(() => {
          target.scrollLeft = scrollLeft;
        }, 0);
      }
    }
  }

  const onInternalScroll = useEvent(({ currentTarget, scrollLeft }: { currentTarget: HTMLElement; scrollLeft?: number }) => {
    const mergedScrollLeft =
      typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft;

    if (tableHeaderRef.current) {
      forceScroll(mergedScrollLeft, tableHeaderRef.current)
    }
    if (tableBodyRef.current) {
      forceScroll(mergedScrollLeft, tableBodyRef.current)
    }

    const measureTarget = currentTarget || tableHeaderRef.current;
    if (measureTarget) {
      const tempScrollWidth = measureTarget.scrollWidth;
      const clientWidth = measureTarget.clientWidth;
      if (tempScrollWidth === clientWidth) {
        setPingedLeft(false);
        setPingedRight(false);
        return;
      }
      setPingedLeft(mergedScrollLeft > 0);
      setPingedRight(mergedScrollLeft < tempScrollWidth - clientWidth);
    }
  })

  const triggerOnScroll = () => {
    if (tableBodyRef.current) {
      onInternalScroll({
        currentTarget: tableBodyRef.current as HTMLElement,
        scrollLeft: tableBodyRef.current?.scrollLeft,
      });
    } else {
      setPingedLeft(false);
      setPingedRight(false);
    }
  };

  // 监听表格大小变化
  useEffect(() => {
    if (!tableRef.current) return;
    const observer = new ResizeObserver(function (entries) {
      console.log(entries);
      if (entries[0].target === tableRef.current) {
        triggerOnScroll()
      }
    });

    observer.observe(tableRef.current);
    console.log(observer)
    return () => {
      observer.disconnect();
    }
  }, [])

  const [innerPagination, setInnerPagination] = useState<{
    current: number;
    pageSize: number;
    total: number;
  }>(() => ({
    current: pagination ? (pagination.current || 1) : 1,
    pageSize: pagination ? (pagination.pageSize || 10) : 10,
    total: dataSource.length
  }));

  const isShowPagination = useMemo(() => {
    if (pagination === false || !dataSource.length) return false;
    return dataSource.length > innerPagination.pageSize;
  }, [pagination, innerPagination, dataSource])

  const pageData = useMemo(() => {

    if (pagination === false) {
      return dataSource;
    }
    const { current = 1, total = 0, pageSize = 5 } = innerPagination;
    if (dataSource.length < total!) {
      if (dataSource.length > pageSize) {
        return dataSource.slice((current - 1) * pageSize, current * pageSize);
      }
      return dataSource;
    }

    return dataSource.slice((current - 1) * pageSize, current * pageSize);

  }, [pagination, innerPagination, dataSource])

  const sortData = useMemo(() => {
    if (!sorterState || !sorterState.sortColKey) return pageData;
    return getSortData(pageData, sorterState)
  }, [sorterState, pageData])

  const paginationChange = ({ current }: { current: number; }) => {
    setInnerPagination((prevState) => {
      return {
        ...prevState,
        current,
        // pageSize
      }
    })
  }

  const tableClassNames = useMemo(() => {

    let classNames = 'table';

    if (isPingeLeft) {
      classNames += ' table-ping-left'
    }
    if (isPingeRight) {
      classNames += ' table-ping-right'
    }

    classNames += ' table-has-fix-left table-has-fix-right'

    return classNames
  }, [isPingeLeft, isPingeRight])

  return (
    <TableContext.Provider value={{
      dataSource: sortData,
      columns, scrollWidth,
      triggerSorter,
      sorterState
    }}>

      <div className="table-wrapper" ref={tableRef}>
        <div
          className={tableClassNames}>
          <div className="table-container">
            <TableHeader
              ref={tableHeaderRef}
              onScroll={onInternalScroll}
            />
            <TableBody
              ref={tableBodyRef}
              onScroll={onInternalScroll}
            />
          </div>
        </div>

        {
          isShowPagination ? (
            <Pagination  {...innerPagination} onChange={paginationChange} />
          ) : null
        }
      </div>
    </TableContext.Provider>
  );
};

export default Table;