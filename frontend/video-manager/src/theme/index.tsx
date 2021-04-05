import { FC, ReactNode, useContext } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import {
    createMuiTheme
} from "@material-ui/core";
import { AppContext } from '../context'

type Props = {
    children: ReactNode
}

const Theme: FC<Props> = ({
    children
}) => {

    const {
        state: {
            theme
        } 
    } = useContext(AppContext)

    return (
        <ThemeProvider 
            theme={createMuiTheme({
                ...theme
            })}
        >
            {children}
        </ThemeProvider>
    )
}

export default Theme