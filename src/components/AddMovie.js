import React, { useState, useEffect } from 'react';

const AddMovie = () => {

    // States for input field
    const [name, setMovieName] = useState("");
    const [rating, setRating] = useState("");
    const [genre, setGenre] = useState("");
    const [rentPrice, setRent] = useState("");

    // States for input field validations
    const [movieNameErr, setMovieNameErr] = useState("");
    const [ratingErr, setRatingErr] = useState("");
    const [genreErr, setGenreErr] = useState("");
    const [rentErr, setRentErr] = useState("");
    const [serverErr, setServerErr] = useState("");
    const [addResult, setAddResult] = useState("");
    const [internetErr, setInternetErr] = useState("");

    // To clear the validation errors with state change once the user provided the value for the state
    useEffect(() => {
        setServerErr("");
        setInternetErr("");
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
        setInternetErr("");
        setServerErr("");
        try {
            if (name && rating && genre && rentPrice) {
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

                if (postResult.status == 201) {
                    setAddResult("Movie added.");
                    setMovieName("");
                    setRating("");
                    setGenre("");
                    setRent("");
                }
                else if (postResult.status == 401) {
                    setServerErr("Unauthorized access. Please ensure you have permissions to access movies.")
                }
                else if (postResult.status == 400) {
                    var postResult = await postResult.json();
                    var postResultError = postResult.errors;
                    postResultError.Name ? setMovieNameErr("Movie Name is a required field") : setMovieNameErr("");
                    postResultError.rating ? setRatingErr("Rating is a required field") : setRatingErr("");
                    postResultError.Genre ? setGenreErr("Genre is a required field") : setGenreErr("");
                    postResultError.rentPrice ? setRentErr("Rent is a required field") : setRentErr("");
                }
                else {
                    setServerErr("Something is wrong. Please contact the server side administrator for details.");
                }
            }
            else {
                setAddResult("");
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
                {
                    internetErr && <div className="server-validation">
                        <h3>{internetErr}</h3>
                    </div>
                }
                {addResult && <p className="update-success">{addResult}</p>}
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