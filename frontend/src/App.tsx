import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import Navbar from './layout/Navbar';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditReview from './pages/DeleteReview';
import AddReview from './pages/AddReview';
import EditProfile from './pages/EditProfile';
import CarouselComponent from './layout/Carousel';
import Footer from './layout/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
    <CarouselComponent/>
      <Routes>

        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

        <Route path="/profile" element={<Profile/>} />
        <Route path="/edit-review/:id" element={<EditReview/>} />
        <Route path='/add-review' element={<AddReview/>}/>
        <Route path='/edit-profile' element={<EditProfile/>}/>



</Routes>
<Footer/>
    </Router>
  );
}

export default App;