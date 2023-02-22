import TodoModalContext from '../../context/TodoModalContext'
import Homepage from './Homepage'

function HomepageWrapper() {

    return (
        <TodoModalContext>
            <Homepage />
        </TodoModalContext>

    )
}

export default HomepageWrapper