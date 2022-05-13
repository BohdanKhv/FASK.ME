import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, User, Home } from './pages';
import { Nav, AuthInitial } from './components';


const App = () => {
  return (
    <>
      <Router>
        <Nav />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/inbox' element={<Home/>} />
            <Route path='/sent' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/:username' element={<User/>} />
            <Route path='/:username/answered' element={<User/>} />
            <Route path='/:username/asked' element={<User/>} />
            <Route path='/:username/private' element={<User/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;