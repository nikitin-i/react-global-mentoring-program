import axios from 'axios';
import 'regenerator-runtime/runtime';

import { getMoviesAsync, getMovies, addMovieAsync, addMovie, updateMovieAsync, updateMovie, deleteMovieAsync, deleteMovie } from '../moviesActions';

describe('getMoviesAsync', () => {
    it('should dispatch correct action for success response', async () => {
        const dispatch = jest.fn();
        const response = {
            data: {
                data: [{id: 1}, {id: 2}]
            }
        };

        axios.get = jest.fn().mockResolvedValue(response);

        await getMoviesAsync()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(getMovies([{id: 1}, {id: 2}]));
    });

    it('should call console.log for error response', async () => {
        const dispatch = jest.fn();
        console.error = jest.fn();
        const error = {
            err: 'Error'
        };

        axios.get = jest.fn().mockRejectedValue(error);

        await getMoviesAsync()(dispatch);

        expect(console.error).toHaveBeenCalledWith(error);
    });
});

describe('addMovieAsync', () => {
    it('should dispatch correct action for success response', async () => {
        const dispatch = jest.fn();
        const response = {
            data: {
                id: 1
            }
        };

        axios.post = jest.fn().mockResolvedValue(response);

        await addMovieAsync()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(addMovie({id: 1}));
    });

    it('should call console.log for error response', async () => {
        const dispatch = jest.fn();
        console.error = jest.fn();
        const error = {
            err: 'Error'
        };

        axios.post = jest.fn().mockRejectedValue(error);

        await addMovieAsync()(dispatch);

        expect(console.error).toHaveBeenCalledWith(error);
    });
});

describe('updateMovieAsync', () => {
    it('should dispatch correct action for success response', async () => {
        const dispatch = jest.fn();
        const response = {
            data: {
                id: 1
            }
        };

        axios.put = jest.fn().mockResolvedValue(response);

        await updateMovieAsync()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(updateMovie({id: 1}));
    });

    it('should call console.log for error response', async () => {
        const dispatch = jest.fn();
        console.error = jest.fn();
        const error = {
            err: 'Error'
        };

        axios.put = jest.fn().mockRejectedValue(error);

        await updateMovieAsync()(dispatch);

        expect(console.error).toHaveBeenCalledWith(error);
    });
});

describe('deleteMovieAsync', () => {
    it('should dispatch correct action for success response', async () => {
        const dispatch = jest.fn();
        const id = 1;

        axios.delete = jest.fn().mockResolvedValue({});

        await deleteMovieAsync(id)(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(deleteMovie(1));
    });

    it('should call console.log for error response', async () => {
        const dispatch = jest.fn();
        console.error = jest.fn();
        const error = {
            err: 'Error'
        };

        axios.delete = jest.fn().mockRejectedValue(error);

        await deleteMovieAsync()(dispatch);

        expect(console.error).toHaveBeenCalledWith(error);
    });
});