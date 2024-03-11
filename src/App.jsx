import { useState } from 'react';
import './App.css';
import TableHeader from './components/TableHeader'
import data from '../testRawData.json';
import GroupTabs from './components/GroupTab';
const fetchedData = data.data
const stateData = fetchedData.slice(4)
const testGroupData = {
  list: [
    {
      name: 'Grupo 1',
      items: stateData
    },
    {
      name: 'Grupo 2',
      items: fetchedData.slice(5, 8)
    },
    {
      name: 'Grupo 3',
      items: []
    }
  ]
}
export default function App() {
  const [items, setItems] = useState([]);
  const fetchedTestData = fetchedData
  const props = { items, setItems }
  const [testGroup, setTestGroup] = useState(testGroupData)
  const [currentTab, setCurrentTab] = useState(1)

  return (
    <>
      <GroupTabs {...props} />
      <h1>Sortable List</h1>
      <TableHeader currentTab={currentTab} items={testGroup} setItems={setTestGroup}/>
    </>
  )
}