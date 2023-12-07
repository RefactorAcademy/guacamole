import React from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import MenuStructure from '../layouts/MenuStructure/MyLabMenuStructure'
import { ENDPOINTS } from '../constants'
import { callAPI, checkInitialResponse } from '../utilities'
import UserDetails from '../components/UserDetails/UserDetails'

class MyProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      traklabUserInfo: {},
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    }
    callAPI(ENDPOINTS.ME, null, null)
      .then(this.checkResponse.bind(this))
      .then(data => {})

    // this.fetchMyInfo();
  }

  // fetchMyInfo = () => {
  //     fetch('https://accounts.traklabs.io/me', {
  //         method: 'GET',
  //         headers: {
  //             Authorization: 'Bearer ' + localStorage.getItem('tkz'),
  //         },
  //         })
  //         .then(res => {
  //             return res.json()
  //         })
  //         .then(data => {
  //             console.log(data)
  //             this.setState({
  //                 traklabUserInfo: data
  //             })
  //         })
  // }

  checkResponse = response => {
    let res = checkInitialResponse(response)

    // if (res.error) {
    //   this.setState({
    //     isLoading: false,
    //     isError: !!res.error,
    //     showError: !!res.error,
    //     errorMsg: res.status,
    //   })
    // }

    // return (res.error && res.error) || res
  }

  render() {
    return (
      <Layout title={'My Profile'}>
        <MenuStructure>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <UserDetails />
          </div>
        </MenuStructure>
      </Layout>
    )
  }
}
export default MyProfile
