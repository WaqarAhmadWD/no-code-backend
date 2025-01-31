import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Pagination = forwardRef(({ fetchDataFun}, ref) => {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = parseInt(localStorage.getItem('limit')) || 10;
  const [itemOffset, setItemOffset] = useState(0);
  const [totalFields, setTotalFields] = useState(0);
  const [search,setSearch] = useState("");
  const getQuery = (limit_,itemOffset_,search_)=> {
    return `?limit=${limit_}&offset=${itemOffset_}&search=${search_}`;
  }
  const [pageCount, setPageCount] = useState(Math.ceil(totalFields / limit));
  let debounceTimeout;
  useImperativeHandle(ref, () => ({
    getData: () => ({ query:getQuery(limit,itemOffset,search) }),
    increaseField: () => setTotalFields((prev) => prev + 1),
    decreaseField: () => setTotalFields((prev) => prev - 1),
    searchFun: async (value) => {
      clearTimeout(debounceTimeout);
  
      debounceTimeout = setTimeout(async () => {
        setSearch(value);
        const total_fields = await fetchDataFun(false, getQuery(limit, 0, value));
        setTotalFields(total_fields);
        setPageCount(Math.ceil(total_fields / limit));
        setCurrentPage(0);
      }, 300);
    },
  }));
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); 
    const newOffset = (event.selected * limit) % totalFields;

    fetchDataFun(false, getQuery(limit,newOffset,search));
    setItemOffset(newOffset);
  };

  const setTotalFieldsFun = async () => {
    const total_fields = await fetchDataFun(true, getQuery(limit,itemOffset,search));
    setTotalFields(total_fields);
    setPageCount(Math.ceil(total_fields / limit));
  };

  useEffect(() => {
    setTotalFieldsFun();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
        <div className="flex items-center justify-between mt-4">
          {(totalFields > 0 && <div className="bg-gray-200 p-4 rounded-r-[50px] text-xs md:text-md">
            Field Total: <span className="font-semibold">{totalFields}</span>
          </div>)}
      {pageCount>1 && (
          <div className="flex items-center justify-center">
            <ReactPaginate
              activeClassName={'item active '}
              breakClassName={'item break-me '}
              breakLabel={'...'}
              containerClassName={'pagination'}
              disabledClassName={'disabled-page'}
              marginPagesDisplayed={2}
              nextClassName={'item next '}
              nextLabel={<span key={0} className="fa fa-chevron-right" style={{ fontSize: 18 }} />}
              onPageChange={handlePageClick}
              pageCount={pageCount}
              pageClassName={'item pagination-page '}
              pageRangeDisplayed={5}
              renderOnZeroPageCount={null}
              previousClassName={'item previous'}
              previousLabel={<span key={0} className="fa fa-chevron-left" style={{ fontSize: 18 }} />}
              forcePage={currentPage}
            />
          </div>
      )}
        </div>
    </>
  );
});

Pagination.displayName = 'Pagination';

Pagination.propTypes = {
  fetchDataFun: PropTypes.func.isRequired, 
};

export default Pagination;
