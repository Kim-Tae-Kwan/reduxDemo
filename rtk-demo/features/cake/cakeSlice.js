const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    numOfCakse: 10
}

const cakeSlice = createSlice({
    name: 'cake',
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfCakse--;
        },
        restocked: (state, action) => {
            state.numOfCakse += action.payload;
        }
    }
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;