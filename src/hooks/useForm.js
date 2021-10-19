export const useForm = (inputs, handler, editedMovie={}) => {
    const onReset = () => {
        inputs.forEach(input => input.clear());
    }

    const onSubmit = () => {
        const values = {};

        inputs.map(input => values[input.property] = input.value);

        handler({
            ...editedMovie,
            ...values,
            genres: Array.of(values.genres),
            runtime: Number(values.runtime),
            vote_average: Number(values.vote_average)
        });
    }

    return {onReset, onSubmit};
};