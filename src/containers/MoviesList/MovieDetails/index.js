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

    const { poster_path, title, genres, release_date, vote_average, runtime, overview } = movie;

    const genresList = genres.join(' & ');
    const year = release_date.slice(0, 4);
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;
    const duration = `${hours}h ${minutes}min`;

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