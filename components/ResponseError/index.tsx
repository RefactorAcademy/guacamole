import * as React from 'react'
import { ArrowBack } from '@material-ui/icons'

const ResponseError: React.FunctionComponent = props => (
  <div className={'page-not-found'} style={{ padding: 30 }}>
    <div style={{ fontSize: '3rem', lineHeight: '3rem', marginBottom: 10 }}>
      <span>{(props.titleMsg && props.titleMsg) || 'Oh no!'}</span>
    </div>
    <div style={{ marginBottom: 10 }}>
      <span>
        {(props.bodyMsg && props.bodyMsg) ||
          'Unfortunately, something went wrong with this page. Please try again.'}
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

export default ResponseError
