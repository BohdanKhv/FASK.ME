import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// get theme from local storage
const theme = localStorage.getItem('theme');


const initialState = {
    theme: theme ? theme : 'light',
}


const localSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
    },
});


export const { setTheme } = localSlice.actions;
export default localSlice.reducer;