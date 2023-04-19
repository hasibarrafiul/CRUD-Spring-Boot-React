import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                    {contact.id}
                </a>
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                {contact.fullName}
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {contact.address}
                </span>
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                {contact.phoneNumber}
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                {contact.email}
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, contact)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(contact.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
