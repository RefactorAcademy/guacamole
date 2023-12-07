import Router from 'next/router'
import isomorphicUnfetch from 'isomorphic-unfetch'
// import { ENDPOINTS } from '../constants'
// import { System } from 'grommet-icons'

export const getVimeoUrl = videoUrl => {
  let url = videoUrl
  if (videoUrl) {
    const videoId = videoUrl.includes('https://vimeo.com')
      ? videoUrl.replace('https://vimeo.com', '')
      : videoUrl
    url = `https://vimeo.com/${videoId}`
  }
  return url
}

export const logoutUser = () => {
  localStorage.removeItem('tkz')
  localStorage.removeItem('userName')
  localStorage.removeItem('hasAITool')
  localStorage.removeItem('hasBlockchain')
  localStorage.removeItem('nonBlockchain')
  localStorage.removeItem('hasIOT')
  localStorage.removeItem('hasBigData')

  Router.push('/signin')
}

export const checkInitialResponse = response => {
  if (response.ok) {
    return response
  } else if (response.status === 401) {
    logoutUser()
  } else if (response.status === 500) {
    logoutUser()
  }

  return {
    status: response.statusText,
    error: Promise.reject(response.statusText),
  }
}

export const callAPI = (endpoint, reqBody = null, addtlHeaders) => {
  let body = {
    method: endpoint.type,
    headers: {
      Authorization: localStorage.getItem('tkz') || '',
    },
  }

  if (reqBody) {
    body['body'] = reqBody
  }

  if (addtlHeaders) {
    body.headers[addtlHeaders.name] = addtlHeaders.value
  }

  return isomorphicUnfetch(endpoint.url, body)
}

export const sumObject = obj => {
  return Object.keys(obj).reduce(
    (sum, key) => sum + parseFloat(obj[key] || 0),
    0
  )
}

export const checkUserPacks = courseId => {
  //HARD CODED
  // fetch(`https://accounts.traklabs.io/getTeam/${subscriptionId}`, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: 'Bearer ' + localStorage.getItem('tkz'),
  //   },
  // })
  //   .then(res => {
  //     return res.json()
  //   })
  //   .then(data => {
  //     if (data == 1) {
  //       localStorage.setItem('Blockchain', 'true')
  //       Router.push('/error', '/home')
  //     } else {
  //       localStorage.setItem('nonBlockchain', 'true')
  //       Router.push('/error', '/lab')
  //     }
  //   })

  if (courseId == 1) {
    localStorage.setItem('Blockchain', 'true')
    Router.push('/error', '/home')
  } else {
    localStorage.setItem('nonBlockchain', 'true')
    Router.push('/error', '/lab')
  }
}
