import React , {useContext} from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signin from '../pages/Signin'
import NotFound from '../pages/NotFound'
import Issues from '../pages/Issues'
import New from '../pages/New'
import Edit from '../pages/Edit'
import { ProtectedRoute } from '../components/protectedRoute/ProtectedRoute'
import NavBar from '../components/nav/NavBar';

const MainNavigator = () => {
  
  return (
    <BrowserRouter>
          <NavBar/>
          <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path='/signin' element={<Signin></Signin>}></Route>
              <Route element={<ProtectedRoute></ProtectedRoute>}>
                <Route path='/issues' element={<Issues></Issues>}></Route>
                <Route path='/issues/new' element={<New></New>}></Route>
                <Route path='/issues/edit/:id' element={<Edit></Edit>}></Route>
              </Route>
              <Route path='*' element={<NotFound></NotFound>}></Route>
          </Routes>
    </BrowserRouter>  
  )
}

export default MainNavigator