import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MainHeading from '../../components/MainHeading';
import Button from '../../components/Button';
import styles from './movieitemmodal.modules.scss';

const ADD_MOVIE_MODAL_HEADING = 'Add movie';
const EDIT_MOVIE_MODAL_HEADING = 'Edit movie';

const MovieItemModal = ({ movie, mode, closeHandler, submitHandler }) => {
    const initialState = {
        title: '',
        release_date: '',
        poster_path: '',
        vote_average: '',
        genre: '',
        runtime: '',
        overview: ''
    };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (mode === 'edit' && movie) {
            processResponse(movie);
        }
    }, []);

    const processResponse = movie => {
        const { genres, ...rest } = movie;

        setState({
            ...rest,
            genre: genres[0],
        });
    };

    const handleChange = ({target: {id, value}}) => setState({
        ...state,
        [id]: value
    });

    const resetForm = (e) => {
        e.preventDefault();

        setState(initialState);
    };

    const submitForm = (e) => {
        e.preventDefault();

        const { genre, runtime, vote_average, ...rest } = state;

        submitHandler({
            ...rest,
            genres: Array.of(genre),
            runtime: Number(runtime),
            vote_average: Number(vote_average)
        });
    };

    return (
        <section className={styles['movie-item-modal']}>
            <div className={styles['movie-item-modal__wrapper']}>
                <div className={styles['movie-item-modal__background']}/>
                <div className={styles['movie-item-modal__content-wrapper']}>
                    <div className={styles['movie-item-modal__close']} onClick={closeHandler}>X</div>
                    <div className={styles['movie-item-modal__content']}>
                        <MainHeading text={mode === 'add' ? ADD_MOVIE_MODAL_HEADING : EDIT_MOVIE_MODAL_HEADING}/>
                        <form className={styles['movie-item-modal__form']}>
                            <label className={styles['movie-item-modal__label-wide']}>
                                <p className={styles['movie-item-modal__label-title']}>Title</p>
                                <input id='title' value={state.title} className={styles['movie-item-modal__input']} onChange={handleChange} />
                            </label>
                            <label className={styles['movie-item-modal__label-short']}>
                                <p className={styles['movie-item-modal__label-title']}>Release date</p>
                                <input id='release_date' value={state.release_date} type='date' className={styles['movie-item-modal__input']} onChange={handleChange} />
                            </label>
                            <label className={styles['movie-item-modal__label-wide']}>
                                <p className={styles['movie-item-modal__label-title']}>Movie url</p>
                                <input id='poster_path' value={state.poster_path} className={styles['movie-item-modal__input']} placeholder='https://' onChange={handleChange} />
                            </label>
                            <label className={styles['movie-item-modal__label-short']}>
                                <p className={styles['movie-item-modal__label-title']}>Rating</p>
                                <input id='vote_average' value={state.vote_average} className={styles['movie-item-modal__input']} onChange={handleChange} />
                            </label>
                            <label className={styles['movie-item-modal__label-wide']}>
                                <p className={styles['movie-item-modal__label-title']}>Genre</p>
                                <select id='genre' value={state.genre} className={styles['movie-item-modal__input']} onChange={handleChange}>
                                    <option value='Select Genre'>Select Genre</option>
                                    <option value='Drama'>Drama</option>
                                    <option value='Comedy'>Comedy</option>
                                    <option value='Family'>Family</option>
                                    <option value='Thriller'>Thriller</option>
                                </select>
                            </label>
                            <label className={styles['movie-item-modal__label-short']}>
                                <p className={styles['movie-item-modal__label-title']}>Runtime</p>
                                <input id='runtime' value={state.runtime} className={styles['movie-item-modal__input']} placeholder='minutes' onChange={handleChange}/>
                            </label>
                            <label className={styles['movie-item-modal__label']}>
                                <p className={styles['movie-item-modal__label-title']}>Overview</p>
                                <textarea id='overview' value={state.overview} className={styles['movie-item-modal__textarea']} placeholder='Movie description' onChange={handleChange}/>
                            </label>
                            <div className={styles['movie-item-modal__buttons']}>
                                <Button clickHandler={resetForm} value='Reset'/>
                                <Button clickHandler={submitForm} value='Submit'/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

MovieItemModal.propTypes = {
    mode: PropTypes.string.isRequired,
    closeHandler: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
    movie: PropTypes.object
};

export default MovieItemModal;