import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {
  COLOR_LEVEL_1,
  COLOR_LEVEL_2,
  COLOR_LEVEL_3,
  COLOR_LEVEL_4,
  COLOR_LEVEL_5,
  COLOR_LEVEL_6,
} from 'appConstants/colors';
import { StyledPaginationContainer } from './styled';
import { setPage } from '../../actions';

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

  const handlePageClick = (data: { selected: number }) => {
    const { selected } = data;
    dispatch(setPage(selected));
  };

  const LEVEL_COLORS = [
    COLOR_LEVEL_1,
    COLOR_LEVEL_2,
    COLOR_LEVEL_3,
    COLOR_LEVEL_4,
    COLOR_LEVEL_5,
    COLOR_LEVEL_6,
  ];

  return (
    <StyledPaginationContainer highlightColor={LEVEL_COLORS[group]}>
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
