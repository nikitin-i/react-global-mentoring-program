import React from 'react';
import PropTypes from 'prop-types';

import MovieItem from './MoviesItem';
import styles from './movieslist.modules.scss';

const MoviesList = ({movies}) => {
    return (
        <div className={styles['movies-list']}>
            <div className={styles['movies-list__container']}>
                {
                    movies.map(movie => <MovieItem data={movie} key={movie.id} />)
                }
            </div>
        </div>
    );
};

MoviesList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object)
};

export default MoviesList;