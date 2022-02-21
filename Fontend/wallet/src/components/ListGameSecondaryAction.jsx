
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import { Send } from "@mui/icons-material";
import { Dialog } from "@mui/material";

import { style } from "../style/Css";


export default function ListGameSecondaryAction({ openPopup, player }) {
    

    function openDialog(){
        openPopup(player)
    }

    return (
        <>
            
            <ListItemSecondaryAction>
                <IconButton onClick={openDialog} edge="end" aria-label="delete">
                    <Send />
                </IconButton>

            </ListItemSecondaryAction>
        </>
    )
};