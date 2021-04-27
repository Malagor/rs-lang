import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { LEVEL_COLORS } from 'appConstants/colors';
import { useTheme } from '@material-ui/core/styles';
import { StyledPaginationContainer } from './styled';

type PaginationProps = {
  pageCount: number;
  initialPage: number;
  forcePage: number;
  group: number;
  onPageClick: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  pageCount,
  initialPage,
  group,
  forcePage,
  onPageClick,
}) => {
  const theme = useTheme();

  const handlePageClick = (data: { selected: number }) => {
    const { selected } = data;
    onPageClick(selected);
  };

  return (
    <StyledPaginationContainer
      highlightColor={LEVEL_COLORS[group]}
      breakpoints={theme.breakpoints}
    >
      <ReactPaginate
        previousLabel={<ArrowLeftIcon fontSize="large" />}
        nextLabel={<ArrowRightIcon fontSize="large" />}
        breakLabel="..."
        pageCount={pageCount}
        initialPage={initialPage}
        forcePage={forcePage}
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
