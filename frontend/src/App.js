import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, User, Home } from './pages';
import { Nav, RequireAuth } from './components';


const App = () => {
  return (
    <>
      <Router>
        <Nav />
          <Routes>
            <Route path='/' element={<RequireAuth><Home/></RequireAuth>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/:username' element={<User/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;