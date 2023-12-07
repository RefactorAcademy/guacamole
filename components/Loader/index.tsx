import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loader: React.FunctionComponent = props => (
  <div className={'loader-container'}>
    <CircularProgress size={props.size || 100} />
  </div>
)

export default Loader
