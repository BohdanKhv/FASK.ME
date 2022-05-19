import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import searchService from "./searchService";


const initialState = {
    search: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: '',
};


// Search users
export const searchUsers = createAsyncThunk(
    "search/searchUsers",
    async (data, thunkAPI) => {
        try {
            return await searchService.searchUsers(data);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);



// create slice
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.search = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchUsers.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        });
        builder.addCase(searchUsers.fulfilled, (state, action) => {
            state.search = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
        });
        builder.addCase(searchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });
    }
});



// Export reducer
export const { reset } = searchSlice.actions;
export default searchSlice.reducer;