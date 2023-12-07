import styled, { css } from 'styled-components'
import { Box, Grid, Table } from 'grommet'

interface CustomLink {
  isActive: boolean
}

export const StyledHeading = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.blueGray80};
  h3 {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primaryColor};
    margin-bottom: -1px;
    margin-top: 0;
    padding-bottom: 5px;
  }
`

export const ProgressHolder = styled.div`
  min-width: 75px;
  max-width: 75px;
  padding-right: 20px;
`

export const StyledA = styled.a`
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.brandPrimary};
  font-weight: bold;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`

export const StyledTable = styled(Table)`
  th:first-child > div {
    width: 100%;
    display: block;
    text-align: right;
  }
  td:first-child > div {
    float: right;
    span {
      font-weight: bold;
    }
  }
  th:first-child,
  td:first-child {
    max-width: 70px;
    width: 70px;
  }
  th:last-child,
  td:last-child {
    max-width: 100px;
    width: 100px;
    svg {
      fill: ${({ theme }) => theme.colors.brandSecondary};
      stroke: ${({ theme }) => theme.colors.brandSecondary};
    }
  }
  th:nth-child(3),
  td:nth-child(3) {
    max-width: 100px;
    width: 100px;
  }
  th:nth-child(2),
  td:nth-child(2) {
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }
  th {
    padding-bottom: 20px;
    div {
      font-weight: bold;
      align-items: center;
    }
  }
`

export const Sidebar = styled(Box)`
  display: none;
  background: whitesmoke;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: calc(100vh - 56px);
    position: relative;
    flex: 0 1 20%;
    display: block;
    vertical-align: top;
    width: 250px;
    position: fixed;
    top: 56px;
    right: 0;
    background: ${({ theme }) => theme.palette.gray10};
    padding: 10px 0;
    overflow-y: scroll;
  }
`

export const MainBody = styled(Box)`
  display: flex;
  flex: 0 1;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 0 1 75%;
    //padding-right: 265px;
    vertical-align: top;
  }
`

export const MainGrid = styled(Grid)`
  display: grid;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    width: 100%;
  }
`

export const SidebarChapter = styled(Box)``

export const StyledLink = styled.a`
  width: 100%;
  padding: 10px 20px;
  text-decoration: none;
  cursor: pointer;
  display: block;
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.brandPrimary};
  transition: 0.4s;
  span {
    text-transform: uppercase;
    display: block;
    font-size: 10px;
    line-height: 12px;
    //margin-bottom: 3px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.brandSecondary};
  }
  &:hover {
    background: ${({ theme }) => theme.palette.gray20};
  }

  ${(props: CustomLink) =>
    props.isActive &&
    css`
      background-color: #cbf4ff;
    `}
`
