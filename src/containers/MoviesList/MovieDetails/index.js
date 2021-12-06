import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import SectionHeading from '../../../components/SectionHeading';
import styles from './moviedetails.modules.scss';

const MovieDetails = ({movie}) => {
    const navigate = useNavigate();

    if (!movie) {
        navigate('/search');

        return false;
    } else if (!Object.keys(movie).length){
        return false;
    }

    const { poster_path, title, genresList, vote_average, year, duration, overview } = movie;

    return (
        <section className={styles['movie-details']} id='movie-details'>
            <img className={styles['movie-details__poster']} alt='poster image' src={poster_path} />
            <div className={styles['movie-details__info']}>
                <div className={styles['movie-details__heading']}>
                    <SectionHeading text={title} />
                    <p className={styles['movie-details__rating']}>{vote_average.toFixed(1)}</p>
                </div>
                <p className={styles['movie-details__genres']}>{genresList}</p>
                <div className={styles['movie-details__extra-info']}>
                    <span className={styles['movie-details__date']}>{year}</span>
                    <span className={styles['movie-details__duration']}>{duration}</span>
                </div>
                <p className={styles['movie-details__description']}>{overview}</p>
            </div>
        </section>
    );
};

MovieDetails.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        release_date: PropTypes.string,
        tagline: PropTypes.string
    })
};

export default MovieDetails;