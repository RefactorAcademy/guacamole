import * as React from 'react'
import { Wrapper, Cover } from './style'

export default ({ children }: { children: React.ReactNode }) => (
  <Wrapper>
    <Cover>{children}</Cover>
  </Wrapper>
)
