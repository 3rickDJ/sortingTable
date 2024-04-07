import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box, InputLabel } from '@mui/material';

export default function EditDialog(props) {
  const { options, setStudies, picked, uid } = props;
  const [open, setOpen] = useState(false);
  const [fee, setFee] = useState(picked);

  const handleClose = () => {
    setOpen(false);
  }
  const handleAccept = () => {
    setOpen(false);
    setStudies((prev) => prev.map((item) => {
      if(item.uid === uid) {
        return {
          ...item,
          pickedFeeConfiguration: fee
        }
      }
      return item;
    }
    ))
  }

  return  (
    <>
      <IconButton aria-label="edit" onClick={()=>setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"
          sx={{ minWidth: 400}}
        >
          {"Datos del examen"}
        </DialogTitle>
        <DialogContent>
          <Box>
            <FormControl fullWidth sx={{ m: 1}}>
              <InputLabel id='fee'>Tarifas</InputLabel>
              <Select
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                variant='outlined'
                label="Tarifas"
                labelId='fee'
              >
                <MenuItem value="" disabled>
                  <em>Selecciona una opción</em>
                </MenuItem>
                {
                  options.map((item) => (
                    <MenuItem key={item.fee.id} value={item.fee.id}>
                      {item.fee.name}
                    </MenuItem>
                  ))
                }

              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAccept} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>

  )
}
import PropTypes from 'prop-types';
EditDialog.propTypes = {
  options: PropTypes.array,
  setStudies: PropTypes.func,
  picked: PropTypes.number,
  uid: PropTypes.string,
}