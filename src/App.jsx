import { useEffect, useState } from 'react';
import './App.css';
import { Button, Container, Grid } from '@mui/material';
import { getTest } from 'src/services/TestService';



export default function App() {
  const [test, setTest] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getTest();
        setTest(response.data.data);
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
            HOLA
            {JSON.stringify(test)}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}