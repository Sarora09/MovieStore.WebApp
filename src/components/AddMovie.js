import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {

    const [name, setMovieName] = useState("");
    const [rating, setRating] = useState("");
    const [genre, setGenre] = useState("");
    const [rentPrice, setRent] = useState("");
    const [movieNameErr, setMovienameErr] = useState("");
    const [ratingErr, setRatingErr] = useState("");
    const [genreErr, setGenreErr] = useState("");
    const [rentErr, setRentErr] = useState("");
    const Navigate = useNavigate();

    const submitMovie = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        var postResult = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/movies`,
            {
                method: 'post',
                body: JSON.stringify({ name, rating, genre, rentPrice }),
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
        // console.log(postResult.status);
        // console.log(await postResult.json());
        if (postResult.status == 201) {
            Navigate('/admindashboard/managemovies');
        }
    }

    return (
        <div className="movie-login-background">
            <div className="movie container">
                <h1>Add Movie</h1>
                <div className="movie-form">
                    <form onSubmit={submitMovie}>
                        <label>Movie Name</label>
                        <input type="text" placeholder="Movie name" value={name} onChange={(e) => setMovieName(e.target.value)} />
                        {movieNameErr && <p className="profile-validation">{movieNameErr}</p>}

                        <label>Rating</label>
                        <input type="number" min="0" max="10" step="any" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                        {ratingErr && <p className="profile-validation">{ratingErr}</p>}

                        <label>Genre</label>
                        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                        {genreErr && <p className="profile-validation">{genreErr}</p>}

                        <label>Rent</label>
                        <input type="number" placeholder="Rent" step="any" value={rentPrice} onChange={(e) => setRent(e.target.value)} />
                        {rentErr && <p className="profile-validation">{rentErr}</p>}

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddMovie;