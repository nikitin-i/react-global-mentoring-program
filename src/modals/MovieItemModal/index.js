import React from 'react';
import PropTypes from 'prop-types';

import MainHeading from '../../components/MainHeading';
import Button from '../../components/Button';
import { useInput } from '../../hooks/useInput';
import { useForm } from '../../hooks/useForm';

import styles from './movieitemmodal.modules.scss';

const ADD_MOVIE_MODAL_HEADING = 'Add movie';
const EDIT_MOVIE_MODAL_HEADING = 'Edit movie';

const MovieItemModal = ({ movie={}, mode, closeHandler, submitHandler }) => {
    const { title, release_date, poster_path, vote_average, genres, runtime, overview } = movie;

    const titleInput = useInput(title || '', 'title');
    const releaseInput = useInput(release_date || '', 'release_date');
    const posterInput = useInput(poster_path || '', 'poster_path');
    const voteInput = useInput(vote_average || '', 'vote_average');
    const genreInput = useInput(genres && genres[0] || '', 'genres');
    const timeInput = useInput(runtime || '', 'runtime');
    const overviewInput = useInput(overview || '', 'overview');

    const form = useForm([
        titleInput,
        releaseInput,
        posterInput,
        voteInput,
        genreInput,
        timeInput,
        overviewInput
    ], submitHandler, movie);

    const resetForm = (e) => {
        e.preventDefault();

        form.onReset();
    };

    const submitForm = (e) => {
        e.preventDefault();

        form.onSubmit();
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
                                <input id='title' value={titleInput.value} className={styles['movie-item-modal__input']} onChange={titleInput.onChange} />
                            </label>
                            <label className={styles['movie-item-modal__label-short']}>
                                <p className={styles['movie-item-modal__label-title']}>Release date</p>
                                <input id='release_date' value={releaseInput.value} type='date' className={styles['movie-item-modal__input']} onChange={releaseInput.onChange} />
                            </label>
                            <label className={styles['movie-item-modal__label-wide']}>
                                <p className={styles['movie-item-modal__label-title']}>Movie url</p>
                                <input id='poster_path' value={posterInput.value} className={styles['movie-item-modal__input']} placeholder='https://' onChange={posterInput.onChange} />
                            </label>
                            <label className={styles['movie-item-modal__label-short']}>
                                <p className={styles['movie-item-modal__label-title']}>Rating</p>
                                <input id='vote_average' value={voteInput.value} className={styles['movie-item-modal__input']} onChange={voteInput.onChange} />
                            </label>
                            <label className={styles['movie-item-modal__label-wide']}>
                                <p className={styles['movie-item-modal__label-title']}>Genre</p>
                                <select id='genre' value={genreInput.value} className={styles['movie-item-modal__input']} onChange={genreInput.onChange}>
                                    <option value='Select Genre'>Select Genre</option>
                                    <option value='Drama'>Drama</option>
                                    <option value='Comedy'>Comedy</option>
                                    <option value='Family'>Family</option>
                                    <option value='Thriller'>Thriller</option>
                                </select>
                            </label>
                            <label className={styles['movie-item-modal__label-short']}>
                                <p className={styles['movie-item-modal__label-title']}>Runtime</p>
                                <input id='runtime' value={timeInput.value} className={styles['movie-item-modal__input']} placeholder='minutes' onChange={timeInput.onChange}/>
                            </label>
                            <label className={styles['movie-item-modal__label']}>
                                <p className={styles['movie-item-modal__label-title']}>Overview</p>
                                <textarea id='overview' value={overviewInput.value} className={styles['movie-item-modal__textarea']} placeholder='Movie description' onChange={overviewInput.onChange}/>
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