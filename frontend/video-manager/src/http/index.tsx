import { FC, ReactNode } from 'react'
import { Provider } from 'use-http'

type Props = {
    children: ReactNode
}

const Http: FC<Props> = ({
    children
}) => {
  return (
    <Provider url={`${process.env.REACT_APP_HOST}/api`}>
        {children}
    </Provider>
  )
}

export default Http