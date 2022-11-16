export const PATH = Object.freeze({
  LISTCOURSEPAGE: '/listcourse',
  EVENT: '/event',
  VIDEO: '/video',
  LOGIN: '/login',
  STUDENTS:'/students'
})

export const SIDEBAR = Object.freeze({
  LISTCOURSEPAGE: PATH.LISTCOURSEPAGE,
  EVENT: PATH.EVENT,
  VIDEO: PATH.VIDEO,
  STUDENTS: PATH.STUDENTS,
  LOGOUT: 'logout'
})

export const ROLE = Object.freeze({
  ADMIN: 'admin',
  AGENCY: 'agency',
  CLIENT: 'client'
})

export const ROUTES = Object.freeze({
  PRIVATE: [
    { path: PATH.LISTCOURSEPAGE, component: 'ListCoursePage' },
    { path: PATH.EVENT, component: 'EventPage' },
    { path: PATH.VIDEO, component: 'VideoPage' },
    { path: PATH.STUDENTS, component: 'StudentsPage' }
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
