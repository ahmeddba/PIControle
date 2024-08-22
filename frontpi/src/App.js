import { Routes , Route } from 'react-router-dom';
import './App.css';
// import NavBar from './Components/NavBar';
import VisitorNav from './Components/VisitorNav';
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup';


function App() {
  return (
    <div className="App">
        <VisitorNav />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Signin/>}/>
          <Route path='/register' element={<Signup/>} />
        </Routes>
    </div>
  );
}

export default App;
