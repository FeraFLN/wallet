import { w3cwebsocket as W3cwebsocket } from 'websocket';

export async function WebSocket(codeGame,sender,readMessage,callBackClient) {
    const client = new W3cwebsocket('wss://socket.walletsgame.com?token=12345&codeGame='+codeGame+'&name='+sender) 
    // const client = new W3cwebsocket('ws://127.0.0.1:8000?token=12345&codeGame='+codeGame+'&name='+sender)
    console.log(client?.readyState,W3cwebsocket.CONNECTING,W3cwebsocket.CLOSED,W3cwebsocket.OPEN,W3cwebsocket.CLOSING)
    client.onmessage =(message)=>{
        let confirmConection = JSON.parse(message.data)
        console.log("recebendo mensagem!",confirmConection)
        readMessage(message);
    }
    client.onclose = ()=>{
        console.log("desconectou")
    }
    client.onopen = ()=>{
        console.log("conectado ao novo websocket server! "+client.readyState)
        callBackClient(client)
    }
}
