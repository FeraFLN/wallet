import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitialScreen from './components/InitialScreen';
import { Paper, Container, Backdrop } from '@material-ui/core';
import HostGame from './components/HostGame';
import { useState } from 'react';
import Wallet from './components/Wallet';
import JoinGame from './components/JoinGame';
import { style } from './style/Css';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@mui/material';
import { WebSocket } from './data/WebSocket';
import { Notification } from './components/Notification';
import { w3cwebsocket } from 'websocket';

const styleCSS = makeStyles((theme) => style(theme));
let update = () => { }
function App() {
  const classes = styleCSS();

  const [player, setPlayer] = useState({ name: '' })
  const [game, setGame] = useState({ code: '' })
  const [showBackdrop, setShowBackdrop] = useState(false)
  const [client, setClient] = useState()
  const [open, setOpen] = useState()
  const [notification, setNotification] = useState()

  const callBackUpdateScreen = (updateFunction) => {
    update = updateFunction;
  };


  const connectWebSocket = (codeGame, name, message) => {
    WebSocket(codeGame, name, setMessageReader, (cli) => {
      if (message) {
        cli.send(JSON.stringify(message))
      }
      setClient(cli)
    })
  }
  const disconnectWebSocket = () => {
    if (client) {
      client.close(1000, "Fernando")
    }
  }
  const setMessageReader =
    (message) => {
      let msg = JSON.parse(message.data);
      console.log('reading messasge', player);
      if (msg.message !== '') {
        setOpen(true)
        setNotification(msg.message);
      }
      if (msg.json && msg.update) {
        let g = JSON.parse(msg.json);
        update(g)
      }
    };
  const sendNotification = (message) => {
    
    if(client.readyState === w3cwebsocket.CLOSED ||client.readyState ===w3cwebsocket.CLOSING){
      connectWebSocket(game.code,player.name,message)
    }else{
      client.send(JSON.stringify(message))
    }
  }
  return (
    <Container className={classes.root}>
      <Backdrop className={classes.backdrop} open={showBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper elevation={7} variant="elevation" className={classes.card}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={
              <InitialScreen
                connectWebSocket={connectWebSocket}
                setShowBackdrop={setShowBackdrop}
                setGame={setGame}
                disconnectWebSocket={disconnectWebSocket}
                setPlayer={setPlayer}
                sendNotification={sendNotification}
                classes={classes}
              />
            } />
            <Route exact path='/game/:code' component={game?.code} element={
              <HostGame
                connectWebSocket={connectWebSocket}
                sendNotification={sendNotification}
                setShowBackdrop={setShowBackdrop}
                callBackUpdateScreen={callBackUpdateScreen}
                classes={classes}
                notification={<Notification open={open} setOpen={setOpen} message={notification} />}
              />
            } />
            <Route exact path='/join/:code/:name' component={game.code, player.name} element={
              <JoinGame
                connectWebSocket={connectWebSocket}
                sendNotification={sendNotification}
                setShowBackdrop={setShowBackdrop}
                callBackUpdateScreen={callBackUpdateScreen}
                classes={classes}
                notification={<Notification open={open} setOpen={setOpen} message={notification} />}
              />
            } />
            <Route exact path="/wallet/:code/:name" component={game.code, player.name} element={
              <Wallet
                classes={classes}
                connectWebSocket={connectWebSocket}
                sendNotification={sendNotification}
                setShowBackdrop={setShowBackdrop}
                callBackUpdateScreen={callBackUpdateScreen} 
                notification={<Notification open={open} setOpen={setOpen} message={notification} />}
              />
            } />
          </Routes>
        </BrowserRouter>

      </Paper>
    </Container>
  );
}

export default App;
