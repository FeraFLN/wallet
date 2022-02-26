import { Button, Grid, Paper, TextField, Typography, InputAdornment } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { get, patch, put } from '../data/Request'
import { useNavigate, useParams } from "react-router-dom";
import PlayerList from "./PlayerList";
import {  PlayCircleFilledWhiteOutlined } from "@mui/icons-material";
import MessageDialog from "./MessageDialog";
import LogoutIcon from '@mui/icons-material/Logout';

export default function CreateGame({ setShowBackdrop, classes, notification, connectWebSocket, sendNotification,callBackUpdateScreen }) {
    const navigate = useNavigate();
    const { code } = useParams()
    const { name } = useParams()
    const [game, setGame] = useState({initialValue:0});
    const [readyButton, setReadyButton] = useState(false)
    const [error, setError] = useState({ open: false, message: "" })
    
    useEffect(() => {
        refresh()
        setShowBackdrop(false);
        connectWebSocket(code, name)
        callBackUpdateScreen(update);

    }, [])

    const update =(g) => {
        if (g.startGame) {
            startGame()
            return;
        }
        pickPlayer(g.players)
        setGame(g);

    }
    function quitGame() {
        setShowBackdrop(true)
        put("/game/quit/" + code + "/" + name, null, (response) => {
            setTimeout(() => {
                setShowBackdrop(false)
                sendNotification(sendQuitMessage(name,code,response))
                setShowBackdrop(false)
            }, 1000);
        }, (error) => {
            setError({ open: true, message: error })
            setShowBackdrop(false)
        })
        navigate("/")
    }

    const pickPlayer = (players) => {
        players.map((e) => {
            if (e.name === name) {
                setReadyButton(e.ready)
                return e;
            }
        })
    }

    function refresh() {
        get("/game/" + code, null,
            (response) => {
                update(response)                
            }, (error) => {
                console.log("cai no erro")
                navigate("/")
            })
    }
    const startGame = () => {
        setShowBackdrop(true)
        setTimeout(() => {
            navigate("/wallet/" + code + "/" + name);
            setShowBackdrop(false)
        }, 2000);
    }
    
    function setReady(e) {
        e.preventDefault();
        patch("/game/ready/" + code + "/" + name, null, (response) => {
            pickPlayer(response.players)
            setGame(response)
            sendNotification(sendReadyMessage(name, code, response))

        }, (error) => {
            setError({ open: true, message: error })
        })
    }

    return (
        <form onSubmit={(e) => { setReady(e) }}>

            <Grid container>
                <Grid container justifyContent="center" alignContent="center" alignItems="center" direction="column" className={classes.headerGrid} >
                    <Grid item className={classes.item}>
                        <Paper className={classes.papercode} elevation={5}>
                            <Typography variant="h5" className={classes.gamecode}>{code}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item className={classes.item}>
                        <Typography variant="subtitle1" className={classes.codecaption}>{name}</Typography>
                    </Grid>

                </Grid>
                <Grid container justifyContent="flex-start" alignContent="flex-start" alignItems="stretch" direction="column" className={classes.bodyGrid}>
                    <Grid container direction="row" justifyContent="flex-start" alignContent="stretch" alignItems="stretch" >
                        <Grid item style={{ width: "50%" }}>
                            <Button onClick={() => { quitGame() }} variant="contained" fullWidth  startIcon={<LogoutIcon />}>Sair</Button>
                        </Grid>
                        <Grid item style={{ width: "50%" }}>
                            <Button type="submit" variant="contained" style={{ backgroundColor: readyButton ? "blue" : "red" , color: readyButton?"white":"black"}} fullWidth endIcon={<PlayCircleFilledWhiteOutlined />}>{readyButton ? "pronto":"iniciar"}</Button>
                        </Grid>
                    </Grid>
                    {/* <Notification codeGame={code} sender={name} actionReceive={receiveMessage} callBackClient={callBackClient}/> */}
                    {notification}
                    <MessageDialog severity="error" setOpen={setError} open={error.open} message={error.message} />
                    <Grid item style={{ margin: "0 15px" }}>
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            label="VALOR INICIAL"
                            type="Number"
                            value={game.initialValue}
                            disabled
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="standard" />
                    </Grid>
                    <Grid item>
                        <PlayerList classes={classes} players={game?.players} createSecondaryReady />
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}
const sendReadyMessage = (sender, code, game) => {
    return {
        senderName: sender,
        codeGame: code,
        json: JSON.stringify(game),
        message: "",
        update: true
    }
    // sendPublicMessage(msg)
}
export const sendQuitMessage = (sender, code, game) => {
    return {
        senderName: sender,
        codeGame: code,
        json: JSON.stringify(game),
        message: sender +" saiu da partida!",
        update: true
    }
    // sendPublicMessage(msg)
}

