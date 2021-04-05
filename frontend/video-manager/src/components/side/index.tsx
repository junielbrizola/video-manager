import { FC, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import CategoryIcon from '@material-ui/icons/Category';
import LabelIcon from '@material-ui/icons/Label';
import { 
  NavLink,
} from 'react-router-dom'
import { AppContext } from '../../context'

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
}));

type Props = {

}

const Side: FC<Props> = () => {
  
    const classes = useStyles();
  
    const {
        state: {
            drawer: {
                status,
            }
        },
        dispatch,
        type
    } = useContext(AppContext)

    return (
        <Drawer
            anchor="left"
            variant="temporary"
            classes={{
                paper: clsx(classes.drawerPaper, !Boolean(status) && classes.drawerPaperClose),
            }}
            open={Boolean(status)}
        >
            <div className={classes.toolbarIcon}>
                <IconButton 
                    onClick={() => {
                        dispatch({
                            type: type.SetDrawerStatus,
                            payload: false
                        })
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem 
                    activeClassName="Mui-selected" 
                    component={NavLink} 
                    to="/categories" 
                    button
                    onClick={() => {
                        dispatch({
                            type: type.SetDrawerStatus,
                            payload: false
                        })
                    }}
                >
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                </ListItem>
                <ListItem 
                    activeClassName="Mui-selected" 
                    component={NavLink} 
                    to="/videos" 
                    button
                    onClick={() => {
                        dispatch({
                            type: type.SetDrawerStatus,
                            payload: false
                        })
                    }}
                >
                    <ListItemIcon>
                        <PlaylistPlayIcon />
                    </ListItemIcon>
                    <ListItemText primary="Videos" />
                </ListItem>
                <ListItem 
                    activeClassName="Mui-selected" 
                    component={NavLink} 
                    to="/tags" 
                    button
                    onClick={() => {
                        dispatch({
                            type: type.SetDrawerStatus,
                            payload: false
                        })
                    }}
                >
                    <ListItemIcon>
                        <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tags" />
                </ListItem>
            </List>
        </Drawer>    
    );
}

export default Side