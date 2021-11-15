import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import { SearchLine } from '../index';

describe('SearchLine', () => {
    let getMoviesAsync, searchMovie;

    beforeEach(() => {
        const searchLine = '';
        const activeGenre = '';
        const activeSorting = {
            str: 'All',
            reverse: false
        };

        getMoviesAsync = jest.fn();
        searchMovie = jest.fn();

        render(<SearchLine
            searchLine={searchLine}
            activeGenre={activeGenre}
            activeSorting={activeSorting}
            getMoviesAsync={getMoviesAsync}
            searchMovie={searchMovie}
        />, {wrapper: MemoryRouter});
    });

    it('should render the correct content', () => {
        expect(screen.getByPlaceholderText(/what do you want to watch\?/i)).toBeInTheDocument();
        expect(screen.getByText(/search/i)).toBeInTheDocument();
    });

    it('should call handler after click event', () => {
        fireEvent.change(screen.getByPlaceholderText(/what do you want to watch\?/i), {target: {value: 'search text'}});
        fireEvent.click(screen.getByText(/search/i));

        expect(searchMovie).toHaveBeenCalledTimes(1);
    });
});