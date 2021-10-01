import React from 'react';
import PropTypes from 'prop-types';

import styles from './pageheading.modules.scss';

const PageHeading = ({text}) => (
    <h1 className={styles['page-heading']}>
        {text}
    </h1>
);

PageHeading.propTypes = {
    text: PropTypes.string.isRequired
};

export default PageHeading;