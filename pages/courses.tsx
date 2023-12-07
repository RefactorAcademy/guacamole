import * as React from 'react'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import ResponseError from '../components/ResponseError'
import MenuStructure from '../layouts/MenuStructure'
import Router from 'next/router'
import { ENDPOINTS, ERROR_MSGS } from '../constants'
import { callAPI, checkInitialResponse } from '../utilities'
import CourseSummary from '../layouts/CourseSummary'

class CoursesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      isLoading: true,
      isEnrolled: true,
      courseData: {},
    }
  }

  propDummy = {
    title: 'Blockchain With Traklabs',
    subtitle: 'Ethereum is great',
    summary: 'I will use Blockchain to get rich',
    modules: [],
    courseId: '1',
    lastModuleVisited: '',
    resumeModule: '1.1',
  }

  componentDidMount() {
    return
    callAPI(ENDPOINTS.ME, null, null)
      .then(this.checkResponse.bind(this))
      .then(() => {})

    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    } else if (localStorage.getItem('nonBlockchain')) {
      let selectedLab = localStorage.getItem('selectedLab')
      this.fetchCourse(selectedLab)
      // Router.push('/mylabs')
    } else {
      this.setState({ token: localStorage.getItem('tkz') })
      let selectedLab = localStorage.getItem('selectedLab')
      this.fetchCourse(selectedLab)
      // this.fetchUserPackInfo()
    }

    if (!localStorage.getItem('selectedLab')) {
      Router.push('/error', '/mylabs')
    }
  }

  fetchCourse = courseId => {
    let email = localStorage.getItem('userName')
    fetch(
      `https://accounts.traklabs.io/course/bycourse-id/${email}/${courseId}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tkz'),
        },
      }
    )
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log('course is ', data)
        let courseData = data

        courseData.courseId = courseData.courseId.substr(8)

        //NOT YET FINISHED
        courseData.lastModuleVisited = this.getLastModuleVisited(
          courseData.resumeModule
        )
        localStorage.setItem('courseId', data.courseId)

        this.setState({
          courseData: courseData,
          isLoading: false,
        })
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

  // courseData.courseId = courseId
  // courseData.lastModuleVisited = this.getLastModuleVisited(
  //   courseData.resumeModule
  // )

  //       this.setState({ courseData: courseData, isLoading: false })
  //     })
  // }

  getLastModuleVisited = currStr => {
    return currStr.split('.')[0]
  }

  render() {
    let { isLoading, isEnrolled, token, courseData } = this.state
    // https://accounts.traklabs.io/course/subhash.d@trakinvest.com/124672

    return (
      <Layout title={'Curriculum'}>
        <MenuStructure>
          <div className={'content-page-layout'}>
            <div className={'page-header'} />
            {/* {((!token || isLoading) && <Loader />) || null}
            {(!isLoading &&  (
              <ResponseError
                backFn={() => this.props.url.back()}
                titleMsg={ERROR_MSGS.USER_NOT_ENROLLED.title}
                bodyMsg={ERROR_MSGS.USER_NOT_ENROLLED.body}
              />
            )) ||
              null} */}
            <div
              className={`page-content ${
                isLoading ? 'content-hide' : 'content-show'
              }`}
            >
              <div>frfrff</div>

              {/* {/ <CourseSummary {...this.props} {...courseData} /> */}
              <CourseSummary {...this.propDummy} />
              {/* {!isLoading && <CourseSummary {...this.props} {...courseData} />} */}
            </div>
          </div>
        </MenuStructure>
      </Layout>
    )
  }
}

export default CoursesComponent
