import React, { useEffect, useState, Fragment } from "react";
import Navbar from "./Navbar";
import Cards from "./cards";
import Lists from "./lists";
import { useSelector } from "react-redux";

const Home = () => {
  const result = useSelector((globalState) => globalState.task.tasks);
  // console.log(result);

  let [isOpen, setIsOpen] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [filterOption, setFilterOption] = useState("all"); // Default filter option is "all"

  useEffect(() => {
    if (result) {
      setAllTask(result);
    }
    // console.log(allTask);
  }, [result]);

  function closeModal() {
    setIsOpen(false);
    // setIsOpen(true);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Handle filter change
  const handleFilterChange = (option) => {
    setFilterOption(option);
  };
  // Filter tasks based on the filter option
  const filteredTasks = allTask.filter((task) => {
    if (filterOption === "completed") {
      return task.isCompleted === true;
    } else if (filterOption === "incompleted") {
      return task.isCompleted === false;
    }
    return true; // Return all tasks if filter option is "all"
  });

  // Calculate total number of tasks and completed/incomplete tasks
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(
    (task) => task.isCompleted
  ).length;
  const incompleteTasks = totalTasks - completedTasks;
  return (
    <>
      <Navbar />
      {/* Filter Implementation & Task Render layout*/}
      <div className="relative flex justify-center gap-3 mt-24 mb-4">
        {/* Filter button - All  */}
        <button
          className={` hover:bg-teal-00 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 ${
            filterOption === "all" ? "text-white bg-teal-700" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All ({totalTasks})
        </button>
        {/* Filter button - Completed  */}
        <button
          className={` hover:bg-teal-00 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 ${
            filterOption === "completed"
              ? "text-white bg-teal-700"
              : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("completed")}
        >
          Completed ({completedTasks})
        </button>
        {/* Filter button - Incompleted  */}
        <button
          className={` hover:bg-teal-00 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 ${
            filterOption === "incompleted"
              ? "text-white bg-teal-700"
              : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("incompleted")}
        >
          Incompleted ({incompleteTasks})
        </button>
      </div>

      {/* Task Render LAyout */}
      <div className="relative flex justify-center gap-3 mt-8 mb-4">
        {/* Render layout button - Grid layout */}

        <button
          className={`hover:bg-teal-00 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 ${
            isGridLayout ? "text-white bg-teal-700" : "bg-gray-200"
          }`}
          onClick={() => setIsGridLayout(true)}
        >
          Grid View
        </button>
        {/* Render layout button - List layout(default) */}
        <button
          className={`hover:bg-teal-00 focus:ring-4 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 ${
            !isGridLayout ? "text-white bg-teal-700" : "bg-gray-200"
          }`}
          onClick={() => setIsGridLayout(false)}
        >
          List View
        </button>
      </div>
      <taskLayoutRenderButton
        isGridLayout={isGridLayout}
        setIsGridLayout={setIsGridLayout}
      />
      <div
        className={`flex flex-wrap  mt-12 ${
          !isGridLayout ? `justify-center` : ``
        } `}
      >
        {isGridLayout ? (
          <Cards filteredTasks={filteredTasks} />
        ) : (
          <Lists filteredTasks={filteredTasks} />
        )}
        {/* Card layout */}

        {/* List Layout */}
      </div>
    </>
  );
};

export default Home;
