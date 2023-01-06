import { createSlice } from '@reduxjs/toolkit'
import { AUTH_TOKEN_KEY } from '../../constants/common'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    currentUser: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token)

      state.isLoggedIn = true
      state.currentUser = action.payload.user
    },

    loginFail: (state, action) => {
      state.isLoggedIn = false
      state.currentUser = null
    },

    logout: (state) => {
      localStorage.removeItem(AUTH_TOKEN_KEY)

      state.isLoggedIn = false
      state.currentUser = null
    },

    checkTokenSuccess: (state, action) => {
      state.isLoggedIn = true
      state.currentUser = action.payload.user
    }
  }
})

// Actions
export const authActions = authSlice.actions

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectCurrentUser = (state) => state.auth.currentUser

// Reducer
const authReducer = authSlice.reducer
export default authReducer
