import React from 'react';

import styles from './logo.modules.scss';

const LOGO_TEXT_MAIN = 'netflix';
const LOGO_TEXT_ADDITIONAL = 'roulette';

const Logo = ({clickHandler}) => (
    <section className={styles['logo']} onClick={clickHandler}>
        <p className={styles['logo__text']}>
            <span className={styles['logo__text--stress']}>
                {LOGO_TEXT_MAIN}
            </span>
            {LOGO_TEXT_ADDITIONAL}
        </p>
    </section>
);

export default Logo;