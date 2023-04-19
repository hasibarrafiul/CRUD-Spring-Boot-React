import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { data } from "./Support/mock-data";
import ReadOnlyRow from "./Support/ReadOnlyRow";
import EditableRow from "./Support/EditTableRow";

const App = () => {
    const [contacts, setContacts] = useState(data);

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
    });

    //modified id status
    const [editContactId, setEditContactId] = useState(null);

    //changeHandler
    //Update state with input data
    const handleAddFormChange = (event) => {
        event.preventDefault(); // ???

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
            id: Math.floor(Math.random() * 100),
            fullName: addFormData.fullName, //handleAddFormChange로 받은 새 데이터
            address: addFormData.address,
            phoneNumber: addFormData.phoneNumber,
            email: addFormData.email,
        };

        //contacts의 초기값은 data.json 데이터
        const newContacts = [...contacts, newContact];
        setContacts(newContacts);

        // close modal
        closeModal();
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedContact = {
            id: editContactId, //initial value null
            fullName: editFormData.fullName,
            address: editFormData.address,
            phoneNumber: editFormData.phoneNumber,
            email: editFormData.email,
        };

        const newContacts = [...contacts]; //json.data + data added with setContacts above by receiving new input
        const index = contacts.findIndex(
            (contact) => contact.id === editContactId
        );
        newContacts[index] = editedContact; // Assign the modified data object to the object of the index row of the contacts array, which is the entire data

        setContacts(newContacts);
        setEditContactId(null);
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, contact) => {
        event.preventDefault(); // ???

        setEditContactId(contact.id);
        const formValues = {
            fullName: contact.fullName,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditContactId(null);
    };

    // delete
    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];
        const index = contacts.findIndex((contact) => contact.id === contactId);
        newContacts.splice(index, 1);
        setContacts(newContacts);
    };

    // search filter
    const handleSearch = (searchValue) => {
        if (searchValue === "") {
            setContacts(data);
            return;
        }

        let value = searchValue.toLowerCase();

        const newFilterData = contacts.filter((contact) => {
            const fullName = contact.fullName.toLowerCase();
            return fullName.includes(value);
        });

        setContacts(newFilterData);
    };

    // modal
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    //If save(submit) is pressed after editing is completed, submit > handleEditFormSubmit action
    return (
        <div className="m-2 mt-4">
            <div className="flex flex-row justify-center">
                <button
                    className="rounded-sm bg-green-300 p-3 text-sm font-semibold text-gray-900 transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add a Item
                </button>
                <input
                    className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-green-500 focus:ring-0 sm:text-sm"
                    placeholder="Search for anything..."
                    type="search"
                    name="search"
                    onChange={(e) => handleSearch(e.target.value.trim())}
                />
                <button
                    className="rounded-sm bg-green-500 p-3 text-sm font-semibold text-gray-900"
                    // onClick={openModal}
                >
                    Export
                </button>
            </div>
            <br />
            <form onSubmit={handleEditFormSubmit}>
                <table className="w-full rounded-md">
                    <thead className="rounded-md border-b-2 border-gray-400 bg-orange-200">
                        <tr>
                            <th className="w-8 p-3 text-left text-sm font-semibold tracking-wide">
                                ID
                            </th>
                            <th className="p-3 text-left text-sm font-semibold tracking-wide">
                                Name
                            </th>
                            <th className="p-3 text-left text-sm font-semibold tracking-wide">
                                Address
                            </th>
                            <th className="w-36 p-3 text-left text-sm font-semibold tracking-wide">
                                Phone Number
                            </th>
                            <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                                Email
                            </th>
                            <th className="w-16 p-3 text-left text-sm font-semibold tracking-wide">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 rounded-md">
                        {contacts.map((contact, idx) => (
                            <tr
                                className={`bg-white ${
                                    idx % 2 === 1 ? "bg-gray-200" : ""
                                }`}
                            >
                                {editContactId === contact.id ? (
                                    <EditableRow
                                        editFormData={editFormData}
                                        handleEditFormChange={
                                            handleEditFormChange
                                        }
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        contact={contact}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>

            {/* add item modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        className="mb-4 text-center text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add data
                                    </Dialog.Title>
                                    <form
                                        onSubmit={handleAddFormSubmit}
                                        className="flex flex-col gap-4"
                                    >
                                        <input
                                            className="w-full rounded-md text-sm"
                                            type="text"
                                            name="fullName"
                                            required
                                            placeholder="Enter a name..."
                                            onChange={handleAddFormChange}
                                        />
                                        <input
                                            className="w-full rounded-md text-sm"
                                            type="text"
                                            name="address"
                                            required
                                            placeholder="Enter an addres..."
                                            onChange={handleAddFormChange}
                                        />
                                        <input
                                            className="w-full rounded-md text-sm"
                                            type="text"
                                            name="phoneNumber"
                                            required
                                            placeholder="Enter a phone number..."
                                            onChange={handleAddFormChange}
                                        />
                                        <input
                                            className="w-full rounded-md text-sm"
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="Enter an email..."
                                            onChange={handleAddFormChange}
                                        />
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
        </div>
    );
};

export default App;
