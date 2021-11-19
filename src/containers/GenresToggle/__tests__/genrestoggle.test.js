import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { GenresToggle } from '../index';

describe('GenresToggle', () => {
    let GENRES_LIST, getMoviesAsync, changeActiveGenre;

    beforeEach(() => {
        GENRES_LIST = ['All', 'Drama', 'Family', 'Comedy', 'Thriller'];

        const searchLine = '';
        const activeGenre = '';
        const activeSorting = {};

        getMoviesAsync = jest.fn();
        changeActiveGenre = jest.fn();

        render(<GenresToggle
            searchLine={searchLine}
            activeGenre={activeGenre}
            activeSorting={activeSorting}
            getMoviesAsync={getMoviesAsync}
            changeActiveGenre={changeActiveGenre}
        />, {wrapper: MemoryRouter});
    });

    it('should render the correct content', () => {
        expect(screen.getByText(GENRES_LIST[0])).toBeInTheDocument();
        expect(screen.getByText(GENRES_LIST[1])).toBeInTheDocument();
        expect(screen.getByText(GENRES_LIST[2])).toBeInTheDocument();
        expect(screen.getByText(GENRES_LIST[3])).toBeInTheDocument();
        expect(screen.getByText(GENRES_LIST[4])).toBeInTheDocument();
    });

    it('should call change genre handler after click event', () => {
        fireEvent.click(screen.getByText(GENRES_LIST[1]));

        expect(changeActiveGenre).toHaveBeenCalledTimes(1);
        expect(changeActiveGenre).toHaveBeenCalledWith('Drama');
    });

    it('should call get movies handler after click event', () => {
        fireEvent.click(screen.getByText(GENRES_LIST[1]));

        expect(getMoviesAsync).toHaveBeenCalledTimes(1);
        expect(getMoviesAsync).toHaveBeenCalledWith({
            filter: 'Drama'
        });
    });
});