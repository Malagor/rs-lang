import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { LEVEL_COLORS } from 'appConstants/colors';
import { useTheme } from '@material-ui/core/styles';
import { setPage } from 'modules/TextBookPage/actions';
import { StyledPaginationContainer } from './styled';

type PaginationProps = {
  pageCount: number;
  initialPage: number;
  group: number;
};

export const Pagination: FC<PaginationProps> = ({
  pageCount,
  initialPage,
  group,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handlePageClick = (data: { selected: number }) => {
    const { selected } = data;
    dispatch(setPage(selected));
  };

  return (
    <StyledPaginationContainer
      highlightColor={LEVEL_COLORS[group]}
      theme={theme}
    >
      <ReactPaginate
        previousLabel={<ArrowLeftIcon fontSize="large" />}
        nextLabel={<ArrowRightIcon fontSize="large" />}
        breakLabel="..."
        pageCount={pageCount}
        initialPage={initialPage}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        containerClassName="root"
        pageClassName="page-item"
        previousClassName="previous-page-item"
        nextClassName="next-page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="previous-page-link"
        nextLinkClassName="next-page-link"
        activeClassName="page-item-active"
        disabledClassName="page-item-disabled"
        breakClassName="break-item"
        breakLinkClassName="break-link"
      />
    </StyledPaginationContainer>
  );
};
