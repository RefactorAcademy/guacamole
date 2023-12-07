import * as React from 'react'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import MenuStructure from '../layouts/MenuStructure'
import Router from 'next/router'
import { ENDPOINTS } from '../constants'
import { callAPI, checkInitialResponse } from '../utilities'
import ContentLayout from '../layouts/ContentLayout'

class ContentComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      blogContent: {},
      postContent: {},
    }
  }

  componentDidMount() {
    return
    let { contentId } = this.props

    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    } else if (localStorage.getItem('nonBlockchain')) {
      Router.push('/error', '/mylabs')
    }

    if (contentId) {
      this.fetchPostContent(contentId)
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

  fetchPostContent = page => {
    callAPI(ENDPOINTS.WP_POST_CONTENT(page), null, {
      name: 'Content-Type',
      value: 'application/json',
    })
      .then(this.checkResponse.bind(this))
      .then(r => {
        return r.json()
      })
      .then(data => {
        if (data.title) {
          this.setState({
            blogContent: data,
            postContent: data.acf,
            isLoading: false,
          })
        } else {
          this.setState({ isLoading: false })
        }
      })
  }

  render() {
    let { isLoading } = this.state

    return (
      <Layout title={'Content'}>
        <div className={'non-padded-content'}>
          <MenuStructure>
            <div className={'page-header'} />
            {(isLoading && <Loader />) || null}
            <ContentLayout
              isLoading={isLoading}
              backFn={() => this.props.url.back()}
              {...this.state.postContent}
            />
          </MenuStructure>
        </div>
      </Layout>
    )
  }
}

ContentComponent.getInitialProps = async function(context) {
  return { contentId: context.query.contentId }
}

export default ContentComponent
