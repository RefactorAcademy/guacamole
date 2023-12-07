import * as React from 'react'
import Layout from '../components/Layout'
import MenuStructure from '../layouts/MenuStructure'
import Router from 'next/router'
import { ENDPOINTS } from '../constants'
import { callAPI, checkInitialResponse } from '../utilities'
import ContentListLayout from '../layouts/ContentListLayout'

class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      currentPage: 0,
      totalItems: 0,
      totalPages: 0,
      blogContent: [],
      blogCategories: [],
      selectedCategory: {},
      anchorEl: null,
      userInfo: {},
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleResetCategory = this.handleResetCategory.bind(this)
  }

  componentDidMount() {
    return
    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    } else if (localStorage.getItem('nonBlockchain')) {
      Router.push('/lab')
    } else {
      this.fetchCategories()
      // this.fetchMyInfo()
    }

    if (!localStorage.getItem('selectedLab')) {
      Router.push('/error', '/mylabs')
    }

    callAPI(ENDPOINTS.ME, null, null)
      .then(this.checkResponse.bind(this))
      .then(() => {})
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.page !== this.props.page ||
      prevProps.category !== this.props.category
    ) {
      this.fetchCategories()
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

  fetchMyInfo = () => {
    this.setState({ isLoading: false })

    // callAPI(ENDPOINTS.APP_ME)
    //   .then(this.checkResponse.bind(this))
    //   .then(r => {
    //     return r.json()
    //   })
    //   .then(data => {
    //     this.setState({ userInfo: data.data })///flag
    //     this.fetchCategories()
    //   })
  }

  fetchCategories() {
    callAPI(ENDPOINTS.WP_CATEGORIES, null, {
      name: 'Content-Type',
      value: 'application/json',
    })
      .then(r => {
        return r.json()
      })
      .then(data => {
        let page =
          (this.props.page && parseInt(this.props.page)) ||
          this.state.currentPage + 1
        let categoryId =
          (this.props.category && parseInt(this.props.category)) || ''
        let selectedCategory = data.find(cat => cat.id === categoryId) || {}

        this.setState({
          blogCategories: data,
          currentPage: page - 1,
          selectedCategory: {
            id: selectedCategory.id,
            label: selectedCategory.name,
          },
        })
        this.fetchItems(page, categoryId)
      })
  }

  fetchItems(page, categoryId) {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true })
    }

    callAPI(ENDPOINTS.WP_POSTS(page, categoryId), null, {
      name: 'Content-Type',
      value: 'application/json',
    })
      .then(this.checkResponse.bind(this))
      .then(r => {
        this.setState({
          totalItems: r.headers.get('x-wp-total'),
          totalPages: r.headers.get('x-wp-totalpages'),
        })
        return r.json()
      })
      .then(data => {
        this.setState({ blogContent: data, isLoading: false })
      })
  }

  handlePageChange(e, page) {
    let asUrl = `/home?page=${page + 1}`
    let queryParam = {
      page: page + 1,
    }

    if (this.state.selectedCategory.id) {
      asUrl = `${asUrl}&category=${this.state.selectedCategory.id}`
      queryParam.category = this.state.selectedCategory.id
    }

    Router.push(
      {
        pathname: '/home',
        query: queryParam,
      },
      asUrl
    )
  }

  handleCategoryChange(category) {
    let asUrl =
      (category.id && `/home?page=1&category=${category.id}`) || `/home`
    let queryParam = {
      page: 1,
      category: category.id,
    }

    this.setState({
      anchorEl: null,
      selectedCategory: category,
    })

    Router.push(
      {
        pathname: '/home',
        query: queryParam,
      },
      asUrl
    )
  }

  handleResetCategory() {
    this.setState({
      anchorEl: null,
      selectedCategory: {},
    })

    Router.push(
      {
        pathname: '/home',
        query: {},
      },
      '/home'
    )
  }

  render() {
    return (
      <Layout title={'Home'}>
        <MenuStructure>
          <ContentListLayout
            openMenu={e => this.setState({ anchorEl: e.currentTarget })}
            closeMenu={() => this.setState({ anchorEl: null })}
            handleCategoryChange={categoryObj =>
              this.handleCategoryChange(categoryObj)
            }
            handlePageChange={this.handlePageChange.bind(this)}
            handleResetCategory={this.handleResetCategory}
            {...this.state}
          />
        </MenuStructure>
      </Layout>
    )
  }
}

HomeComponent.getInitialProps = async function(context) {
  let { page, category } = context.query

  return { page: page, category: category }
}

export default HomeComponent
