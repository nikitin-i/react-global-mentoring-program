import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.modules.scss';

const Button = ({value, clickHandler}) => (
    <button className='button' onClick={clickHandler}>
        {value}
    </button>
);

Button.propTypes = {
    value: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
};

export default Button;