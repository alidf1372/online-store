import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        userProfile: null,
        isLogin: false
    },
    reducers: {
        signIn: (state, action) => {
            state.isLogin = true
            state.userProfile = action.payload
            const userInfo = {uid: action.payload['id'], useName: action.payload['userName'], FName: action.payload['full-name']};
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            localStorage.setItem('isLogin',true)
        },
        signOut: (state) => {
            state.isLogin = false
            state.userProfile = null
            localStorage.removeItem('userInfo')
            localStorage.removeItem('isLogin')
        }
    },
})

export default loginSlice.reducer
export const { signIn, signOut } = loginSlice.actions
