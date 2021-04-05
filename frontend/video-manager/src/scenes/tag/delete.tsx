import { makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography'
import { useLocation, useHistory } from 'react-router-dom'
import Button from '../../components/button';
import { FC, useEffect, useState, useCallback } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import useFetch from 'use-http'
import { 
    ITag,
} from '../../context'

type Props = {

}

const useStyles = makeStyles((theme: Theme) => ({
    progress: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    error: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    typography: {
        margin: theme.spacing(1.5),
    },
    paper: {
        padding: theme.spacing(2),
    }
}))
  
const Delete: FC<Props> = () => {

    const classes= useStyles()

    const location = useLocation()
    const history = useHistory()

    const [ tag, setTag ] = useState<ITag | null>(null) 

    const { get, del, response, loading, error, data } = useFetch({})

    const loadTag = useCallback(async () => {
        const data = await get(`/tags/${location?.pathname.split('/')[2]}`)
        if (response.ok) setTag(data)
    }, [get, response, location]) 

    useEffect(() => { 
        loadTag() 
    }, [loadTag]) 

    return (
        <>
            {error && (
                <Alert className={classes.error} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{data?.message}</strong>
                </Alert>
            )}
            {loading && (
                <LinearProgress color="secondary" className={classes.progress} />
            )}
            {tag && (
                <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h4" component="h1">
                            <strong> {`${tag?.name.toUpperCase()}`} </strong>
                        </Typography>
                        <Typography className={classes.typography} variant="h5" component="h2">
                            Tem certeza que deseja remover a tag <strong> {` ${tag?.name} `} </strong>  ?
                        </Typography>
                        <Button 
                            color="secondary"
                            onClick={async () => {
                                await del(`/tags/${location?.pathname.split('/')[2]}`)
                                if (response.ok) {
                                    history.push('/tags')
                                }
                            }}
                            startIcon={(classe) => 
                                <DeleteIcon 
                                    className={classe}
                                />
                            }
                            label={'Remover tag'}
                        />
                    </Paper>
                </Grid>
            )}

        </>
    )
}

export default Delete