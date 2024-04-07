import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import EditDialog from 'src/components/EditDialog.jsx'

const handleDelete = (uid, setList) => {
  setList((prev) => prev.filter((item) => item.uid !== uid));
}
const getPrice = (row) => {
  const feeConfiguration = row.feeConfigurations.find((item) => item.fee.id === row.pickedFeeConfiguration);
  return feeConfiguration ? feeConfiguration.price : 0;

}
export default function StudiesTable(props) {

  const { options, testHashById, studies, setStudies,
    hashedFees
  } = props;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Código</TableCell>
              <TableCell align="right">Clave</TableCell>
              <TableCell align="right">Título</TableCell>
              <TableCell align="right">Tarifas</TableCell>
              <TableCell align="right">PickedFee</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studies.map((row) => {
              return (
                <TableRow
                  key={row.uid}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.id} </TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.code}</TableCell>
                  <TableCell align="right">{row.clave}</TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{hashedFees[row.pickedFeeConfiguration]?.attributes?.abbreviation}</TableCell>
                  <TableCell align="right">{JSON.stringify(row.pickedFeeConfiguration)}</TableCell>
                  <TableCell align="right">{getPrice(row)}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={2}>
                        <EditDialog
                          options={row.feeConfigurations}
                          picked={row.pickedFeeConfiguration}
                          uid={row.uid}
                          setStudies={setStudies}
                        />
                      <IconButton aria-label="delete" onClick={() => handleDelete(row.uid, setStudies)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="info">
                        <InfoIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    
  );
}

import PropTypes from 'prop-types';

StudiesTable.propTypes = {
  options: PropTypes.array.isRequired,
  testHashById: PropTypes.object.isRequired,
  studies: PropTypes.array.isRequired,
  setStudies: PropTypes.func.isRequired,
  hashedFees: PropTypes.object.isRequired,
};