import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    getMoviesAsync,
    setDeleteMovie,
    setEditMovie,
    openDeleteMovieModal,
    openEditMovieModal
} from '../../store/actions';
import MovieItem from './MoviesItem';
import styles from './movieslist.modules.scss';

const MoviesList = ({
                        filteredMovies,
                        clickHandler,
                        getMovies,
                        setDeleteMovie,
                        setEditMovie,
                        openDeleteMovieModal,
                        openEditMovieModal
}) => {
    useEffect(() => {
        getMovies();
    }, []);

    const openDeleteConfirmationModal = (id) => {
        setDeleteMovie(id);
        openDeleteMovieModal(true);
    };

    const openEditingMovieModal = (id) => {
        setEditMovie(id);
        openEditMovieModal(true);
    };

    return (
        <div className={styles['movies-list']}>
            <div className={styles['movies-list__container']}>
                {
                    filteredMovies.map(movie => <MovieItem
                        data={movie}
                        key={movie.id}
                        deleteHandler={openDeleteConfirmationModal}
                        editHandler={openEditingMovieModal}
                        clickHandler={clickHandler} />)
                }
            </div>
        </div>
    );
};

const mapStateToProps = ({movies}) => ({
    filteredMovies: movies.filteredMovies
});

const mapDispatchToProps = (dispatch) => ({
    getMovies: () => dispatch(getMoviesAsync()),
    setDeleteMovie: (id) => dispatch(setDeleteMovie(id)),
    setEditMovie: (movie) => dispatch(setEditMovie(movie)),
    openDeleteMovieModal: (state) => dispatch(openDeleteMovieModal(state)),
    openEditMovieModal: (state) => dispatch(openEditMovieModal(state))
});

MoviesList.propTypes = {
    deleteHandler: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired,
    clickHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);