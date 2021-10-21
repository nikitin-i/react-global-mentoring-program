import axios from 'axios';

import {
    GET_MOVIES,
    ADD_MOVIE,
    UPDATE_MOVIE,
    DELETE_MOVIE,
    SEARCH_MOVIE,
    CHANGE_ACTIVE_GENRE,
    CHANGE_ACTIVE_SORTING,
    SET_DELETE_MOVIE,
    SET_EDIT_MOVIE,
    SET_ACTIVE_MOVIE,
    OPEN_ADD_MOVIE_MODAL,
    OPEN_EDIT_MOVIE_MODAL,
    OPEN_DELETE_MOVIE_MODAL,
    OPEN_CONGRATS_MOVIE_MODAL,
    CLOSE_ALL_MODALS
} from './types';

export const getMovies = (movies) => ({
    type: GET_MOVIES,
    payload: movies
});

export const addMovie = (movie) => ({
    type: ADD_MOVIE,
    payload: movie
});

export const updateMovie = (movie) => ({
    type: UPDATE_MOVIE,
    payload: movie
});

export const deleteMovie = (id) => ({
    type: DELETE_MOVIE,
    payload: id
});

export const searchMovie = (str) => ({
    type: SEARCH_MOVIE,
    payload: str
});

export const changeActiveGenre = (str) => ({
    type: CHANGE_ACTIVE_GENRE,
    payload: str
});

export const changeActiveSorting = (str, reverse) => ({
    type: CHANGE_ACTIVE_SORTING,
    payload: {
        str,
        reverse
    }
});

export const getMoviesAsync = () => (dispatch) => {
    axios
        .get('http://localhost:4000/movies', {
            params: {
                limit: 30
            }
        })
        .then(({data: {data:movies}}) => dispatch(getMovies(movies)))
        .catch(err => console.error(err));
};

export const addMovieAsync = (movie) => (dispatch) => {
    axios
        .post('http://localhost:4000/movies', JSON.stringify(movie), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(({data:movie}) => dispatch(addMovie(movie)))
        .catch(err => console.error(err));
};

export const updateMovieAsync = (movie) => (dispatch) => {
    axios
        .put('http://localhost:4000/movies', JSON.stringify(movie), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(({data:movie}) => dispatch(updateMovie(movie)))
        .catch(err => console.error(err));
};

export const deleteMovieAsync = (id) => (dispatch) => {
    axios
        .delete(`http://localhost:4000/movies/${id}`)
        .then(() => dispatch(deleteMovie(id)))
        .catch(err => console.error(err));
};

export const setDeleteMovie = (id) => ({
    type: SET_DELETE_MOVIE,
    payload: id
});

export const setEditMovie = (id) => ({
    type: SET_EDIT_MOVIE,
    payload: id
});

export const setActiveMovie = (id) => ({
    type: SET_ACTIVE_MOVIE,
    payload: id
});

export const openAddMovieModal = () => ({
    type: OPEN_ADD_MOVIE_MODAL,
    payload: true
});

export const openEditMovieModal = () => ({
    type: OPEN_EDIT_MOVIE_MODAL,
    payload: true
});

export const openDeleteMovieModal = () => ({
    type: OPEN_DELETE_MOVIE_MODAL,
    payload: true
});

export const openCongratsMovieModal = () => ({
    type: OPEN_CONGRATS_MOVIE_MODAL,
    payload: true
});

export const closeAllModals = () => ({
    type: CLOSE_ALL_MODALS
});