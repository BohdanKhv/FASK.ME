import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import followService from './followService';


const initialState = {
    followList: [],
    numFound: 0,
    hasMore: false,
    limit: 10,
    skip: 0,
    isLoading: false,
    loadingId: null,
    isError: false,
    isSuccess: false,
    msg: '',
};



// Get followers
export const getFollowers = createAsyncThunk(
    'follow/getFollowers',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await followService.getFollowers(data, token);
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


// Get following
export const getFollowing = createAsyncThunk(
    'follow/getFollowing',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await followService.getFollowing(data, token);
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


// Follow user
export const followUser = createAsyncThunk(
    'follow/followUser',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await followService.followUser(id, token);
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
const followSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {
        reset: (state) => {
            state.followList = [];
            state.isLoading = false;
            state.numFound = 0;
            state.hasMore = false;
            state.skip = 0;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        // Get followers
        builder.addCase(getFollowers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getFollowers.fulfilled, (state, action) => {
            state.followList = [...state.followList, ...action.payload.follows];
            state.numFound = action.payload.numFound;
            state.skip = state.skip + state.limit;
            state.hasMore = state.skip + state.limit < state.numFound;
            state.isLoading = false;
        });
        builder.addCase(getFollowers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get following
        builder.addCase(getFollowing.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getFollowing.fulfilled, (state, action) => {
            state.followList = [...state.followList, ...action.payload.follows];
            state.numFound = action.payload.numFound;
            state.skip = state.skip + state.limit;
            state.hasMore = state.skip + state.limit < state.numFound;
            state.isLoading = false;
        });
        builder.addCase(getFollowing.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Follow user
        builder.addCase(followUser.pending, (state, action) => {
            state.loadingId = action.meta.arg;
        });
        builder.addCase(followUser.fulfilled, (state, action) => {
            state.loadingId = null;
            const index = state.followList.findIndex(
                (user) => user._id === action.payload.follow.following
            );
            if(state.followList[index]) {
                state.followList[index].canFollow = action.payload.msg !== 'Followed user';
            }
        });
        builder.addCase(followUser.rejected, (state, action) => {
            state.loadingId = null;
            state.msg = action.payload;
        });
    }
});



// Export reducer
export const { reset } = followSlice.actions;
export default followSlice.reducer;