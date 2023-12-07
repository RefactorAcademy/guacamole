import * as React from 'react'
import Layout from '../components/Layout'
import ResponseError from '../components/ResponseError'
import MenuStructure from '../layouts/MenuStructure/MyLabMenuStructure'
import Router from 'next/router'
import { ENDPOINTS, ERROR_MSGS } from '../constants'
import { callAPI, checkInitialResponse, checkUserPacks } from '../utilities'
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Loader from '../components/Loader'
import '../utilities/css/mylabs/styles.css'

class MyLabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      isLoading: true,
      isEnrolled: true,
      courseData: {},
      labsData: [],
      isAdmin: false,
      userInfo: {},
    }
  }

  componentDidMount() {
    return
    localStorage.removeItem('nonBlockchain')
    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    } else if (localStorage.getItem('nonBlockchain')) {
      Router.push('/mylabs')
    } else {
      this.setState({ token: localStorage.getItem('tkz') })
    }

    return

    callAPI(ENDPOINTS.ME, null, null)
      .then(this.checkResponse.bind(this))
      .then(() => {})

    fetch('https://accounts.traklabs.io/guacamole/courses/user-courses', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ labsData: data, isLoading: false })
      })

    fetch('https://accounts.traklabs.io/me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          isAdmin: data.admin,
          userInfo: data,
        })
      })
  }

  handleLabs = (courseId, e) => {
    localStorage.setItem('selectedLab', courseId)
    console.log('click handleLabs', { courseId })
    checkUserPacks(courseId)
  }

  prepareContent() {
    let labsData = this.state.labsData

    return (
      <div className="mylabs-container mylabs-page-wrapper">
        <div className="mylabs-page-inner">
          <div className="row">
            <div className="mylabs-el-wrapper">
              <div className="box-up">
                <div className="img-info">
                  <div className="mylabs-info-inner">
                    <span className="mylabs-p-name">{'heading'}</span>
                    <span className="mylabs-p-company">
                      {'data.description'}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="box-down"
                // onClick={this.handleLabs.bind(this, data.courseId)}
                onClick={this.handleLabs.bind(this, 1)}
              >
                <div className="h-bg">
                  <div className="h-bg-inner" />
                </div>
                <div className="cart">
                  <span className="price">GOTO LAB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    let content = labsData.map(data => {
      let heading = '' + data.courseName
      heading = heading.toUpperCase()
      return (
        <div className="mylabs-container mylabs-page-wrapper">
          <div className="mylabs-page-inner">
            <div className="row">
              <div className="mylabs-el-wrapper">
                <div className="box-up">
                  <div className="img-info">
                    <div className="mylabs-info-inner">
                      <span className="mylabs-p-name">{'heading'}</span>
                      <span className="mylabs-p-company">
                        {'data.description'}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="box-down"
                  onClick={this.handleLabs.bind(this, data.courseId)}
                >
                  <div className="h-bg">
                    <div className="h-bg-inner" />
                  </div>
                  <div className="cart">
                    <span className="price">GOTO LAB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })

    return content
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

  render() {
    const content = this.prepareContent()
    // console.log('content', content)
    const { isLoading } = this.state

    return (
      <Layout title={'Mylabs'}>
        <MenuStructure>
          {!isLoading ? (
            <Loader />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}
            >
              <span
                style={{
                  width: '80%',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontSize: '48px',
                  marginBottom: '60px',
                  marginTop: '24px',
                }}
              >
                ACCESS YOUR LABS
              </span>
              {content}
            </div>
          )}
        </MenuStructure>
      </Layout>
    )
  }
}

export default MyLabs
