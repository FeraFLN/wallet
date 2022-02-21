import { Button, Grid, Paper, TextField, Typography, InputAdornment, Avatar } from "@material-ui/core";
import { useEffect } from "react";
import { get, patch } from '../data/Request'
import { useNavigate, useParams } from "react-router-dom";
import PlayerList from "./PlayerList";
import MessageDialog from "./MessageDialog";
import { useState } from "react";
import { ExitToApp, PlayCircleFilledWhiteOutlined } from "@mui/icons-material";
import {Notification} from "./Notification";
import { sendPublicMessage } from "../data/WebSocket";

export default function HostGame({setShowBackdrop, classes }) {
    const navigate = useNavigate();
    const { code } = useParams()
    const [game, setGame] = useState()
    const [value, setValue] = useState(0)
    const [error, setError] = useState({ open: false, message: "" })
    const [openNotification, setOpenNotification] = useState(true)
     
    useEffect(() => {       
        refresh();        
    }, [])
    
    const receiveMessage = (msg)=>{
        setGame(msg.game)
    }

    const refresh = ()=>{
        get("/game/" + code, null, (response) => {
            setGame(response)            
            setValue(response?.players[0]?.balance)
        }, (error) => {
            navigate("/") 
        })
    }

    function endGame() {
        console.log('Ending game!')        
    }

    
    function setInitialBalance(e) {
        patch("/game/initialbalance/" + code + "/" + value, null, (response) => {            
            setGame(response)
            // sendChangeInitialValue("Bank",value)
        }, (error) => {
            setError({ open: true, message: error })
        })
    }
    
    function startGame(e) {
        e.preventDefault();
        setGame(game)
        patch("/game/startgame/" + code,null,()=>{
            setShowBackdrop(true)
            // sendInitMatch("Bank");
            setTimeout(() => {
                navigate("/wallet/" + code + "/" + game?.bank.name);
                setShowBackdrop(false);
            }, 2000);

        },(error) => {
            setError({ open: true, message: error })
        })
        //call end game endpoint
    }

    return (
        <form onSubmit={(e) => { startGame(e) }}>
            <Grid container>
                <Grid container justifyContent="center" alignContent="center" alignItems="center" direction="column" className={classes.headerGrid} >
                    <Grid item className={classes.item}>
                        <Paper className={classes.papercode} elevation={5}>
                            <Typography variant="h5" className={classes.gamecode}>{game?.code}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item className={classes.item}>
                        <Typography variant="subtitle1" className={classes.codecaption}>BANK</Typography>
                    </Grid>

                </Grid>
                <Grid container justifyContent="flex-start" alignContent="flex-start"  alignItems="stretch" direction="column" className={classes.bodyGrid}>
                    <Grid container direction="row" justifyContent="flex-start" alignContent="stretch" alignItems="stretch" >
                        <Grid item style={{ width: "50%" }}>
                            <Button onClick={()=>{endGame()}} variant="contained" fullWidth><ExitToApp /></Button>
                        </Grid>
                        <Grid item style={{ width: "50%" }}>
                            <Button type="submit" disabled={!game?.ready ? !game?.ready : false} variant="contained" fullWidth><PlayCircleFilledWhiteOutlined /></Button>
                        </Grid>
                    </Grid>
                    <Notification sender="Bank" codeGame={code} actionReceive={receiveMessage} openDialog={openNotification}/>
                    <MessageDialog severity="error" setOpen={setError} open={error.open} message={error.message} />
                    <Grid item style={{margin:"0 15px"}}>
                        <TextField
                            
                            margin="dense"
                            required
                            label="VALOR INICIAL"
                            type="Number"
                            fullWidth
                            value={value}
                            onChange={(e) => { setValue(e.target.value) }}
                            onBlur={(e) => { setInitialBalance()}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="standard" />
                    </Grid>
                    <Grid item>
                        <PlayerList classes={classes} players={game?.players} createSecondaryAtcion />
                    </Grid>
                </Grid>
               
            </Grid>
        </form>
    );
}

