import * as React from 'react'
import {
  Dashboard,
  LocalLibrary,
  // Tune,
  AssignmentInd,
  Work,
  // AssignmentTurnedIn,
  Apps,
  ShowChart,
} from '@material-ui/icons'

// import VideoLabelIcon from '@material-ui/icons/VideoLabel'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import ComputerIcon from '@material-ui/icons/Computer'

const ADMIN_API_BASE = `http://support.trakinvest.com/rest/`
const PROD_API_BASE = `https://app.trakinvest.com/`
// const PROD_API_BASE = `https://beta.trakinvest.com/`
// const DEV_API_BASE = `http://portal-dev.trakinvest.com/`

export const ENDPOINTS = {
  // ADMIN
  ADMIN_LOGIN: { type: 'POST', url: `${ADMIN_API_BASE}login` },

  // USER
  USER_LOGIN: `https://accounts.traklabs.io/authenticate`, //`${PROD_API_BASE}authentication/credentials?source=traklabs`,
  USER_SIGNUP: `https://accounts.traklabs.io/signup`,
  USER_FORGOT: email =>
    `${PROD_API_BASE}labs/authentication/sendEmail?email=${email}`,
  USER_CHANGEPASS: token =>
    `${PROD_API_BASE}labs/authentication/changePassword/${token}`,
  ME: { type: 'GET', url: `https://accounts.traklabs.io/checkToken` },

  // APP
  APP_PACKS: { type: 'GET', url: `${PROD_API_BASE}users/packs` },
  APP_COURSES: (courseId, moduleId) => ({
    type: 'GET',
    url: !moduleId
      ? `${PROD_API_BASE}courses/${courseId}`
      : `${PROD_API_BASE}courses/${courseId}/${moduleId}`,
  }),
  APP_ASSESSMENT: (email, courseId, moduleId) => ({
    type: 'POST',
    url: `https://accounts.traklabs.io/courses/${email}/${courseId}/${moduleId}/assessment`,
  }),
  APP_COMPREHENSIVE: courseId => ({
    type: 'POST',
    url: `${PROD_API_BASE}v1/courses/${courseId}/comprehensive`,
  }),
  APP_COURSES_V1: courseId => ({
    type: 'GET',
    url: `${PROD_API_BASE}v1/courses/progress/${courseId}`,
  }),
  APP_ME: { type: 'GET', url: `${PROD_API_BASE}users/me` },

  // LAB
  LAB_REGISTER: { type: 'POST', url: `${PROD_API_BASE}v1/lab/users` },
  LAB_INFO: { type: 'GET', url: `${PROD_API_BASE}v1/lab/users/subscriptions` },
  LAB_PERFORM: action => ({
    type: 'POST',
    url: `${PROD_API_BASE}v1/lab/users/subscriptions/${action}`,
  }),

  // WORDPRESS
  WP_POSTS: (page, categoryId) => ({
    type: 'GET',
    url: `http://blog.traklabs.io/wp-json/wp/v2/posts?page=${page}${
      categoryId ? `&categories=${categoryId}` : ''
    }`,
  }),
  WP_POST_CONTENT: contentId => ({
    type: 'GET',
    url: `http://blog.traklabs.io/wp-json/wp/v2/posts/${contentId}`,
  }),
  WP_CATEGORIES: {
    type: 'GET',
    url: 'http://blog.traklabs.io/wp-json/wp/v2/categories',
  },
}

export const ERROR_MSGS = {
  USER_NOT_ENROLLED: {
    title: 'Sorry. You do not have access.',
    body:
      'In order to access this page, you need to have the Blockchain Course Pack purchased.',
  },
  LAB_EXPIRED: {
    title: 'Sorry. You do not have access.',
    body: 'Your subscription has already expired.',
  },
  COURSE_COMPREHENSIVE_NOACCESS: {
    title: 'Comprehensive assessment not available.',
    body: 'Please complete all module assessments to gain access.',
  },
}

export const MENU_OPTIONS = [
  {
    pathname: '/home',
    routes: ['/home', '/content'],
    name: 'Content',
    listName: 'Content',
    icon: <Dashboard />,
    isAvailable: true,
    hideWithNonBlockchain: true,
  },
  {
    pathname: '/courses',
    routes: ['/courses'],
    name: 'Curriculum',
    listName: 'Curriculum',
    icon: <LocalLibrary />,
    isAvailable: true,
    hideWithNonBlockchain: true,
    subMenus: [
      {
        pathname: '/reports',
        pathAlias: '/courses/reports',
        routes: ['/reports'],
        name: 'Course Report',
        listName: 'Course Report',
        icon: <ShowChart />,
      },
    ],
  },
  {
    pathname: '/lab',
    routes: ['/lab'],
    name: 'Lab',
    listName: 'Lab',
    icon: <ComputerIcon />,
    isAvailable: true,
    hideWithNonBlockchain: false,
  },
  {
    pathname: '/genesis',
    routes: ['/genesis'],
    name: 'Protocols',
    listName: 'Protocols',
    icon: <Apps />,
    isAvailable: true,
    hideWithNonBlockchain: true,
  },
  {
    pathname: '/internships',
    routes: ['/internships'],
    name: 'Internships',
    listName: 'Internships',
    icon: <AssignmentInd />,
    isAvailable: true,
    hideWithNonBlockchain: true,
  },
  {
    pathname: '/jobs',
    routes: ['/jobs'],
    name: 'Jobs',
    listName: 'Jobs',
    icon: <Work />,
    isAvailable: true,
    hideWithNonBlockchain: true,
  },
  // {
  //   pathname: '/alllabs',
  //   routes: ['/alllabs'],
  //   name: 'My Labs',
  //   listName: 'My Labs',
  //   icon: <VideoLabelIcon />,
  //   isAvailable: true,
  //   hideWithNonBlockchain: false,
  // },
  {
    pathname: '/explore',
    routes: ['/explore'],
    name: 'Explore',
    listName: 'Explore',
    icon: <ShoppingBasketIcon />,
    isAvailable: true,
    hideWithNonBlockchain: false,
  },
]

export default { MENU_OPTIONS, ENDPOINTS }
