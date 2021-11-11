import { useSearchParams } from 'react-router-dom';

export const useCustomSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateSearchParams = (newSearchParams = {}, clearSearchParams = []) => {
        const searchParamsObject = {};

        for (const [key, value] of searchParams.entries()) {
            searchParamsObject[key] = value;
        }

        clearSearchParams.forEach((key) => delete searchParamsObject[key]);

        setSearchParams({
            ...searchParamsObject,
            ...newSearchParams,
        });
    };

    return [searchParams, updateSearchParams];
};