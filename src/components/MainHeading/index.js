import React from 'react';
import PropTypes from 'prop-types';

import styles from './mainheading.modules.scss';

const MainHeading = ({text}) => (
    <h1 className={styles['main-heading']}>
        {text}
    </h1>
);

MainHeading.propTypes = {
    text: PropTypes.string.isRequired
};

export default MainHeading;