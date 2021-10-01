import React from 'react';

import SectionHeading from '../SectionHeading';

import styles from './colorpallete.modules.scss';

const COLORS_PALLETE_HEADING = 'Color Pallete';
const COLORS_DATA = ['F65261', '424242', '232323', '555555', 'FFFFFF'];

const ColorPallete = () => {
    return (
        <section className={styles['color-pallete']}>
            <SectionHeading text={COLORS_PALLETE_HEADING}/>
            {
                COLORS_DATA.map(color => {
                    return (<div className={styles['color-pallete__item']} key={color}>
                        <div className={styles['color-pallete__icon']} style={{backgroundColor: `#${color}`}} />
                        <div className={styles['color-pallete__text']}>{color}</div>
                    </div>);
                })
            }
        </section>
    );
};

export default ColorPallete;