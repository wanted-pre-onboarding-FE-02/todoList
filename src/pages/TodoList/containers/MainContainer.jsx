import { useSelector } from 'react-redux'
import Main from '../components/Main/Main'

function MainContainer() {
  const todos = useSelector((state) => state.todos)

  return <Main todos={todos} />
}

export default MainContainer
