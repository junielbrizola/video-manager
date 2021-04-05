import { FC, useEffect, useRef, useState } from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from '@unform/core'
import { SelectProps } from '@material-ui/core/Select'

interface Props {
    name: string
    label?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props & TextFieldProps & SelectProps

const Input: FC<InputProps> = ({ name, label, color='primary', ...rest }) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)
    const [ value, setValue ] = useState<string[]>([])

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

    useEffect(() => {
        if (typeof defaultValue !== 'undefined') {
            setValue(defaultValue)
        }
    }, [defaultValue])

    return (
        <TextField 
            color={color || "primary"}
            label={label} 
            variant={"outlined"}
            id={fieldName}
            value={value}
            onChange={e => {
                let data: string[] = []
                if (e.target.value && e.target.value.length > 0) {
                   data.push(e.target.value.toString())
                }
                setValue(data.length > 0 ? data.toString().split(',') : data)
            }}
            inputRef={inputRef}
            defaultValue={defaultValue}
            error={error ? true : false}
            SelectProps={{
                multiple: true
            }}
            {...rest}
        />
    )
}

export default Input