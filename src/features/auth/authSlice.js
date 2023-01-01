import { createSlice } from '@reduxjs/toolkit'
import { AUTH_ROLE_KEY, AUTH_TOKEN_KEY, AUTH_USER_DATA_KEY } from '../../constants/common'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    currentUser: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.currentUser = action.payload

      localStorage.setItem(AUTH_TOKEN_KEY, 'GXr1Vb6wk98dP+P9')
      localStorage.setItem(AUTH_USER_DATA_KEY, JSON.stringify(action.payload))
      localStorage.setItem(AUTH_ROLE_KEY, action.payload.role)
    },

    loginFail: (state, action) => {
      state.isLoggedIn = false
      state.currentUser = null
    },

    logout: (state) => {
      state.isLoggedIn = false
      state.currentUser = null
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(AUTH_USER_DATA_KEY)
      localStorage.removeItem(AUTH_ROLE_KEY)
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
