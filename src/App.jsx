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
  const [testGroup, setTestGroup] = useState(testGroupData)
  const [currentTab, setCurrentTab] = useState(0)
  const condensedProps = {
    currentTab,
    setCurrentTab,
    testGroup,
    setTestGroup
  }

  return (
    <>
      <GroupTabs
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      testGroup={testGroup}
      setTestGroup={setTestGroup}
      />
      <h1>Sortable List</h1>
    </>
  )
}