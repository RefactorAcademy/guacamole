import * as React from 'react'
// tslint:disable-next-line import-name
import Head from 'next/head'
import { GlobalStyle } from './style'
import { Normalize } from 'styled-normalize'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'
import grommet from './grommet'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'TrakInvest Labs',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Muli:300,400,600,700"
        rel="stylesheet"
        type="text/css"
      />
      <link rel="shortcut icon" href="/static/images/favicon.png" />
    </Head>
    <Normalize />
    <Grommet theme={grommet}>
      <ThemeProvider theme={grommet}>
        <>
          <GlobalStyle />
          {children}
        </>
      </ThemeProvider>
    </Grommet>
  </div>
)

export default Layout
