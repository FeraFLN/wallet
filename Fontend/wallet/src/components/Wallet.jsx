import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import bankIcon from '../img/Bank-icon.png'
import PlayerList from "./PlayerList";
import { useEffect, useState } from "react";
import CustomDialog from "./CustomDialog";
import NumberFormat from "react-number-format";
import { get, patch } from "../data/Request";
import { AssignmentOutlined, ExitToApp, Refresh } from "@mui/icons-material";
import HistoryDialog from "./HistoryDialog";
import { Notification } from "./Notification";
import { customStyle } from "../style/Css";

export default function Wallet({ classes }) {
    const navigate = useNavigate();
    const { name } = useParams()
    const { code } = useParams()
    const [openDialog, setOpenDialog] = useState(false);
    const [playerToName, setPlayerToName] = useState("");
    const [player, setPlayer] = useState();
    const [players, setPlayers] = useState();
    const [openHistory, setOpenHistory] = useState(false)

    useEffect(() => {
        refresh();
    }, [])
    const receiveMessage = (msg) => {
        responseValue(msg.game)

    }
    const responseValue = (game) => {
        var list = [];
        if (name === "Bank") {
            setPlayer(game.bank)
        } else {
            list.push(game.bank);
            var p = game.players.filter((e) => e.name === name);
            setPlayer(p[0]);

        }
        Array.prototype.push.apply(list, game.players);
        setPlayers(list)
    }
    async function refresh(msg) {
        await get("/game/" + code, null, (game) => {
            responseValue(game)
        }, (error) => {
            navigate("/")
        })
    }
    function openPopup(player) {
        if (player.name === name) {
            return;
        }
        setPlayerToName(player.name)
        setOpenDialog(true);

    }
    function submitPopup(value, handleClose, showError) {
        console.log("enviando...")
        const t = { playerFrom: name, playerTo: playerToName, value: value };
        patch("/game/transfer/" + code, t,
            (result) => {
                responseValue(result)
                handleClose();
            },
            (error) => {
                console.log(error)
                showError(error)

            }
        )
    }
    return (
        <Grid container>
            <HistoryDialog open={openHistory} setOpen={setOpenHistory} history={player?.history} />
            <CustomDialog classes={classes} open={openDialog} setOpen={setOpenDialog} player={playerToName} submit={submitPopup} />
            <Grid container justifyContent="center" alignContent="flex-end" alignItems="center" direction="column" className={classes.headerGrid} >
                <Grid item className={classes.item}>
                    {name === "Bank" ? <Avatar src={bankIcon} className={classes.large} /> : <Avatar style={customStyle(player?.color)} className={classes.large} ></Avatar>}
                </Grid>
                <Grid item >
                    <Typography variant="h6" className={classes.walletName}>{name}</Typography>
                </Grid>
                <Grid item style={{ width: '100%' }} >
                    <Typography variant="h6" className={classes.balance} ><NumberFormat value={player?.balance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-start" alignItems="stretch" alignContent="stretch" direction="column" className={classes.bodyGrid}>
                <Grid container direction="row" justifyContent="flex-start" alignContent="stretch" alignItems="stretch" >
                    <Grid item style={{ width: "50%" }}>
                        <Button variant="contained" fullWidth><ExitToApp /></Button>
                    </Grid>
                    <Grid item style={{ width: "50%" }}>
                        <Button variant="contained" onClick={() => setOpenHistory(true)} fullWidth><AssignmentOutlined /></Button>
                    </Grid>
                </Grid>
                <Notification sender={name} codeGame={code} actionReceive={receiveMessage} />
                <Grid item >
                    <PlayerList classes={classes} gameSecondaryAtcion players={players} openPopup={openPopup} />
                </Grid>
            </Grid>
        </Grid>
    );

}
