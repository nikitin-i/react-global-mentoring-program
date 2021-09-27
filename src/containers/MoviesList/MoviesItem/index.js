import React from 'react';
import PropTypes from 'prop-types';

import MovieMenu from '../MovieMenu';
import styles from './moviesitem.modules.scss';

const MovieItem = ({data: {poster_path, title, release_date, tagline}}) => {
    release_date = release_date.slice(0, 4);

    return (
        <section className={styles['movie-item']}>
            <img className={styles['movie-item__poster']} src={poster_path} />
            <div className={styles['movie-item__info']}>
                <h3 className={styles['movie-item__title']}>{title}</h3>
                <div className={styles['movie-item__release']}>{release_date}</div>
                <span className={styles['movie-item__tagline']}>{tagline}</span>
            </div>
            <div className={styles['movie-item__menu']}>
                <MovieMenu />
            </div>
        </section>
    );
};

MovieItem.propTypes = {
    data: PropTypes.shape({
        poster_path: PropTypes.string,
        title: PropTypes.string,
        release_date: PropTypes.string,
        tagline: PropTypes.string
    })
};

MovieItem.defaultProps = {
    data: {
        poster_path: 'N/A',
        title: 'N/A',
        release_date: 'N/A',
        tagline: 'N/A'
    }
};

export default MovieItem;