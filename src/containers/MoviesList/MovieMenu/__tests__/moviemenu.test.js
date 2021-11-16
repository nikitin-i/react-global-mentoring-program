import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MovieMenu from '../index';

describe('MovieMenu', () => {
    let deleteHandler, editHandler;

    beforeEach(() => {
        const id = 5;

        deleteHandler = jest.fn();
        editHandler = jest.fn();

        render(<MovieMenu
            id={id}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
        />);
    });

    it('should render the movie menu', () => {
        expect(document.querySelector('#movie-menu')).toBeInTheDocument();
    });

    it('should render the correct content', () => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('should call handler after click event on edit button', () => {
        fireEvent.click(screen.getByText('Edit'));

        expect(editHandler).toHaveBeenCalledTimes(1);
        expect(editHandler).toHaveBeenCalledWith(5);
    });

    it('should call handler after click event on delete button', () => {
        fireEvent.click(screen.getByText('Delete'));

        expect(deleteHandler).toHaveBeenCalledTimes(1);
        expect(deleteHandler).toHaveBeenCalledWith(5);
    });
});