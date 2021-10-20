import { GET_MOVIES, ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE, SET_DELETE_MOVIE, SET_EDIT_MOVIE } from '../types';

const initialState = {
    movies: [],
    filteredMovies: [],
    deleteMovieId: '',
    editMovie: '',
    activeMovie: {}
};

const moviesReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: payload,
                filteredMovies: payload
            };

        case ADD_MOVIE:
            return {
                ...state,
                movies: []
            };

        case UPDATE_MOVIE:
            return {
                ...state,
                movies: []
            };

        case DELETE_MOVIE:
            const filteredMoviesByID = state.movies.filter(movie => movie.id !== payload);

            return {
                ...state,
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
                editMovie: state.movies.find(movie => movie.id === payload)
            };

        default:
            return state;
    }
};

export default moviesReducer;