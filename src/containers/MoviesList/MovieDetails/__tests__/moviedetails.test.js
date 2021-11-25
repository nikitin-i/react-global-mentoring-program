import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import MovieDetails from '../index';

describe('MovieDetails', () => {
    beforeEach(() => {
        const movie = {
            id: 1,
            title: 'test title',
            release_date: '2020-12-12',
            poster_path: 'https://google.com/',
            vote_average: 7.7,
            genres: ['Comedy', 'Western'],
            tagline: 'test tagline',
            runtime: 120,
            overview: 'test overview'
        };

        render(<MovieDetails
            movie={movie}
        />, {wrapper: MemoryRouter});
    });

    it('should render the movie details section', () => {
        expect(document.querySelector('#movie-details')).toBeInTheDocument();
    });

    it('should render the correct content', () => {
        const movie = document.querySelector('#movie-details');

        expect(movie.querySelector('h3').textContent).toBe('test title');
        expect(movie.querySelector('img').src).toBe('https://google.com/');
        expect(movie.querySelectorAll('span')[0].textContent).toBe('2020');
        expect(movie.querySelectorAll('span')[1].textContent).toBe('2h 0min');
    });
});