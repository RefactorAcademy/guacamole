import * as React from 'react'
import Layout from '../../components/Layout'

class UnauthenticatedLayout extends React.Component {
  render() {
    let { children } = this.props

    return (
      <Layout>
        <div className={'login-page-container'}>
          <div className={'login-page-section form-section'}>
            <>{children}</>
          </div>
          <div className={'login-page-section info-section'}>
            <div className={'section-msg'}>
              <div className={'section-title'}>Welcome to</div>
              <div className={'section-title'}>
                <img src={'../static/images/ti-labs-light-2.png'} />
              </div>
              <div className={'section-caption'}>
                Log in now to your account.
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default UnauthenticatedLayout
