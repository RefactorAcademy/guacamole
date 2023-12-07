import * as React from 'react'
import Layout from '../components/Layout'
import FullBodyWelcome from '../components/FullBodyWelcome'
import SpinningLogo from '../components/SpinningLogo'

export default () => (
  <Layout>
    <FullBodyWelcome>
      <SpinningLogo />
      <code>React + TypeScript + StyledComponents + Grommet Starter Kit</code>
    </FullBodyWelcome>
  </Layout>
)
