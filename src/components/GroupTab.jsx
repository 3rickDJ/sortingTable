import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddTestButton from './AddTestButton';


export default function GroupTabs (props) {
  const {
    currentTab, setCurrentTab,
    testGroup, setTestGroup,
    fetchedData
  } = props


  const handleChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  const addTab = () => {
    const newTab = {
      name: `Grupo ${testGroup.list.length + 1}`,
      items: []
    }
    setTestGroup({ 
      list: [...testGroup.list, newTab]
    })
  }

  const deleteTab = (index) => {
    setCurrentTab(index === 0 ? 0 : index - 1)
    setTestGroup({
      list: testGroup.list.filter((_, i) => i !== index)
    })
  }
  useEffect(() => {
    const current = testGroup.list[currentTab].name
    const items = testGroup.list[currentTab].items.map((item, index) => {
      return (item.id)
    })
    console.log(`Current Tab: ${current} | Items: ${items}`)

  },  [testGroup])

  return (
    <div>
      <button onClick={addTab}>Add Tab</button>
      <AddTestButton
        testGroup={testGroup}
        setTestGroup={setTestGroup}
        currentTab={currentTab}
        fetchedData={fetchedData}
      />
      <Tabs value={currentTab} onChange={handleChange}>
        {testGroup.list.map((tab, index) => (
          <Tab key={index}  
            label={
              <div>
                {tab.name}
                { index !== 0 ? (
                  <IconButton onClick={() => deleteTab(index)} component="span">
                    <DeleteIcon />
                  </IconButton>
                ) : null }
              </div>
            }
          />
        ))}
      </Tabs>
      <TableHeader
        items={testGroup}
        setItems={setTestGroup}
        currentTab={currentTab}
      />
    </div>
  )
}