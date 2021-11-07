import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { openDeleteMovieModal, openEditMovieModal } from '../../store/actions/modalActions';
import { getMoviesAsync, setDeleteMovie, setEditMovie } from '../../store/actions/moviesActions';

import MovieItem from './MoviesItem';
import styles from './movieslist.modules.scss';

const MoviesList = ({
                        filteredMovies,
                        clickHandler,
                        getMoviesAsync,
                        setDeleteMovie,
                        setEditMovie,
                        openDeleteMovieModal,
                        openEditMovieModal
}) => {
    useEffect(() => {
        getMoviesAsync();
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

MoviesList.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    filteredMovies: PropTypes.array,
    getMoviesAsync: PropTypes.func.isRequired,
    setDeleteMovie: PropTypes.func.isRequired,
    setEditMovie: PropTypes.func.isRequired,
    openDeleteMovieModal: PropTypes.func.isRequired,
    openEditMovieModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({movies}) => ({
    filteredMovies: movies.filteredMovies
});

const mapDispatchToProps = {
    getMoviesAsync,
    setDeleteMovie,
    setEditMovie,
    openDeleteMovieModal,
    openEditMovieModal
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);