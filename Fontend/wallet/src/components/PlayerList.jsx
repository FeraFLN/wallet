import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"
import { customStyle, style } from '../style/Css';
import ListCreateSecondaryAction from "./ListCreateSecondaryAction";
import ListGameSecondaryAction from "./ListGameSecondaryAction";
import bankIcon from '../img/Bank-icon.png'
export default function PlayerList({ classes, players, createSecondaryAtcion, createSecondaryReady, gameSecondaryAtcion, openPopup }) {


    
    // console.log(customStyle('white'))
    return (
        <List className={classes.list}>
            {
                players?.map((value, index) => {
                    return (
                        <ListItem key={index} className={classes.listtextitem}>
                            <ListItemAvatar>
                                {
                                    value.name === "Bank" ?
                                        <Avatar style={customStyle(value.color)} src={bankIcon}  /> :
                                        <Avatar style={customStyle(value.color)}></Avatar>
                                }
                            </ListItemAvatar>
                            <ListItemText primary={value.name} />
                            {!createSecondaryAtcion ? '' : <ListCreateSecondaryAction player={value} ready deleteButton />}
                            {!createSecondaryReady ? '' : <ListCreateSecondaryAction player={value} ready />}
                            {!gameSecondaryAtcion ? '' : <ListGameSecondaryAction player={value} openPopup={openPopup} />}


                        </ListItem>
                    )
                })
            }
        </List>
    )
}