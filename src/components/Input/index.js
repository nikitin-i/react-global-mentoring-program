import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.modules.scss';

const Input = ({value, placeholder, changeHandler}) => (
    <input id='search' placeholder={placeholder} className={styles['input']} onChange={changeHandler} value={value} />
);

Input.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    changeHandler: PropTypes.func.isRequired
};

export default Input;