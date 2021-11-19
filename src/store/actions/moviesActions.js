import axios from 'axios';

import {
    GET_MOVIES,
    ADD_MOVIE,
    UPDATE_MOVIE,
    DELETE_MOVIE,
    SET_DELETE_MOVIE,
    SET_EDIT_MOVIE
} from '../types';

export const getMoviesAsync = (params={}) => (dispatch) => {
    axios
        .get(`http://localhost:4000/movies`, {
            params: {
                limit: 30,
                ...params
            }
        })
        .then(({data: {data:movies}}) => dispatch(getMovies(movies)), err => console.error(err));
};

export const addMovieAsync = (movie) => (dispatch) => {
    axios
        .post('http://localhost:4000/movies', JSON.stringify(movie), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(({data:movie}) => dispatch(addMovie(movie)), err => console.error(err));
};

export const updateMovieAsync = (movie) => (dispatch) => {
    axios
        .put('http://localhost:4000/movies', JSON.stringify(movie), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(({data:movie}) => dispatch(updateMovie(movie)), err => console.error(err));
};

export const deleteMovieAsync = (id) => (dispatch) => {
    axios
        .delete(`http://localhost:4000/movies/${id}`)
        .then(() => dispatch(deleteMovie(id)), err => console.error(err));
};

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

export const setDeleteMovie = (id) => ({
    type: SET_DELETE_MOVIE,
    payload: id
});

export const setEditMovie = (id) => ({
    type: SET_EDIT_MOVIE,
    payload: id
});
