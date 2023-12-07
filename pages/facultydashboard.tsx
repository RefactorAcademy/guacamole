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

export default class FacultyDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdmin: false,
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    }
    callAPI(ENDPOINTS.ME, null, null)
      .then(this.checkResponse.bind(this))
      .then(() => {})
    this.getUserInfo()
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

  getUserInfo = () => {
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
        // console.log(data)
        if (!data.admin) {
          Router.push('/error', '/mylabs')
        } else {
          this.setState({
            isAdmin: data.admin,
            userInfo: data,
          })
        }
      })
  }

  render() {
    return this.state.isAdmin ? (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          padding: 0,
          margin: 0,
        }}
      >
        <iframe
          src="https://cloudlabs.nuvepro.com/sso/saml/TrakInvest/login/request"
          style={{
            width: '99vw',
            height: '100vh',
            overflow: 'hidden',
            padding: 0,
            margin: 0,
          }}
          scrolling="no"
        />
      </div>
    ) : (
      <div />
    )
  }
}
