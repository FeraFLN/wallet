const webSocketsServerPort = 8080;
const webSocketServer = require('websocket').server;
const { MD5 } = require('crypto-js');
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8080');


const wsServer = new webSocketServer({
  httpServer: server
});

const clients = new Map();

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};
const cleanClosedConnection = () => {
  clients.forEach((value, key) => {
    if (!value.connected) {
      console.log("deleting client offline")
      clients.delete(key);
    }
  })
}
const sendConnectionConfirmation = (connection, userID) => {
  connection.sendUTF(
    JSON.stringify({
      confirmConection: true,
      userID: userID
    }));
}
// wsServer.on('close',()=>{
//   console.log('close')
// })

wsServer.on('request', function (request) {
  let params = request.resourceURL.query;
  // console.log(params.token, !params,params.token!=="12345", !params.codeGame,!params.name)
  if (!params || params.token !== "12345" || !params.codeGame || !params.name) {
    console.log("rejected")
    request.reject();
    return;
  }
  var userID = MD5(params.codeGame + params.name).toString();
  // console.log(userID)
  // You can rewrite this part of the code to accept only the requests from allowed origin
  // console.log(request)
  const connection = request.accept(null, request.origin);
  // console.log(connection.url)
  // console.log(request.originalUrl)
  // console.log(request.resourceURL.query)

  // cleanClosedConnection();

  clients.set(userID, { connection: connection, codeGame: params.codeGame, userName: params.name });

  // sendConnectionConfirmation(connection,userID);

  // connection.close(()=>{
  //   console.log("desconectando "+)
  // })
  connection.on('close', (algumaCoisa, outraCoisa) => {
    console.log("alguma coisa", algumaCoisa, outraCoisa)
    clients.forEach((cli, e) => {
      if (cli.connection === connection) {
        clients.delete(e)
      }
    })
  })
  connection.on('message', function (message) {
    let msg = JSON.parse(message.utf8Data);
    broadcastMessage(msg, message);
    console.log("Total de clientes conectador: ", clients.size);
  })

  const broadcastMessage = (msg, message) => {

    console.log(msg)
    clients.forEach((cli, e) => {
      // console.log(cli)
      if (msg.codeGame === cli.codeGame) {
        // console.log(message.utf8Data)
        cli.connection.sendUTF(message.utf8Data);
      }

    })
  }


});