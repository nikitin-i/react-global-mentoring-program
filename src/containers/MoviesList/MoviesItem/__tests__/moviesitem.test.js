import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import MovieItem from '../index';

describe('MovieItem', () => {
    let deleteHandler, editHandler, clickHandler;

    beforeEach(() => {
        const movie = {
            id: 1,
            title: 'test title',
            release_date: '2020-12-12',
            poster_path: 'https://google.com/',
            tagline: 'test tagline'
        };

        deleteHandler = jest.fn();
        editHandler = jest.fn();
        clickHandler = jest.fn();

        render(<MovieItem
            data={movie}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            clickHandler={clickHandler}
        />, {wrapper: MemoryRouter});
    });

    it('should render the movie', () => {
        expect(document.querySelector('#movie')).toBeInTheDocument();
    });

    it('should render the correct content', () => {
        const movie = document.querySelector('#movie');

        expect(movie.querySelector('h3').textContent).toBe('test title');
        expect(movie.querySelector('img').src).toBe('https://google.com/');
        expect(movie.querySelector('span').textContent).toBe('test tagline');
    });

});