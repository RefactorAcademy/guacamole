import * as React from 'react'
import { ArrowBack } from '@material-ui/icons'

const NotFound: React.FunctionComponent = props => (
  <div className={'page-not-found'} style={{ padding: 30 }}>
    <div style={{ fontSize: '3rem', lineHeight: '3rem', marginBottom: 10 }}>
      <span>Page not found</span>
    </div>
    <div style={{ marginBottom: 10 }}>
      <span>
        Unfortunately, the page you are trying to access is not available.
      </span>
    </div>
    <div
      className={'page-back-btn clickable-link'}
      onClick={() => props.backFn()}
    >
      <ArrowBack />
      <span>Back</span>
    </div>
  </div>
)

export default NotFound
