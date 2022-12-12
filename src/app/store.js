import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import counterReducer from '../features/counter/counterSlice'
import languageReducer from '../features/language/languageSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    language: languageReducer
  }
})
