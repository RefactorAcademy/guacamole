import styled from 'styled-components'

export const CategoryFilter = styled.div`
  padding-left: 5px;
  margin-bottom: 15px;
  color: black;
`

export const CategoryFilterButton = styled.div`
  display: flex;
  align-items: center;
`

export const BlogList = styled.div`
  display: flex;
  flex-flow: row wrap;
  transition: 1s ease;
`

export const BlogListItem = styled.div`
  margin-bottom: 10px;

  &:hover {
    .content-hover-overlay {
      opacity: 0.8;
    }

    .content-hover-text {
      opacity: 1;
    }
  }

  &.content-main {
    height: 350px;
    flex: 1 100%;
    padding-left: 5px;
    padding-right: 5px;

    .content-item-title {
      padding: 0 15px 15px 15px;

      span {
        font-weight: 700;
        font-size: 3rem;
        line-height: 3rem;
      }

      p {
        margin-top: 10px !important;
      }
    }
  }

  &.content-sub {
    height: 250px;
    flex: 1 50%;

    padding-left: 5px;
    padding-right: 5px;

    .content-item-title {
      padding: 0 15px 15px 15px;

      span {
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 1.5rem;
      }

      p {
        margin-top: 5px !important;
      }
    }
  }

  .content-hover-overlay,
  .content-hover-text {
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0;
    transition: 0.5s ease;
    z-index: 1;
    opacity: 0;
  }

  .content-hover-overlay {
    background-color: black;
  }

  .content-hover-text {
    display: flex;

    span {
      margin: 0 auto;
      color: white;
      align-self: center;
      font-size: 2rem;
      font-weight: 700;
    }
  }
`

export const BlogListItemContent = styled.div`
  height: 100%;
  position: relative;
  cursor: pointer;

  .content-item,
  .content-item-img,
  .content-item-img img {
    height: 100%;
  }

  .content-item-img {
    background-color: #2d3b42;
  }

  .content-item-img img {
    width: 100%;
    overflow: hidden;
    object-fit: cover;
  }

  .content-item-title {
    position: absolute;
    bottom: 0;
    color: white;
    width: 100%;

    p {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .img-fade {
    background-image: url('../../static/images/fadebg.png');
    position: absolute;
    height: 230px;
    width: 100%;
    bottom: 0;
  }
`

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
`

export const ResetFilterButton = styled.div`
  display: inline-block;
  padding-left: 20px;

  span {
    color: #1186a5;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`
