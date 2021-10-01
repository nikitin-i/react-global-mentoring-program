import React, {Component} from 'react';

import ErrorMessage from './ErrorMessage';

class ErrorBoundary extends Component {
    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState(state => ({
            hasError: true
        }));
    }

    render = () => {
        const {children} = this.props;
        const {hasError} = this.state;

        if (hasError) {
            return <ErrorMessage />;
        }

        return (
            <>
                {children}
            </>
        );
    };
}

export default ErrorBoundary;