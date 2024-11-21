import { Route, Routes, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'

function App() {
  return <Routes>
    <Route path='/' element={<Navigate to='/boards/66c48c6d6eb222d663158e8f' replace={true} />} />
    <Route path='/boards/:boardId' element={<Board />} />
    <Route path='/login' element={<Auth />} />
    <Route path='/register' element={<Auth />} />
    <Route path='/account/verification' element={<AccountVerification />} />
    <Route path='*' element={<NotFound />} />

  </Routes>
}

export default App
