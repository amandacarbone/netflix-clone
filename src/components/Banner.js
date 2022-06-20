import axios from "../services/axios";
import requests from "../services/requests";
import { useState, useEffect } from "react";
import "../styles/Banner.css";

export default function Banner() {

    const [ movie, setMovie ] = useState([]);

    function truncateDescription(description, characters) {
        return description?.length > characters ?
        description.substr(0, characters - 1) + "..." :
        description
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );

            return request;
        }

        fetchData();

    }, []);

    return (
        <header 
            className="banner" 
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
            }}
        >
            <div className="bannerContents">
                <h1 className="bannerTitle">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="bannerButtons">
                    <button className="bannerButton">Play</button>
                    <button className="bannerButton">My List</button>
                </div>
                <h1 className="bannerDescription">
                {truncateDescription(movie?.overview, 150)}
                </h1>
            </div>
            <div className="bannerFadeBottom"/>
        </header>
    );

};