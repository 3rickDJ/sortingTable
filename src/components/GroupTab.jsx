import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddTestButton from './AddTestButton';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function GroupTabs (props) {
  const {
    testGroup, setTestGroup,
    fetchedData
  } = props
  const [currentTab, setCurrentTab] = useState(0)

  const [open, setOpen] = useState(false)
  const [newTabName, setNewTabName] = useState('')

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  const addTab = () => {
    const newTab = {
      name: `${newTabName}`,
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent={"space-between"}
        >
          <Grid item>
            <button onClick={() => setOpen(true)}>Agregar Grupo</button>

          </Grid>
          <Grid item>

            <AddTestButton
              testGroup={testGroup}
              setTestGroup={setTestGroup}
              currentTab={currentTab}
              fetchedData={fetchedData}
            />
          </Grid>
        </Grid>
      </Box>
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

      <Tabs value={currentTab} onChange={handleChange}>
        {testGroup.list.map((tab, index) => (
          <Tab key={index}
            label={
              <div>
                {tab.name}
                {index !== 0 ? (
                  <IconButton onClick={() => deleteTab(index)}
                    component="span"
                    disabled={currentTab !== index}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
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
