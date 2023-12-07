import * as React from 'react'
import { Content } from '../../interfaces'
import {
  PostContent,
  PostHeader,
  PostHeaderImg,
  PostHeaderText,
  PostContentBody,
  PostBackBtn,
  PostVideoList,
  PostVideoItem,
} from './style'
import NotFound from '../../components/NotFound'
import { ArrowBack } from '@material-ui/icons'

const ContentLayout: React.FunctionComponent<Content> = ({
  isLoading,
  title,
  caption,
  content,
  coverImage,
  videoUrl,
  videoUrl2,
  videoUrl3,
  backFn,
}) => {
  let emptyContent = <NotFound backFn={backFn} />

  return (
    <>
      <PostContent
        className={`post-content ${
          !isLoading ? 'content-show' : 'content-hide'
        }`}
      >
        {(!isLoading && title && (
          <>
            <PostHeader>
              <PostHeaderImg>
                <img src={coverImage.sizes && coverImage.sizes.medium_large} />
              </PostHeaderImg>
              <div onClick={backFn}>
                <PostBackBtn className={'clickable-link page-back-btn'}>
                  <ArrowBack />
                  <span>Back</span>
                </PostBackBtn>
              </div>
              <PostHeaderText className={'post-header-text'}>
                <div className={'post-mini-border'} />
                <div className={'post-title'}>
                  <span>{title}</span>
                </div>
                <div className={'post-caption'}>
                  <span>{caption}</span>
                </div>
              </PostHeaderText>
            </PostHeader>
            <PostContentBody className={'post-content-inner'}>
              <div className={'post-body'}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
                <PostVideoList>
                  {(videoUrl && (
                    <PostVideoItem>
                      <iframe src={videoUrl} frameBorder="0" />
                    </PostVideoItem>
                  )) ||
                    null}
                  {(videoUrl2 && (
                    <PostVideoItem>
                      <iframe src={videoUrl2} frameBorder="0" />
                    </PostVideoItem>
                  )) ||
                    null}
                  {(videoUrl3 && (
                    <PostVideoItem>
                      <iframe src={videoUrl3} frameBorder="0" />
                    </PostVideoItem>
                  )) ||
                    null}
                </PostVideoList>
              </div>
            </PostContentBody>
          </>
        )) ||
          emptyContent}
      </PostContent>
    </>
  )
}

export default ContentLayout
