import React from 'react';

import MovieItem from './movie-item';
import './styles.css';

const MoviesList = ({movies}) => {
    return (
        <div className='movies-list'>
            {
                movies.map(movie => <MovieItem data={movie} key={movie.id} />)
            }
        </div>
    );
};

export default MoviesList;