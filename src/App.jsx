import { useEffect, useState } from 'react';
import './App.css';
import { Button, Container, Grid } from '@mui/material';
import { getTest } from 'src/services/TestService';
import { getPackages } from './services/PackageService';
import { getProfile } from './services/ProfileService';
import { Password } from '@mui/icons-material';


const getPriceByFee = (option, fee) => {
  return {}
}
const changeFeeAndPrice = (option, fee) => {
  return {}
}

const getInstructions = (option) => {
  return {}
}

const getComponentTests = (option) => {
  return {}
}

const getComponentPackages = (option) => {
  return {}
}

const flattenTest = (test) => {
  const { id } = test;
  return id
}

const flattenProfiles = (profiles) => {
  return profiles.map( profile => {
    return flattenProfile(profile)
  })
}

const flattenProfile = (profile) => {
  const { id, attributes } = profile;
  return {id, tests: attributes.tests.data.map( test => ({id: test.id}) )}
}

const simplifyTest = ( test ) => {
  const {id, attributes} = test;

}
const simplifyfeeConfigurations = ( feeConfigurations ) => {
  return feeConfigurations.map( ({id, attributes}) => {
    const { fee, price } = attributes;
    return { id, fee: {id: fee.data.id}, price }
  })
}


['code', 'clave', 'title', 'feeConfigurations', 'labInstructions', 'patientInstructions']
const standardize = (options, type) => {
  const transformedOptions = options.map( ({id, attributes}) => {
    const {
      code, clave, title, feeConfigurations, labInstructions, patientInstructions,
      tests, profiles, typeSample
    } = attributes;
    const newOption = {
      id,
      code,
      clave,
      title,
      feeConfigurations: simplifyfeeConfigurations( feeConfigurations.data),
      typeSample: typeSample.data,
      labInstructions,
      patientInstructions,
      type: type,
      tests,
      profiles,
    }
    
    if (type === 'package') {
      newOption.profiles = flattenProfiles( profiles.data )
    }
    if (type === 'profile') {
      newOption.tests = flattenProfiles
    }
    if (type === 'tests') {
      console.log(typeSample)
      1;
    }
    return newOption;
  })

  return transformedOptions;
}



export default function App() {
  // tests, packages and profiles options
  const [tests, setTests] = useState([]);
  const [packages, setPackages] = useState([]);
  const [profiles, setProfiles] = useState([]);

  // selected tests
  // const [selectedTest, setSelectedTest] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseTests = await getTest({ fetchForOrder: true});
        setTests(standardize( responseTests.data.data, 'tests' ));
        console.log( standardize(responseTests.data.data, 'tests') )
        // const responseProfiles = await getProfile();
        // setProfiles(standardize( responseProfiles.data.data, 'profiles') );
        // const responsePackages = await getPackages({ fetchForOrder: true});
        // setPackages(standardize( responsePackages.data.data, 'package' ));
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {tests.map( (item, index) => {
              return (<p key={index}>{JSON.stringify(item)}</p>)
              })
            }
          </Grid>
        </Grid>
      </Container>
    </>
  )
}