import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transactionService from "./transactionService";


const initialState = {
    transactions: [],
    hasMore: false,
    numFound: 0,
    limit: 10,
    skip: 0,
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: ""
};


// create transaction
export const createTransaction = createAsyncThunk(
    "transaction/createTransaction",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await transactionService.createTransaction(data, token);
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


// Get transactions
export const getTransactions = createAsyncThunk(
    "transaction/getTransactions",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const { limit, skip } = thunkAPI.getState().transaction.transactions;
            return await transactionService.getTransactions({limit, skip}, token);
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



// Create a slice
const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.msg = "";
        },
    },
    extraReducers: (builder) => {
        // Create a transaction
        builder.addCase(createTransaction.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.msg = action.payload;
        });
        builder.addCase(createTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get transactions
        builder.addCase(getTransactions.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.transactions = action.payload.transactions;
            state.numFound = action.payload.numFound;
            state.skip = state.skip + state.limit;
            state.hasMore = state.skip < state.numFound;
        });
        builder.addCase(getTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});



export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;