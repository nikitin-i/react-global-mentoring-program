import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import { SortingToggle } from '../index';

describe('SortingToggle', () => {
    let SORT_ITEMS, getMoviesAsync, changeActiveSorting;

    beforeEach(() => {
        SORT_ITEMS = ['Title', 'Release Date'];

        const searchLine = '';
        const activeGenre = '';
        const activeSorting = {
            str: 'All',
            reverse: false
        };

        getMoviesAsync = jest.fn();
        changeActiveSorting = jest.fn();

        render(<SortingToggle
            searchLine={searchLine}
            activeGenre={activeGenre}
            activeSorting={activeSorting}
            getMoviesAsync={getMoviesAsync}
            changeActiveSorting={changeActiveSorting}
        />, {wrapper: MemoryRouter});
    });

    it('should render the correct content', () => {
        expect(screen.getByText(SORT_ITEMS[0])).toBeInTheDocument();
        expect(screen.getByText(SORT_ITEMS[1])).toBeInTheDocument();
    });

    it('should call change sort handler after click event', () => {
        fireEvent.click(screen.getByText(SORT_ITEMS[0]));

        expect(changeActiveSorting).toHaveBeenCalledTimes(1);
        expect(changeActiveSorting).toHaveBeenCalledWith({
            str: 'Title',
            reverse: false
        });
    });

    it('should call get movies handler after click event', () => {
        fireEvent.click(screen.getByText(SORT_ITEMS[0]));

        expect(getMoviesAsync).toHaveBeenCalledTimes(1);
        expect(getMoviesAsync).toHaveBeenCalledWith({
            sortBy: 'title',
            sortOrder: 'asc'
        });
    });
});