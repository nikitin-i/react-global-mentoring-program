import React from 'react';
import { Link } from 'react-router-dom';

import styles from './logo.modules.scss';

const LOGO_TEXT_MAIN = 'netflix';
const LOGO_TEXT_ADDITIONAL = 'roulette';

const Logo = ({clickHandler}) => (
    <Link to="/search">
        <section className={styles['logo']} onClick={clickHandler}>
            <p className={styles['logo__text']}>
                <span className={styles['logo__text--stress']}>
                    {LOGO_TEXT_MAIN}
                </span>
                {LOGO_TEXT_ADDITIONAL}
            </p>
        </section>
    </Link>
);

export default Logo;