import { makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import Card from '../../components/card'
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '../../components/button'
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom'
import { FC, useEffect, useCallback, useState } from 'react'
import useFetch from 'use-http'
import { 
    IVideo 
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
  button: {
    width: '100%'
  }
}))


const List: FC<Props> = () => {
  
  const classes= useStyles()

  const history = useHistory()

  const { get, response, loading, error, data, cache } = useFetch({})
  const [ videos, setVideos ] = useState<IVideo[]>([])

  const loadVideos = useCallback(async () => {
    const list = await get('/videos')
    if (response.ok) {
      cache.clear()
      setVideos(list)
    }
  }, [get, response, setVideos, cache]) 
  
  useEffect(() => { 
      loadVideos() 
  }, [loadVideos]) 

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
        {!loading && (
                <>
                    <div className={classes.button}>
                        <Button 
                        color="primary"
                        onClick={() => history.push(`/videos/create`)}
                        startIcon={(classe) => 
                            <AddIcon 
                            className={classe}
                            />
                        }
                        label={'Novo video'}
                        />
                    </div>
                    {videos.map((video: IVideo) => {
                        return (
                            <Grid key={video?.id} item lg={4} md={6} sm={12} xl={4} xs={12}>
                                <Card 
                                    name={video?.name}
                                    description={video?.description}
                                    created_at={video?.created_at}
                                    updated_at={video?.updated_at}
                                    EditOnClick={() => history.push(`/videos/${video?.id}/update`)}
                                    DeleteOnClick={() => history.push(`/videos/${video?.id}/delete`)}
                                    AreaOnClick={() => history.push(`/videos/${video?.id}`)}
                                />
                            </Grid>
                        )
                    })}
                </>
            )}
      
    </>
  )
}

export default List