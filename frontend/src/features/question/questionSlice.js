import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionService from "./questionService";


const initialState = {
    questions: [],
    numFound: 0,
    hasMore: false,
    skip: 0,
    limit: 10,
    isLoading: false,
    loadingId: null,
    isCreateLoading: false,
    isError: false,
    isSuccess: false,
    msg: ''
};


// Get sent questions
export const getSentQuestions = createAsyncThunk(
    "question/getSentQuestions",
    async (username, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const { skip, limit } = thunkAPI.getState().question;
            return await questionService.getSentQuestions({username, skip, limit}, token);
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
            const { skip, limit } = thunkAPI.getState().question;
            return await questionService.getProfileFaqQuestions({username, skip, limit});
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
            const { skip, limit } = thunkAPI.getState().question;
            return await questionService.getProfileAnsweredQuestions({username, skip, limit});
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
            const { skip, limit } = thunkAPI.getState().question;
            return await questionService.getProfileAskedQuestions({username, skip, limit});
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


// Get user private questions
export const getUserPrivateQuestions = createAsyncThunk(
    "question/getUserPrivateQuestions",
    async (username, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const { skip, limit } = thunkAPI.getState().question;
            return await questionService.getUserPrivateQuestions({username, skip, limit}, token);
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


// Get followers questions
export const getFollowersQuestions = createAsyncThunk(
    "question/getFollowersQuestions",
    async (username, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const { skip, limit } = thunkAPI.getState().question;
            return await questionService.getFollowersQuestions({username, skip, limit}, token);
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


// Increment view count
export const incrementViewCount = createAsyncThunk(
    "question/incrementViewCount",
    async (questionId, thunkAPI) => {
        try {
            return await questionService.incrementViewCount(questionId);
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


// Pin question
export const pinQuestion = createAsyncThunk(
    "question/pinQuestion",
    async (questionId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await questionService.pinQuestion(questionId, token);
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
            state.questions = [];
            state.numFound = 0;
            state.hasMore = false;
            state.skip = 0;
            state.limit = 10;
            state.isCreateLoading = false;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // Get sent questions
        builder.addCase(getSentQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getSentQuestions.fulfilled, (state, action) => {
            state.questions = [...state.questions, ...action.payload.questions];
            state.numFound = action.payload.numFound;
            state.hasMore = state.skip + state.limit < state.numFound;
            state.skip = state.skip + state.limit;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getSentQuestions.rejected, (state, action) => {
            state.isLoading = action.payload ? false : true;
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
            state.questions = [...state.questions, ...action.payload.questions];
            state.numFound = action.payload.numFound;
            state.hasMore = state.skip + state.limit < state.numFound;
            state.skip = state.skip + state.limit;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getProfileFaqQuestions.rejected, (state, action) => {
            state.isLoading = action.payload ? false : true;
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
            state.questions = [...state.questions, ...action.payload.questions];
            state.numFound = action.payload.numFound;
            state.hasMore = state.skip + state.limit < state.numFound;
            state.skip = state.skip + state.limit;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getProfileAnsweredQuestions.rejected, (state, action) => {
            state.isLoading = action.payload ? false : true;
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
            state.questions = [...state.questions, ...action.payload.questions];
            state.numFound = action.payload.numFound;
            state.hasMore = state.skip + state.limit < state.numFound;
            state.skip = state.skip + state.limit;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getProfileAskedQuestions.rejected, (state, action) => {
            state.isLoading = action.payload ? false : true;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get private questions
        builder.addCase(getUserPrivateQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getUserPrivateQuestions.fulfilled, (state, action) => {
            state.questions = [...state.questions, ...action.payload.questions];
            state.numFound = action.payload.numFound;
            state.hasMore = state.skip + state.limit < state.numFound;
            state.skip = state.skip + state.limit;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getUserPrivateQuestions.rejected, (state, action) => {
            state.isLoading = action.payload ? false : true;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get followers questions
        builder.addCase(getFollowersQuestions.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getFollowersQuestions.fulfilled, (state, action) => {
            state.questions = [...state.questions, ...action.payload.questions];
            state.numFound = action.payload.numFound;
            state.hasMore = state.skip + state.limit < state.numFound;
            state.skip = state.skip + state.limit;
            state.isLoading = false;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getFollowersQuestions.rejected, (state, action) => {
            state.isLoading = action.payload ? false : true;
            state.isError = true;
            state.msg = action.payload;
        });

        // Create question
        builder.addCase(createQuestion.pending, (state, action) => {
            state.isCreateLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(createQuestion.fulfilled, (state, action) => {
            if(action.payload.type === 'faq') {
                state.questions.unshift(action.payload);
            }
            state.isCreateLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.msg = '';
        });
        builder.addCase(createQuestion.rejected, (state, action) => {
            state.isCreateLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // Update question
        builder.addCase(updateQuestion.pending, (state, action) => {
            if(state.questions.length > 0) {
                state.loadingId = action.meta.arg._id;
                state.isError = false;
                state.msg = '';
            }
        });
        builder.addCase(updateQuestion.fulfilled, (state, action) => {
            if(state.questions.length > 0) {
                state.loadingId = null;
                state.isError = false;
                state.msg = '';
                const index = state.questions.findIndex(question => question._id === action.payload._id);
                state.questions[index] = action.payload;
            }
        });
        builder.addCase(updateQuestion.rejected, (state, action) => {
            if(state.questions.length > 0) {
                state.loadingId = null;
                state.isError = true;
                state.msg = action.payload;
            }
        });

        // Delete question
        builder.addCase(deleteQuestion.pending, (state, action) => {
            if(state.questions.length > 0) {
                state.loadingId = action.meta.arg;
                state.isCreateLoading = true;
                state.isError = false;
                state.msg = '';
            }
        });
        builder.addCase(deleteQuestion.fulfilled, (state, action) => {
            if(state.questions.length > 0) {
                state.loadingId = null;
                state.isError = false;
                state.msg = '';
                state.questions = state.questions.filter(question => question._id !== action.payload._id);
            }
        });
        builder.addCase(deleteQuestion.rejected, (state, action) => {
            if(state.questions.length > 0) {
                state.loadingId = null;
                state.isError = true;
                state.msg = action.payload;
            }
        });

        // Pin question
        builder.addCase(pinQuestion.pending, (state, action) => {
            state.loadingId = action.meta.arg;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(pinQuestion.fulfilled, (state, action) => {
            state.loadingId = null;
            const index = state.questions.findIndex(question => question._id === action.payload._id);
            state.questions[index].isReceiverPinned = action.payload.isReceiverPinned;
            state.questions[index].isSenderPinned = action.payload.isSenderPinned;
        });
        builder.addCase(pinQuestion.rejected, (state, action) => {
            state.loadingId = null;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});


// Export reducer
export const { reset } = questionSlice.actions;
export default questionSlice.reducer;