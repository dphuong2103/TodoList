import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './stores/store'
const reduxStore = store;
import './styles/GlobalStyles.scss'
import FirebaseContext from './context/FirebaseContext'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <BrowserRouter basename={import.meta.env.VITE_APP_PUBLIC_URL}>
    <Provider store={reduxStore}>
      <FirebaseContext>
        <App />
      </FirebaseContext>
    </Provider>
  </BrowserRouter>
)
