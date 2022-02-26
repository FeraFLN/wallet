
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import { Send } from "@mui/icons-material";

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