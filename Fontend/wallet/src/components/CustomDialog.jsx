import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Delete } from "@mui/icons-material";
import React, {useState } from "react";
import MessageDialog from "./MessageDialog";
export default function CustomDialog({ classes,open, submit, setOpen, player }) {
  
  const [total, setTotal] = useState(0);
  const [error,setError] = useState({open:false,message:""})

  const showError = (error)=>{
    console.log('show Error')
    setError({open:true,message:error})
  }
  
  function add(value) {
    var v = total + value;
    setTotal(v);
  }

  const handleClose = () => {
    setOpen(false);
    setTotal(0);
    setError({open:false,message:""})
  };
  return (
    <div>
      <Dialog open={open}  aria-labelledby="form-dialog-title">
        <MessageDialog severity = "error" setOpen={setError} open={error.open} message={error.message}/>
        <DialogTitle id="form-dialog-title">{'Enviar para ' + player}</DialogTitle>
        <DialogContent>
          <Grid container justifyContent="center" direction="column" >
            <Grid item>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Valor"
                type="number"
                value={total}
                disabled
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <IconButton type="submit" style={{height:'20px'}} onClick={()=>setTotal(0)} edge="end" aria-label="delete"><Delete /></IconButton>
                }}
                fullWidth
              />
            </Grid>
            <Grid container justifyContent="center" direction="row" spacing={1}>
              <Grid item>
                <Button className={classes.valueButton} onClick={() => { add(500000); }} variant="outlined" >+500M</Button>
              </Grid>
              <Grid item>
                <Button className={classes.valueButton} onClick={() => { add(200000); }} variant="outlined" >+200M</Button>
              </Grid>
              <Grid item>
                <Button className={classes.valueButton} onClick={() => { add(100000); }} variant="outlined" >+100M</Button>
              </Grid>
              <Grid item>
                <Button className={classes.valueButton} onClick={() => { add(50000); }} variant="outlined" >+50M</Button>
              </Grid>

            </Grid>
            <Grid container justifyContent="center" direction="row" spacing={2}>
              <Grid item>
                <Button className={classes.valueButton} onClick={() => { add(10000); }} variant="outlined" >+10M</Button>
              </Grid>
              <Grid item>
                <Button className={classes.valueButton} onClick={() => { add(5000); }} variant="outlined" >+5M</Button>
              </Grid>
              <Grid item>
                <Button className={classes.valueButton} onClick={() => { add(1000); }} variant="outlined" >+1M</Button>
              </Grid>

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => { submit(total,handleClose,showError); }} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
