import { Routes , Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import VisitorNav from './Components/VisitorNav';
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import NavBar from './Components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { current } from './JS/Actions/AuthActions';
import NotFound from './Pages/NotFound';
import Accueil from './Pages/Accueil';


function App() {
  const location = useLocation();
  const currentUrl = location.pathname + location.search + location.hash;
  console.log(currentUrl)
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.isAuth);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();


useEffect(() => {
  dispatch(current(navigate));
}, [dispatch]);

useEffect(() => {
  dispatch(current(navigate));
}, [])


  return (
    <div className="App">
            { currentUrl === '/login' || currentUrl === '/' || currentUrl === '/register' || currentUrl === '/404' ?  <VisitorNav /> : <NavBar/> }
        <Routes>
          {
            user ?
            <>
              <Route path='/' element={<Navigate to="/acc" />} />
              <Route path='/prof/:id' element={<Profile/>}/>
              <Route path='/acc' element={<Accueil/>}/>
            </>
            :
            <>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Signin/>}/>
              <Route path='/register' element={<Signup/>} />
            </>
          }
              <Route path='/404' element={<NotFound />} />
              <Route path='*'  element={<Navigate to="/404"/>} />
        </Routes>
    </div>
  );
}

export default App;
