import moviesReducer from '../moviesReducer';
import { getMovies, addMovie, updateMovie, deleteMovie, setDeleteMovie, setEditMovie } from '../../actions/moviesActions';

const initialState = {
    movies: [],
    filteredMovies: [],
    deleteMovieId: '',
    editMovie: '',
    movieDetails: {}
};

describe('Movies Reducer', () => {
    it('should return the initial state', () => {
        expect(moviesReducer(undefined, initialState)).toEqual(initialState);
    });

    it('should handle GET_MOVIES', () => {
        const movies = [{id: 1}, {id: 2}];

        expect(moviesReducer(initialState, getMovies(movies))).toEqual({...initialState, movies, filteredMovies: movies});
    });

    it('should handle ADD_MOVIE', () => {
        const newInitialState = {
            movies: [{id: 1}, {id: 2}],
            filteredMovies: [{id: 1}, {id: 2}],
            deleteMovieId: '',
            editMovie: '',
            movieDetails: {}
        };
        const movie = {id: 3};

        expect(moviesReducer(newInitialState, addMovie(movie)).movies).toEqual([{id: 1}, {id: 2}, {id: 3}]);
        expect(moviesReducer(newInitialState, addMovie(movie)).filteredMovies).toEqual([{id: 1}, {id: 2}, {id: 3}]);
    });

    it('should handle UPDATE_MOVIE', () => {
        const newInitialState = {
            movies: [{id: 1, title: 'title'}, {id: 2, title: 'title'}],
            filteredMovies: [{id: 1, title: 'title'}, {id: 2, title: 'title'}],
            deleteMovieId: '',
            editMovie: '',
            movieDetails: {}
        };
        const movie = {id: 2, title: 'New title'};

        expect(moviesReducer(newInitialState, updateMovie(movie)).movies).toEqual([{id: 1, title: 'title'}, {id: 2, title: 'New title'}]);
        expect(moviesReducer(newInitialState, updateMovie(movie)).filteredMovies).toEqual([{id: 1, title: 'title'}, {id: 2, title: 'New title'}]);
    });

    it('should handle DELETE_MOVIE', () => {
        const newInitialState = {
            movies: [{id: 1}, {id: 2}],
            filteredMovies: [{id: 1}, {id: 2}],
            deleteMovieId: '',
            editMovie: '',
            movieDetails: {}
        };
        const movieId = 2;

        expect(moviesReducer(newInitialState, deleteMovie(movieId)).movies).toEqual([{id: 1}]);
        expect(moviesReducer(newInitialState, deleteMovie(movieId)).filteredMovies).toEqual([{id: 1}]);
    });

    it('should handle SET_DELETE_MOVIE', () => {
        const deleteMovieId = 2;

        expect(moviesReducer(initialState, setDeleteMovie(deleteMovieId))).toEqual({...initialState, deleteMovieId});
    });

    it('should handle SET_EDIT_MOVIE', () => {
        const newInitialState = {
            movies: [{id: 1}, {id: 2}],
            filteredMovies: [{id: 1}, {id: 2}],
            deleteMovieId: '',
            editMovie: '',
            movieDetails: {}
        };
        const editMovieId = 2;

        expect(moviesReducer(newInitialState, setEditMovie(editMovieId)).editMovie).toEqual({id: 2});
    });
});