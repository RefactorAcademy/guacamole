import { Heading } from 'grommet'
import * as React from 'react'
import { StyledHeading } from './style'

interface BadgeType {
  children: React.ReactChild
  src: string
}

const BorderedHeading: React.FunctionComponent<BadgeType> = ({
  children = '',
  src,
}) => (
  <StyledHeading src={src}>
    <Heading level="3">{children}</Heading>
  </StyledHeading>
)

export default BorderedHeading
