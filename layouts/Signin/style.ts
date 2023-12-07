import styled from 'styled-components'
import { Box, Form, FormField } from 'grommet'

export const StyledBox = styled(Box)`
  width: 300px;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 500px;
  }
`

export const StyledForm = styled(Form)`
  width: 100%;
`

export const StyledFormField = styled(FormField)`
  input {
    padding-left: 0;
    padding-right: 0;
  }
  label {
    margin-right: 0;
    margin-left: 0;
  }
  > div {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 5px 10px;
  }
`

export const ErrorMsg = styled.span`
  color: ${({ theme }) => theme.palette.danger100};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
`

export const StyledLink = styled.span`
  color: black;
  cursor: pointer;
`
