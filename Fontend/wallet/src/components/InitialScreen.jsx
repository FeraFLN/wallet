import { Avatar, Button, Divider, Grid, Typography } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import image from '../img/wallet.png'
import {patch, post } from '../data/Request'

import JoinDialog from './JoinDialog'
import {  useEffect, useState } from 'react';

function InitialScreen({ connectWebSocket, disconnectWebSocket, setShowBackdrop, setGame, setPlayer, classes }) {

    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(()=>{
        console.log("useEffect do initalScreen")
        disconnectWebSocket()
    },[])
    function openJoinDialog(e) {
        e.preventDefault();
        setShowDialog(true)
    }

    function join(code, nome, color, handleClose, showError) {
        const p = { name: nome, color: color, balance: null, avata: null, ready: false, history: [] };
        setShowBackdrop(true);
        setShowDialog(false)
        patch("/game/join/" + code, p,
        (result) => {
            setPlayer(p);
            setGame(result)
            connectWebSocket(code,nome,sendJoinMessage(code,nome,result))
            handleClose();
            setTimeout(function () {
                    // sendNotification(sendJoinMessage(code,nome,result))
                    // sendJoinMessage(code,nome,result)
                    navigate("/join/" + result.code + "/" + p.name);
                }, 1000);
            },
            (error) => {
                setShowBackdrop(false);
                showError(error)

            }
        )
    }
    function createGame(e) {
        e.preventDefault();
        setShowBackdrop(true)
        post("/game/create", null,
            (result) => {
                setGame(result)
                connectWebSocket(result.code,'Bank')
                navigate("/game/" + result.code);
            },
            (error) => {
                console.log(error)
                setShowBackdrop(false)
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
const sendJoinMessage = (code, sender, game) => {
    return {
        senderName: sender,
        codeGame: code,
        json: JSON.stringify(game),
        message: sender + " conectou!",
        update: true
    }

}
export default InitialScreen;
