import * as React from 'react'
import { ContentList } from '../../interfaces'
import Link from 'next/link'
import {
  CategoryFilter,
  CategoryFilterButton,
  BlogList,
  BlogListItem,
  BlogListItemContent,
  Pagination,
  ResetFilterButton,
} from './style'
import Loader from '../../components/Loader'
import { Button, Menu, MenuItem, TablePagination } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'

const ContentListLayout: React.FunctionComponent<ContentList> = ({
  isLoading,
  anchorEl,
  totalItems,
  currentPage,
  selectedCategory,
  blogContent,
  blogCategories,
  openMenu,
  closeMenu,
  handleCategoryChange,
  handlePageChange,
  handleResetCategory,
}) => {
  return (
    <>
      <div className={'page-header'}>
        <CategoryFilter>
          <Button
            aria-haspopup="true"
            variant="outlined"
            onClick={openMenu}
            disabled={isLoading}
          >
            <CategoryFilterButton>
              {(selectedCategory.id && selectedCategory.label) ||
                'All Categories'}{' '}
              <ArrowDropDown />
            </CategoryFilterButton>
          </Button>
          {(!isLoading && selectedCategory.id && (
            <ResetFilterButton onClick={handleResetCategory}>
              <span>Reset Filter</span>
            </ResetFilterButton>
          )) ||
            null}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            keepMounted
          >
            <MenuItem onClick={handleResetCategory}>All Categories</MenuItem>
            {blogCategories.map(
              item =>
                item.id !== 1 && (
                  <MenuItem
                    key={item.id}
                    onClick={() =>
                      handleCategoryChange({
                        id: item.id,
                        label: item.name,
                      })
                    }
                  >
                    {item.name}
                  </MenuItem>
                )
            )}
          </Menu>
        </CategoryFilter>
      </div>
      {(isLoading && <Loader />) || null}
      <BlogList
        className={
          !isLoading && blogContent.length > 0 ? 'content-show' : 'content-hide'
        }
      >
        {!isLoading &&
          blogContent.length > 0 &&
          blogContent.map((item, idx) => (
            <Link
              href={{
                pathname: '/content',
                query: {
                  contentId: item.id,
                },
              }}
              as={`/content/${item.id}`}
              key={item.id}
            >
              <BlogListItem
                className={idx === 0 ? 'content-main' : 'content-sub'}
              >
                <BlogListItemContent className={'content-item'}>
                  <div className={'content-hover-overlay'} />
                  <div className={'content-hover-text'}>
                    <span>Read More</span>
                  </div>
                  <div className={'img-fade'} />
                  <div className={'content-item-img'}>
                    <img
                      src={
                        item.acf.coverImage.sizes &&
                        item.acf.coverImage.sizes.medium_large
                      }
                    />
                  </div>
                  <div className={'content-item-title'}>
                    <span>{item.acf.title}</span>
                    <p>{item.acf.caption}</p>
                  </div>
                </BlogListItemContent>
              </BlogListItem>
            </Link>
          ))}
      </BlogList>
      {(!isLoading && blogContent.length !== 0 && (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <span>No posts found.</span>
        </div>
      )) ||
        null}
      {(!isLoading && (
        <Pagination>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={parseInt(totalItems)}
            rowsPerPage={10}
            page={currentPage}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handlePageChange.bind(this)}
          />
        </Pagination>
      )) ||
        null}
    </>
  )
}

export default ContentListLayout
