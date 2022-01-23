import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMovieList } from '../apiService/api-movies';

import Movie from './Movie';

const MovieList = () => {

    const [movies, setMovies] = useState([])
    const [loadMore, setLoadMore] = useState(true)
    const searchValue = useSelector(state => state.headerInputReducer)
    const switchValue = useSelector(state => state.switchValueReducer)
    const getMovies = async (refrash) => {
        try {
            let moviesLength = movies.length
            if (refrash) {
                setMovies([])
                moviesLength = 0
            }
            let responseMovies = await getMovieList(moviesLength, searchValue.length > 2 ? searchValue : "", switchValue ? "tvShow" : "movie")
            setMovies((prevState) => [...prevState, ...responseMovies.movies])
            setLoadMore(responseMovies.loadMore)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovies(true)
        // eslint-disable-next-line
    }, [searchValue, switchValue])


    const rateMovie = (refreshedMovieList) => {
        setMovies(refreshedMovieList.movies)
        setLoadMore(refreshedMovieList.loadMore)
    }

    return (
        <div className='movieListWrapper'>
            <div className='movieListGrid'>
                {movies.map((movie, id) => {
                    return <Movie movie={movie} limit={movies.length} rateMovie={rateMovie} key={id} />
                })}
            </div>
            <div className='buttonWrapper'>
                {loadMore && movies.length !== 0 ? <button onClick={() => getMovies(false)}>Load more</button> : ""}
            </div>

        </div>
    );
};

export default MovieList;