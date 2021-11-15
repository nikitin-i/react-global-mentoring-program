import React from 'react';

import styles from './moviescounter.modules.scss';

const MoviesCounter = ({length}) => {
    const ending = `${length > 1 ? 'movies' : 'movie'} found`;

    return (<p className={styles['movies-counter']} id='counter'>
        <span className={styles['movies-counter__amount']}>{length}</span>
        {ending}
    </p>);
};

export default MoviesCounter;