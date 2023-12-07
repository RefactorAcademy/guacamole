import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 0 auto;
`

export const Cover = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  code {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`
