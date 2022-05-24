import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
};


// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
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


// Log out
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout();
    }
);


// Login
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
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


// Edit user
export const updateUser = createAsyncThunk(
    'auth/edit',
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.updateUser(userData, token);
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


// Sent reset password email
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data, thunkAPI) => {
        try {
            return await authService.forgotPassword(data);
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


// Create new password
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data, thunkAPI) => {
        try {
            return await authService.resetPassword(data);
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
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // Register user
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.user = null;
        });

        // Log out
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
        });

        // Login
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.user = null;
        });

        // Edit user
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Send reset password email
        builder.addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.msg = action.payload.msg;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Create new password
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload.msg;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});


// Export reducer
export const { reset } = authSlice.actions;
export default authSlice.reducer;