import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import GenresItem from '../index';

describe('GenresItem', () => {
    let clickHandler;

    beforeEach(() => {
        const value = 'Comedy';
        const active = false;

        clickHandler = jest.fn();

        render(<GenresItem
            value={value}
            active={active}
            clickHandler={clickHandler}
        />);
    });

    it('should render the correct content', () => {
        expect(screen.getByText('Comedy')).toBeInTheDocument();
    });

    it('should call handler after click event', () => {
        fireEvent.click(screen.getByText('Comedy'));

        expect(clickHandler).toHaveBeenCalledTimes(1);
        expect(clickHandler).toHaveBeenCalledWith('Comedy');
    });
});