import { createSlice } from '@reduxjs/toolkit'

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

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;