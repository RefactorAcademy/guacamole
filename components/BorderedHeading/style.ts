import styled from 'styled-components'

export const StyledHeading = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.brandSecondary};
  h3 {
    border: 7px solid ${({ theme }) => theme.colors.brandSecondary};
    background: ${({ theme }) => theme.colors.brandPrimaryAlt};
    margin-bottom: -1px;
    margin-top: 0;
    padding: 5px 10px;
    color: ${({ theme }) => theme.colors.lightColor};
  }
  margin-bottom: 20px;
`
