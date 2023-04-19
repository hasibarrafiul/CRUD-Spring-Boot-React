import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
const EditTableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    return (
        <>
            <td></td>
            <td>
                <input
                    className="w-full rounded-md text-sm"
                    type="text"
                    required
                    placeholder="Enter a name..."
                    name="fullName"
                    value={editFormData.fullName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    className="w-full rounded-md text-sm"
                    type="text"
                    required
                    placeholder="Enter an address..."
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    className="w-full rounded-md text-sm"
                    type="text"
                    required
                    placeholder="Enter a phone number..."
                    name="phoneNumber"
                    value={editFormData.phoneNumber}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    className="w-full rounded-md text-sm"
                    type="email"
                    required
                    placeholder="Enter an email..."
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <button
                    className="mr-2 rounded-md bg-green-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-green-400"
                    type="submit"
                >
                    <FiCheck className="h-5 w-5 text-black" />
                </button>
                <button
                    className="rounded-md bg-yellow-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-yellow-400"
                    type="button"
                    onClick={handleCancelClick}
                >
                    <ImCancelCircle className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default EditTableRow;
