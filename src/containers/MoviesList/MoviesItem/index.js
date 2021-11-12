import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import MovieMenu from '../MovieMenu';
import styles from './moviesitem.modules.scss';

const MovieItem = ({data: {id, poster_path, title, release_date, tagline}, deleteHandler, editHandler }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const movieItemClickHandler = () => {
        navigate(`/movie/${id}${location.search ? location.search : ''}`);
    };

    release_date = release_date.slice(0, 4);

    return (
        <section className={styles['movie-item']} onClick={movieItemClickHandler}>
            <img className={styles['movie-item__poster']} src={poster_path} alt='poster image'/>
            <div className={styles['movie-item__info']}>
                <h3 className={styles['movie-item__title']}>{title}</h3>
                <div className={styles['movie-item__release']}>{release_date}</div>
                <span className={styles['movie-item__tagline']}>{tagline}</span>
            </div>
            <div className={styles['movie-item__menu']}>
                <MovieMenu id={id} deleteHandler={deleteHandler} editHandler={editHandler}/>
            </div>
        </section>
    );
};

MovieItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        release_date: PropTypes.string,
        tagline: PropTypes.string
    }),
    deleteHandler: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired
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