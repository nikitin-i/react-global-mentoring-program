import { useState } from 'react';

export const useInput = (initial, property) => {
    const [value, setValue] = useState(initial);

    const onChange = ({target: {value}}) => setValue(value);
    const clear = () => setValue(initial);

    return {value, property, onChange, clear};
};