import { useState } from 'react';
import './App.css';
import TableHeader from './components/TableHeader'
import data from '../testRawData.json';
import GroupTabs from './components/GroupTab';
const fetchedData = data.data
const stateData = fetchedData.slice(4)
export default function App() {
  const [items, setItems] = useState(stateData);
  const props = { items, setItems }

  return (
    <>
      <GroupTabs {...props} />
      <h1>Sortable List</h1>
      <TableHeader items={items} setItems={setItems}/>
    </>
  )
}