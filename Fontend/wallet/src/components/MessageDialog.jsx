import {Collapse, IconButton } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import { Alert } from "@mui/material";

export default function MessageDialog({severity, open,setOpen, message}) {
    
    

    return (
        <div style={ {width: '100%'}}>
            <Collapse in={open}>
                <Alert
                    severity={severity}
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
        </div>)
}