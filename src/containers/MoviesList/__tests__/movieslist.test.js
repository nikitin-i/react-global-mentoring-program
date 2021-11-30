import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MoviesList } from '../index';

describe('MoviesList', () => {
    let getMoviesAsync, getMovieByIdAsync, setDeleteMovie, setEditMovie, openEditMovieModal, openDeleteMovieModal;

    beforeEach(() => {
        const filteredMovies = [{id: 1, release_date: '2020-12-12'}, {id: 2, release_date: '1990-10-01'}];

        getMoviesAsync = jest.fn();
        getMovieByIdAsync = jest.fn();
        setDeleteMovie = jest.fn();
        setEditMovie = jest.fn();
        openEditMovieModal = jest.fn();
        openDeleteMovieModal = jest.fn();

        render(<MoviesList
            filteredMovies={filteredMovies}
            openDeleteMovieModal={openDeleteMovieModal}
            openEditMovieModal={openEditMovieModal}
            getMoviesAsync={getMoviesAsync}
            getMovieByIdAsync={getMovieByIdAsync}
            setDeleteMovie={setDeleteMovie}
            setEditMovie={setEditMovie}
        />, {wrapper: MemoryRouter});
    });

    it('should render the correct amount of movies', () => {
        expect(document.querySelectorAll('#movie').length).toBe(2);
    });

});