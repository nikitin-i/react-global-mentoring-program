import React from 'react';

import GenreItem from './genre-item';
import './styles.css';

const GenreToggle = ({genres, changeGenre, activeGenre}) => (
    <ul className='genre-list'>
        {
            genres.map((genre, index) => <GenreItem
                value={genre}
                key={genre}
                active={activeGenre === genre}
                clickHandler={changeGenre}/>)
        }
    </ul>
);

export default GenreToggle;