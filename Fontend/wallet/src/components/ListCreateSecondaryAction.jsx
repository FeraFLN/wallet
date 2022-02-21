
import { Grid, IconButton, ListItemSecondaryAction } from "@material-ui/core";
import { Delete } from "@mui/icons-material";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function ListCreateSecondaryAction({ ready, deleteButton, player }) {
    

    function removePlayer(value) {
        console.log('Removing player ' + value)
        //call remove player endpoint
    }

    return (
        <ListItemSecondaryAction>
            <Grid container justifyContent="center" alignContent="center" alignItems="center" direction="row" spacing={1}>
                {deleteButton ?
                    <Grid item>
                        <IconButton onClick={() => { removePlayer(player) }} edge="end" aria-label="delete">
                            <Delete />
                        </IconButton>
                    </Grid> : ''}
                {ready ?
                    <Grid item>
                        <CheckCircleRoundedIcon color={player.ready === true ? 'primary' : 'disabled'} />
                    </Grid>
                    : ''}
            </Grid>
        </ListItemSecondaryAction>);
};