import styled from 'styled-components'

export const StyledBadge = styled.div`
  align-items: center;
  background: none;
  border: 7px solid ${({ theme }) => theme.colors.brandPrimary};
  background: ${({ theme }) => theme.colors.brandPrimary};
  display: flex;
  height: 60px;
  justify-content: center;
  position: relative;
  width: 60px;
  margin-right: 15px;
  &:before {
    color: ${({ theme }) => theme.colors.lightColor};
    content: attr(data-module-count);
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 0;
    position: absolute;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
`
