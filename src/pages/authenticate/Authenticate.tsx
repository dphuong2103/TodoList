import { Outlet } from 'react-router-dom'
import styles from './authenticate.module.scss'
function Authenticate() {
    return (<>
        <div className={styles['authenticate__container']}><Outlet /></div>
    </>
    )
}

export default Authenticate