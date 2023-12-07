import * as React from 'react'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
// import '../utilities/css/mylabs/styles.css';
import Layout from '../components/Layout'
import MenuStructure from '../layouts/MenuStructure/index'
import { callAPI, checkUserPacks, checkInitialResponse } from '../utilities'
import { ENDPOINTS } from '../constants'
import Router from 'next/router'
import Head from 'next/head'

const checkResponse = response => {
  let res = checkInitialResponse(response)

  // if (res.error) {
  //   this.setState({
  //     isLoading: false,
  //     isError: !!res.error,
  //     showError: !!res.error,
  //     errorMsg: res.status,
  //   })
  // }

  return (res.error && res.error) || res
}

const AllLabs = () => {
  const [labsData, setlabsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    localStorage.removeItem('nonBlockchain')
    callAPI(ENDPOINTS.ME, null, null)
      .then(checkResponse.bind(this))
      .then(() => {
        fetchAllLabs()
      })
  }, [])

  const fetchAllLabs = () => {
    fetch('https://accounts.traklabs.io/fetchAllSubscriptions', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
    })
      .then(res => {
        if (res) return res.json()
        return res
      })
      .then(data => {
        if (data) {
          console.log(data)
          setlabsData(data)
          setIsLoading(false)
        }
      })
      .catch(() => {
        setIsLoading(false)
      })
  }
  const prepareContent = () => {
    let content = labsData.map(data => {
      let heading = '' + data.ownerGroup.name
      heading = heading.toUpperCase()
      return (
        <div className="mylabs-container mylabs-page-wrapper">
          <div className="mylabs-page-inner">
            <div className="row">
              <div className="mylabs-el-wrapper">
                <div className="box-up">
                  <div className="img-info">
                    <div className="mylabs-info-inner">
                      <span className="mylabs-p-name">{heading}</span>
                      <span className="mylabs-p-company">
                        {data.ownerGroup.description}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="box-down"
                  onClick={() => {
                    handleLabs(data.subscriptionId)
                  }}
                >
                  <div className="h-bg">
                    <div className="h-bg-inner" />
                  </div>
                  <div className="cart">
                    <span className="price">GOTO LAB</span>
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

  const handleLabs = subscriptionId => {
    localStorage.setItem('selectedLab', subscriptionId)
    checkUserPacks(subscriptionId)
  }

  let content = prepareContent()
  return (
    <Layout title={'My Labs'}>
      <MenuStructure>
        {isLoading ? (
          <Loader />
        ) : (
          <div
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            <Head>
              <link href="/static/css/mylabs/styles.css" rel="stylesheet" />
            </Head>
            {content}
          </div>
        )}
      </MenuStructure>
    </Layout>
  )
}

export default AllLabs
