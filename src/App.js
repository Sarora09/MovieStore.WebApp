import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Login from "./components/Login";
import About from "./components/About";
import Signup from "./components/Signup";
import Profile from "./components/Profile"
import MovieDashboard from "./components/MovieDashboard";
import OutletComponent from "./components/OutletComponent";
import AdminDashboard from "./components/AdminDashboard";
import ManageMovies from "./components/ManageMovies";
import AddMovie from "./components/AddMovie";
import UpdateMovie from "./components/UpdateMovie";
import ManageUsers from "./components/ManageUsers";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<OutletComponent />} >
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/moviedashboard" element={<MovieDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/admindashboard/managemovies" element={<ManageMovies />} />
            <Route path="/admindashboard/addmovie" element={<AddMovie />} />
            <Route path="/admindashboard/updatemovie/:id" element={<UpdateMovie />} />
            <Route path="/admindashboard/manageusers" element={<ManageUsers />} />
            <Route path="/admindashboard/adduser" element={<AddUser />} />
            <Route path="/admindashboard/updateUser/:id" element={<UpdateUser />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
