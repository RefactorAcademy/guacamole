import * as React from 'react'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import ResponseError from '../components/ResponseError'
import MenuStructure from '../layouts/MenuStructure'
import ComingSoon from '../components/ComingSoon'
import Router from 'next/router'
import { ENDPOINTS, ERROR_MSGS } from '../constants'
import { callAPI, checkInitialResponse } from '../utilities'

class JobsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      isLoading: true,
      isEnrolled: true,
      blogContent: [],
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    } else if (localStorage.getItem('nonBlockchain')) {
      Router.push('/mylabs')
    } else {
      this.setState({ token: localStorage.getItem('tkz') })
      callAPI(ENDPOINTS.ME, null, null)
        .then(this.checkResponse.bind(this))
        .then(() => {})
    }
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
  //         this.setState({ isLoading: false })
  //       } else {
  //         this.setState({ isEnrolled: false, isLoading: false })
  //       }
  //     })
  // }

  render() {
    return (
      <Layout title={'Curriculum'}>
        <MenuStructure>
          <div className={'content-page-layout'}>
            <div className={'page-header'} />
            <ComingSoon />
          </div>
        </MenuStructure>
      </Layout>
    )
  }
}

export default JobsComponent
