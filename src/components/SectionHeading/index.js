import React from 'react';
import PropTypes from 'prop-types';

import styles from './sectionheading.modules.scss';

const SectionHeading = ({text}) => (
    <h3 className={styles['section-heading']}>
        {text}
    </h3>
);

SectionHeading.propTypes = {
    text: PropTypes.string.isRequired
};

export default SectionHeading;