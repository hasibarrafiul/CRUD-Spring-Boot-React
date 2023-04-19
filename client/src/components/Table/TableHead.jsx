import { useState } from "react";
import {
    FaArrowsAltV,
    FaLongArrowAltDown,
    FaLongArrowAltUp,
} from "react-icons/fa";
const TableHead = ({ columns, handleSorting }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    return (
        <thead className="break-words rounded-md border-b-2 border-gray-400 bg-green-200 py-6">
            <tr>
                {columns.map(({ id, name, accessor, sortable, width }) => {
                    return (
                        <th
                            key={id}
                            onClick={
                                sortable
                                    ? () => handleSortingChange(accessor)
                                    : null
                            }
                            className={`cursor-pointer select-none border-r-2 border-gray-400 px-2 py-2 text-left text-sm font-semibold tracking-wide ${width}`}
                        >
                            <span className="flex items-center justify-between space-x-2">
                                <>{name}</>
                                <>
                                    {sortable ? (
                                        sortField === accessor &&
                                        order === "asc" ? (
                                            <FaLongArrowAltUp />
                                        ) : sortField === accessor &&
                                          order === "desc" ? (
                                            <FaLongArrowAltDown />
                                        ) : (
                                            <FaArrowsAltV />
                                        )
                                    ) : null}
                                </>
                            </span>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHead;
