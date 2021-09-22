import React from 'react';

import './styles.css';

const MoviesCounter = ({amount}) => {
    const ending = `${amount > 1 ? 'movies' : 'movie'} found`;

    return (<p className='movies-counter'>
        <span className='movies-counter__amount'>{amount}</span>
        {ending}
    </p>);
};

export default MoviesCounter;