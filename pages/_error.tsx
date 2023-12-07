import React from 'react'
import Layout from '../components/Layout'
import MenuStructure from '../layouts/MenuStructure'
import NotFound from '../components/NotFound'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <Layout title={'Content'}>
        <div className={'non-padded-content'}>
          <MenuStructure>
            <div className={`post-content content-show`}>
              <NotFound backFn={() => this.props.url.back()} />
            </div>
          </MenuStructure>
        </div>
      </Layout>
    )
  }
}

export default Error
