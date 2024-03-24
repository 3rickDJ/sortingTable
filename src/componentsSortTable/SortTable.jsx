import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button


} from "@mui/material"

export default function SortTable(props) {
  const { tests } = props
  const { profiles } = props
  const { sortOrder, setSortOrder } = props

  const handleDelete = (test) => {
    let newTestGroup = [...sortOrder];
    newTestGroup = newTestGroup.filter((item) => item.sortId !== test.sortId);
    setSortOrder(newTestGroup);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Clave</TableCell>
            <TableCell>Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortOrder.map((test) => (
            <TableRow key={test.sortId}>
              <TableCell component="th" scope="row">
                {test.attributes.title}
              </TableCell>
              <TableCell>{test.attributes.code}</TableCell>
              <TableCell>{test.attributes.clave}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(test)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}