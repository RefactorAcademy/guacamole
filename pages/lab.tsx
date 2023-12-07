import * as React from 'react'
import Layout from '../components/Layout'
import MenuStructure from '../layouts/MenuStructure'
import Router from 'next/router'
import { ENDPOINTS } from '../constants'
import { callAPI, checkInitialResponse } from '../utilities'
import LabLayout from '../layouts/LabLayout'
import Loader from '../components/Loader'

class LabComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isPerforming: false,
      isError: false,
      isLabCreated: false,
      isLabInProgress: false,
      isLabStarted: false,
      isPending: false,
      isDeleted: false,
      isEnrolled: true,
      showError: false,
      errorMsg: '',
      labInfo: {},
      courseInfo: {},
      blogContent: [],
      userInfo: {},
      isAITool: false,
      isIOT: false,
      isNonBlockchain: false,
      passwordShown: false,
    }
  }
  componentDidMount() {
    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    } else {
      // fetch(`http://http://52.252.106.68/10000/getSubscription/122738`,{
      //   method: 'GET',
      //   headers: {
      //     'Authorization': 'Bearer ' + localStorage.getItem('tkz'),
      //   }})
      // .then(res => {
      //   return res.json();
      // }).then((data) => {
      //   this.setState({
      //     labInfo: data,
      //     isLoading: false
      //   })

      // })

      if (!localStorage.getItem('selectedLab')) {
        Router.push('/error', '/mylabs')
      }

      this.labFetchInfo()
      callAPI(ENDPOINTS.ME, null, null)
        .then(this.checkResponse.bind(this))
        .then(() => {})
    }

    this.setState({
      isNonBlockchain: localStorage.getItem('nonBlockchain') || false,
      isAITool: localStorage.getItem('hasAITool') || false,
      isIOT: localStorage.getItem('hasIOT') || false,
      isBigData: localStorage.getItem('hasBigData') || false,
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

  labPerform(action) {
    let body = JSON.stringify({
      action: action,
    })

    let subscriptionId = localStorage.getItem('selectedLab')

    this.setState({ isPerforming: true })
    fetch(
      `https://accounts.traklabs.io/performAction/${subscriptionId}/${action}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tkz'),
        },
      }
    ).then(data => {
      // console.log(data)
      if (data.status && data.status === 200) {
        this.labFetchInfo()
      } else {
        this.setState({ showError: true, isPerforming: false })
      }
    })
  }

  handleFetchInfoResponse = res => {
    // console.log('this========================', res)

    let data = res

    if (!data || !data.subscriptionId) {
      // If user is not registered
      //YET TO DEVELOP ========================
      //this.labCreate()
      return
    } else if (data.action && data.action === 'Delete') {
      // If user's subscription has been deleted
      this.setState({
        isLoading: false,
        isLabCreated: false,
        isPending: false,
        isDeleted: true,
      })
    } else if (
      data.subscriptionId &&
      (!data.access || !data.access.length > 0)
    ) {
      // If the user's subscription is pending
      this.setState({
        isLoading: false,
        isLabCreated: false,
        isPending: true,
        isDeleted: false,
      })
    } else if (
      data.access.length > 0 &&
      data.status &&
      data.status === 'InProgress'
    ) {
      // If the user's subscription is created, but the lab is still in the process of being created
      if (data.action == 'Create') {
        this.setState({
          isLoading: false,
          isLabCreated: true,
          isLabInProgress: true,
          isPerforming: false,
          isPending: true,
          isDeleted: false,
        })
      } else {
        this.setState({
          isLoading: false,
          isLabCreated: true,
          isLabInProgress: true,
          isPerforming: false,
          isPending: false,
          isDeleted: false,
        })
      }

      this.checkIfLabIsCompleted()
    } else if (data.access.length > 0 && data.action === 'Stop') {
      this.setState({
        isLoading: false,
        isPerforming: false,
        isLabCreated: true,
        isLabInProgress: false,
        isLabStarted: false,
        labInfo: data,
      })
    } else if (
      data.access.length > 0 &&
      (data.action === 'Create' || data.action === 'Start')
    ) {
      this.setState({
        isLoading: false,
        isPerforming: false,
        isLabCreated: true,
        isLabInProgress: false,
        isLabStarted: true,
        labInfo: data,
      })
    }

    this.checkIfLabIsCompleted()
  }

  labFetchInfo() {
    let courseId = localStorage.getItem('selectedLab')

    fetch(
      `https://accounts.traklabs.io/guacamole/connections?courseId=${courseId}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tkz'),
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        fetch(`https://accounts.traklabs.io/guacamole/courses/${courseId}`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('tkz'),
          },
        })
          .then(res => res.json())
          .then(courseData => {
            this.setState({
              courseInfo: courseData,
              isLoading: false,
              labInfo: data,
            })
          })
      })

    // fetch(`https://accounts.traklabs.io/getSubscription/${subscriptionId}`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('tkz'),
    //   },
    // })
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(data => {
    //     this.handleFetchInfoResponse(data)

    //   })
  }

  checkIfLabIsCompleted = () => {
    setTimeout(() => {
      if (this.state.isLabInProgress === true) {
        this.labFetchInfo()
      }
    }, 30000)
  }

  showPassword() {
    this.setState({ passwordShown: true })
  }

  render() {
    let { isLoading } = this.state
    return (
      <Layout title={'Lab'}>
        <MenuStructure>
          {isLoading ? (
            <Loader />
          ) : (
            <LabLayout
              toggleErrorDisplay={() =>
                this.setState({ showError: !this.state.showError })
              }
              backFn={() => this.props.url.back()}
              labPerform={action => this.labPerform(action)}
              showPassword={() => this.showPassword()}
              {...this.state}
            />
          )}
        </MenuStructure>
      </Layout>
    )
  }
}

export default LabComponent
