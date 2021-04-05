import { FC, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiSwitch from '@material-ui/core/Switch';
import { AppContext } from '../../context'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, 
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  }
}));

type Props = {

}

const Nav: FC<Props> = () => {
 
    const classes = useStyles();
 
    const {
        state: {
            drawer: {
                status
            },
            theme: {
              palette: {
                  type: typeTheme
              }
          }
        },
        dispatch,
        type
    } = useContext(AppContext)

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, Boolean(status) && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => {
                        dispatch({
                            type: type.SetDrawerStatus,
                            payload: true
                        })
                    }}
                    className={clsx(classes.menuButton, Boolean(status) && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Video Manager
                </Typography>
                <FormControlLabel
                    control={
                      <MuiSwitch
                          checked={typeTheme === 'dark' ? true : false}
                          onChange={e => {
                            dispatch({
                              type: type.SetThemePaletteType,
                              payload: e.target.checked ? 'dark' : 'light'
                            })
                          }}
                          color="default"
                      />
                    }
                    label={typeTheme.toUpperCase()}
                />
            </Toolbar>
        </AppBar>
    );
}

export default Nav