import { FC, ReactNode, createContext, useReducer, useEffect, useState } from 'react'

interface Props {
    children:  ReactNode
}

type IType = {
    SetRestore: string
    SetDrawerStatus: string
    SetThemePaletteType: string
}

export type ICategory = {
    id: string
    name: string
    description: string | null
    created_at: string
    updated_at: string
    deleted_at: string | null
    videos: IVideo[]
}

export type IVideo = {
    id: string
    name: string
    description: string | null
    is_active: boolean | number
    created_at: string
    updated_at: string
    deleted_at: string | null
    categories: ICategory[]
    tags: ITag[]
}

export type ITag = {
    id: string
    name: string
    slug: string
    created_at: string
    updated_at: string
    deleted_at: string | null
    videos: IVideo[]
}

type IThemePalette = {
    type: string
}

type ITheme = {
    palette: IThemePalette
}

type IDrawer = {
    status: boolean,
    width: number
}

type IState = {
    drawer: IDrawer,
    theme: ITheme,
}

const type: IType = {
    SetRestore: 'app@SetRestore@SetRestore',
    SetThemePaletteType: 'theme@setThemePaletteType',
    SetDrawerStatus: 'drawer@setDrawerStatus',
}

const reducer = (state: IState, action: any): IState => {
    switch (action.type) {
        case type.SetThemePaletteType:
            return {
                ...state,
                theme: {
                    ...state.theme,
                    palette: {
                        ...state.theme.palette,
                        type: action.payload
                    }
                }
            }
        case type.SetDrawerStatus:
            return {
                ...state,
                drawer: {
                    ...state.drawer,
                    status: action.payload
                }
            }
        case type.SetRestore:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const AppContext = createContext<any>({

});
  
const Context: FC<Props> = ({
    children
}) => {
    
    const [ stateApp, setStateApp ] = useState<IState>({ 
        drawer: {
            status: false,
            width: 240
        },
        theme: {
            palette: {
                type: "light"
            }
        }
    })

    const [ state, dispatch ] = useReducer(reducer, stateApp)

    useEffect(() => {
       let data = JSON.parse(localStorage.getItem('state-app') as string)
       dispatch({
           type: type.SetRestore,
           payload: data
       })
    }, [setStateApp])

    useEffect(() => {
        localStorage.setItem('state-app', JSON.stringify(state))
    }, [state])

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
                type
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default Context
