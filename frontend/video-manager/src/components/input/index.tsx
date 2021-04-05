import { FC, useEffect, useRef } from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from '@unform/core'

interface Props {
    name: string
    label?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props & TextFieldProps

const Input: FC<InputProps> = ({ name, label, color='primary', ...rest }) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])

    return (
        <TextField 
            color={color || "primary"}
            label={label} 
            variant={"outlined"}
            id={fieldName}
            inputRef={inputRef}
            defaultValue={defaultValue}
            error={error ? true : false}
            {...rest}
        />
    )
}

export default Input