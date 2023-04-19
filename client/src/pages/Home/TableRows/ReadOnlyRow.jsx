import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const ReadOnlyRow = ({
    user,
    handleEditClick,
    handleDeleteClick,
    disable_user,
    enable_user,
    reset_pass,
}) => {
    var clsName = "whitespace-nowrap py-3 text-sm text-gray-700";
    return (
        <>
            <td className={clsName}>{user.id}</td>
            <td className={clsName}>{user.name}</td>
            <td className={clsName}>
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {user.email}
                </span>
            </td>

            <td className={clsName}>{user.dob}</td>
            <td className={clsName}>{user.age}</td>

            <td className="flex items-center justify-around py-2">
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, user)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(user.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
