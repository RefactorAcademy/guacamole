import * as React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import MenuStructure from '../layouts/MenuStructure/index'
import Layout from '../components/Layout'

import Loader from '../components/Loader'

import Snackbar from '@material-ui/core/Snackbar'
import { ENDPOINTS } from '../constants'
// import '../static/css/style.css'

import { callAPI, checkInitialResponse } from '../utilities'

class TraklabsCourses1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plansinfo: [],
      coursesInfo: [],
      isLoading: true,
      buyflag: false,
      selectedPlan: {},
      couponApplied: '',
      appliedCoupon: '',
      discountPercentage: '',
      planInfo: {},
      actualPrice: '',
      priceAfterCoupon: '',
      razorPaymentId: '',
      isCouponNotApplied: '',
      open: true,
      coupon: '',
    }
  }

  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    callAPI(ENDPOINTS.ME, null, null)
      .then(this.checkResponse.bind(this))
      .then(() => {
        localStorage.removeItem('selectedPlan')
        this.fetchAllTraklabCourses()
      })
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

  handleApplyCoupon = (course, event) => {
    this.fetchCoupon(this.state.coupon, course)
  }

  fetchCoupon = (couponCode, course) => {
    fetch(`https://accounts.traklabs.io/coupons/coupon/${couponCode}`)
      .then(res => {
        return res.text()
      })
      .then(data => {
        if (data.length > 0) {
          return JSON.parse(data)
        } else {
          return null
        }
      })
      .then(data => {
        if (data == null) {
          this.setState({
            isCouponNotApplied: true,
            open: true,
            couponApplied: false,
          })
        } else {
          if (data.validTill > Date.now()) {
            for (let i = 0; i < data.applicablePlanIds.length; i++) {
              if (data.applicablePlanIds[i] == course.courseId) {
                let price = course.cost.inr
                price = price - price * (data.discountPercentage / 100)

                this.setState({
                  actualPrice: course.cost.inr,
                  priceAfterCoupon: price,
                  couponApplied: true,
                  appliedCoupon: couponCode,
                  discountPercentage: data.discountPercentage,
                  open: true,
                })
                return
              }
            }
          }

          this.setState({
            isCouponNotApplied: true,
            open: true,
            couponApplied: false,
          })
        }
      })
  }

  fetchAllTraklabCourses = () => {
    fetch(`https://accounts.traklabs.io/guacamole/courses/purchase`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.length == 0) {
          this.setState({
            allCoursePurchased: true,
          })
        }
        this.setState({
          coursesInfo: data,
          isLoading: false,
        })
      })
  }

  handleBuy = (course, event) => {
    localStorage.setItem('selectedCourse', course.courseId)
    this.doPayment(course)
  }

  doPayment = course => {
    this.setState({
      isLoading: false,
      actualPrice: course.cost.inr,
    })

    let amount = this.state.appliedCoupon
      ? this.state.priceAfterCoupon
      : course.cost.inr

    let options = {
      key: 'rzp_test_RNTIekT3RN747H',
      // "order_id":,
      amount: amount * 100,
      name: 'TrakInvest',
      description: 'Buy plan',
      handler: this.handleTransaction,
      prefill: {
        name: 'trakuser',
        email: localStorage.getItem('userName'),
      },
      notes: {
        address: 'Hello World',
      },
      theme: {
        color: '#F37254',
      },
      modal: {
        ondismiss: function() {
          window.location.reload()
        },
      },
    }
    let rzp = window.Razorpay(options)
    let result = rzp.open()
  }

  handleTransaction = res => {
    this.setState({
      isLoading: true,
      razorPaymentId: res.razorpay_payment_id,
    })
    this.saveOrder(res.razorpay_payment_id)
  }

  saveOrder = razorPayId => {
    let email = localStorage.getItem('userName')
    let courseId = localStorage.getItem('selectedCourse')
    let paidAmount = this.state.appliedCoupon
      ? this.state.priceAfterCoupon
      : this.state.actualPrice
    let body = {
      orderedUserEmail: email,
      razorPayId: razorPayId,
      paidAmount: paidAmount,
      paidAt: Date.now(),
      courseId: courseId,
    }
    fetch(`https://accounts.traklabs.io/orders/saveOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        if (data == true) {
          this.setState({
            isLoading: false,
          })
          alert('Your pack is activated')
          Router.push('/error', '/mylabs')
        }
      })
  }

  handleCouponChange = e => {
    this.setState({
      coupon: e.target.value,
    })
  }

  prepareContent = () => {
    let data = this.state.coursesInfo
    const { classes } = this.props
    let content = data.map(course => {
      return (
        <div className="container page-wrapper">
          <Head>
            <link href="/static/css/style.css" rel="stylesheet" />
          </Head>
          <div className="page-inner">
            <div className="row">
              <div className="el-wrapper">
                <div className="box-up">
                  <div className="img-info">
                    <div className="info-inner">
                      <span className="p-name">{course.courseName}</span>
                      <span className="p-company">{course.description}</span>
                      <div className="coupon-div">
                        <input
                          type="text"
                          onChange={this.handleCouponChange}
                          value={this.state.coupon}
                        />
                        <button
                          onClick={this.handleApplyCoupon.bind(this, course)}
                        >
                          Apply coupon
                        </button>
                      </div>
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
                    <span className="price">
                      ₹
                      {this.state.appliedCoupon
                        ? this.state.priceAfterCoupon
                        : course.cost.inr}
                    </span>
                    <span className="add-to-cart">
                      <span className="txt">Checkout</span>
                    </span>
                  </div>
                </div>
                {this.state.couponApplied && (
                  <Snackbar
                    autoHideDuration={6000}
                    open={this.state.open}
                    onClose={() => {
                      this.setState({ open: false })
                    }}
                    message={
                      'Coupon Applied.Now the course price is ' +
                      this.state.priceAfterCoupon
                    }
                  />
                )}
                {this.state.isCouponNotApplied && !this.state.couponApplied && (
                  <Snackbar
                    autoHideDuration={6000}
                    open={this.state.open}
                    onClose={() => {
                      this.setState({ open: false })
                    }}
                    message={'Coupon not applied'}
                  />
                )}
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
      <Layout title={'Explore'}>
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
              {this.state.allCoursePurchased ? (
                <h1>You have purchased all the courses</h1>
              ) : (
                content
              )}
            </div>
          )}

          <div />
        </MenuStructure>
      </Layout>
    )
  }
}

export default TraklabsCourses1
