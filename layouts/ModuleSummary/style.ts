import styled from 'styled-components'

export const ModuleTitle = styled.h2`
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 15px;
  margin-top: 0;
  font-weight: bold;
`

export const ModuleBox = styled.div`
  margin: 10px 0;
  padding: 20px 0;
  p {
    margin-bottom: 0 !important;
  }
  * {
    color: ${({ theme }) => theme.colors.secondaryColor} !important;
  }
`

export const ModuleBody = styled.div`
  display: table-cell;
  vertical-align: top;
  h3 {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }
`
