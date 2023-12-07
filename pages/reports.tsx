import * as React from 'react'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import ResponseError from '../components/ResponseError'
import MenuStructure from '../layouts/MenuStructure'
import Router from 'next/router'
import { ENDPOINTS, ERROR_MSGS } from '../constants'
import { callAPI, checkInitialResponse, sumObject } from '../utilities'
import ReportsLayout from '../layouts/ReportsLayout'

class ReportsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      isLoading: true,
      isEnrolled: true,
      courseData: {},
      reportsData: {},
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    } else if (localStorage.getItem('nonBlockchain')) {
      // Router.push('/mylabs')
    } else {
    }

    callAPI(ENDPOINTS.ME, null, null)
      .then(this.checkResponse.bind(this))
      .then(() => {})

    this.setState({ token: localStorage.getItem('tkz') })
    let labId = localStorage.getItem('selectedLab')
    this.fetchCourse(labId)
  }

  fetchCourse = labId => {
    let email = localStorage.getItem('userName')
    fetch(`https://accounts.traklabs.io/course/bycourse-id/${email}/${labId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        let courseData = data

        courseData.courseId = labId

        //NOT YET FINISHED
        // courseData.lastModuleVisited = this.getLastModuleVisited(
        //   courseData.resumeModule
        // )

        this.setState({
          courseData: courseData,
        })
        let courseId = localStorage.getItem('courseId')
        this.fetchCourseProgress(courseId)
        // console.log(data)
      })
  }

  checkResponse = response => {
    let res = checkInitialResponse(response)

    if (res.error) {
      this.setState({
        isLoading: false,
        isError: !!res.error,
        showError: !!res.error,
        errorMsg: res.status,
      })
    }

    return (res.error && res.error) || res
  }

  // fetchUserPackInfo = () => {
  //   callAPI(ENDPOINTS.APP_PACKS)
  //     .then(this.checkResponse.bind(this))
  //     .then(r => {
  //       return r.json()
  //     })
  //     .then(data => {
  //       if (!!data.data.find(item => item.packId === 'pack::8')) {
  //         this.fetchCourseInfo(4)
  //       } else {
  //         this.setState({ isEnrolled: false, isLoading: false })
  //       }
  //     })
  // }

  // fetchCourseInfo = courseId => {
  //   callAPI(ENDPOINTS.APP_COURSES(courseId))
  //     .then(this.checkResponse.bind(this))
  //     .then(r => {
  //       return r.json()
  //     })
  //     .then(res => {
  //       let courseData = res.data

  //       courseData.courseId = courseId

  //       this.setState({ courseData: courseData })
  //       this.fetchCourseProgress(4)
  //     })
  // }

  // /{email}/{courseId}/progress

  fetchCourseProgress = courseId => {
    let email = localStorage.getItem('userName')
    fetch(`https://accounts.traklabs.io/course/${email}/${courseId}/progress`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
    })
      .then(res => res.json())
      .then(data => {
        let reportsData = data

        // reportsData.courseId = courseId
        reportsData.finalScore = 0
        reportsData.moduleAssessmentsAverage =
          Object.keys(reportsData.scores).length &&
          (
            sumObject(reportsData.scores) /
            Object.keys(reportsData.scores).length
          ).toFixed(2)

        if (reportsData.assessment) {
          reportsData.finalScore = (
            reportsData.moduleAssessmentsAverage * 0.2 +
            reportsData.comprehensive_exam_percentage * 0.8
          ).toFixed(2)
          reportsData.comprehensiveScore = reportsData.comprehensive_exam_percentage.toFixed(
            2
          )
        }

        this.setState({ reportsData: reportsData, isLoading: false })
      })
  }

  render() {
    let { isLoading, isEnrolled, token, courseData, reportsData } = this.state

    return (
      <Layout title={'Curriculum'}>
        <MenuStructure>
          <div className={'content-page-layout'}>
            <div className={'page-header'} />
            {((!token || isLoading) && <Loader />) || null}
            {(!isLoading && !isEnrolled && (
              <ResponseError
                backFn={() => this.props.url.back()}
                titleMsg={ERROR_MSGS.USER_NOT_ENROLLED.title}
                bodyMsg={ERROR_MSGS.USER_NOT_ENROLLED.body}
              />
            )) ||
              null}
            <div
              className={`page-content ${
                isLoading ? 'content-hide' : 'content-show'
              }`}
            >
              {!isLoading && (
                <ReportsLayout
                  {...this.props}
                  reports={reportsData}
                  course={courseData}
                />
              )}
            </div>
          </div>
        </MenuStructure>
      </Layout>
    )
  }
}

export default ReportsComponent
