import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ManageMovies = () => {

    const token = localStorage.getItem('token');
    const [movieList, setMovieList] = useState("");
    const [deleteResult, setDeleteResult] = useState("");
    const location = useLocation();

    const fetchMovies = async () => {
        const movieResult = await fetch('https://localhost:44304/api/movies', {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        // extracting json list
        var movieListResults = await movieResult.json();
        console.log(movieListResults);
        setMovieList(movieListResults);
    }

    useEffect(async () => {
        fetchMovies();
    }, []);

    const deleteMovie = async (id) => {
        console.log(id);
        var movieResult = await fetch(`https://localhost:44304/api/movies/${id}`, {
            method: "delete",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (movieResult.status == 200) {
            fetchMovies();
            setDeleteResult("Movie deleted successfully.")
        }
    }

    return (
        <div className='movie-login-background'>
            <div className='admin-dashboard container'>
                {deleteResult && <p className="update-success">{deleteResult}</p>}
                <h1>Admin Dashboard</h1>
                <Link to="/admindashboard/addmovie" className="new-movie-button">Click here to add New Movie</Link>
                <div className="movie-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Sl.No.</th>
                                <th>Movie Name</th>
                                <th>Rating</th>
                                <th>Genre</th>
                                <th>Rent ($)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movieList ? movieList.map((element, index) => {
                                console.log(element);
                                return <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{element.name}</td>
                                    <td>{element.rating}</td>
                                    <td>{element.genre}</td>
                                    <td>{element.rentPrice}</td>
                                    <td>
                                        <div>
                                            <button><Link to={`/admindashboard/updatemovie/${element.id}`}>Edit</Link></button>
                                            <button onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this movie?")) {
                                                    deleteMovie(element.id)
                                                }
                                            }}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            }) : null
                            }
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageMovies;