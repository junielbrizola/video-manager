import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Nav from '../components/nav'
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import routes from './index.routes' 
import Breadcrumbs from '../components/breadcrumbs'
import Side from '../components/side'
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

type Props = {

}

const Scenes: FC<Props> = () => {
  
  const classes = useStyles();
  
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Nav />
        <Side />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Breadcrumbs />
              <Switch>
                {
                    routes.map((route, key) => (
                        <Route
                          key={key}
                          path={route.path}
                          component={route.component}
                          exact={route.exact === true}
                        />
                    ))
                }
                <Redirect 
                  from="/"
                  to="/categories"
                />
              </Switch>  
            </Grid>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default Scenes