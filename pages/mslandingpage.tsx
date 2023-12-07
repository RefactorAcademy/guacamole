import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import MenuStructure from '../layouts/MenuStructure/MenuStructureWitoutLogout'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import Head from 'next/head'
import { Button } from '@material-ui/core'

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const LandingPage = props => {
  const [resolveRes, setResolveRes] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const requestid = generateUUID()
  let correlationid = generateUUID()
  let marketPlaceToken = useRouter().query.token

  let resolveResponse = {
    id: '1234567<guid>', // purchased SaaS subscription ID
    subscriptionName: 'Contoso Cloud Solution', // SaaS subscription name
    offerId: 'offer2', // purchased offer ID
    planId: 'silver', // purchased offer's plan ID
    quantity: '20', // number of purchased seats, might be empty if the plan is not per seat
    subscription: {
      // full SaaS subscription details, see Get Subscription APIs response body for full description
      id: '<guid>',
      publisherId: 'contoso',
      offerId: 'offer1',
      name: 'Contoso Cloud Solution',
      saasSubscriptionStatus: ' PendingFulfillmentStart ',
      beneficiary: {
        emailId: 'test@test.com',
        objectId: '<guid>',
        tenantId: '<guid>',
        pid: '<ID of the user>',
      },
      purchaser: {
        emailId: 'test@test.com',
        objectId: '<guid>',
        tenantId: '<guid>',
        pid: '<ID of the user>',
      },
      planId: 'silver',
      term: {
        termUnit: 'P1M',
        startDate: '2019-05-31',
        endDate: '2019-06-29',
      },
      isTest: true,
      isFreeTrial: false,
      allowedCustomerOperations: ['Delete', 'Update', 'Read'],
      sandboxType: 'None',
      sessionMode: 'None',
    },
  }

  useEffect(() => {
    resolveApi(marketPlaceToken)
  }, [])

  const resolveApi = async marketPlaceToken => {
    let url =
      'https://marketplaceapi.microsoft.com/api/saas/subscriptions/resolve?api-version=2018-08-31'
    let accessToken = 'ms-access-token'
    let header = {
      'content-type': 'application/json',
      'x-ms-requestid': requestid,
      'x-ms-correlationid': correlationid,
      authorization: accessToken,
      'x-ms-marketplace-token': marketPlaceToken,
    }

    return await fetch(url, {
      headers: header,
      method: 'POST',
    })
      .then(res => {
        setResolveRes(resolveResponse)
        setIsLoading(false)
        return prepareContent()
      })
      .catch(() => {})
  }

  const prepareContent = () => {
    return (
      <div>
        <span>Subscription name : </span>
        <span>{resolveRes.subscriptionName}</span>
        <br />
        <span>PlanId : </span>
        <span>{resolveRes.planId}</span>
        <br />
        <span>Offer Id: </span>
        <span>{resolveRes.offerId}</span>
        <br />
        <span>Quantity : </span>
        <span>{resolveRes.quantity}</span>
      </div>
    )
  }

  const handleActivateAccount = () => {
    let url = `https://marketplaceapi.microsoft.com/api/saas/subscriptions/${
      resolveRes.id
    }/activate?api-version=2018-08-31`
    let header = {
      'content-type': 'application/json',
      'x-ms-requestid': requestid,
      'x-ms-correlationid': correlationid,
      authorization: 'ms-access-token',
    }
    let body = JSON.stringify({
      planId: resolveRes.planId,
      quantity: resolveRes.quantity,
    })

    fetch(url, {
      headers: header,
      body: body,
      method: 'POST',
    }).then(res => {
      console.log('hello')
      console.log(res)
      // if(res.status == 200) {
      activateAccountAtTraklabs()
      // }
      //backend calls
    })
  }

  const activateAccountAtTraklabs = () => {
    const url = 'https://accounts.traklabs.io/microsoft/user/activate/'
    const body = JSON.stringify({
      firstName: 'mtesting1@gmail.com',
      lastName: 'mtesting1@gmail.com',
      email: 'mtesting1@gmail.com',
      microsoftUserFields: {
        subscriptionId: '1234',
        subscriptionName: 'testing',
        offerId: 'testing',
        planId: '1',
        quantity: '1',
      },
    })
    const head = {}
    fetch(url, {
      method: 'POST',
      body: body,
      headers: head,
    }).then(res => {
      console.log(res)
    })
  }

  let content = prepareContent()
  return (
    <Layout title={'Landing page'}>
      <MenuStructure>
        <Head>
          <link href="/static/css/mslandingpage/style.css" rel="stylesheet" />
        </Head>
        <div className="main-container">
          {!isLoading && (
            <div className="form-container">
              {content}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleActivateAccount}
                >
                  Activate
                </Button>
              </div>
            </div>
          )}
        </div>
      </MenuStructure>
    </Layout>
  )
}

export default LandingPage
