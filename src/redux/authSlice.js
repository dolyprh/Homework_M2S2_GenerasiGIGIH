import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthorized: false,
        user: {},
        accessToken: "",
    },

    reducers : {
        login: (state, action) => {
            state.isAuthorized = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },

        logout: (state) => {
            state.isAuthorized = false;
            state.user = "";
            state.accessToken = "";
        }
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;