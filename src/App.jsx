import { useEffect, useState } from 'react';
import './App.css';
import fetchProfiles from './data/fetchProfiles.json'
import fetchTests from './data/fetchTests.json'
import { Container, Grid } from '@mui/material';
import AddItem from './componentsSortTable/AddItemButton.jsx';
import SortTable from './componentsSortTable/SortTable.jsx';

const gen_id = (options, isTest) => {
  const with_sortId = options.map((option, index) => {
    const originalId = option.id
    const sortId = isTest ? `${originalId}Test` : `${originalId}Profile`
    return ({...option, sortId})
  })
  return with_sortId
}

export default function App() {
  const [tests, setTests] = useState([])
  const [optionTests, setOptionTests] = useState([])
  const [optionProfiles, setOptionProfiles] = useState([])
  const [profiles, setProfiles] = useState([])
  const [sortOrder, setSortOrder] = useState([])

  useEffect(() => {
    setOptionTests(fetchTests.data)
    setOptionProfiles(fetchProfiles.data)
  }, [])


  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* //HEADER */}
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid item xs={2}>
                <h2>Perfiles y Pruebas</h2>
              </Grid>
              <Grid item xs={2}>
                <AddItem
                  optionTests={gen_id(optionTests, true)}
                  optionProfiles={gen_id(optionProfiles, false)}
                  setSortOrder={setSortOrder}
                  sortOrder={sortOrder}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* //BODY */}
          <Grid item xs={12}>
            <SortTable 
              tests={tests}
              profiles={profiles}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}