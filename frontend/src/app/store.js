import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import questionReducer from '../features/question/questionSlice';
import localReducer from '../features/local/localSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        question: questionReducer,
        local: localReducer,
    },
});