import { Collapse, IconButton } from '@material-ui/core';
import { Close } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { isAlived, sendPublicMessage, setMessageReader, WebSocket } from '../data/WebSocket';



export function Notification({ actionReceive, codeGame, sender }) {
    const [message, setMessage] = useState();
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if(!isAlived()){
            console.log("reconenctando")
            setTimeout(function () { 
                WebSocket(sender, codeGame);
            }, 1000);
        }
    }, []);

    setMessageReader(
        (response) => {
            let msg = JSON.parse(response.body);
            if (sender !== msg?.senderName && msg?.message !== '') {
                setOpen(true)
                setMessage(msg.message);
            }

            if (sender !== msg.senderName && msg.update) {
                actionReceive(msg);

            }
        });
    return (
        <div style={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Collapse>
        </div>

    );
}

export function sendMessage(msg) {
    sendPublicMessage(msg);
}

// const readMessage = (sender, actionReceive, setOpen, setMessage, response) => {
//     let msg = JSON.parse(response.body);
//     console.log(msg)
//     if (sender !== msg?.senderName && msg?.message !== '') {
//         setOpen(true)
//         setMessage(msg.message);
//     }

//     if (sender !== msg.senderName && msg.update) {
//         actionReceive(msg);

//     }
// }