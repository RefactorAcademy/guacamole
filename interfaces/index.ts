type colorsType = {
  contrast: string
  brand: string
  accent1: string
  accent2: string
  accent3: string
  accent4: string
  neutral1: string
  neutral2: string
  neutral3: string
  neutral4: string
  statusCritical: string
  statusError: string
  statusWarning: string
  statusOk: string
  statusUnknown: string
  statusDisabled: string
  light1: string
  light2: string
  light3: string
  light4: string
  light5: string
  light6: string
  dark1: string
  dark2: string
  dark3: string
  dark4: string
  dark5: string
  dark6: string
}

type fontSizeType = {
  xxxs: string
  xxs: string
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
  xxxl: string
  xxxxl: string
}

type breakpointsType = {
  sm: string
  md: string
  lg: string
  xl: string
}

export interface ThemeInterface {
  fontSize: fontSizeType
  colors: colorsType
  breakpoints: breakpointsType
}

export interface ContentList {
  isLoading: boolean
  anchorEl: any
  totalItems: number
  currentPage: number
  selectedCategory: any
  blogContent: any
  blogCategories: any
  openMenu: any
  closeMenu: any
  handleCategoryChange: any
  handlePageChange: any
  handleResetCategory: any
}

export interface Content {
  isLoading: boolean
  title: string
  caption: string
  content: string
  coverImage: string
  videoUrl: string
  videoUrl2: string
  videoUrl3: string
  backFn: any
}

export interface Course {
  title: string
  subtitle: string
  summary: string
  modules: Module[]
  courseId: string
  lastModuleVisited: string
  resumeModule: string
}

export interface Module {
  title: string
  desc: string
  id: string
  chapters: Chapter[]
  assessment: Assessment[]
  progress: Progress
}

export interface LabPage {
  isLoading: boolean
  isPerforming: boolean
  isError: boolean
  isLabCreated: boolean
  isLabStarted: boolean
  isLabInProgress: boolean
  isPending: boolean
  isDeleted: boolean
  isEnrolled: boolean
  isAITool: boolean
  isIOT: boolean
  isBigData: boolean
  labInfo: any
  showError: any
  errorMsg: any
  userInfo: any
  labPerform: any
  toggleErrorDisplay: any
  backFn: any
  passwordShown: boolean
  showPassword: any
}

export interface Progress {
  assessment: Assessment[]
  assessment_attempted: number
  percentage: number
  previous_assessment_completed: boolean
}

export interface Chapter {
  title: string
  id: string
  desc: string
  video_url: string
  video_progress?: number
  chapter_completed: boolean
}

export interface CourseModule {
  course: Course
  module: Module
  id: string
  moduleId: string
  auth: string
  src: string
}

export interface CourseAssessment {
  course: Course
  comprehensive: any
  id: string
  moduleId: string
}

export interface Assessment {
  index: number
  question: string
  type_of_question: number
  choices: Choices[]
}

export interface Choices {
  index: number
  choice: string
}

export interface Progress {
  assessment_completed: boolean
  has_assessment: boolean
  module_completed: boolean
  previous_assessment_completed: boolean
  assessment_attempted: number
  assessment_score: number
  percentage: number
  items_to_complete: number
  items_completed: number
  percentage_module_completed: number
}

export interface Reports {
  percentage_course_completed: number
  progressData: Object
}

export interface CourseReports {
  course: Course
  reports: Reports
  id: string
  auth: string
  src: string
}
