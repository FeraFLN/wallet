import { Button, Grid, Paper, TextField, Typography, InputAdornment } from "@material-ui/core";
import { useEffect } from "react";
import { del, get, patch, put } from '../data/Request'
import { useNavigate, useParams } from "react-router-dom";
import PlayerList from "./PlayerList";
import MessageDialog from "./MessageDialog";
import { useState } from "react";
import { PlayCircleFilledWhiteOutlined } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function HostGame({ setShowBackdrop, classes,notification,connectWebSocket,sendNotification,callBackUpdateScreen }) {
    const navigate = useNavigate();
    let { code } = useParams()
    const [game, setGame] = useState()
    const [ready, setReady] = useState(false)
    const [value, setValue] = useState(0)
    const [players, setPlayers] = useState([])
    const [error, setError] = useState({ open: false, message: "" })
    
    useEffect(() => {
        const setValues = (gameValue) => {
            setGame(gameValue)
            setValue(gameValue.initialValue)
            setPlayers(gameValue.players)
            setReady(gameValue.ready)
        }
        const refresh = () => {
            get("/game/" + code, null, (response) => {
                setValues(response)            
            }, (error) => {
                navigate("/")
            })
        }
        setShowBackdrop(false)
        refresh();
        connectWebSocket(code,"Bank")
        callBackUpdateScreen(setValues)
    }, [])

    
    

    function quitGame(playerName) {
        setShowBackdrop(true)
        put("/game/quit/" + code + "/" + playerName, null, (response) => {
            setTimeout(() => {
                setShowBackdrop(false)
                console.log("quit",response )
                sendNotification(sendRemovePlayerMessage(playerName,code,response))
            }, 1000);
        }, (error) => {
            setShowBackdrop(false)
            setError({ open: true, message: error })
        })
    }

    
    function endGame() {
        console.log('Ending game!')
        del("/game/endgame/" + code,  () => {
            console.log("retorno do fim do jogo!")
            sendNotification(sendEndGameMessage(code))
        }, (error) => {
            setError({ open: true, message: error })
        })
        navigate("/" );
    }
  
    function setInitialBalance(e) {
        patch("/game/initialbalance/" + code + "/" + value, null, (response) => {
            setGame(response)
            setPlayers(response.players)
            sendNotification(sendNewValueMessage(value, code,response))
        }, (error) => {
            setError({ open: true, message: error })
        })
    }

    
    function startGame(e) {
        e.preventDefault();
        setGame(game)
        patch("/game/startgame/" + code, null, (response) => {
            setShowBackdrop(true)
            sendNotification(sendStartMessage(code,response))
            setTimeout(() => {
                navigate("/wallet/" + code + "/Bank");
                setShowBackdrop(false);
            }, 2000);

        }, (error) => {
            setError({ open: true, message: error })
        })
    }
    
    return (
        <form onSubmit={(e) => { startGame(e) }}>
            <Grid container>
                <Grid container justifyContent="center" alignContent="center" alignItems="center" direction="column" className={classes.headerGrid} >
                    <Grid item className={classes.item}>
                        <Paper className={classes.papercode} elevation={5}>
                            <Typography variant="h5" className={classes.gamecode}>{code}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item className={classes.item}>
                        <Typography variant="subtitle1" className={classes.codecaption}>BANK</Typography>
                    </Grid>

                </Grid>
                <Grid container justifyContent="flex-start" alignContent="flex-start" alignItems="stretch" direction="column" className={classes.bodyGrid}>
                    <Grid container direction="row" justifyContent="flex-start" alignContent="stretch" alignItems="stretch" >
                        <Grid item style={{ width: "50%" }}>
                            <Button onClick={() => { endGame() }} variant="contained" fullWidth startIcon={<LogoutIcon />}>Sair</Button>
                        </Grid>
                        <Grid item style={{ width: "50%" }}>
                            <Button type="submit" disabled={!ready} variant="contained" fullWidth endIcon={<PlayCircleFilledWhiteOutlined />}>Iniciar</Button>
                        </Grid>
                    </Grid>
                    {notification}
                    <MessageDialog severity="error" setOpen={setError} open={error.open} message={error.message} />
                    <Grid item style={{ margin: "0 15px" }}>
                        <TextField
                            margin="dense"
                            required
                            label="VALOR INICIAL"
                            type="Number"
                            fullWidth
                            value={value}
                            onChange={(e) => { setValue(e.target.value) }}
                            onBlur={(e) => { setInitialBalance() }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="standard" />
                    </Grid>
                    <Grid item>
                        <PlayerList classes={classes} players={players} createSecondaryAtcion deleteAction={quitGame}/>
                    </Grid>
                </Grid>

            </Grid>
        </form>
    );
}

const sendStartMessage = (code,game) => {
    return  {
        senderName: "Bank",
        codeGame: code,
        message: "O jogo iniciará em instantes!",
        json:JSON.stringify(game),
        update: true 
    }
}
const sendNewValueMessage = (value, code,game) => {
    return  {
        senderName: "Bank",
        codeGame: code,
        message: "O banco alterou o valor inicial para " + value,
        json:JSON.stringify(game),
        update: true 
    }
}
export const sendEndGameMessage = ( code) => {
    return  {
        senderName: "Bank",
        codeGame: code,
        message: "A partida foi encerrada",
        update: false 
    }
}
const sendRemovePlayerMessage = (playerName, code, game) => {
    return {
        senderName: "Bank",
        codeGame: code,
        json: JSON.stringify(game),
        message: playerName +" foi removido!",
        update: true
    }    
}
