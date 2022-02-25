import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useState } from "react";
import MessageDialog from "./MessageDialog";
import { makeStyles } from '@material-ui/core/styles';
import sendMoneyIcon from '../img/send-money2.png'
import receiveMoneyIcon from '../img/receive-money2.png'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        // backgroundColor: "gray",
        maxHeight: 300,
    },
    title: {
        fontWeight: 700,
    }
}));

export default function HistoryDialog({ open, setOpen, history }) {
    const classes = useStyles();
    const [error, setError] = useState({ open: false, message: "" })
   
    const handleClose = () => {
        setOpen(false);
        setError({ open: false, message: "" })
    };
    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <form onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
                    <MessageDialog severity="error" setOpen={setError} open={error.open} message={error.message} />
                    <DialogTitle id="form-dialog-title">Histórico de transferência.</DialogTitle>
                    <DialogContent style={{ width: "380px", padding: "10px" }}>

                        <List dense className={classes.root}>
                            {
                                history?.map((value, index) => {
                                    return (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar src={value?.type ==='R' ? receiveMoneyIcon:sendMoneyIcon} />
                                        </ListItemAvatar>
                                        <ListItemText primary={value?.type ==='R'? "Transferência recebida.":"Transferência enviada."} secondary={value?.name+": "+value?.value} />
                                    </ListItem>)
                                })
                            }                            
                        </List>


                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" type="submit" color="primary">
                            Fechar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    );
}