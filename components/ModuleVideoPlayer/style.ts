import styled from 'styled-components'

export const VideoWrapper = styled.div`
  max-width: 800px;
  width: calc(100% - 50px);
  margin: 0 auto;
`

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

export const StatusWrapper = styled.div`
  display: none;

  @media (min-width: 200px) {
    display: block;
    position: absolute;
    right: -20px;
    top: -70px;
    font-weight: bold;
    font-size: 12px;
    color: green;
  }
`
