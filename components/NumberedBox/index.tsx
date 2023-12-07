import * as React from 'react'
import { StyledBadge } from './style'

interface BadgeType {
  count?: string
}

const Badge: React.FunctionComponent<BadgeType> = ({ count = '' }) => (
  <StyledBadge data-module-count={count} />
)

export default Badge
