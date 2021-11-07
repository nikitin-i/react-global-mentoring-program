import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import MainHeading from '../../components/MainHeading';
import Button from '../../components/Button';

import styles from './movieitemmodal.modules.scss';

const ADD_MOVIE_MODAL_HEADING = 'Add movie';
const EDIT_MOVIE_MODAL_HEADING = 'Edit movie';

const MovieItemModal = ({ movie={}, mode, closeHandler, submitHandler }) => {
    const { title, release_date, poster_path, vote_average, genres, runtime, overview } = movie;

    const formik = useFormik({
        initialValues: {
            title: title || '',
            release_date: release_date || '',
            poster_path: poster_path || '',
            vote_average: vote_average || '',
            genres: genres && genres[0] || '',
            runtime: runtime || '',
            overview: overview || ''
        },
        onSubmit: values => {
            submitHandler({
                ...movie,
                ...values,
                genres: Array.of(values.genres),
                runtime: Number(values.runtime),
                vote_average: Number(values.vote_average)
            });
        },
        validate: values => {
            const errors = {};

            if (!values.title) {
                errors.title = 'Field is required';
            }

            if (!values.release_date) {
                errors.release_date = 'Field is required';
            }

            if (!values.poster_path) {
                errors.poster_path = 'Field is required';
            } else if (!values.poster_path.includes('https')) {
                errors.poster_path = 'Field must contain an url address (https://)';
            }

            if (!values.vote_average) {
                errors.vote_average = 'Field is required';
            } else if (!Number(values.vote_average)) {
                errors.vote_average = 'Field must contain a number';
            }

            if (!values.genres) {
                errors.genres = 'Field is required';
            }

            if (!values.runtime) {
                errors.runtime = 'Field is required';
            } else if (!Number(values.runtime)) {
                errors.runtime = 'Field must contain a number';
            }

            if (!values.overview) {
                errors.overview = 'Field is required';
            }

            return errors;
        }
    });

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
                                <input id='title' value={formik.values.title} className={styles['movie-item-modal__input']} onChange={formik.handleChange} />
                                {formik.touched.title && formik.errors.title ? <span className={styles['movie-item-modal__error-message']}>{formik.errors.title}</span> : null}
                            </label>
                            <label className={styles['movie-item-modal__label-short']}>
                                <p className={styles['movie-item-modal__label-title']}>Release date</p>
                                <input id='release_date' value={formik.values.release_date} type='date' className={styles['movie-item-modal__input']} onChange={formik.handleChange} />
                                {formik.touched.release_date && formik.errors.release_date ? <span className={styles['movie-item-modal__error-message']}>{formik.errors.release_date}</span> : null}
                            </label>
                            <label className={styles['movie-item-modal__label-wide']}>
                                <p className={styles['movie-item-modal__label-title']}>Movie url</p>
                                <input id='poster_path' value={formik.values.poster_path} className={styles['movie-item-modal__input']} placeholder='https://' onChange={formik.handleChange} />
                                {formik.touched.poster_path && formik.errors.poster_path ? <span className={styles['movie-item-modal__error-message']}>{formik.errors.poster_path}</span> : null}
                            </label>
                            <label className={styles['movie-item-modal__label-short']}>
                                <p className={styles['movie-item-modal__label-title']}>Rating</p>
                                <input id='vote_average' value={formik.values.vote_average} className={styles['movie-item-modal__input']} onChange={formik.handleChange} />
                                {formik.touched.vote_average && formik.errors.vote_average ? <span className={styles['movie-item-modal__error-message']}>{formik.errors.vote_average}</span> : null}
                            </label>
                            <label className={styles['movie-item-modal__label-wide']}>
                                <p className={styles['movie-item-modal__label-title']}>Genre</p>
                                <select id='genres' value={formik.values.genres} className={styles['movie-item-modal__input']} onChange={formik.handleChange}>
                                    <option value='Select Genre'>Select Genre</option>
                                    <option value='Drama'>Drama</option>
                                    <option value='Comedy'>Comedy</option>
                                    <option value='Family'>Family</option>
                                    <option value='Thriller'>Thriller</option>
                                </select>
                                {formik.touched.genres && formik.errors.genres ? <span className={styles['movie-item-modal__error-message']}>{formik.errors.genres}</span> : null}
                            </label>
                            <label className={styles['movie-item-modal__label-short']}>
                                <p className={styles['movie-item-modal__label-title']}>Runtime</p>
                                <input id='runtime' value={formik.values.runtime} className={styles['movie-item-modal__input']} placeholder='minutes' onChange={formik.handleChange}/>
                                {formik.touched.runtime && formik.errors.runtime ? <span className={styles['movie-item-modal__error-message']}>{formik.errors.runtime}</span> : null}
                            </label>
                            <label className={styles['movie-item-modal__label']}>
                                <p className={styles['movie-item-modal__label-title']}>Overview</p>
                                <textarea id='overview' value={formik.values.overview} className={styles['movie-item-modal__textarea']} placeholder='Movie description' onChange={formik.handleChange}/>
                                {formik.touched.overview && formik.errors.overview ? <span className={styles['movie-item-modal__error-message']}>{formik.errors.overview}</span> : null}
                            </label>
                            <div className={styles['movie-item-modal__buttons']}>
                                <Button clickHandler={formik.handleReset} value='Reset'/>
                                <Button clickHandler={formik.handleSubmit} value='Submit' type='submit'/>
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