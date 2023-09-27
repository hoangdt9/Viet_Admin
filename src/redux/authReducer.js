import { createSlice } from "@reduxjs/toolkit";
import { userService } from '../services/users.service'
import { openSnackBar } from "./snackBarReducer";
let userToken = localStorage.getItem('user');

export const authSlice = createSlice({
    name: "authentication",
    initialState: {
        loggingIn: false,
        loggedIn: userToken ? true : false,
        userToken,
        registering: false
    },
    reducers: {
        loginRequest: state => {
            state.loggingIn = true
        },
        loginSuccess: (state, action) => {
            state.loggingIn = false;
            state.loggedIn = true;
            state.userToken = action.payload;
        },
        loginFailure: state => {
            state.loggingIn = false;
            state.loggedIn = false
        },
        registerRequest: state => {
            state.registering = true;
        },
        registerEnd: state => {
            state.registering = false;
        },
        logout: state => {
            localStorage.removeItem('user');
            state.loggedIn = false;
            state.userToken = null;
        }
    }
});

const { loginRequest, loginSuccess, loginFailure, logout, registerRequest, registerEnd } = authSlice.actions;

export const registerUser = (user) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        await userService.registerUser(user);
        dispatch(openSnackBar({ message: `We've set an email to ${user.account}. Please check your email to verify and continue`, status: 'success' }));
        dispatch(registerEnd());
    } catch (error) {
        dispatch(registerEnd());
        dispatch(openSnackBar({ message: error.messsage, status: 'error' }));
        throw new Error(error);
    }
}

export const loginUser = (data) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const user = await userService.login(data);
        dispatch(loginSuccess(user.data.token));
        return user.data;
    } catch (error) {
        dispatch(loginFailure());
        dispatch(openSnackBar({ message: error.message, status: "error" }));
        // throw new Error(error);
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch(logout())
}



export default authSlice.reducer;