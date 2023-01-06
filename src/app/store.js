import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import languageReducer from '../features/language/languageSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer
  }
})
