import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.modules.scss';

const Button = ({value, type='button', clickHandler}) => (
    <button type={type} className='button' onClick={clickHandler}>
        {value}
    </button>
);

Button.propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    clickHandler: PropTypes.func.isRequired
};

export default Button;