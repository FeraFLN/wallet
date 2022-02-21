import { Avatar, Button, Divider, Grid, Typography } from '@material-ui/core';
import { useLocation, useNavigate } from "react-router-dom";
import image from '../img/wallet.png'
import { get, patch, post } from '../data/Request'
import bankIcon from '../img/Bank-icon.png'
import JoinDialog from './JoinDialog'
import { useEffect, useState } from 'react';
import { sendPublicMessage, WebSocket } from '../data/WebSocket';
function InitialScreen({setShowBackdrop , setWebSocket,setGame, setPlayer, classes }) {

    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    

    function openJoinDialog(e) {
        e.preventDefault();
        setShowDialog(true)
    }

    function join(code, nome,color, handleClose, showError) {
        const p = { name: nome, color:color,balance: null, avata: null, ready: false, history: [] };
        patch("/game/join/" + code, p,
            (result) => {
                setPlayer(p);
                handleClose();
                setWebSocket(WebSocket(p.name, result.code));
                setShowBackdrop(true);
                setTimeout(function () {
                    navigate("/join/" + result.code + "/" + p.name);
                }, 1000);
            },
            (error) => {
                console.log(error)
                showError(error)

            }
        )
    }
    function createGame(e) {
        e.preventDefault();
        console.log("Creating a game!")
        post("/game/create", null,
            (result) => {
                setGame(result)
                WebSocket("Bank", result.code);
                navigate("/game/" + result.code);
            },
            (error) => {
                console.log(error)
            }
        );

    }

    return (
        <Grid container direction='column' className={classes.mainGrid}>
            <JoinDialog classes={classes} open={showDialog} setOpen={setShowDialog} submit={join} />
            <Grid container justifyContent='center' alignItems='center' direction='column' className={classes.mainHeaderGrid} >
                <Grid item >
                    <Avatar alt='Wallet' src={image} className={classes.large} />
                </Grid>
                <Grid item>
                    <Typography className={classes.headername} variant='h4'>Wallet</Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent='center' alignItems='center' direction='column' className={classes.mainBodyGrid}  >
                <Grid item >
                    <Button variant='contained' onClick={(e) => { createGame(e) }} className={classes.link} color='primary' className={classes.button100}>Criar</Button>

                </Grid>
                <Grid item >
                    <Button variant='contained' onClick={(e) => openJoinDialog(e)} color='primary' fullWidth className={classes.button100}>Juntar-se</Button>
                </Grid>
                <Grid item >
                    <Divider variant="fullWidth" />
                </Grid>
            </Grid>
            <Grid container justifyContent='center' alignItems='center' direction='column' className={classes.mainfooterGrid}  >
                <Grid item >
                    <Typography className={classes.footerCaption} variant='caption'>Feito por Fernando Limeira</Typography>
                </Grid>
            </Grid>
        </Grid>


    );
}

export default InitialScreen;