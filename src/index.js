import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

import { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme'
import { GlobalStyle } from './theme/globalStyles'

import 'antd/dist/reset.css'
import './tailwind.css'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: theme.colors.primary,
          borderRadius: 4
        }
      }}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
