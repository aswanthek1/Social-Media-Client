import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const TableHeader = (props) => {

  return (
    <>
      <TableHead>

            <TableRow>
            {props?.data?.map((obj) => {
          return (
              <TableCell align="center">
                <b>{obj}</b>
              </TableCell>
          );
        })}
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;
