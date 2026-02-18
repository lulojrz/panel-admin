
import './App.css'
import Login from './pages/Login'
import { Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import { useContext } from 'react';
import { AuthContext, useAuth } from './Context/AuthContext';



function App() {
  const {user} = useAuth();


  return (
    <>

    <Routes>
      <Route path='/' element={<Login></Login>}/>
      <Route path='/home' element={<Home user={user}></Home>}/>

      

    </Routes>

    
    </>
  )
}

export default App
