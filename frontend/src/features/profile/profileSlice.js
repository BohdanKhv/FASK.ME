import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileService from './profileService';
import { followUser } from '../follow/followSlice';


const initialState = {
    profile: null,
    isLoading: false,
    isUpdating: false,
    isError: false,
    isSuccess: false,
    msg: '',
};


// Get profile
export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async (username, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user ? thunkAPI.getState().auth.user.token : null;
            return await profileService.getProfile(username, token);
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


// Update profile
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (profileData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await profileService.updateProfile(profileData, token);
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


// Get many profiles
export const getProfiles = createAsyncThunk(
    'profile/getProfiles',
    async (uId, thunkAPI) => {
        try {
            return await profileService.getProfiles(uId);
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


// Get search profiles
export const searchProfiles = createAsyncThunk(
    'profile/searchProfiles',
    async (uId, thunkAPI) => {
        try {
            return await profileService.getProfiles(uId);
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
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.profile = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.isUpdating = false;
            state.msg = '';
        },
        updateProfileImage: (state) => {
            state.isUpdating = true;
        },
    },
    extraReducers: (builder) => {
        // Get profile
        builder.addCase(getProfile.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.profile = action.payload;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Update profile
        builder.addCase(updateProfile.pending, (state, action) => {
            state.isUpdating = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.isUpdating = false;
            state.isSuccess = true;
            state.profile = {
                ...action.payload,
                following: state.profile.following,
                followers: state.profile.followers,
                canFollow: state.profile.canFollow,
                canAsk: state.profile.canAsk,
            };
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.isUpdating = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // get profiles
        builder.addCase(getProfiles.pending, (state, action) => {
            state.isFollowLoading = true;
        });
        builder.addCase(getProfiles.fulfilled, (state, action) => {
            state.isFollowLoading = false;
            state.follows = [...state.follows, ...action.payload];
        });
        builder.addCase(getProfiles.rejected, (state, action) => {
            state.isFollowLoading = false;
            state.msg = action.payload;
        });

        builder.addCase(followUser.fulfilled, (state, action) => {
            if(state.profile && (state.profile.user._id === action.payload.follow.following)) {
                state.profile.canFollow = action.payload.msg !== 'Followed user';
                state.profile.followers = action.payload.msg === 'Followed user' ? state.profile.followers + 1 : state.profile.followers - 1;
            }
            if(state.profile && (state.profile.user._id === action.payload.follow.follower)) {
                state.profile.following = action.payload.msg === 'Followed user' ? state.profile.following + 1 : state.profile.following - 1;
            }
        });
    }
});



// Export reducer
export const { reset, updateProfileImage } = profileSlice.actions;
export default profileSlice.reducer;