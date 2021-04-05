import { makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { useLocation, useHistory } from 'react-router-dom'
import { FC, useEffect, useState, useCallback, useRef } from 'react'
import useFetch from 'use-http'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import FormControl from '@material-ui/core/FormControl';
import { 
    ITag,
} from '../../context'
import Input from '../../components/input'
import Button from '../../components/button';
import EditIcon from '@material-ui/icons/Edit';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';

type Props = {

}

interface FormData {
    name: string
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
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    input: {
        margin: theme.spacing(1.5),
    },
    paper: {
        padding: theme.spacing(2),
    }
}))
  
const Update: FC<Props> = () => {

    const classes= useStyles()

    const location = useLocation()
    const history = useHistory()

    const [ tag, setTag ] = useState<ITag | null>(null) 
    
    const formRef = useRef<FormHandles>(null)
    
    const { get, put, response, loading, error, data, cache } = useFetch({})

    const loadTag = useCallback(async () => {
        const data = await get(`/tags/${location?.pathname.split('/')[2]}`)
        if (response.ok) {
            cache.clear()
            setTag({
                ...data,
            })
        }
    }, [get, response, location, cache]) 

    const handleSubmit: SubmitHandler<FormData> = async (data) => {
        try {

            formRef?.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome precisa ser informado'),
            });

            await schema.validate(data, {
                abortEarly: false,
            })

            await put(`/tags/${location?.pathname.split('/')[2]}`, {
                ...data
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
                        <FormControl 
                            initialData={{ 
                                name: tag?.name
                            }}
                            className={classes.form} 
                            component={Form} 
                            ref={formRef} 
                            onSubmit={handleSubmit}
                        >
                            <Input
                                className={classes.input}
                                label="Nome" 
                                name="name" 
                            />
                        </FormControl>
                        <Button 
                            color="primary"
                            onClick={() => formRef?.current?.submitForm()}
                            startIcon={(classe) => 
                                <EditIcon 
                                    className={classe}
                                />
                            }
                            label={'Atualizar tag'}
                        />
                    </Paper>
                </Grid>    
            )}

        </>
    )
}

export default Update