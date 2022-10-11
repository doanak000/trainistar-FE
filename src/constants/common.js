export const PATH = Object.freeze({
  USER: '/user',
  EVENT: '/event',
  VIDEO: '/video',
  LOGIN: '/login'
})

export const SIDEBAR = Object.freeze({
  USER: PATH.USER,
  EVENT: PATH.EVENT,
  VIDEO: PATH.VIDEO,
  LOGOUT: 'logout'
})

export const ROLE = Object.freeze({
  ADMIN: 'admin',
  AGENCY: 'agency',
  CLIENT: 'client'
})

export const ROUTES = Object.freeze({
  PRIVATE: [
    { path: PATH.USER, component: 'UserPage' },
    { path: PATH.EVENT, component: 'EventPage' },
    { path: PATH.VIDEO, component: 'VideoPage' }
  ],
  PUBLIC: [{ path: PATH.LOGIN, component: 'LoginPage' }]
})

export const NOTIFICATION_TYPE = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
})
