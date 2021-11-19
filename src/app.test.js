import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { App } from './app';

jest.mock('./containers/ErrorBoundary', () => () => 'ErrorBoundary');
jest.mock('./containers/SearchLine', () => () => 'SearchLine');
jest.mock('./containers/MoviesList', () => () => 'MoviesList');
jest.mock('./containers/GenresToggle', () => () => 'GenresToggle');
jest.mock('./containers/SortingToggle', () => () => 'SortingToggle');


describe('App', () => {
    beforeEach(() => {
        const filteredMovies = [{id: 1}, {id: 2}];
        const editMovie = '';
        const deleteMovieId = '';
        const isAddMovieCongratsModalOpen = false;
        const isDeleteMovieConfirmModalOpen = false;
        const isAddMovieModalOpen = false;
        const isEditMovieModalOpen = false;
        const searchLine = '';

        const openAddMovieModal = jest.fn();
        const openCongratsMovieModal = jest.fn();
        const closeAllModals = jest.fn();
        const addMovieAsync = jest.fn();
        const updateMovieAsync = jest.fn();
        const deleteMovieAsync = jest.fn();
        const getMoviesAsync = jest.fn();
        const clearAllFilters = jest.fn();

        render(<App
            filteredMovies={filteredMovies}
            editMovie={editMovie}
            deleteMovieId={deleteMovieId}
            isAddMovieCongratsModalOpen={isAddMovieCongratsModalOpen}
            isDeleteMovieConfirmModalOpen={isDeleteMovieConfirmModalOpen}
            isAddMovieModalOpen={isAddMovieModalOpen}
            isEditMovieModalOpen={isEditMovieModalOpen}
            searchLine={searchLine}
            openAddMovieModal={openAddMovieModal}
            openCongratsMovieModal={openCongratsMovieModal}
            closeAllModals={closeAllModals}
            addMovieAsync={addMovieAsync}
            updateMovieAsync={updateMovieAsync}
            deleteMovieAsync={deleteMovieAsync}
            getMoviesAsync={getMoviesAsync}
            clearAllFilters={clearAllFilters}
        />, {wrapper: MemoryRouter});
    });

    it('should render all markup', () => {
        expect(document.querySelector('header')).toBeInTheDocument();
        expect(document.querySelector('main')).toBeInTheDocument();
        expect(document.querySelector('aside')).toBeInTheDocument();
        expect(document.querySelector('footer')).toBeInTheDocument();
    });
});
