import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail(){
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});

    const getMovie = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getMovie();
    }, []);
     
    return (
    <div>
        {loading ? <h1>Loading...</h1> :
            <div>
                <h1>{movie.title}</h1>
                <img src={movie.large_cover_image} alt={movie.title}/>
                <div>
                    {(movie.genres).map((genre) => (
                        <li key={genre}>{genre}</li>
                    ))}
                </div>
                <h4><a href={movie.url}>Go Watch Movie!!</a></h4>
            </div>
        }
    </div>
    );
}

export default Detail;