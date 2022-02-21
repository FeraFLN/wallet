import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import InitialScreen from './components/InitialScreen';
import { Paper, Container, Typography, Avatar, Backdrop } from '@material-ui/core';
import HostGame from './components/HostGame';
import { useEffect, useState } from 'react';
import Wallet from './components/Wallet';
import JoinGame from './components/JoinGame';
import { style } from './style/Css';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@mui/material';

const styleCSS = makeStyles((theme) => style(theme));
function App() {
  const classes = styleCSS();
  // console.log(classes);

  const [player, setPlayer] = useState()
  const [game, setGame] = useState()
  const [showBackdrop, setShowBackdrop] = useState(false)
  const [webSocket, setWebSocket] = useState()
  
  useEffect(()=>{

  },[setShowBackdrop,setWebSocket])
  return (
    <Container className={classes.root}>
      <Backdrop className={classes.backdrop} open={showBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper elevation={7} variant="elevation" className={classes.card}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<InitialScreen setWebSocket={setWebSocket} setShowBackdrop = {setShowBackdrop} setGame={setGame} setPlayer={setPlayer} classes={classes} />} />
            <Route exact path='/game/:code' component={game?.code} element={<HostGame setShowBackdrop = {setShowBackdrop} classes={classes} />} />
            <Route exact path='/join/:code/:name' component={game?.code, player?.name} element={<JoinGame setShowBackdrop = {setShowBackdrop} classes={classes} />} />
            <Route exact path="/wallet/:code/:name" component={game?.code, player?.name} element={<Wallet classes={classes} />} />
          </Routes>
        </BrowserRouter>

      </Paper>
    </Container>
  );
}


export default App;
