import { useState } from 'react';
import './App.css';
import TableHeader from './components/TableHeader'
import data from '../testRawData.json';
import GroupTabs from './components/GroupTab';
const fetchedData = data.data
const testGroupData = {
  list: [
    {
      name: 'Pruebas',
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
      fetchedData={fetchedData}
      />
    </>
  )
}