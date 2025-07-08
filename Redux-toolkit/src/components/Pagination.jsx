import { useState } from "react"
import ReactPaginate from "react-paginate"
import { useDispatch, useSelector } from "react-redux"
import { setPage } from "../features/user/UserSlice"

const Pagination = () => {
      const dispatch = useDispatch()
        const { totalPages } = useSelector((state) => state.users)
    

    return (
        <div>
            <ReactPaginate
                onPageChange={(e) => dispatch(setPage(e.selected + 1))}
                breakLabel="..."
                nextLabel=">"
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="<"
                containerClassName="awesome-pagination"
                pageClassName="page-item"
                activeClassName="active"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Pagination
