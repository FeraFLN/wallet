import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, MenuItem, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import KeyIcon from '@mui/icons-material/Key';
import MessageDialog from "./MessageDialog";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { dynamicStyle } from "../style/Css";

const colors = [
  {
    value: 'black',
    label: 'Preto',    
  },
  {
    value: 'white',
    label: 'Branco',
  },
  {
    value: 'blue',
    label: 'Azul',
  },
  {
    value: 'yellow',
    label: 'Amarelo',
  },
  {
    value: 'green',
    label: 'Verde',
  },
  {
    value: 'red',
    label: 'Vermelho',
  }, 
];

export default function CustomDialog({ open, submit, setOpen }) {

  const [code, setCode] = useState("");
  const [nome, setNome] = useState("");
  // const [error, setError] = useState({ open: false, message: "" })
  const [openDialog, setOpenDialog] = useState(false)
  const [msgError, setMsgError] = useState("")

  const [color, setColor] = useState('');

  const handleChange = (event) => {
    setColor(event.target.value);
  };
  
  const showError = (error) => {
    setMsgError(error)
    setOpen(true)    
    setOpenDialog(true)    
  }

  const handleClose = () => {
    setOpen(false);
    setCode("");
    setNome("");
    setMsgError("")
    setColor("")
    setOpenDialog(false)
  };
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <form onSubmit={(e) => { e.preventDefault(); submit(code, nome,color, handleClose, showError); }}>
          <MessageDialog severity="error" setOpen={setOpenDialog} open={openDialog} message={msgError} />
          <DialogTitle id="form-dialog-title">Informe o codígo do jogo.</DialogTitle>
          <DialogContent>
            <Grid container direction="column">
              <TextField
                autoFocus
                margin="dense"
                id="code"
                label="Código"
                type="text"
                value={code}
                required
                onChange={(e) => { setCode(e.target.value) }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><KeyIcon /></InputAdornment>,
                }}

              />
              <TextField
                id="standard-select-currency"
                select
                label="Cor"
                value={color}
                required
                onChange={handleChange}
              >
                {colors.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Grid container justifyContent="flex-start" alignContent="space-around" alignItems="center" direction="row">
                      <Grid item xs={3} >
                        <Avatar style={dynamicStyle(option.value,'30px')}></Avatar>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" >{option.label}</Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                id="nome"
                label="Nome"
                type="text"
                required
                value={nome}
                onChange={(e) => { setNome(e.target.value) }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AccountCircleRoundedIcon /></InputAdornment>,
                }}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)} color="primary">
              Cancelar
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Entrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div >
  );
}
