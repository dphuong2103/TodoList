import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import Authenticate from './pages/authenticate/Authenticate'
import SignIn from './pages/authenticate/SignIn'
import HomepageWrapper from './pages/homepage/HomepageWrapper'
import { useAppSelector } from './stores/hooks'

function App() {
  const user = useAppSelector(state => state.user.user);
  return (
    <>
      <div className='app__container'>
        <Routes>
          <Route index element={user?.uid ? <Navigate to='/homepage' /> : <Navigate to='/authenticate' />} />
          <Route path='/authenticate' element={user?.uid ? <Navigate to='/homepage' /> : <Authenticate />}>
            <Route index element={<SignIn />} />
          </Route>
          <Route path='/homepage' element={user?.uid ? <HomepageWrapper /> : <Navigate to='/authenticate' />} />
        </Routes>
      </div>
      <Toaster position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }} />
    </>
  )
}

export default App
