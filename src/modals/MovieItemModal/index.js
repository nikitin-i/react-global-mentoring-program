import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainHeading from '../../components/MainHeading';
import Button from '../../components/Button';
import styles from './movieitemmodal.modules.scss';

const ADD_MOVIE_MODAL_HEADING = 'Add movie';
const EDIT_MOVIE_MODAL_HEADING = 'Edit movie';

class MovieItemModal extends Component {
    state = {
        title: '',
        release_date: '',
        poster_path: '',
        vote_average: '',
        genre: '',
        runtime: '',
        overview: ''
    };

    componentDidMount() {
        if (this.props.mode === 'edit' && this.props.movie) {
            this.processResponse(this.props.movie);
        }
    }

    processResponse = movie => {
        const { title, release_date, poster_path, vote_average, genres, runtime, overview } = movie;

        this.setState(() => ({
            title,
            release_date,
            poster_path,
            vote_average,
            genre: genres[0],
            runtime,
            overview
        }));
    };

    handleChange = ({target: {id, value}}) => this.setState(() => ({
        [id]: value
    }));

    resetForm = (e) => {
        e.preventDefault();

        this.setState(() => ({
            title: '',
            release_date: '',
            poster_path: '',
            vote_average: '',
            genre: '',
            runtime: '',
            overview: ''
        }));
    };

    submitForm = (e) => {
        e.preventDefault();

        const { title, release_date, poster_path, vote_average, genre, runtime, overview } = this.state;
        const movie = this.props.movie || {};

        this.props.submitHandler({
            ...movie,
            title,
            release_date,
            poster_path,
            vote_average: Number(vote_average),
            genres: Array.of(genre),
            runtime: Number(runtime),
            overview
        });
    };

    render = () => {
        const { mode, closeHandler } = this.props;
        const { title, release_date, poster_path, vote_average, genre, runtime, overview } = this.state;

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
                                    <input id='title' value={title} className={styles['movie-item-modal__input']} onChange={this.handleChange} />
                                </label>
                                <label className={styles['movie-item-modal__label-short']}>
                                    <p className={styles['movie-item-modal__label-title']}>Release date</p>
                                    <input id='release_date' value={release_date} type='date' className={styles['movie-item-modal__input']} onChange={this.handleChange} />
                                </label>
                                <label className={styles['movie-item-modal__label-wide']}>
                                    <p className={styles['movie-item-modal__label-title']}>Movie url</p>
                                    <input id='poster_path' value={poster_path} className={styles['movie-item-modal__input']} placeholder='https://' onChange={this.handleChange} />
                                </label>
                                <label className={styles['movie-item-modal__label-short']}>
                                    <p className={styles['movie-item-modal__label-title']}>Rating</p>
                                    <input id='vote_average' value={vote_average} className={styles['movie-item-modal__input']} onChange={this.handleChange} />
                                </label>
                                <label className={styles['movie-item-modal__label-wide']}>
                                    <p className={styles['movie-item-modal__label-title']}>Genre</p>
                                    <select id='genre' value={genre} className={styles['movie-item-modal__input']} onChange={this.handleChange}>
                                        <option value='Select Genre'>Select Genre</option>
                                        <option value='Drama'>Drama</option>
                                        <option value='Comedy'>Comedy</option>
                                        <option value='Family'>Family</option>
                                        <option value='Thriller'>Thriller</option>
                                    </select>
                                </label>
                                <label className={styles['movie-item-modal__label-short']}>
                                    <p className={styles['movie-item-modal__label-title']}>Runtime</p>
                                    <input id='runtime' value={runtime} className={styles['movie-item-modal__input']} placeholder='minutes' onChange={this.handleChange}/>
                                </label>
                                <label className={styles['movie-item-modal__label']}>
                                    <p className={styles['movie-item-modal__label-title']}>Overview</p>
                                    <textarea id='overview' value={overview} className={styles['movie-item-modal__textarea']} placeholder='Movie description' onChange={this.handleChange}/>
                                </label>
                                <div className={styles['movie-item-modal__buttons']}>
                                    <Button clickHandler={this.resetForm} value='Reset'/>
                                    <Button clickHandler={this.submitForm} value='Submit'/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

MovieItemModal.propTypes = {
    mode: PropTypes.string.isRequired,
    closeHandler: PropTypes.func.isRequired,
    movie: PropTypes.object
};

export default MovieItemModal;