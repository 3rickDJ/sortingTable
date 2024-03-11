import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import TableHeader from './TableHeader'

export default function GroupTabs (props) {
  const [tabs, setTabs] = useState([])
  const {
    currentTab, setCurrentTab,
    testGroup, setTestGroup
  } = props

  const addTab = () => {
    const newTabs = [...tabs, `Tab ${tabs.length + 1}`]
    setTabs(newTabs)
    setCurrentTab(newTabs.length - 1)
  }
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue)
  }
  return (
    <div>
      <Tabs value={currentTab} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
      <Typography>{tabs[currentTab]}</Typography>
      <TableHeader currentTab={currentTab} items={testGroup} setItems={setTestGroup}/>
      <button onClick={addTab}>Add Tab</button>
    </div>
  )
}