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
    ICategory 
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

  const [ categories, setCategories ] = useState<ICategory[]>([])

  const loadCategories = useCallback(async () => {
    const list = await get('/categories')
    if (response.ok) {
      cache.clear()
      setCategories(list)
    }
  }, [get, response, setCategories, cache]) 
  
  useEffect(() => { 
      loadCategories() 
  }, [loadCategories]) 

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
              onClick={() => history.push(`/categories/create`)}
              startIcon={(classe) => 
                <AddIcon 
                  className={classe}
                />
              }
              label={'Nova categoria'}
            />
          </div>

          {categories.map((category: ICategory) => {
            return (
              <Grid key={category?.id} item lg={4} md={6} sm={12} xl={4} xs={12}>
                <Card 
                  name={category?.name}
                  description={category?.description}
                  created_at={category?.created_at}
                  updated_at={category?.updated_at}
                  EditOnClick={() => history.push(`/categories/${category?.id}/update`)}
                  DeleteOnClick={() => history.push(`/categories/${category?.id}/delete`)}
                  AreaOnClick={() => history.push(`/categories/${category?.id}`)}
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