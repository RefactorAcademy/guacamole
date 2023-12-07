import styled, { css } from 'styled-components'
import { Box, Button, Grid } from 'grommet'
import Scroll from 'react-scroll'

const AnchorLink = Scroll.Link

interface CustomLink {
  isActive: boolean
}

export const Anchor = styled(AnchorLink)`
  cursor: pointer;
  padding: 5px 20px;
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  border-top: 1px solid ${({ theme }) => theme.palette.gray00};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray00};
  background: ${({ theme }) => theme.colors.lightColor};
  transition: 0.4s;
  &:hover {
    background: ${({ theme }) => theme.palette.gray10};
  }
`

export const SidebarChapter = styled(Box)``

export const StyledLink = styled.a`
  width: 100%;
  padding: 7px 20px;
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

export const Sidebar = styled(Box)`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: calc(100vh - 56px);
    max-width: 250px;
    position: relative;
    flex: 0 1 30%;
    display: block;
    vertical-align: top;
    background: none;
    padding: 10px 0 0 0;
    overflow-y: scroll;
  }
`

export const SidebarMainBox = styled(Box)`
  position: fixed;
  right: 0;
  max-width: 250px;
  background: ${({ theme }) => theme.palette.gray10};
  overflow-y: scroll;
  height: calc(100vh - 66px);
`

export const MainBody = styled(Box)`
  display: flex;
  flex: 0 1;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 0 1 80%;
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

export const StyledButton = styled(Button)`
  background-color: #35d635;
  color: white;
`
