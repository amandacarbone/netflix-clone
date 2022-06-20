import { useState, useEffect } from "react";
import axios from "../services/axios";
import "../styles/Row.css";

export default function Row({ title, fetchUrl, isLargeRow = false }) {

    const [ movies, setMovies ] = useState([]);

    const baseUrl = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    },[fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="rowPosters">
                {movies.map((movie) => (
                    ((isLargeRow && movie.poster_path) ||
                    (!isLargeRow && movie.backdrop_path)) && (
                        <img
                            key={movie.id}
                            className={`rowPoster ${isLargeRow && "rowPosterLarge"}`}
                            src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                            alt=""
                        />
                    )
                ))}
            </div>
        </div>
    );

};