// import './App.css'

import Table from './components/Table'

import { ColumnsType } from './components/Table/interface'


const columns: ColumnsType<Record<string ,any>>[] = [
  {
    title: '字段1',
    dataIndex: 'name1',
    key: 'name1',
    width: 150,
    fixed: 'left',
    sorter: (a, b) => a.name1 - b.name1,
  },
  {
    title: '字段2',
    dataIndex: 'name2',
    key: 'name2',
    width: 150,
    fixed: 'left'
  },
  {
    title: '字段3',
    dataIndex: 'name3',
    key: 'name3',
    width: 150
  },
  {
    title: '字段4',
    dataIndex: 'name4',
    key: 'name4',
    width: 150
  },
  {
    title: '字段5',
    dataIndex: 'name5',
    key: 'name5',
    width: 150
  },
  {
    title: '字段6',
    dataIndex: 'name6',
    key: 'name6',
    width: 150
  },
  {
    title: '字段7',
    dataIndex: 'name7',
    key: 'name7',
    width: 150,
    fixed: 'right'
  },
  {
    title: '字段8',
    dataIndex: 'name8',
    key: 'name8',
    width: 150,
    fixed: 'right'
  }
]

const dataSource = Array.from({ length: 21 }).map((_, rowIndex) => {
  const temp: Record<string, any> = {};
  Array.from({ length: 8}).forEach((_, i) => {
    temp[`name${i + 1}`] = i + 1 + rowIndex
  })
  return temp
})

function App() {

  return (
    <div style={{ height: '2000px', padding: '24px'}}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: 2,
          pageSize: 10
        }}
      />
    </div>
  )
}

export default App
