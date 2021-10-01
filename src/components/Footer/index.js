import React from 'react';

import styles from './footer.modules.scss';

const Footer = ({children}) => (
    <footer className={styles['footer']}>
        {children}
    </footer>
);

export default Footer;