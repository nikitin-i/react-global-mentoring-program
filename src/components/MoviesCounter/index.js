import React from 'react';
import PropTypes from 'prop-types';

import styles from './moviescounter.modules.scss';

const MoviesCounter = ({amount}) => {
    const ending = `${amount > 1 ? 'movies' : 'movie'} found`;

    return (<p className={styles['movies-counter']}>
        <span className={styles['movies-counter__amount']}>{amount}</span>
        {ending}
    </p>);
};

MoviesCounter.propTypes = {
    amount: PropTypes.number.isRequired
};

export default MoviesCounter;