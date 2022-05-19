import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import followService from './followService';


const initialState = {
    profile: null,
    followList: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: '',
};



// Get followers
export const getFollowers = createAsyncThunk(
    'follow/getFollowers',
    async (username, thunkAPI) => {
        try {
            return await followService.getFollowers(username);
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
    async (username, thunkAPI) => {
        try {
            return await followService.getFollowing(username);
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


// Unfollow user
export const unfollowUser = createAsyncThunk(
    'follow/unfollowUser',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await followService.unfollowUser(id, token);
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
            state.profile = null;
            state.followList = [];
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        },
        addToFollowList: (state, action) => {
            state.profile = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Get followers
        builder.addCase(getFollowers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getFollowers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.followList = [...state.followList, ...action.payload];
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
            state.isLoading = false;
            state.followList = [...state.followList, ...action.payload];
        });
        builder.addCase(getFollowing.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Follow user
        builder.addCase(followUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(followUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            if(state.profile._id === action.payload.following) {
                state.profile.canFollow = false;
            } else {
                const index = state.followList.findIndex(
                    (user) => user._id === action.payload.following
                );
                state.followList[index].canFollow = false;
            }
        });
        builder.addCase(followUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Unfollow user
        builder.addCase(unfollowUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(unfollowUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            if(state.profile._id === action.payload.following) {
                state.profile.canFollow = true;
            } else {
                const index = state.followList.findIndex(
                    (user) => user._id === action.payload.following
                );
                state.followList[index].canFollow = true;
            }
        });
        builder.addCase(unfollowUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});



// Export reducer
export const { reset, addToFollowList } = followSlice.actions;
export default followSlice.reducer;