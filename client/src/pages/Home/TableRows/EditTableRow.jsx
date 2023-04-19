import Select from "../../../components/Select";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
const EditTableRow = ({
    editFormData,
    setEditFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    return (
        <>
            <td></td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required
                    placeholder="Enter Name..."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required
                    placeholder="Enter Username..."
                    name="username"
                    value={editFormData.username}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <Select
                    options={[
                        {
                            value: "admin",
                        },
                        {
                            value: "operations",
                        },
                        {
                            value: "accounts-manager",
                        },
                        {
                            value: "accounts",
                        },
                    ]}
                    value={editFormData.position}
                    name="position"
                    editFormData={editFormData}
                    setEditFormData={setEditFormData}
                    isEditFormData={true}
                />
            </td>
            <td>
                <input
                    className="peer w-full rounded-md bg-gray-50  text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                    type="text"
                    required
                    placeholder="Enter Department..."
                    name="department"
                    value={editFormData.department}
                    onChange={handleEditFormChange}
                />
            </td>
            <td />
            <td />
            <td className="flex items-center justify-around py-2">
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
