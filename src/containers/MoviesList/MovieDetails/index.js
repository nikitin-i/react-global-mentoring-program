import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import SectionHeading from '../../../components/SectionHeading';
import styles from './moviedetails.modules.scss';

const MovieDetails = ({showMovieDetails}) => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const movie = showMovieDetails(Number(movieId));

    if (!movie) {
        navigate('/search');

        return false;
    }

    const { poster_path, title, genres, release_date, vote_average, runtime, overview } = movie;

    const genresList = genres.join(' & ');
    const year = release_date.slice(0, 4);
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;
    const duration = `${hours}h ${minutes}min`;

    return (
        <section className={styles['movie-details']}>
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
    showMovieDetails: PropTypes.func.isRequired
};

export default MovieDetails;