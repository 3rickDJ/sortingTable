import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Container, Grid } from '@mui/material';
import { getTest } from 'src/services/TestService';
import { getPackages } from './services/PackageService';
import { getProfile } from './services/ProfileService';
import { standardize, hashify } from 'src/logic/order/utils';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function App() {
  // tests, packages and profiles options
  const [tests, setTests] = useState([]);
  const [packages, setPackages] = useState([]);
  const [profiles, setProfiles] = useState([]);

  // selected tests
  // const [selectedTest, setSelectedTest] = useState([]);
  const fetchgOptions = useCallback( async () => {
    try {
      const responseTests = await getTest({ fetchForOrder: true});
      setTests(standardize( responseTests.data.data, 'test' ));
      const responseProfiles = await getProfile({ fetchForOrder: true});
      setProfiles(standardize( responseProfiles.data.data, 'profile') );
      const responsePackages = await getPackages({ fetchForOrder: true});
      setPackages(standardize( responsePackages.data.data, 'package' ));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchgOptions();
    // eslint-disable-next-line
  }, []);

  const testsHash = hashify(tests);
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {tests.slice(0,5).map( (item, index) => {
              return (<p key={index}>{JSON.stringify(item)}</p>)
              })
            }
            <hr/>
            {profiles.slice(0,5).map( (item, index) => {
              return (<p key={index}>{JSON.stringify(item)}</p>)
              })
            }
            <hr/>
            {packages.slice(0,5).map( (item, index) => {
              return (<p key={index}>{JSON.stringify(item)}</p>)
              })
            }
          </Grid>
        </Grid>
      </Container>
    </>
  )
}