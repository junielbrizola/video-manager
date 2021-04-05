import { makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom'
import { FC, useRef } from 'react'
import useFetch from 'use-http'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import FormControl from '@material-ui/core/FormControl';
import Input from '../../components/input'
import Button from '../../components/button';
import AddIcon from '@material-ui/icons/Add';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';

type Props = {

}

interface FormData {
    name: string
    description: string
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
    
    const { post, response, loading, error, data } = useFetch({
    
    })
  
    const handleSubmit: SubmitHandler<FormData> = async (data) => {
        try {

            formRef?.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome precisa ser informado'),
                description: Yup.string().required('Descrição precisa ser informada'),
            });

            await schema.validate(data, {
                abortEarly: false,
            })

            await post(`/categories`, {
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
                    <FormControl className={classes.form} component={Form} ref={formRef} onSubmit={handleSubmit}>
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
                    </FormControl>
                    <Button 
                        color="primary"
                        onClick={() => formRef?.current?.submitForm()}
                        startIcon={(classe) => 
                            <AddIcon 
                                className={classe}
                            />
                        }
                        label={'Criar categoria'}
                    />
                </Paper>
            </Grid>
            
        </>
    )
}

export default Create