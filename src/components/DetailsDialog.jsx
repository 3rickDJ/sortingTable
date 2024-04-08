/* eslint react/prop-types: 0 */
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

function TestDetails(props) {
  const { title, code, clave } = props;
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, margin: 2 }}>
        <Typography variant="button" component="div">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="overline" component="div">
            {clave}
          </Typography>
          <Typography variant="caption" component="div">
            {code}
          </Typography>
        </Box>
      </Box>
  )
}

function ProfileDetails(props) {
  const { title, code, clave, testHashId, tests  } = props;
  return (
      <>
        <Typography variant="button" sx={{
          backgroundColor: 'royalblue', color: 'ghostwhite', padding:1, borderRadius:2,
          fontWeight: 'bold'
          }} component="div">
            {title}
        </Typography>
        <Box sx={{margin: 2, display: 'flex', justifyContent: 'space-between', alignItems:'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="overline" component="div">
            {clave}
          </Typography>

          <Typography variant="caption" component="div">
            {code}
          </Typography>
        </Box>
        <Divider/>
        {tests?.map((test) => {
          const { title, code, clave } = testHashId[test.id]
          return (
            <TestDetails key={test.id} title={title} code={code} clave={clave} />
          )
        }
        )
        }
      </>
  )
}

function ListDetails(props) {
  const { testHashId, row, profilesHashId} = props;
  const { type, code, clave, title, tests, profiles } = row;

  if (type === 'test') {
    return <TestDetails title={title} code={code} clave={clave} />
  }
  if (type === 'profile') {
    return (
      <ProfileDetails
        testHashId={testHashId}
        title={title}
        code={code}
        clave={clave}
        tests={tests}
      />
    )
  }
  if (type === 'package') {
    return (
      <>
        {profiles.map((profile) => {
          const { title, code, clave } = profilesHashId[profile.id]
          return (
            <ProfileDetails
              key={profile.id}
              testHashId={testHashId}
              title={title}
              code={code}
              clave={clave}
              tests={profile.tests}
            />
          )
        })}
        {tests.length > 0 && ( <Divider />) }

        { tests.length > 0 && 
          (
            <ProfileDetails
              testHashId={testHashId}
              title={"Pruebas adicionales"}
              code={""}
              clave={""}
              tests={tests}
            />
          )
        }
      </>
    )
  }
}


export default function DetailsDialog(props) {
  const { testHashId, row } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  return  (
    <>
      <IconButton aria-label="info" onClick={()=>setOpen(true)}>
        <InfoIcon />
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
          {"Detalles"}
        </DialogTitle>
        <DialogContent>
          <ListDetails
            testHashId={testHashId}
            row={row}
            profilesHashId={props.profilesHashId}
          />
        </DialogContent>
        <DialogActions sx={{display:'flex',alignItems:'flex-end'}}>
          <Button onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>

  )
}
// import PropTypes from 'prop-types';
// DetailsDialog.propTypes = {
//   options: PropTypes.array,
//   setStudies: PropTypes.func,
//   picked: PropTypes.number,
//   uid: PropTypes.string,
// }