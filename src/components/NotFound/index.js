import React from 'react';

import styles from './notfound.modules.scss';

const NOT_FOUND_HEADING = '404! Unfortunately this page was not found!';
const NOT_FOUND_DESCRIPTION = 'You might get back to the main page and keep on searching';

const NotFound = () => (
    <section className={styles['not-found']}>
        <div className={styles['not-found__wrapper']}>
            <h2 className={styles['not-found__heading']}>{NOT_FOUND_HEADING}</h2>
            <p className={styles['not-found__description']}>{NOT_FOUND_DESCRIPTION}...</p>
        </div>
    </section>
);

export default NotFound;