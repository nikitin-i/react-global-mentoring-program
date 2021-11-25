import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { openDeleteMovieModal, openEditMovieModal } from '../../store/actions/modalActions';
import { getMoviesAsync, getMovieByIdAsync, setDeleteMovie, setEditMovie } from '../../store/actions/moviesActions';
import { useCustomSearchParams } from '../../hooks/useCustomSearchParams';
import { formParamsObj } from '../../utils/utils';

import MovieItem from './MoviesItem';
import styles from './movieslist.modules.scss';

export const MoviesList = ({
                        filteredMovies,
                        getMoviesAsync,
                        getMovieByIdAsync,
                        setDeleteMovie,
                        setEditMovie,
                        openDeleteMovieModal,
                        openEditMovieModal
}) => {
    const [searchParams] = useCustomSearchParams();
    const { searchQuery } = useParams();

    useEffect(() => {
        if (!searchParams.has('genre') && !searchParams.has('sortBy') && !searchQuery) {
            getMoviesAsync();
        } else if (searchParams.has('genre') && searchParams.has('sortBy') && !searchQuery) {
            const sortingObj = {
                str: searchParams.get('sortBy').replace('+', ' '),
                reverse: false
            };

            const genre = searchParams.get('genre');

            getMoviesAsync(formParamsObj(null, genre, sortingObj));
        }
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
                        clickHandler={getMovieByIdAsync}/>)
                }
            </div>
        </div>
    );
};

MoviesList.propTypes = {
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
    getMovieByIdAsync,
    setDeleteMovie,
    setEditMovie,
    openDeleteMovieModal,
    openEditMovieModal
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);