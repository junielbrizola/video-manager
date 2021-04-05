import { makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography'
import { useLocation, useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import { FC, useEffect, useState, useCallback } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
    },
    containerVideos: {
        marginTop: 40
    },
    videos: {
        marginBottom: 40
    }
}))
  
const Detail: FC<Props> = () => {

    const classes= useStyles()

    const location = useLocation()
    const history = useHistory()

    const [ tag, setTag ] = useState<ITag | null>(null) 

    const { get, response, loading, error, data } = useFetch({})

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
                <LinearProgress className={classes.progress} />
            )}
            {tag && (
                <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                    <Paper className={classes.paper}>
                        <IconButton 
                            onClick={() => history.push(`/tags/${tag?.id}/update`)} 
                            edge="end" 
                            aria-label="Edit"
                        >
                            <EditIcon 
                                color="primary"
                            />
                        </IconButton>
                        <IconButton 
                            onClick={() => history.push(`/tags/${tag?.id}/delete`)} 
                            edge="end" 
                            aria-label="Delete"
                        >
                            <DeleteIcon 
                                color="secondary"
                            />
                        </IconButton>

                        
                        <Typography variant={'body2'} className={classes.typography}>
                            <strong> Código: </strong> {`${tag?.id}`}
                        </Typography>

                        <Typography variant={'body2'} className={classes.typography}>
                            <strong> Name: </strong> {`${tag?.name}`} 
                        </Typography>                        
                        
                        <Typography variant={'body2'} className={classes.typography}>
                            <strong> Slug: </strong> {`${tag?.slug}`}
                        </Typography>
                        <Typography variant={'body2'} className={classes.typography}>
                            <strong> Criação: </strong> {`${tag?.created_at}`}
                        </Typography>
                        <Typography variant={'body2'} className={classes.typography}>
                            <strong> Atualização: </strong> {`${tag?.updated_at}`}
                        </Typography>

                        <div className={classes.containerVideos}>
                            {tag.videos.length > 0 && (
                                <>
                                    <Typography className={classes.typography} variant="h5" component="h1">
                                        <strong> Videos </strong>
                                    </Typography>
                                    <>
                                        {tag?.videos.map((video, index) => {
                                            return (
                                                <div key={index} className={classes.videos}>
                                                    <Typography variant={'body2'} className={classes.typography}>
                                                        <strong> Código: </strong> {`${video?.id}`}
                                                    </Typography>
                                                    <Typography variant={'body2'} className={classes.typography}>
                                                        <strong> Nome: </strong> {`${video?.name}`}
                                                    </Typography>
                                                    <Typography variant={'body2'} className={classes.typography}>
                                                        <strong> Descrição: </strong> {`${video?.description}`}
                                                    </Typography>
                                                    <Typography variant={'body2'} className={classes.typography}>
                                                        <strong> Status: </strong> {`${video?.is_active ? 'Ativo' : 'Desativado'}`}
                                                    </Typography>
                                                    <Typography variant={'body2'} className={classes.typography}>
                                                        <strong> Criação: </strong> {`${video?.created_at}`}
                                                    </Typography>
                                                    <Typography variant={'body2'} className={classes.typography}>
                                                        <strong> Atualização: </strong> {`${video?.updated_at}`}
                                                    </Typography>
                                                </div>
                                            )
                                        })}
                                    </>
                                </>
                            )}
                        </div>
                    </Paper>
                </Grid>
            )}

        </>
    )
}

export default Detail