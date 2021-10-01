import React, { useState } from 'react';

import styles from './detailslist.modules..scss';

import DetailsItem from './DetailsItem';
import SectionHeading from '../../components/SectionHeading';

const DETAILS_LIST_HEADING = 'Details';
const DETAILS_DATA = [
    {
        id: '1',
        title: 'Search',
        description: 'Enter button should work as well'
    },
    {
        id: '2',
        title: 'Add Movie',
        description: 'This leads to a new screen to add a new movie'
    },
    {
        id: '3',
        title: 'Search button'
    },
    {
        id: '4',
        title: 'Result Count'
    },
    {
        id: '5',
        title: 'Results sort',
        description: '“release date” is selected by default. Click to switch option.'
    },
    {
        id: '6',
        title: 'Item image',
        description: 'URL for the image you will get from the server'
    },
    {
        id: '7',
        title: 'Item release date'
    },
    {
        id: '8',
        title: 'Item genre'
    },
    {
        id: '9',
        title: 'Item title'
    },
    {
        id: '10',
        title: 'Results filter',
        description: 'Filter the results by genre '
    },
    {
        id: '11',
        title: 'Item context menu',
        description: 'Visible against each card on hover'
    }
];

const DetailsList = () => {
    return (
        <section className={styles['details-list']}>
            <SectionHeading text={DETAILS_LIST_HEADING}/>
            <ul className={styles['details-list__container']}>
                {
                    DETAILS_DATA.map(item => <DetailsItem data={item} key={item.id} />)
                }
            </ul>
        </section>
    );
};

export default DetailsList;