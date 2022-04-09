import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateMovie = () => {

    const [name, setMovieName] = useState("");
    const [rating, setRating] = useState("");
    const [genre, setGenre] = useState("");
    const [rentPrice, setRent] = useState("");
    const [movieNameErr, setMovieNameErr] = useState("");
    const [ratingErr, setRatingErr] = useState("");
    const [genreErr, setGenreErr] = useState("");
    const [rentErr, setRentErr] = useState("");
    const [serverErr, setServerErr] = useState("");
    const [updateResult, setUpdateResult] = useState("");
    const params = useParams();

    useEffect(async () => {
        var movieId = params.id;
        var i = 0;
        var token = localStorage.getItem('token');
        var movieResult = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/movies/${movieId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (movieResult.status == 200) {
            var movie = await movieResult.json();
            if (movie) {
                setMovieName(movie.name);
                setRating(movie.rating);
                setGenre(movie.genre);
                setRent(movie.rentPrice);
            }
        }
        else if (movieResult.status == 404) {
            setServerErr("Selected movie does not exist in the database. Please contact the server side administrator for details.");
        }

    }, []);

    // To clear the validation errors with state change once the user provided the value for the state
    useEffect(() => {
        setServerErr("");
        if (name) {
            setMovieNameErr("");
        }
        if (rating) {
            setRatingErr("");
        }
        if (genre) {
            setGenreErr("");
        }
        if (rentPrice) {
            setRentErr("");
        }
    }, [name, rating, genre, rentPrice]);

    const submitMovie = async (e) => {
        e.preventDefault();
        try {
            if (name && rating && genre && rentPrice) {
                var id = params.id;
                var token = localStorage.getItem('token');
                var movieResult = await fetch(`https://movie-collection-api-app.azurewebsites.net/api/movies/${id}`, {
                    method: "put",
                    body: JSON.stringify({ id, name, rating, genre, rentPrice }),
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (movieResult.status == 200) {
                    setUpdateResult("Movie record updated");
                }
                else if (movieResult.status == 400) {
                    var errorObject = await movieResult.json();
                    if (errorObject.errors.Name) {
                        setMovieNameErr("Movie Name is required.");
                    }
                    if (errorObject.errors.rating) {
                        setRatingErr("Please rate between 1-10 for this movie.");
                    }
                    if (errorObject.errors.rentPrice) {
                        setRentErr("Rent is required.");
                    }
                    if (errorObject.errors.Genre) {
                        setGenreErr("Genre is required.");
                    }
                }
                else if (movieResult.status == 404) {
                    setServerErr("Selected movie do not exist in the database. Please contact the server side administrator for details.");
                }
                else {
                    setServerErr("Something is wrong. Please contact the server side administrator for details.");
                }
            }
            else {
                setUpdateResult("");
                name == "" ? setMovieNameErr("Movie Name is a required field") : setMovieNameErr("");
                rating == "" ? setRatingErr("Rating is a required field") : setRatingErr("");
                genre == "" ? setGenreErr("Genre is a required field") : setGenreErr("");
                rentPrice == "" ? setRentErr("Rent is a required field") : setRentErr("");
            }
        }
        catch (err) {
            if (err == "TypeError: Failed to fetch") {
                setServerErr("Please ensure you have an internet connection.");
            }
            else {
                setServerErr(`Error: ${err}`);
            }
        }

    }

    return (
        <div className="movie-login-background">
            <div className="movie container">
                {
                    serverErr && <div className="server-validation">
                        <h3>{serverErr}</h3>
                    </div>
                }
                {updateResult && <p className="update-success">{updateResult}</p>}
                <h1>Update Movie</h1>
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

                        <button type="submit">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateMovie;