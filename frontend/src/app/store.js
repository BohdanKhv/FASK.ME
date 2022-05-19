import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import followReducer from '../features/follow/followSlice';
import questionReducer from '../features/question/questionSlice';
import searchReducer from '../features/search/searchSlice';
import localReducer from '../features/local/localSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        follow: followReducer,
        question: questionReducer,
        search: searchReducer,
        local: localReducer,
    },
});