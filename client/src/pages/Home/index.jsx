import React, { useState, Fragment, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReadOnlyRow from "./TableRows/ReadOnlyRow";
import EditableRow from "./TableRows/EditTableRow";
import { sha256 } from "js-sha256";
import Axios from "axios";
import Loader from "../../utils/Loader";
import TableHead from "../../components/Table/TableHead"; // new
import Pagination from "../../components/Table/Pagination"; // new
import { useSortableTable } from "../../components/Table/useSortableTable"; // new

import Select from "../../components/Select"; // new

import { IoMdPersonAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";

//toast
import { success, warning } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

const TableHeader = [
    {
        id: 1,
        name: "Id",
        accessor: "id",
        sortable: true,
        width: "w-8",
    },
    {
        id: 2,
        name: "Name",
        accessor: "name",
        sortable: true,
    },
    {
        id: 3,
        name: "Email",
        accessor: "email",
        sortable: true,
    },
    {
        id: 4,
        name: "Date of birth",
        accessor: "dob",
        sortable: true,
    },
    {
        id: 5,
        name: "Age",
        accessor: "age",
        sortable: true,
    },
    { id: 8, name: "Actions" },
];

const App = () => {
    const [userList, setUserList] = useState([]);
    const [tableData, handleSorting] = useSortableTable(userList, TableHeader); // data, columns
    const [cursorPos, setCursorPos] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    // search filter for all fields
    const [query, setQuery] = useState("");

    const data = Object.values(tableData);
    function search(items) {
        if (query !== "" && cursorPos !== 1) {
            setCursorPos(1);
        }
        const res = items.filter((item) =>
            Object.keys(Object.assign({}, ...data)).some((parameter) =>
                item[parameter]?.toString().toLowerCase().includes(query)
            )
        );
        return res.slice(
            (cursorPos - 1) * pageSize,
            (cursorPos - 1) * pageSize + pageSize
        );
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/students`)
            .then((res) => res.json())
            .then((data) => {
                setUserList(data);
            });
    }, []);

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        name: "",
        email: "",
        dob: "",
        age: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        dob: "",
        age: "",
    });


    //modified id status
    const [editContactId, setEditContactId] = useState(null);

    //changeHandler
    //Update state with input data
    const handleAddFormChange = (event) => {
        event.preventDefault();

        //fullname, address, phoneNumber, email
        const fieldName = event.target.getAttribute("name");
        //각 input 입력값
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
        //addFormData > event.target(input)
        //fullName:"" > name="fullName", value=fullName input 입력값

        setAddFormData(newFormData);
    };


    //Update status with correction data
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    //submit handler
    //Clicking the Add button adds a new data row to the existing row
    const handleAddFormSubmit = (event) => {
        event.preventDefault(); // ???

        //data.json으로 이루어진 기존 행에 새로 입력받은 데이터 행 덧붙이기
        const newContact = {
            name: addFormData.name, //handleAddFormChange로 받은 새 데이터
            email: addFormData.email,
            dob: addFormData.dob,
            age: addFormData.age,
        };

        // api call
        Axios.post(`http://localhost:8080/api/v1/students`, {
            name: newContact.name,
            email: newContact.email,
            dob: newContact.dob,
            age: newContact.age,
        });

        //userList의 초기값은 data.json 데이터
        const newUserList = [...tableData, newContact];
        setUserList(newUserList);

        // close modal
        closeModal();

        // toast
        success("User added successfully");
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedContact = {
            id: editContactId, //initial value null
            name: editFormData.name,
            username: editFormData.username,
            position: editFormData.position,
            department: editFormData.department,
        };

        Axios.post(`${process.env.REACT_APP_API_URL}/admin/updateinfo/`, {
            user_id: editedContact.id,
            new_name: editedContact.name,
            new_username: editedContact.username,
            new_position: editedContact.position,
            new_department: editedContact.department,
        });

        const index = tableData.findIndex((td) => td.id === editContactId);
        tableData[index] = editedContact;
        setUserList(tableData);

        setEditContactId(null);
        success("User updated successfully");
        window.location.reload();
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, user) => {
        event.preventDefault(); // ???

        setEditContactId(user.id);
        const formValues = {
            name: user.name,
            username: user.username,
            position: user.position,
            department: user.department,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditContactId(null);
    };

    // delete
    const handleDeleteClick = (userId) => {
        const newUserList = [...userList];
        const index = userList.findIndex((user) => user.id === userId);
        // Axios.post(`${process.env.REACT_APP_API_URL}/admin/deleteuser/`, {
        //     user_id: userId,
        // }).then((response) => {
        //     if (response.data == "success") {
        //         success("User deleted successfully");
        //     }
        // });
        Axios.delete(`http://localhost:8080/api/v1/students/${userId}`).then(
            (response) => {
                if (response.data == "success") {
                    success("User deleted successfully");
                }
            }
        );
        newUserList.splice(index, 1);
        setUserList(newUserList);
    };

    // modal for add user
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div className="m-2 mt-4">
            <div className="my-2 mx-auto flex justify-center">
                <Pagination
                    pageSize={pageSize}
                    cursorPos={cursorPos}
                    setCursorPos={setCursorPos}
                    rowsCount={data.length}
                />
                <input
                    className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
                    placeholder="Search for anything..."
                    type="search"
                    name="search"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button
                    // new start // job change copy paste the className
                    className="flex flex-row items-center justify-center rounded-md bg-green-600 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add User <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button>
            </div>
            <form onSubmit={handleEditFormSubmit}>
                <table className="table">
                    <TableHead
                        columns={TableHeader}
                        handleSorting={handleSorting}
                    />
                    {search(tableData).length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                        </div>
                    ) : (
                        <tbody className="divide-y divide-gray-100 rounded-md">
                            {search(tableData).map((user, idx) => (
                                <tr
                                    key={user.id}
                                    className={`bg-white ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editContactId === user.id ? (
                                        <EditableRow
                                            editFormData={editFormData}
                                            setEditFormData={setEditFormData}
                                            handleEditFormChange={
                                                handleEditFormChange
                                            }
                                            handleCancelClick={
                                                handleCancelClick
                                            }
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            user={user}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={
                                                handleDeleteClick
                                            }
                                        />
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </form>

            {/* add item modal */}
            <Suspense fallback={<Loader />}>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => {}}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="mb-4 text-left text-3xl font-medium text-gray-900"
                                        >
                                            Add User
                                            <button
                                                className="float-right"
                                                onClick={closeModal}
                                            >
                                                <MdClose className="inline text-red-600" />
                                            </button>
                                        </Dialog.Title>
                                        <form
                                            onSubmit={handleAddFormSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Date of birth
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dob"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Age
                                                </label>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                            >
                                                Add
                                            </button>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </Suspense>

            
            {/* toast  */}
            <ToastContainer closeOnClick />
        </div>
    );
};

export default App;
