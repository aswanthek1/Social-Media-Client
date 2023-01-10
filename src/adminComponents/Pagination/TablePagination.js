import React from 'react'
import TablePagination from "@mui/material/TablePagination";


const Pagination = ({count, page, setPage, rowsPerPage, setRowsPerPage}) => {

  const handleChangePage = (event, newPage) => {
    
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  return (
    <div>
          <TablePagination
          sx={{ border: "2px solid grey" }}
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  )
}
 
export default Pagination
