export const PATH = Object.freeze({
  LISTCOURSEPAGE: '/admin/listcourse',
  NOTI: '/admin/noti',
  VIDEO: '/admin/video',
  LOGIN: '/login',
  HOME: '/admin',
  USER: '/admin/user',
  SKILLS: '/admin/skills'
})

export const PATH_STUDENT = Object.freeze({
  HOME: '/',
  SEARCH: '/search',
  COURSE_DETAILS: '/course/:id',
  HISTORIES: '/course-histories',
  CERTIFICATES: '/certificates',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile'
})

export const SIDEBAR = Object.freeze({
  HOME: PATH.HOME,
  LISTCOURSEPAGE: PATH.LISTCOURSEPAGE,
  NOTI: PATH.NOTI,
  VIDEO: PATH.VIDEO,
  USER: PATH.USER,
  SKILLS: PATH.SKILLS,
  LOGOUT: 'logout'
})

export const SIDEBAR_STUDENT = Object.freeze({
  HOME: PATH_STUDENT.HOME,
  SEARCH: PATH_STUDENT.SEARCH,
  HISTORIES: PATH_STUDENT.HISTORIES,
  CERTIFICATES: PATH_STUDENT.CERTIFICATES,
  NOTIFICATIONS: PATH_STUDENT.NOTIFICATIONS,
  PROFILE: PATH_STUDENT.PROFILE
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
    { path: PATH.NOTI, component: 'NotificationPage' },
    { path: PATH.USER, component: 'UserPage' },
    { path: PATH.SKILLS, component: 'admin/SkillsPage' }
  ],
  PUBLIC: [{ path: PATH.LOGIN, component: 'LoginPage' }],
  STUDENT: [
    { path: PATH_STUDENT.HOME, exact: true, component: 'student/HomePage' },
    { path: PATH_STUDENT.SEARCH, component: 'student/SearchPage' },
    { path: PATH_STUDENT.COURSE_DETAILS, component: 'student/CourseDetailsPage' },
    { path: PATH_STUDENT.HISTORIES, component: 'student/HistoriesPage' },
    { path: PATH_STUDENT.CERTIFICATES, component: 'student/CertificatesPage' },
    { path: PATH_STUDENT.NOTIFICATIONS, component: 'student/NotificationsPage' },
    { path: PATH_STUDENT.PROFILE, component: 'student/ProfilePage' }
  ]
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
