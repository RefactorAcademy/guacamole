import React from 'react'
import Router from 'next/router'
import MenuStructure from '../layouts/MenuStructure/MenuStructureWitoutLogout'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import Head from 'next/head'

class TraklabsCourses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plansinfo: [],
      isLoading: true,
      buyflag: false,
      selectedPlan: {},
      coursesData: [],
    }
  }

  componentDidMount() {
    localStorage.removeItem('selectedPlan')
    this.fetchAllTraklabCourses()
  }

  fetchAllTraklabCourses = () => {
    fetch(`https://accounts.traklabs.io/guacamole/courses`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          coursesData: data,
          isLoading: false,
        })
      })
  }

  handleBuy = (course, event) => {
    localStorage.setItem('selectedCourse', course.courseId)
    Router.push('/error', '/purchase')
  }

  prepareContent = () => {
    let data = this.state.coursesData
    const { classes } = this.props
    let content = data.map(course => {
      return (
        <div className="container page-wrapper">
          <Head>
            <link
              href="/static/css/traklabcourses/style2.css"
              rel="stylesheet"
            />
          </Head>
          <div className="page-inner">
            <div className="row">
              <div className="el-wrapper">
                <div className="box-up">
                  {/* <img class="img" src="http://code.slicecrowd.com/labs/4/images/t-shirt.png" alt="" /> */}
                  <div className="img-info">
                    <div className="info-inner">
                      <span className="p-name">{course.courseName}</span>
                      <span className="p-company">{course.description}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="box-down"
                  onClick={this.handleBuy.bind(this, course)}
                >
                  <div className="h-bg">
                    <div className="h-bg-inner" />
                  </div>
                  <div className="cart">
                    <span className="price">₹{course.cost.inr}</span>
                    <span className="add-to-cart">
                      <span className="txt">Checkout</span>
                    </span>
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

  render() {
    const content = this.prepareContent()
    const isLoading = this.state.isLoading

    return (
      <Layout title={'Courses'}>
        <MenuStructure>
          {isLoading ? (
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
              {content}
            </div>
          )}
        </MenuStructure>
      </Layout>
    )
  }
}

export default TraklabsCourses
