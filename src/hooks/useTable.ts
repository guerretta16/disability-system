import { useState, useEffect } from "react";
import { Application, TableProps } from "../interfaces/types";

const useTable = ({data, page, rowsPerPage}: TableProps) => {
  const [tableRange, setTableRange] = useState<Array<number>>([]);
  const [slice, setSlice] = useState<Application[]>([]);

  useEffect(() => {
    const range = calculateRange({data, rowsPerPage});
    setTableRange([...range]);

    const slice = sliceData({data, page, rowsPerPage});
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  const calculateRange = ({data, rowsPerPage}:TableProps) => {
    const range = [];
    const num = Math.ceil(data!.length / rowsPerPage!);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };
  
  const sliceData = ({data, page, rowsPerPage}:TableProps) => {
    return data!.slice((page! - 1) * rowsPerPage!, page! * rowsPerPage!);
  };


  return { slice, range: tableRange };
};

export default useTable;