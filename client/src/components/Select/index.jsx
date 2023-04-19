import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Select({
    options,
    name,
    value = "",
    addFormData,
    setAddFormData,
    isAddFromData = false,
    editFormData,
    setEditFormData,
    isEditFormData = false,
    isDisabled = true,
}) {
    options = [...new Set(options)];



    const [selected, setSelected] = useState(value !== "" ? value : "");
    const [query, setQuery] = useState("");

    if (isAddFromData && addFormData[name] !== selected) {
        const newFormData = { ...addFormData };
        newFormData[name] = selected;
        setAddFormData(newFormData);
    }

    if (isEditFormData && editFormData[name] !== selected) {
        const newFormData = { ...editFormData };
        newFormData[name] = selected;
        setEditFormData(newFormData);
    }

    const onInputFocus = (event) => {
        if (isDisabled) {
            event.target.value = "";
            event.target.disabled = true;
        } else {
            event.target.disabled = false;
        }
    };

    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) => {
                  return option.value
                      .toLowerCase()
                      .includes(query.trim().toLowerCase());
              });

    return (
        <div className="z-20 w-full">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative">
                    <div className="peer relative w-full rounded-md bg-gray-50 capitalize outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400">
                        <Combobox.Input
                            className="peer w-full rounded-md bg-gray-50 capitalize outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            displayValue={() => selected}
                            onChange={(event) => setQuery(event.target.value)}
                            disabled={isDisabled}
                            required
                        />
                        <Combobox.Button
                            onClick={() => onInputFocus}
                            className="absolute inset-y-0 right-0 flex items-center pr-2"
                        >
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full divide-y divide-green-400 overflow-auto rounded-md bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none rounded-md bg-red-600 py-2 px-4 text-white">
                                    Nothing found...
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <Combobox.Option
                                        key={option.value}
                                        className={({ active }) =>
                                            `relative cursor-default select-none rounded-md py-2 pl-10 pr-4 transition duration-100 ease-in-out
                                            ${
                                                active
                                                    ? "bg-green-600 text-white"
                                                    : "text-gray-900"
                                            }`
                                        }
                                        value={option.value}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate capitalize  ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {option.value}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "font-extrabold text-white"
                                                                : "text-green-600"
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
