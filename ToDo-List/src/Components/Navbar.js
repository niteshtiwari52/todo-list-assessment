import React, { useState } from "react";
import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { createTask, getTask } from "../Redux/Reducer/Task/task.action";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    description: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleChange = (e) => {
    setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    // console.log(taskData);
    if (taskData.title && taskData.category && taskData.description) {
      await dispatch(createTask(taskData));
      await dispatch(getTask());
      closeModal();
      setTaskData({
        title: "",
        category: "",
        description: "",
      });
    } else {
      alert("please provide title, Category , Description");
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="http:/localhost:3000" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              My-Task
            </span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
              onClick={openModal}
            >
              + Add New Task
            </button>
          </div>
        </div>
      </nav>
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
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Create New Task
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="mb-6">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. Coding "
                        required
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. programming"
                        name="category"
                        value={taskData.category}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter details about your Task"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button
                      // type="submit"
                      onClick={handleSubmit}
                      className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                    >
                      Create Task
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;
