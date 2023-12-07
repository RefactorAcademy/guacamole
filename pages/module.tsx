import * as React from 'react'
import Layout from '../components/Layout'
import ModuleLayout from '../layouts/ModuleLayout'
import MenuStructure from '../layouts/MenuStructure'
import { ENDPOINTS } from '../constants'
import { callAPI, checkInitialResponse } from '../utilities'
import Loader from '../components/Loader'

class ModuleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      isLoading: true,
      isEnrolled: true,
      courseData: {},
      moduleData: {},
    }
  }

  componentDidMount() {

    return
    callAPI(ENDPOINTS.ME, null, null)
      .then(this.checkResponse.bind(this))
      .then(() => {
        let labId = localStorage.getItem('selectedLab')
        this.fetchCourse(labId)
      })
  }

  componentDidUpdate(prevProps) {

    return
    if (prevProps.moduleId !== this.props.moduleId) {
      this.setState({ isLoading: true })
      // let labId = localStorage.getItem('selectedLab')
      // this.fetchCourse(labId)
    }
  }

  fetchCourse = courseId => {
    console.log("Inside")
    let email = localStorage.getItem('userName')
    // fetch(
    //   `https://accounts.traklabs.io/course/bycourse-id/${email}/${courseId}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: 'Bearer ' + localStorage.getItem('tkz'),
    //     },
    //   }
    // )
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(data => {
    //     let courseData = data

    //     courseData.courseId = data.docId
    //     this.setState({
    //       courseData: courseData,
    //     })
    //     this.fetchModule(this.props.moduleId)
    //     // console.log(data)
    //   })
     
      let courseData = {
        title: "Blockchain With Traklabs",
        subtitle: "Ethereum is great",
        summary: "I will use Blockchain to get rich",
        modules: [
          {  
            title:"Module 1", 
            desc: "Module 1 Description",
            id: 1
            chapters: [
              {
                title: "Chapter 1"
                id: "ch::id::bl::1",
                desc: "Chapter 1 Desc",
                video_url: "https://youtube.com"
                video_progress: 0,
                chapter_completed: false
              }
            ]
           assessment: [],
           progress: {}
           
          },
          {  
            title:"Module 2", 
            desc: "Module 2 Description",
            id: 2
            chapters: [
              {
                title: "Chapter 2"
                id: "ch::id::bl::2",
                desc: "Chapter 2 Desc",
                video_url: "https://youtube.com"
                video_progress: 0,
                chapter_completed: false
              }
            ]
           assessment: [],
           progress: {}
           
          }
        ],
        courseId: "1",
        lastModuleVisited: "",
        resumeModule: "1.1"
      }

        //courseData.courseId = data.docId
        this.setState({
          courseData: courseData,
        })
        this.fetchModule(this.props.moduleId)
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

  // fetchCourseInfo = () => {
  //   callAPI(ENDPOINTS.APP_COURSES(4))
  //     .then(this.checkResponse.bind(this))
  //     .then(r => {
  //       return r.json()
  //     })
  //     .then(data => {
  //       this.setState({ courseData: data.data })
  //       this.fetchModuleInfo(4, this.props.moduleId)
  //     })
  // }

  // fetchModuleInfo = (courseId, moduleId) => {
  //   callAPI(ENDPOINTS.APP_COURSES(courseId, moduleId))
  //     .then(this.checkResponse.bind(this))
  //     .then(r => {
  //       return r.json()
  //     })
  //     .then(data => {
  //       this.setState({ moduleData: data.data, isLoading: false })
  //     })
  // }

  fetchModule(moduleId) {
    let courseId = localStorage.getItem('courseId')
    let email = localStorage.getItem('userName')
    fetch(
      `https://accounts.traklabs.io/course/module/${email}/${courseId}/${moduleId}`,
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
        // console.log(data)
        this.setState({
          moduleData: data,
          isLoading: false,
        })
        // console.log(data)
      })
  }

  render() {
    let { isLoading, courseData, moduleData } = this.state

    return (
      <Layout title={'Module'}>
        <MenuStructure isLoading={false}>
          {/* {(!isLoading && <Loader />) || ( */}
            <ModuleLayout
              {...this.props}
              course={courseData}
              module={moduleData}
              moduleId={1}
            />
          {/* )} */}
        </MenuStructure>
      </Layout>
    )
  }
}

ModuleComponent.getInitialProps = async function(context) {
  return { id: 4, moduleId: context.query.moduleId }
}

export default ModuleComponent
