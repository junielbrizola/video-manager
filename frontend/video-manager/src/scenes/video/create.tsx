import { makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom'
import { FC, useRef, useState, useCallback } from 'react'
import useFetch from 'use-http'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import FormControl from '@material-ui/core/FormControl';
import Input from '../../components/input'
import Select from '../../components/select'
import Switch from '../../components/switch'
import Button from '../../components/button';
import AddIcon from '@material-ui/icons/Add';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { ICategory, ITag } from '../../context';

type Props = {

}

interface FormData {
    name: string
    description: string
    is_active: boolean
    categories: string[]
    tags: string[]
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
    form: {
        width: '100%'
    },
    input: {
        margin: theme.spacing(1.5),
    },
    paper: {
        padding: theme.spacing(2),
    }
}))
  
const Create: FC<Props> = () => {

    const classes= useStyles()

    const history = useHistory()

    const formRef = useRef<FormHandles>(null)
    
    const { post, get, response, loading, error, data } = useFetch({})

    const [ categories, setCategories ] = useState<ICategory[]>([])
    const [ tags, setTags ] = useState<ITag[]>([])

    const loadCategories = useCallback(async () => {
        const list = await get('/categories')
        if (response.ok) {
            setCategories(list)
        }
    }, [get, response, setCategories])
    
    const loadTags = useCallback(async () => {
        const list = await get('/tags')
        if (response.ok) {
            setTags(list)
        }
    }, [get, response, setTags])
      

    const handleSubmit: SubmitHandler<FormData> = async (data) => {
        try {

            formRef?.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome precisa ser informado'),
                description: Yup.string().required('Descrição precisa ser informada'),
                categories: Yup.array().min(1).required('Categoria precisa ser informada'),
            });

            await schema.validate(data, {
                abortEarly: false,
            })

            await post(`/videos`, {
                ...data,
                is_active: data?.is_active ? 1 : 0
            })

            if (response.ok) {
                history.goBack()
            }

        } catch (err) {
            let validationErrors: {[erro: string]: any} = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(erro => {
                    if (erro.path) {
                        validationErrors[erro?.path] = erro?.message;
                    }
                });
                formRef?.current?.setErrors(validationErrors);
            }
        }
    }

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
            
            <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                <Paper className={classes.paper}>
                    <FormControl className={classes.form} component={Form} error ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            className={classes.input}
                            label="Nome" 
                            name="name" 
                        />
                        <Input 
                            className={classes.input}
                            label="Descrição" 
                            name="description" 
                            rowsMax={4}
                            multiline
                        />
                        <Switch 
                            className={classes.input}
                            name="is_active" 
                        />
                        <Select 
                            className={classes.input}
                            label="Categorias" 
                            select
                            name="categories" 
                            SelectProps={{
                                multiple: true,
                                onOpen: () => loadCategories()
                            }}
                        >
                            {categories.map(category => {
                                return (
                                    <MenuItem key={category?.id} value={category?.id}>{category?.name}</MenuItem>
                                )
                            })}
                        </Select>
                        <Select 
                            className={classes.input}
                            label="Tags" 
                            select
                            name="tags" 
                            SelectProps={{
                                multiple: true,
                                onOpen: () => loadTags()
                            }}
                        >
                            {tags.map(tag => {
                                return (
                                    <MenuItem key={tag?.id} value={tag?.id}>{tag?.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Button 
                        color="primary"
                        onClick={() => formRef?.current?.submitForm()}
                        startIcon={(classe) => 
                            <AddIcon 
                                className={classe}
                            />
                        }
                        label={'Criar video'}
                    />
                </Paper>
            </Grid>
            
        </>
    )
}

export default Create