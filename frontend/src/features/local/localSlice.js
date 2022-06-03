import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import localService from './localService';


// get theme from local storage
const theme = localStorage.getItem('theme');


const initialState = {
    theme: theme ? theme : 'light',
    ethPrice: 0,
}

// Fetch eth price
export const fetchEthPrice = createAsyncThunk(
    'local/fetchEthPrice',
    async () => {
        const ethPrice = await localService.fetchEthPrice();
        return ethPrice;
    }
);



const localSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
    },
    extraReducers: (builder) => {
        // Fetch eth price
        builder.addCase(fetchEthPrice.fulfilled, (state, action) => {
            state.ethPrice = action.payload;
        });
    }
});


export const { setTheme } = localSlice.actions;
export default localSlice.reducer;