export const PATH = Object.freeze({
  LISTCOURSEPAGE: '/admin/listcourse',
  EVENT: '/admin/event',
  VIDEO: '/admin/video',
  LOGIN: '/login',
  HOME: '/admin'
})

export const SIDEBAR = Object.freeze({
  HOME: PATH.HOME,
  LISTCOURSEPAGE: PATH.LISTCOURSEPAGE,
  EVENT: PATH.EVENT,
  VIDEO: PATH.VIDEO,
  LOGOUT: 'logout'
})

export const ROLE = Object.freeze({
  ADMIN: 'admin',
  AGENCY: 'agency',
  CLIENT: 'client',

  MANAGER: 'manager'
})

export const ROUTES = Object.freeze({
  PRIVATE: [
    { path: PATH.HOME, exact: true, component: 'HomePage' },
    { path: PATH.LISTCOURSEPAGE, component: 'ListCoursePage' },
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

export const COLUMN_TYPE = Object.freeze({
  TEXT: 'text',
  DATE: 'date',
  DATE_STRING: 'dateString',
  NUMBER: 'number',
  LINK: 'link'
})

export const CREATE_UPDATE_DELETE_STATUS = Object.freeze({
  UPCOMING: 'upcoming',
  SUCCESS: 'success',
  ERROR: 'error'
})

export const AUTH_TOKEN_KEY = '@Trainistar:AUTH_TOKEN'
export const AUTH_ROLE_KEY = '@Trainistar:AUTH_ROLE'
export const AUTH_USER_DATA_KEY = '@Trainistar:AUTH_USER_DATA'
