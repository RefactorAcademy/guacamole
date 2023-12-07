import * as React from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
class Loading extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('tkz')) {
      Router.push('/error', '/signin')
    } else if (localStorage.getItem('nonBlockchain')) {
      Router.push('/error', '/mylabs')
    } else {
      // window.location = "http://app1.traklabs.io/mylabs"
      Router.push('/error', '/mylabs')
    }
  }
  render() {
    return (
      <Layout title={'welcome to traklabs'}>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            width="200px"
            height="100px"
            src={'../static/images/ti-labs.png'}
          />
        </div>
      </Layout>
    )
  }
}

export default Loading
