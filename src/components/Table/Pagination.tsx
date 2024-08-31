import { useMemo } from "react";


const Pagination = (props) => {

  const {
    total = 0,
    current = 1,
    pageSize = 5,
    onChange
  } = props;

  const totalPage = useMemo(() => {
    return Math.ceil(total / pageSize)
  }, [total, pageSize]);

  const prev = () => {
    onChange({
      current: current - 1
    })
  }
  const next = () => {
    onChange({
      current: current + 1
    })
  }

  return (
    <div className="pagination-wrapper">
      <span>共{total}条</span>
      <span className={current === 1 ? 'pagination-btn disabled' : 'pagination-btn'} onClick={prev}>上一页</span>
      {
        Array.from({ length: totalPage }).map((item, index) => {
          return (
            <span
              key={index}
              className={current === index + 1 ? 'pagination-item pagination-item-active' : 'pagination-item'}
              onClick={() => {
                onChange({
                  current: index + 1
                })
              }}
            >{index + 1}</span>
          )
        })
      }
      <span className={current === totalPage ? 'pagination-btn disabled' : 'pagination-btn'} onClick={next}>下一页</span>
    </div>
  )
}

export default Pagination