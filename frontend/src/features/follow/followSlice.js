import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import followService from './followService';
import { getProfile } from '../profile/profileSlice';


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
            const token = thunkAPI.getState().auth.user.token;
            return await followService.getFollowers(username, token);
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
            const token = thunkAPI.getState().auth.user.token;
            return await followService.getFollowing(username, token);
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
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        },
        resetProfile: (state) => {
            state.profile = null;
        },
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
        builder.addCase(followUser.fulfilled, (state, action) => {
            if(state.profile._id === action.payload.follow.following) {
                state.profile.canFollow = false;
            } else {
                const index = state.followList.findIndex(
                    (user) => user._id === action.payload.follow.following
                );
                state.followList[index].canFollow = action.payload.msg !== 'Followed user';
            }
        });
        builder.addCase(followUser.rejected, (state, action) => {
            state.msg = action.payload;
        });

        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.profile = {
                _id: action.payload.user._id,
                canFollow: action.payload.canFollow,
                followers: action.payload.followers,
                following: action.payload.following,
            };
        });
    }
});



// Export reducer
export const { reset, resetProfile } = followSlice.actions;
export default followSlice.reducer;