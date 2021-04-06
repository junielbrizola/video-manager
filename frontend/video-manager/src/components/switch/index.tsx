import { FC, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import Switch, { SwitchProps } from '@material-ui/core/Switch';

interface Props {
    name: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props & SwitchProps

const Input: FC<InputProps> = ({ name, color='primary', ...rest }) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const { fieldName, defaultValue, registerField } = useField(name)
    const [ value, setValue ] = useState<boolean>(true)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.checked
            },
            setValue: (ref, value) => {
                ref.current.checked = value
            },
            clearValue: ref => {
                ref.current.checked = false
            },
        })
    }, [fieldName, registerField])

    useEffect(() => {
        if (typeof defaultValue !== 'undefined') {
            setValue(defaultValue)
        }
    }, [defaultValue])

    return (
        <Switch 
            color={color || "primary"}
            id={fieldName}
            checked={value}
            onChange={e => {
                setValue(e.target.checked)
            }}
            inputRef={inputRef}
            {...rest}
        />
    )
}

export default Input