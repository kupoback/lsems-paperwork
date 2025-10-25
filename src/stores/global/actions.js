export default {
    updateSingleState(field, value) {
        return (this[field] = value);
    },
    /**
     * A method to update a state variable based on the param and key set
     *
     * @param {object} params   Any data passed to update
     */
    updateState(params)
    {
        return Object.keys(params)
            .map(key => this[key] = params[key]);
    },
}
