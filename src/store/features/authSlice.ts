import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isAuthenticated: boolean;
    userEmail: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    userEmail: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.userEmail = action.payload;
            localStorage.setItem('userEmail', action.payload);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userEmail = null;
            localStorage.removeItem('userEmail');
        },
        initializeAuth: (state) => {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                state.isAuthenticated = true;
                state.userEmail = userEmail;
            }
        },
    },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;