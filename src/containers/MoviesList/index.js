import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import { moviesContext } from '../../context/moviesContext';
import MovieItem from './MoviesItem';
import styles from './movieslist.modules.scss';

const MoviesList = ({deleteHandler, editHandler, clickHandler}) => {
    const movies = useContext(moviesContext);

    return (
        <div className={styles['movies-list']}>
            <div className={styles['movies-list__container']}>
                {
                    movies.map(movie => <MovieItem data={movie} key={movie.id} deleteHandler={deleteHandler} editHandler={editHandler} clickHandler={clickHandler} />)
                }
            </div>
        </div>
    );
};

MoviesList.propTypes = {
    deleteHandler: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired,
    clickHandler: PropTypes.func.isRequired
};

export default MoviesList;