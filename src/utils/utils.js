import _ from 'lodash';

function formParamsObj(search, genre, sort) {
    const query = {};

    if (search) {
        query['search'] = search;
        query['searchBy'] = 'title';
    }

    if (genre && genre !== 'All') {
        query['filter'] = genre;
    }

    if (!_.isEmpty(sort)) {
        const { str, reverse } = sort;
        const order = reverse ? 'desc' : 'asc';
        const sortItems = {Title: 'title', 'Release Date': 'release_date'};

        query['sortBy'] = sortItems[str];
        query['sortOrder'] = order;
    }

    return query;
}

export {
    formParamsObj
};
