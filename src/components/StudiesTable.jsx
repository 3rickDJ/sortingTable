import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

export default function StudiesTable(props) {

  const { options, testHashById, studies, setStudies } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Código</TableCell>
            <TableCell align="right">Clave</TableCell>
            <TableCell align="right">Título</TableCell>
            <TableCell align="right">Tarifa</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studies.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id} </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.code}</TableCell>
              <TableCell align="right">{row.clave}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.pickedFeeConfig}</TableCell>
              <TableCell align="right">{JSON.stringify(row.feeConfigurations)}</TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={2}>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="info">
                    <InfoIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import PropTypes from 'prop-types';

StudiesTable.propTypes = {
  options: PropTypes.array.isRequired,
  testHashById: PropTypes.object.isRequired,
  studies: PropTypes.array.isRequired,
  setStudies: PropTypes.func.isRequired,
};