import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddTestButton from './AddTestButton';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { TextField } from '@mui/material';


export default function GroupTabs (props) {
  const {
    currentTab, setCurrentTab,
    testGroup, setTestGroup,
    fetchedData
  } = props

  const [open, setOpen] = useState(false)
  const [newTabName, setNewTabName] = useState('')

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
    setOpen(false)
    setNewTabName('')
  }

  const deleteTab = (index) => {
    setCurrentTab( currentTab - 1)
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

  },  [testGroup, currentTab])

  return (
    <div>
      <button onClick={() => setOpen(true)}>Add Tab</button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <TextField
            label="Nombre del grupo"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button onClick={() => setOpen(false)}>Cancelar</button>
          <button onClick={addTab}>Agregar</button>
          </DialogActions>
      </Dialog>

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
                  <IconButton onClick={() => deleteTab(index)}
                  component="span"
                  disabled={currentTab !== index}
                  >
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