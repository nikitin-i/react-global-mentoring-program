import React, {useState} from 'react';
import PropTypes from 'prop-types';

import GenresItem from './GenresItem';
import styles from './genrestoggle.modules.scss';

const GENRES_LIST = ['All', 'Drama', 'Family', 'Comedy', 'Thriller'];

const GenresToggle = ({changeHandler}) => {
    const [activeGenre, setActiveGenre] = useState('All');

    const chooseActiveGenre = genre => {
        setActiveGenre(genre);
        changeHandler(genre);
    };

    return (
        <ul className={styles['genre-list']}>
            {
                GENRES_LIST.map((genre, index) => <GenresItem
                    value={genre}
                    key={genre}
                    active={activeGenre === genre}
                    clickHandler={chooseActiveGenre}/>)
            }
        </ul>
    );
};

GenresToggle.propTypes = {
    changeHandler: PropTypes.func.isRequired
};

export default GenresToggle;