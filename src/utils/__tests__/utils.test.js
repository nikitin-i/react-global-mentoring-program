import { formParamsObj } from '../utils';

describe('formParamsObj', () => {
    it('should form correct params object if search was passed', () => {
        const search = 'test str';
        const params = formParamsObj(search);

        expect(Object.keys(params)).toContain('search');
        expect(Object.keys(params)).toContain('searchBy');
        expect(params.search).toBe('test str');
        expect(params.searchBy).toBe('title');
    });

    it('should form correct params object if genre was passed', () => {
        const genre = 'Comedy';
        const params = formParamsObj(null, genre);

        expect(Object.keys(params)).toContain('filter');
        expect(params.filter).toBe('Comedy');
    });

    it('should form correct params object if sort was passed', () => {
        const sort = {
            str: 'Title',
            reverse: true
        };
        const params = formParamsObj(null, null, sort);

        expect(Object.keys(params)).toContain('sortBy');
        expect(Object.keys(params)).toContain('sortOrder');
        expect(params.sortBy).toBe('title');
        expect(params.sortOrder).toBe('desc');
    });
});