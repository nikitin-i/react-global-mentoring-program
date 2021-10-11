import React, { useContext } from 'react';

import { moviesContext } from '../../context/moviesContext';

import styles from './moviescounter.modules.scss';

const MoviesCounter = () => {
    const movies = useContext(moviesContext);
    const ending = `${movies.length > 1 ? 'movies' : 'movie'} found`;

    return (<p className={styles['movies-counter']}>
        <span className={styles['movies-counter__amount']}>{movies.length}</span>
        {ending}
    </p>);
};

export default MoviesCounter;