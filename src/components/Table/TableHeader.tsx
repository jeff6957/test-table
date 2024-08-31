
import React, { forwardRef, useEffect } from 'react'
import { useTableContext } from './TableContext';

import { fillRef } from '../../uitls'
import { getLeftLast, getLeftWidth, getRightWidth, getRightLast } from './utils'

import { TableHeaderProps } from './interface'

const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>((props, ref) => {

  const { onScroll } = props

  const { columns, sorterState, triggerSorter } = useTableContext()

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const setScrollRef = React.useCallback((element: HTMLElement) => {
    fillRef(ref, element);
    fillRef(scrollRef, element);
  }, []);


  useEffect(() => {
    function onWheel(e: WheelEvent) {
      const { currentTarget, deltaX } = e as unknown as React.WheelEvent<HTMLDivElement>;
      if (deltaX) {
        onScroll({ currentTarget, scrollLeft: currentTarget.scrollLeft + deltaX });
        e.preventDefault();
      }
    }
    scrollRef.current?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      scrollRef.current?.removeEventListener('wheel', onWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const sorterClick = (item: any) => {
    if(item.sorter === false || item.sorter === undefined) return
    triggerSorter(item.dataIndex)
  }

  return (
    <div
      className="table-header table-sticky-holder"
      style={{
        overflow: 'hidden', top: '0px'
      }}
      ref={setScrollRef}
    >
      <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
          {
            columns.map((item: any) => {
              return (
                <col key={item.key || item.dataIndex} style={{ width: item.width + 'px' }}></col>
              )
            })
          }
        </colgroup>
        <thead className="table-thead">
          <tr>
            {
              columns.map((item: any, index: number) => {
                let clsssNames = 'table-cell';
                const style: React.CSSProperties = {};
                if (item.fixed) {
                  if (item.fixed === 'left') {
                    clsssNames += ' table-cell-fix-left';

                    if (getLeftLast(columns, index)) {
                      clsssNames += ' table-cell-fix-left-last';
                    }
                    style.left = getLeftWidth(columns, index) + 'px'
                  }
                  if (item.fixed === 'right') {
                    clsssNames += ' table-cell-fix-right';

                    style.right = getRightWidth(columns, index) + 'px'
                    if (getRightLast(columns, index)) {
                      clsssNames += ' table-cell-fix-right-last';
                    }
                  }

                  clsssNames += ' table-cell-fix-sticky'

                  if(item.sorter) {
                    clsssNames += ' table-column-sort table-column-has-sorters'
                  }
                }
                return (
                  <th key={item.key || item.dataIndex} className={clsssNames}
                    style={style} onClick={() => sorterClick(item)}>
                    {
                      item.sorter ? (
                        <span className='table-column-sorters'>
                          <span className='table-column-title'>
                            {item.title}
                          </span>
                          {sorterState.sortColKey === item.dataIndex ? (
                            <span className='table-column-sorter'>{sorterState.sortOrder === 'ascend' ? (
                              '升序'
                            ) : (
                              '降序'
                            )}</span>

                          ) : <span className='table-column-sorter'>点击排序</span>}
                        </span>
                      ) : (
                        item.title
                      )
                    }
                  </th>
                )
              })
            }
          </tr>
        </thead>
      </table>
    </div>
  )
})

export default TableHeader