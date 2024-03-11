import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import TableHeader from './TableHeader'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


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
  const handleClose = (index) => {
    const newTabs = tabs.filter((tab, i) => i !== index)
    setTabs(newTabs)
    setCurrentTab(newTabs.length - 1)
  }
  return (
    <div>
      <Tabs value={currentTab} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <Tab key={index}  
            label={
              <div>
                {tab}
                <IconButton size='small' color="error"
                  onClick={() => handleClose(index) }
                  component="span"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            }
          />
        ))}
      </Tabs>
      <Typography>{tabs[currentTab]}</Typography>
      <TableHeader currentTab={currentTab} items={testGroup} setItems={setTestGroup} />
      <button onClick={addTab}>Add Tab</button>
    </div>
  )
}