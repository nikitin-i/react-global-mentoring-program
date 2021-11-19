import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

import MovieItemModal from '../index';

describe('MovieItemModal (ADD mode)', () => {
    beforeEach(() => {
        const mode = 'add';
        const movie = {};

        const closeHandler = jest.fn();
        const submitHandler = jest.fn();

        render(<MovieItemModal
            movie={movie}
            mode={mode}
            closeHandler={closeHandler}
            submitHandler={submitHandler}
        />);
    });

    it('should render all form fields', () => {
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Release date')).toBeInTheDocument();
        expect(screen.getByLabelText('Movie url')).toBeInTheDocument();
        expect(screen.getByLabelText('Rating')).toBeInTheDocument();
        expect(screen.getByLabelText('Genre')).toBeInTheDocument();
        expect(screen.getByLabelText('Runtime')).toBeInTheDocument();
        expect(screen.getByLabelText('Overview')).toBeInTheDocument();
    });

    it('should render the blank fields for current mode', () => {
        expect(screen.getByLabelText('Title').value).toBe('');
        expect(screen.getByLabelText('Release date').value).toBe('');
        expect(screen.getByLabelText('Movie url').value).toBe('');
        expect(screen.getByLabelText('Rating').value).toBe('');
        expect(screen.getByLabelText('Genre').value).toBe('Select Genre');
        expect(screen.getByLabelText('Runtime').value).toBe('');
        expect(screen.getByLabelText('Overview').value).toBe('');
    });

    it('should show validation errors', async () => {
        userEvent.type(screen.getByLabelText('Title'), 'Title');
        userEvent.type(screen.getByLabelText('Release date'), '2020-12-13');
        userEvent.type(screen.getByLabelText('Movie url'), 'https://google.com');
        userEvent.type(screen.getByLabelText('Rating'), '7.0');
        userEvent.type(screen.getByLabelText('Runtime'), '100');
        userEvent.type(screen.getByLabelText('Overview'), 'Text');

        userEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(screen.getByRole('error-message')).toBeInTheDocument();
        });
    });
});

describe('MovieItemModal (EDIT mode)', () => {
    let submitHandler;

    beforeEach(() => {
        const mode = 'edit';
        const movie = {
            title: 'test title',
            release_date: '2020-12-12',
            poster_path: 'https://test.com',
            vote_average: 7.7,
            genres: ['Comedy'],
            runtime: 120,
            overview: 'test overview'
        };

        const closeHandler = jest.fn();
        submitHandler = jest.fn();

        render(<MovieItemModal
            movie={movie}
            mode={mode}
            closeHandler={closeHandler}
            submitHandler={submitHandler}
        />);
    });

    it('should render all form fields', () => {
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Release date')).toBeInTheDocument();
        expect(screen.getByLabelText('Movie url')).toBeInTheDocument();
        expect(screen.getByLabelText('Rating')).toBeInTheDocument();
        expect(screen.getByLabelText('Genre')).toBeInTheDocument();
        expect(screen.getByLabelText('Runtime')).toBeInTheDocument();
        expect(screen.getByLabelText('Overview')).toBeInTheDocument();
    });

    it('should render the correct field values for current mode', () => {
        expect(screen.getByLabelText('Title').value).toBe('test title');
        expect(screen.getByLabelText('Release date').value).toBe('2020-12-12');
        expect(screen.getByLabelText('Movie url').value).toBe('https://test.com');
        expect(screen.getByLabelText('Rating').value).toBe('7.7');
        expect(screen.getByLabelText('Genre').value).toBe('Comedy');
        expect(screen.getByLabelText('Runtime').value).toBe('120');
        expect(screen.getByLabelText('Overview').value).toBe('test overview');
    });

    it('should submit correct set of values', async () => {
        userEvent.type(screen.getByLabelText('Title'), ' updated');
        userEvent.click(screen.getByText('Submit'));

        await waitFor(() =>
            expect(submitHandler).toHaveBeenCalledWith({
                title: 'test title updated',
                release_date: '2020-12-12',
                poster_path: 'https://test.com',
                vote_average: 7.7,
                genres: ['Comedy'],
                runtime: 120,
                overview: 'test overview'
            }),
        )
    });
});