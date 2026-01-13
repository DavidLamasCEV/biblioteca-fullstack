import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BookDetail from './pages/BookDetail';
import BookEdit from './pages/BookEdit';
import LibraryForm from './pages/LibraryForm';
import LibraryList from './pages/LibraryList';
import ThemeContext from './contents/themeContext';
import { useContext } from 'react';

function App() {

  const { theme } = useContext(ThemeContext);
  return (
    <div className={`app-wrapper ${theme}`}>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/:id/edit" element={<BookEdit />} />
          <Route path="/add-library" element={<LibraryForm />} />
          <Route path="/libraries" element={<LibraryList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;