import React from 'react';
import { Icon } from "@iconify/react"
import { updateRating } from '../apiService/api-movies';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
const Movie = (props) => {
    const { isAuthenticated, user } = useAuth0()
    const searchValue = useSelector(state => state.headerInputReducer)
    const switchValue = useSelector(state => state.switchValueReducer)
    const onStarClick = async (rating) => {
        let updatedMovieList = await updateRating(props.movie._id, { ratedBy: isAuthenticated ? user.sub : "anonymus", ratedStar: rating, limit: props.limit, q: searchValue, type: switchValue ? "tvShow" : "movie" })
        props.rateMovie(updatedMovieList)
    }
    return (
        <div className='singleMovie'>
            <img src={process.env.PUBLIC_URL + `/images/${props.movie.img}`} alt='movieCover' />
            <div className='movieInformations'>
                <div className='movieTitle'>
                    {props.movie.title}
                </div>
                <div className='movieDescription'>
                    <p>
                        {props.movie.description}
                    </p>
                </div>
                <div className='movieCast'>
                    <p>
                        <span>Cast: </span>{props.movie.cast.toString()}
                    </p>
                </div>
                <div className='movieRelease'>
                    <p>
                        <span>Release date: </span>  {new Date(props.movie.releaseDate).toDateString()}
                    </p>
                </div>
                <div className='yourVote'>
                    <p>
                        <span>Your vote: </span>  {Array(5).fill(null).map((star, i) => {
                            return <Icon icon="codicon:star-full" className='starIcon' key={i} onClick={() => onStarClick(i + 1)} />
                        })}
                    </p>
                </div>
            </div>
            <div className='rating'>
                Rating: {props.movie.averageRating.toFixed(2)}
            </div>


        </div>
    );
};

export default Movie;