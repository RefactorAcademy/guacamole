import styled from 'styled-components'

export const PostContent = styled.div`
  position: relative;
  transition: 1s ease;
`

export const PostHeader = styled.div`
  position: relative;
  height: 250px;
  width: 100%;
`

export const PostHeaderImg = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 250px;
  background-color: #2d3b42;

  img {
    opacity: 0.2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`

export const PostBackBtn = styled.div`
  padding: 15px 20px;
  color: white;

  span {
    padding-left: 5px;
  }
`

export const PostHeaderText = styled.div`
  padding: 0 20px;
  position: absolute;
  bottom: 0;

  .post-mini-border {
    height: 3px;
    width: 50px;
    margin-bottom: 15px;
    background-color: white;
  }

  .post-title {
    color: white;
    font-size: 3rem;
    line-height: 3rem;
    font-weight: 700;
  }

  .post-caption {
    color: white;
    margin-top: 10px;
    margin-bottom: 25px;
    font-style: italic;
  }
`

export const PostContentBody = styled.div`
  padding: 35px 20px 0 20px;

  .post-body {
    padding: 0 20px;

    a span {
      color: #016db9;
      font-style: italic;
    }
  }
`

export const PostVideoList = styled.div`
  display: flex;
  flex-flow: row wrap;
`

export const PostVideoItem = styled.div`
  flex: 0 50%;

  iframe {
    height: 350px;
    width: 100%;
  }
`
