import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Container, Grid } from '@mui/material';
import { getTest } from 'src/services/TestService';
import { getPackages } from './services/PackageService';
import { getProfile } from './services/ProfileService';
import { standardize, hashify } from 'src/logic/order/utils';
import StudiesTable from "src/components/StudiesTable"
import AddStudiesButton from 'src/components/AddStudiesButton';
import FEES from 'src/data/fees.json';




export default function App() {
  // tests, packages and profiles options
  const [tests, setTests] = useState([]);
  const [packages, setPackages] = useState([]);
  const [profiles, setProfiles] = useState([]);

  // selected tests
  const [selectedStudies, setSelectedStudies] = useState([]);
  const [pendingSamples, setPendingSamples] = useState([]);

  const fees = FEES.data;
  const selectedFee = fees[0].id;

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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AddStudiesButton
                  selectedOptions={selectedStudies}
                  setSelectedOptions={setSelectedStudies}
                  options={[...packages, ...profiles, ...tests]}
                  fees={fees}
                  selectedFee={selectedFee}
                />
              </Grid>
              <Grid item xs={12}>
                <StudiesTable
                  options={[...packages, ...profiles, ...tests]}
                  testHashById={testsHash}
                  studies={selectedStudies}
                  setStudies={setSelectedStudies}
                  hashedFees={hashify(fees)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {tests.map((item, index) => {
              return (<p key={index}>{JSON.stringify(item)}</p>)
            })
            }
            <hr />
            {profiles.map((item, index) => {
              return (<p key={index}>{JSON.stringify(item)}</p>)
            })
            }
            <hr />
            {packages.map((item, index) => {
              return (<p key={index}>{JSON.stringify(item)}</p>)
            })
            }
          </Grid>
        </Grid>
      </Container>
    </>
  )
}