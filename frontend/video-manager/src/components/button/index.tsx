import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import { FC, ReactNode } from 'react'

type Props = {
    label: string,
    color: string | any,
    onClick: () => void,
    startIcon: (classe: string) => ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        fontSize: 20,
        margin: theme.spacing(1.5),
        fontWeight: 'bold'
    },
    buttonIcon: {
        fontWeight: 'bold',
        fontSize: '20px !important',
    },
}))
  
const Button: FC<Props> = ({
    label,
    color,
    onClick,
    startIcon
}) => {

    const classes= useStyles()

    return (
        <MuiButton 
            className={classes.button} 
            color={color}
            onClick={onClick}
            startIcon={startIcon(classes.buttonIcon)}
        >
            {label} 
        </MuiButton>
    )
}

export default Button