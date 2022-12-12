import { createSlice } from '@reduxjs/toolkit'
import { AUTH_TOKEN_KEY } from '../../constants/common'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    message: ''
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.currentUser = action.payload
    },

    loginFail: (state, action) => {
      state.isLoggedIn = false
      state.message = action.payload
    },

    logout: (state) => {
      state.isLoggedIn = false
      state.currentUser = null
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }
  }
})

// Actions
export const authActions = authSlice.actions

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectCurrentUser = (state) => state.auth.currentUser
export const selectMessage = (state) => state.auth.message

// Reducer
const authReducer = authSlice.reducer
export default authReducer
