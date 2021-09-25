import React, {Component, Fragment} from 'react';

import ErrorMessage from './ErrorMessage';

class ErrorBoundary extends Component {
    state = {
        hasError: false
    };

    componentDidCatch = () => {
        this.setState(state => ({
            hasError: true
        }));
    };

    render = () => {
        const {children} = this.props;
        const {hasError} = this.state;

        if (hasError) {
            return <ErrorMessage />;
        }

        return (
            <Fragment>
                {children}
            </Fragment>
        );
    };
}

export default ErrorBoundary;