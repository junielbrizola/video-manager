import { FC } from 'react'
import Context from './context'
import Scenes from './scenes'
import Http from './http'
import Theme from './theme'

type Props = {

}

const App:FC<Props> = () => {
  return (
    <Context>
      <Theme>
        <Http>
          <Scenes />
        </Http>
      </Theme>
    </Context>
  );
}

export default App;
