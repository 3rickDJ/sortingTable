import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

export default function GroupTabs () {
  const [tabs, setTabs] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)

  const addTab = () => {
    const newTabs = [...tabs, `Tab ${tabs.length + 1}`]
    setTabs(newTabs)
    setSelectedTab(newTabs.length - 1)
  }
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)
  }
  return (
    <div>
      <Tabs value={selectedTab} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
      <Typography>{tabs[selectedTab]}</Typography>
      <button onClick={addTab}>Add Tab</button>
    </div>
  )
}