import React from 'react';

import './styles.css';

const GenreItem = ({value, active, clickHandler}) => {
    const classList = active ? 'genre-item genre-item--active' : 'genre-item';

    return <li className={classList} onClick={() => clickHandler(value)}>{value}</li>;
};

export default GenreItem;