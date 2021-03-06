import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, User, Home, ResetPassword, ForgotPassword } from './pages';
import { Nav, AuthInitial } from './components';


const App = () => {
  const theme = useSelector((state) => state.local.theme);

  useEffect(() => {
      if (theme === 'dark') {
          document.body.setAttribute('data-theme', 'dark');
      } else {
          document.body.setAttribute('data-theme', 'light');
      }
  }, [theme]);

  return (
    <>
      <Router>
        <Nav />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/inbox' element={<Home/>} />
            <Route path='/sent' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/reset-password' element={<ResetPassword/>} />
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