import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  deleteTask,
  getTask,
  updateTask,
  updateTaskStatus,
} from "../Redux/Reducer/Task/task.action";

const Lists = ({ filteredTasks }) => {
  const dispatch = useDispatch();
  const [taskStatus, setTaskStatus] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState();
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

  /**
   *  function - for handling Input state
   */
  const handleChange = (e) => {
    setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   *  function - for submit updated task
   */
  const handleSubmit = async () => {
    await dispatch(updateTask(taskData, updatingTaskId));
    await dispatch(getTask());
    closeModal();
    setTaskData({
      title: "",
      category: "",
      description: "",
    });
  };

  /**
   *  function - for Deleting a task
   */
  const handleDeleteTask = async (taskId) => {
    await dispatch(deleteTask(taskId));
    await dispatch(getTask());
  };

  /**
   *  function - for Editing a task
   */
  const handleEditTask = async (taskData) => {
    openModal();
    setUpdatingTaskId(taskData.id);
    setTaskData({
      title: taskData.title,
      category: taskData.category,
      description: taskData.description,
    });
  };

  /**
   *  function - for marking task status completed
   */
  const markAsComplete = async (id) => {
    const data = {
      isCompleted: true,
    };
    await dispatch(updateTaskStatus(data, id));
    await dispatch(getTask());
  };

  return (
    <>
      {filteredTasks ? (
        <>
          {filteredTasks.map((item) => (
            <>
              <div key={item.id} className="w-full p-4 md:w-4/5 lg:w-4/5">
                <div className="w-full h-full bg-white rounded-2xl border border-gray-300 drop-shadow-md ">
                  <div className="p-3 flex flex-col gap-2">
                    <div className="flex flex-row-reverse mt-2 items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        Category: {item.category}
                      </span>

                      {item.isCompleted === true ? (
                        <>
                          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Status: Completed
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            Status: Pending
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-black capitalize">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-black normal-case">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      <hr />
                    </div>

                    <div className="flex justify-center gap-3 md:order-2">
                      <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-00 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => handleEditTask(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => handleDeleteTask(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="text-white bg-purple-700 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                        onClick={() => markAsComplete(item.id)}
                      >
                        Mark as completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      ) : (
        ""
      )}
      {/* Modal for updating the task  */}
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
                    Updating Task
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
                      Update Task
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

export default Lists;
