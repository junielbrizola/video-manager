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
    ITag
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

  const [ tags, setTags ] = useState<ITag[]>([])

  const loadTags = useCallback(async () => {
    const list = await get('/tags')
    if (response.ok) {
      cache.clear()
      setTags(list)
    }
  }, [get, response, setTags, cache]) 
  
  useEffect(() => { 
      loadTags() 
  }, [loadTags]) 

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
                    onClick={() => history.push(`/tags/create`)}
                    startIcon={(classe) => 
                        <AddIcon 
                        className={classe}
                        />
                    }
                    label={'Nova tag'}
                />
            </div>
            {tags.map((tag: ITag) => {
                return (
                    <Grid key={tag?.id} item lg={4} md={6} sm={12} xl={4} xs={12}>
                        <Card 
                        name={tag?.name}
                        slug={tag?.slug}
                        created_at={tag?.created_at}
                        updated_at={tag?.updated_at}
                        EditOnClick={() => history.push(`/tags/${tag?.id}/update`)}
                        DeleteOnClick={() => history.push(`/tags/${tag?.id}/delete`)}
                        AreaOnClick={() => history.push(`/tags/${tag?.id}`)}
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