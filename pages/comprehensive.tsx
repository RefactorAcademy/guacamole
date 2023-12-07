import * as React from 'react'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import ResponseError from '../components/ResponseError'
import MenuStructure from '../layouts/MenuStructure'
import Router from 'next/router'
import { ENDPOINTS, ERROR_MSGS } from '../constants'
import { callAPI, checkInitialResponse } from '../utilities'
import ComprehensiveLayout from '../layouts/ComprehensiveLayout'

class ComprehensiveComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      isLoading: true,
      isEnrolled: true,
      courseData: {},
      comprehensiveData: {},
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    } else if (localStorage.getItem('nonBlockchain')) {
      // Router.push('/mylabs')
    } else {
      this.setState({ token: localStorage.getItem('tkz') })
      // this.fetchUserPackInfo()
    }

    let labId = localStorage.getItem('selectedLab')
    this.fetchCourse(labId)
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

  fetchCourse = labId => {
    let email = localStorage.getItem('userName')
    fetch(`https://accounts.traklabs.io/course/${email}/${labId}`, {
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

        courseData.courseId = data.docId
        this.setState({
          courseData: courseData,
        })
        let courseId = localStorage.getItem('courseId')
        this.fetchCourseProgress(courseId)
        // console.log(data)
      })
  }

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

        reportsData.courseId = courseId

        this.setState({ comprehensiveData: reportsData, isLoading: false })
      })
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

  // fetchCourseProgress = courseId => {
  //   callAPI(ENDPOINTS.APP_COURSES_V1(courseId))
  //     .then(this.checkResponse.bind(this))
  //     .then(r => {
  //       return r.json()
  //     })
  //     .then(data => {
  // let reportsData = data.data

  // reportsData.courseId = courseId

  // this.setState({ comprehensiveData: reportsData, isLoading: false })
  //     })
  // }

  render() {
    let {
      isLoading,
      isEnrolled,
      token,
      courseData,
      comprehensiveData,
    } = this.state

    return (
      <Layout title={'Curriculum'}>
        <MenuStructure>
          {(isLoading && <Loader />) || null}
          {(!isLoading && !comprehensiveData.comprehensive_QP && (
            <ResponseError
              backFn={() => this.props.url.back()}
              titleMsg={ERROR_MSGS.COURSE_COMPREHENSIVE_NOACCESS.title}
              bodyMsg={ERROR_MSGS.COURSE_COMPREHENSIVE_NOACCESS.body}
            />
          )) ||
            null}

          {/* <h1>Hi All</h1>
          {(!isLoading && comprehensiveData.comprehensive_QP && (
            <ComprehensiveLayout
              {...this.props}
              id={4}
              comprehensive={comprehensiveData}
              course={courseData}
            />
          )) ||
            null} */}
        </MenuStructure>
      </Layout>
    )
  }
}

export default ComprehensiveComponent
