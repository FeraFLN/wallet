import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import bankIcon from '../img/Bank-icon.png'
import PlayerList from "./PlayerList";
import { useEffect, useState } from "react";
import CustomDialog from "./CustomDialog";
import NumberFormat from "react-number-format";
import { del, get, patch, put } from "../data/Request";
import { AssignmentOutlined, ExitToApp, Refresh } from "@mui/icons-material";
import HistoryDialog from "./HistoryDialog";
import { Notification } from "./Notification";
import { customStyle } from "../style/Css";
import LogoutIcon from '@mui/icons-material/Logout';
import { sendQuitMessage } from "./JoinGame";
import { sendEndGameMessage } from "./HostGame";
import MessageDialog from "./MessageDialog";

export default function Wallet({classes, connectWebSocket, sendNotification, setShowBackdrop, notification,callBackUpdateScreen }) {
    const navigate = useNavigate();
    const { name } = useParams()
    const { code } = useParams()
    const [openDialog, setOpenDialog] = useState(false);
    const [playerToName, setPlayerToName] = useState("");
    const [player, setPlayer] = useState();
    const [players, setPlayers] = useState();
    const [openHistory, setOpenHistory] = useState(false)
    const [error, setError] = useState({ open: false, message: "" })

    useEffect(() => {
        const refresh = () => {
            get("/game/" + code, null, (game) => {
                responseValue(game)
            }, (error) => {
                navigate("/")
            })
        }
        refresh();
        connectWebSocket(code,name)
        callBackUpdateScreen(responseValue)
    }, [])

    // const receiveMessage = (msg) => {
    //     responseValue(msg.game)

    // }
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
    function sairAction() {
        if(name==="Bank"){
            endGame();
        }else{
            quitGame();
        }
    }

    function endGame() {
        console.log('Ending game!')
        del("/game/endgame/" + code,  () => {
            console.log("retorno do fim do jogo!")
            sendNotification(sendEndGameMessage(code))
            navigate("/" );
        }, (error) => {
            setError({ open: true, message: error })
        })
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
    function openPopup(player) {
        if (player.name === name) {
            return;
        }
        setPlayerToName(player.name)
        setOpenDialog(true);

    }
    function submitPopup(value, handleClose, showError) {
        console.log("enviando...")
        setShowBackdrop(true)
        const t = { playerFrom: name, playerTo: playerToName, value: value };
        patch("/game/transfer/" + code, t,
            (result) => {
                responseValue(result)
                handleClose();
                setShowBackdrop(false)
                sendNotification(sendMoneyMessage(name,playerToName,value,result))
            },
            (error) => {
                console.log(error)
                showError(error)
                setShowBackdrop(false)

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
                        <Button variant="contained" onClick={()=>{sairAction()}} fullWidth startIcon={<LogoutIcon />}>Sair</Button>
                    </Grid>
                    <Grid item style={{ width: "50%" }}>
                        <Button variant="contained" onClick={() => setOpenHistory(true)} fullWidth endIcon={<AssignmentOutlined />}>Transações</Button>
                    </Grid>
                </Grid>
                {notification}
                <MessageDialog severity="error" setOpen={setError} open={error.open} message={error.message} />
                <Grid item >
                    <PlayerList classes={classes} gameSecondaryAtcion players={players} openPopup={openPopup} />
                </Grid>
            </Grid>
        </Grid>
    );

}
const sendMoneyMessage = (sender, receiver, value, game) => {
    return {
        senderName: sender,
        codeGame: game.code,
        message: sender + ' enviou ' + value + ' para ' + receiver,
        json: JSON.stringify(game),
        update: true
    }
}