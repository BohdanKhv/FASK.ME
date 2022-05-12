import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionService from "./questionService";


const initialState = {
    faq: [],
    answered: [],
    asked: [],
    inbox: [],
    sent: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: ''
};


// Get received questions
export const getReceivedQuestions = createAsyncThunk(
    "question/getReceivedQuestions",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await questionService.getReceivedQuestions(token);
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


// Get sent questions
export const getSentQuestions = createAsyncThunk(
    "question/getSentQuestions",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await questionService.getSentQuestions(token);
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


// Get pinned questions
export const getProfileFaqQuestions = createAsyncThunk(
    "question/getProfileFaqQuestions",
    async (username, thunkAPI) => {
        try {
            return await questionService.getProfileFaqQuestions(username);
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


// Get answered questions
export const getProfileAnsweredQuestions = createAsyncThunk(
    "question/getProfileAnsweredQuestions",
    async (username, thunkAPI) => {
        try {
            return await questionService.getProfileAnsweredQuestions(username);
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


// Get Asked questions
export const getProfileAskedQuestions = createAsyncThunk(
    "question/getProfileAskedQuestions",
    async (username, thunkAPI) => {
        try {
            return await questionService.getProfileAskedQuestions(username);
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



// Create a question
export const createQuestion = createAsyncThunk(
    "question/createQuestion",
    async (question, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await questionService.createQuestion(question, token);
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


// Update a question
export const updateQuestion = createAsyncThunk(
    "question/updateQuestion",
    async (question, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await questionService.updateQuestion(question, token);
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


// Delete a question
export const deleteQuestion = createAsyncThunk(
    "question/deleteQuestion",
    async (questionId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await questionService.deleteQuestion(questionId, token);
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



// Create slice
const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.faq = [];
            state.answered = [];
            state.inbox = [];
            state.sent = [];
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // Get received questions
        builder.addCase(getReceivedQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getReceivedQuestions.fulfilled, (state, action) => {
            state.inbox = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getReceivedQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get sent questions
        builder.addCase(getSentQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getSentQuestions.fulfilled, (state, action) => {
            state.sent = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getSentQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get profile FAQ questions
        builder.addCase(getProfileFaqQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getProfileFaqQuestions.fulfilled, (state, action) => {
            state.faq = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getProfileFaqQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get profile answered questions
        builder.addCase(getProfileAnsweredQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getProfileAnsweredQuestions.fulfilled, (state, action) => {
            state.answered = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getProfileAnsweredQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get profile asked questions
        builder.addCase(getProfileAskedQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getProfileAskedQuestions.fulfilled, (state, action) => {
            state.asked = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getProfileAskedQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Create question
        builder.addCase(createQuestion.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(createQuestion.fulfilled, (state, action) => {
            state.sent.push(action.payload);
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.msg = '';
        });
        builder.addCase(createQuestion.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // Update question
        builder.addCase(updateQuestion.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(updateQuestion.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
            const index = state.inbox.findIndex(question => question._id === action.payload._id);
            state.inbox[index] = action.payload;
        });
        builder.addCase(updateQuestion.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Delete question
        builder.addCase(deleteQuestion.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(deleteQuestion.fulfilled, (state, action) => {
            // TODO: remove from state
            console.log('action => sent | inbox | answered | faq');
            state.sent = state.sent.filter(question => question._id !== action.payload._id);
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(deleteQuestion.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});


// Export reducer
export const { reset } = questionSlice.actions;
export default questionSlice.reducer;