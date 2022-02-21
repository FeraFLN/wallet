import { Button, Grid, Paper, TextField, Typography, InputAdornment } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { get, patch, put } from '../data/Request'
import { useNavigate, useParams } from "react-router-dom";
import { Notification } from "./Notification";
import PlayerList from "./PlayerList";
import { ExitToApp, PlayCircleFilledWhiteOutlined } from "@mui/icons-material";
import MessageDialog from "./MessageDialog";


export default function CreateGame({ setShowBackdrop, classes }) {
    const navigate = useNavigate();
    const { code } = useParams()
    const { name } = useParams()
    const [game, setGame] = useState();
    const [readyButton, setReadyButton] = useState(false)
    const [error, setError] = useState({ open: false, message: "" })

    useEffect(() => {
        refresh()
        setShowBackdrop(false);
    }, [])

    function quitGame() {
        put("/game/quit/" + code + "/" + name, null, (response) => {
            setShowBackdrop(true)
            setTimeout(() => {
                navigate("/")
                setShowBackdrop(false)
            }, 1000);
        }, (error) => {
            setError({ open: true, message: error })
        })
    }
    const receiveMessage = (msg) => {
        if (msg.game.startGame) {
            startGame()
            return;
        }
        pickPlayer(msg.game.players)
        setGame(msg.game);

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
                pickPlayer(response.players)
                setGame(response)
            }, (error) => {
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
        }, (error) => {
            setError({ open: true, message: error })
        })
    }

    return (
        <form onSubmit={(e) => { setReady(e) }}>

            <Grid container>
                <Grid container justifyContent="center" alignContent="center" alignItems="center" direction="column" className={classes?.headerGrid} >
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
                            <Button onClick={() => { quitGame() }} variant="contained" fullWidth><ExitToApp /></Button>
                        </Grid>
                        <Grid item style={{ width: "50%" }}>
                            <Button type="submit" variant="contained" style={{ backgroundColor: readyButton ? "blue" : "red" }} fullWidth><PlayCircleFilledWhiteOutlined /></Button>
                        </Grid>
                    </Grid>
                    <Notification codeGame={code} sender={name} actionReceive={receiveMessage} />
                    <MessageDialog severity="error" setOpen={setError} open={error.open} message={error.message} />
                    <Grid item style={{ margin: "0 15px" }}>
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            label="VALOR INICIAL"
                            type="Number"
                            value={game?.initialValue}
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
