import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, User } from './pages';
import { Nav } from './components';


const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <div className="container">
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/:username' element={<User/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;