import React, { useEffect, forwardRef, useMemo } from 'react'
import { useTableContext } from './TableContext';
import { fillRef } from '../../uitls'
import { getLeftLast, getLeftWidth, getRightWidth, getRightLast } from './utils'

import { TableBodyProps } from './interface'

const TableBody = forwardRef<HTMLDivElement, TableBodyProps>((props, ref) => {

  const { columns, dataSource, } = useTableContext()


  const { onScroll } = props

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const setScrollRef = React.useCallback((element: HTMLElement) => {
    fillRef(ref, element);
    fillRef(scrollRef, element);
  }, []);


  useEffect(() => {
    const onBodyScroll = (e: any) => {
      onScroll(e);
    };

    scrollRef.current?.addEventListener('scroll', onBodyScroll)
    return () => {
      scrollRef.current?.removeEventListener('scroll', onBodyScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const tabelStyle = useMemo(() => {
  //   const style: React.CSSProperties = {
  //     minWidth: '100%',
  //     tableLayout: 'fixed'
  //   }
  //   // if (scrollWidth) {
  //   //   style.width = scrollWidth + 'px'
  //   // }
  //   return style
  // }, [])

  return (
    <div className="table-body" style={{
      overflow: 'auto hidden'
    }} ref={setScrollRef}>
      <table style={{
        minWidth: '100%',
        tableLayout: 'fixed'
      }}>
        <colgroup>
          {
            columns.map((item: any) => {
              return (
                <col key={item.key || item.dataIndex} style={{ width: item.width + 'px' }}></col>
              )
            })
          }
        </colgroup>
        <tbody className="table-tbody">
          <tr className="table-measure-row" style={{
            height: '0px', fontSize: '0px'
          }}>
            {
              columns.map((item: any) => {
                return (
                  <td key={item.key || item.dataIndex} style={{ padding: '0px', border: '0px', height: '0px' }}>
                    <div style={{ height: '0px', overflow: 'hidden' }}>&nbsp;</div>
                  </td>
                )
              })
            }
          </tr>
          {
            dataSource.map((item: any, index: number) => {
              return (
                <tr key={index} data-row-key={index} className="table-row">
                  {
                    columns.map((col: any, index: number) => {
                      let clsssNames = 'table-cell';
                      const style: React.CSSProperties = {};
                      if (col.fixed) {
                        if (col.fixed === 'left') {
                          clsssNames += ' table-cell-fix-left';

                          if (getLeftLast(columns, index)) {
                            clsssNames += ' table-cell-fix-left-last';
                          }
                          style.left = getLeftWidth(columns, index) + 'px'

                        }
                        if (col.fixed === 'right') {
                          clsssNames += ' table-cell-fix-right';

                          if (getRightLast(columns, index)) {
                            clsssNames += ' table-cell-fix-right-last';
                          }
                          style.right = getRightWidth(columns, index) + 'px'
                        }

                        clsssNames += ' table-cell-fix-sticky'
                      }
                      return (
                        <th key={col.key || col.dataIndex} className={clsssNames}
                          style={style}>{item[col.dataIndex]}</th>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
})

export default TableBody