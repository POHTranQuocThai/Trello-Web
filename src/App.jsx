import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/activeBoard/user/userSlice'
import Settings from './pages/Settings/Settings'

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to={'/login'} replace={true} />
  }
  //Sử dụng Outlet của react-router-dom để hiển thị các Child Route
  return <Outlet />
}
function App() {
  const currentUser = useSelector(selectCurrentUser)

  return <Routes>
    <Route path='/' element={<Navigate to='/boards/66c48c6d6eb222d663158e8f' replace={true} />} />
    <Route element={<ProtectedRoute user={currentUser} />}>
      <Route path='/boards/:boardId' element={<Board />} />
      {/* User setting */}
      <Route path='/settings/account' element={<Settings />} />
      <Route path='/settings/security' element={<Settings />} />
    </Route>
    <Route path='/login' element={<Auth />} />
    <Route path='/register' element={<Auth />} />
    <Route path='/account/verification' element={<AccountVerification />} />
    <Route path='*' element={<NotFound />} />

  </Routes>
}

export default App
