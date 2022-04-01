import React, { useEffect, useState } from 'react';

const MovieDashboard = () => {

    const token = localStorage.getItem('token');
    const [movieDetails, setMovieDetails] = useState("");
    const [testLink, setTestLink] = useState("");

    useEffect(async ()=>{
        var result = await fetch(`https://localhost:44304/api/movies`, {
            headers:{
                authorization: `Bearer ${token}`
            }
        });
        var userDetails = await result.json();
        setMovieDetails(userDetails);
    }, []);

    console.log(movieDetails);

    const selectMovie = (id, rentPrice) => {
        console.log(id, rentPrice);
        var newMovieDetails = movieDetails.filter((element)=>element.id !=id);
        setMovieDetails(newMovieDetails);
        setTestLink(`https://www.testlink.com/watch?id=${id}`);
    }

    return(
        <div className='movie-login-background'>
            <div className="movie-dashboard container">
                {testLink && <p className='watch-selected'><b>Watch selected movie at: </b>
                <a href={testLink} target="_blank">{testLink}</a></p>}
                <h1>My Dashboard</h1>
                {
                    movieDetails && <div className="movie-details">
                        {
                            movieDetails.map((element, index)=>{
                                return <div key={index} className="individual">
                                    <div className="movie-name">
                                        <p><b>{element.name}</b></p>
                                    </div>
                                    <div className="movie-spec">
                                    <p><b>Rating:</b> {element.rating}</p>
                                    <p><b>Genre:</b> {element.genre}</p>
                                    <p><b>Price:</b> {element.rentPrice}$</p>
                                    <button onClick={()=>{
                                        if(window.confirm(`You have selected to watch ${element.name} for ${element.rentPrice}$. Press 'OK' to accept the charges.`)) 
                                        {
                                            selectMovie(element.id, element.rentPrice);
                                        }
                                    }}>Watch</button>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                }
            </div>
        </div>
    );
}

export default MovieDashboard;