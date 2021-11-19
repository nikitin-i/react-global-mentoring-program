import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';

import InfoModal from '../index';

describe('InfoModal', () => {
    let closeHandler;

    beforeEach(() => {
        const renderJSX = () => React.createElement(
            'section',
            {id: 'test'},
            'Hello!'
        );

        closeHandler = jest.fn();

        render(<InfoModal
            render={renderJSX}
            closeHandler={closeHandler}
        />);
    });

    it('should render expected markup', () => {
        expect(screen.getByText('Hello!')).toBeInTheDocument();
    });

    it('should call close handler after click', () => {
        userEvent.click(screen.getByText('X'));

        expect(closeHandler).toHaveBeenCalledTimes(1);
    });
});
