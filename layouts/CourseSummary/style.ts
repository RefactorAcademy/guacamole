import styled from 'styled-components'
import { Box, Button } from 'grommet'

export const StyledBox = styled(Box)`
  .row {
    display: none;
  }
  p {
    margin-bottom: 0 !important;
  }
`

export const StyledHeading = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.blueGray80};
  h3 {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primaryColor};
    margin-bottom: -1px;
    margin-top: 0;
    padding-bottom: 5px;
  }
`

export const FixedBox = styled(Box)`
  position: fixed;
  right: 0;
  margin-left: auto;
  padding-right: 40px;
  padding-bottom: 30px;
`

export const StyledButton = styled(Button)`
  background-color: #35d635;
  color: white;
`
