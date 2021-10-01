import React from 'react';
import PropTypes from 'prop-types';

import styles from './genresitem.modules.scss';

const GenresItem = ({value, active, clickHandler}) => {
    const classList = active ? `${styles['genre-item']} ${styles['genre-item--active']}` : styles['genre-item'];
    const genreClickHandler = () => clickHandler(value);

    return <li className={classList} onClick={genreClickHandler}>{value}</li>;
};

GenresItem.propTypes = {
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired
};

export default GenresItem;