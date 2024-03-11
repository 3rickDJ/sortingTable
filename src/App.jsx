import { useState } from 'react';
import './App.css';
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

  return (
    <>
      <GroupTabs
      testGroup={testGroup}
      setTestGroup={setTestGroup}
      fetchedData={fetchedData}
      />
    </>
  )
}