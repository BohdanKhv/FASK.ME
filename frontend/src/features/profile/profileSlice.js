import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileService from './profileService';


const initialState = {
    profile: null,
    follows: [],
    isFollowLoading: false,
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
            return await profileService.getProfile(username);
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


// Follow profile
export const followToggleProfile = createAsyncThunk(
    'profile/followToggleProfile',
    async (username, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await profileService.followToggleProfile(username, token);
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
            state.isFollowLoading = false;
            state.msg = '';
        },
        updateProfileImage: (state) => {
            state.isUpdating = true;
        },
        updateProfileImageFinished: (state) => {
            state.isUpdating = false;
        },
        resetFollows: (state) => {
            state.follows = [];
        }
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
            state.profile = action.payload;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.isUpdating = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Follow profile
        builder.addCase(followToggleProfile.pending, (state, action) => {
            state.isFollowLoading = true;
        });
        builder.addCase(followToggleProfile.fulfilled, (state, action) => {
            state.isFollowLoading = false;
            state.profile = action.payload;
        });
        builder.addCase(followToggleProfile.rejected, (state, action) => {
            state.isFollowLoading = false;
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
    }
});


// Export reducer
export const { reset, updateProfileImage, updateProfileImageFinished, resetFollows } = profileSlice.actions;
export default profileSlice.reducer;