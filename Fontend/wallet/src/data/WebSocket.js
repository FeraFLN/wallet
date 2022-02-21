
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stomp = null;

export async function WebSocket(sender,codeGame) {
    console.log(stomp?true:false)
    connect(sender,codeGame)
    // connect(sender,codeGame);
    // if(!isAlived()){
    // setTimeout(connect(sender,codeGame),1000) 
    // }
}

const connect = async(sender,codeGame)=>{
    var sock = new SockJS('http://192.168.1.21:8080/wallet/ws'); 
    // var sock = new SockJS('http://localhost:8080/ws');
    stomp = Stomp.over(sock);  
    const x = await stomp.connect({}, (frame) =>{
        console.log('Conectado:  ');
        stomp.subscribe('/user/'+codeGame+"/chatroom",(response)=>{
            // readMessage(sender, actionReceive, setOpen, setMessage,response)
            readMessage(response)
        });         
    },(err)=>{
        console.log("Erro")
        console.log(err)
    });
}
export function getStomp(){
    return stomp;
}
export function setMessageReader(messageReader){
    readMessage = messageReader;
}
let readMessage = (response)=>{
    console.log(response)
}
export function sendPublicMessage(msg){
    stomp?.send("/app/message", {}, JSON.stringify(msg));
}

export function isAlived(){
    if(stomp){
        return true;
    }
    return false;
}
export const closeConection = () => {
    // console.log(sock)
    // sock?.close()
    // console.log("Conection closed.")
    // console.log(sock)
}