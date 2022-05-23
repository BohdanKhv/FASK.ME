import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import inboxService from './inboxService';
import { updateQuestion } from '../question/questionSlice';


const initialState = {
    inbox: [],
    numFound: 0,
    hasMore: false,
    skip: 0,
    limit: 10,
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: ''
};


// get received questions count
export const getReceivedQuestionsCount = createAsyncThunk(
    'inbox/getReceivedQuestionsCount',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await inboxService.getReceivedQuestionsCount(token);
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


// Get received questions
export const getReceivedQuestions = createAsyncThunk(
    "inbox/getReceivedQuestions",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await inboxService.getReceivedQuestions(data, token);
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
const questionsSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
        // reset state
        reset: (state) => {
            state.inbox = [];
            state.numFound = 0;
            state.hasMore = false;
            state.skip = 0;
            state.limit = 10;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        // Get received questions
        builder.addCase(getReceivedQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getReceivedQuestions.fulfilled, (state, action) => {
            state.inbox = [...state.inbox, ...action.payload.questions];
            state.numFound = action.payload.numFound;
            state.hasMore = state.skip + state.limit < state.numFound;
            state.skip = state.skip + state.limit;
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(getReceivedQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        builder.addCase(updateQuestion.fulfilled, (state, action) => {
            state.inbox = state.inbox.filter(question => question._id !== action.payload._id);
        });

        // Get received questions count
        builder.addCase(getReceivedQuestionsCount.fulfilled, (state, action) => {
            state.numFound = action.payload;
        });
    }
});


// export actions
export const { reset } = questionsSlice.actions;
export default questionsSlice.reducer;