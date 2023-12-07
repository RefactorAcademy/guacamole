import * as React from 'react'
import { Card, CardContent } from '@material-ui/core'
import { AccessTime } from '@material-ui/icons'

const ResponseError: React.FunctionComponent = () => (
  <Card>
    <CardContent classes={{ root: 'cust-card-content' }}>
      <div className={'coming-soon-section'}>
        <div>
          <AccessTime classes={{ root: 'coming-soon-icon' }} />
        </div>
        <div className={'coming-soon-msgs'}>
          <h1>Exciting things are coming your way.</h1>
          <p>Please come back again soon!</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default ResponseError
