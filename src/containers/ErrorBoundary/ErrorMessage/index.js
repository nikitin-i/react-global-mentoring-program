import React from 'react';

import tool from '../../../assets/images/tools-s.png';
import styles from './errormessage.modules.scss';

const MESSAGE = 'This component has been crashed... We are doing all ours best for fixing!'

const ErrorMessage = () => (
    <section className={styles['error-message']}>
        <div className={styles['error-message__text']}>
            {MESSAGE}
        </div>
        <img className={styles['error-message__image']} src={tool} alt='crashed component' />
    </section>
);

export default ErrorMessage;