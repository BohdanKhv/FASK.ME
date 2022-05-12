import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileService from './profileService';


const initialState = {
    profile: null,
    count: null,
    isLoading: false,
    isError: false,
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



// Create slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.profile = null;
            state.count = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
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
            state.profile = action.payload.profile;
            state.count = action.payload.count;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Update profile
        builder.addCase(updateProfile.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.profile = action.payload;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});


// Export reducer
export const { reset } = profileSlice.actions;
export default profileSlice.reducer;