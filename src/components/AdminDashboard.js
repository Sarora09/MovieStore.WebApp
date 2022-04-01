import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    return (
        <div className='movie-login-background'>
            <div className='admin-dashboard container'>
                <h1>Admin Dashboard</h1>
                <div className='manage-section'>
                    <div className='manage-users'>
                        {/* <div className='admin-add-user'><Link to = "/admindashboard/adduser">Click to add New User</Link></div> */}
                        <div className='admin-manage-users'><Link to="/admindashboard/manageusers">Click to manage Existing Users</Link></div>
                    </div>
                    <div className='manage-movies'>
                        {/* <div className='admin-add-movie'><Link to = "/admindashboard/addmovie">Click to add new Movie</Link></div> */}
                        <div className='admin-manage-movies'><Link to="/admindashboard/managemovies">Click to manage existing movies</Link></div>
                    </div>
                </div>

            </div>
        </div>
    )





}

export default AdminDashboard;