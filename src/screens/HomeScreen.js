import Banner from "../components/Banner";
import Nav from "../components/Nav";
import Row from "../components/Row";
import requests from "../services/requests";

export default function HomeScreen() {

    return (
        <div className="homeScreen">
            <Nav/>
            <Banner/>
            <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row
                title="Trending Now"
                fetchUrl={requests.fetchTrending}
                isLargeRow
            />
            <Row
                title="Top Rated"
                fetchUrl={requests.fetchTopRated}
                isLargeRow
            />
            <Row
                title="Action"
                fetchUrl={requests.fetchActionMovies}
                isLargeRow
            />
            <Row
                title="Comedy"
                fetchUrl={requests.fetchComedyMovies}
                isLargeRow
            />
            <Row
                title="Horror"
                fetchUrl={requests.fetchHorrorMovies}
                isLargeRow
            />
            <Row
                title="Romance"
                fetchUrl={requests.fetchRomanceMovies}
                isLargeRow
            />
            <Row
                title="Documentaries"
                fetchUrl={requests.fetchDocumentaries}
                isLargeRow
            />
        </div>
    );

};