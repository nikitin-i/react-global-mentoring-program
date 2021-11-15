import _ from 'lodash';

import {
    GET_MOVIES,
    ADD_MOVIE,
    UPDATE_MOVIE,
    DELETE_MOVIE,
    SET_DELETE_MOVIE,
    SET_EDIT_MOVIE
} from '../types';
import {setEditMovie} from "../actions/moviesActions";

const initialState = {
    movies: [],
    filteredMovies: [],
    deleteMovieId: '',
    editMovie: ''
};

const moviesReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_MOVIES:
            return {
                ...initialState,
                movies: [...payload],
                filteredMovies: [...payload]
            };

        case ADD_MOVIE:
            return {
                ...initialState,
                movies: [...state.movies, payload],
                filteredMovies: [...state.movies, payload]
            };

        case UPDATE_MOVIE:
            const updatedMovies = _.map(state.movies, movie => movie.id !== payload.id ? movie : payload);

            return {
                ...initialState,
                movies: [...updatedMovies],
                filteredMovies: [...updatedMovies]
            };

        case DELETE_MOVIE:
            const filteredMoviesByID = _.filter(state.movies, movie => movie.id !== payload);

            return {
                ...initialState,
                filteredMovies: [
                    ...filteredMoviesByID
                ],
                movies: [
                    ...filteredMoviesByID
                ]
            };

        case SET_DELETE_MOVIE:
            return {
                ...state,
                deleteMovieId: payload
            };

        case SET_EDIT_MOVIE:
            return {
                ...state,
                editMovie: _.find(state.movies, movie => movie.id === payload)
            };

        default:
            return state;
    }
};

export default moviesReducer;