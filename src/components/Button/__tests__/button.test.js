import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Button from '../index';

describe('Button', () => {
    let callback;

    beforeEach(() => {
        const value = 'Click';
        callback = jest.fn();

        render(<Button value={value} clickHandler={callback} />);
    });

    it('should render the correct content', () => {
        expect(screen.getByText(/click/i)).toBeInTheDocument();
    });

    it('should set button type by default', () => {
        expect(screen.getByText(/click/i)).toHaveAttribute('type', 'button');
    });

    it('should call handler after click event', () => {
        fireEvent.click(screen.getByText(/click/i));

        expect(callback).toHaveBeenCalledTimes(1);
    });
});