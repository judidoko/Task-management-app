import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import Elipsis from "../assets/icon-vertical-ellipsis.svg";
import ElipsisMenu from "./../components/ElipsisMenu";
import Subtask from "../components/Subtask";
import boardsSlice from "../redux/boardsSlice";
import DeleteModal from "./DeleteModal";
import EditTaskModal from "./EditTaskModal";

const TaskModal = ({ colIndex, taskIndex, setIsTaskModalOpen }) => {
  const dispatch = useDispatch();
  // Hook
  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false);
  const [isCloseOpenModal, setIsCloseOpenModal] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  //
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasks.find((col, i) => taskIndex === i);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });
  // Hooks
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [status, setStatus] = useState(task.status);
  // Function To Open Edit Modal for Task
  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setElipsisMenuOpen(false);
  };

  // Function To delete Task
  const setOpenCloseModal = () => {
    setElipsisMenuOpen(false);
    setIsCloseOpenModal(true);
  };

  // onChange function
  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  // onCloseModal function
  const onCloseModal = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  // Delete task function
  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
    setIsTaskModalOpen(false);
    setIsCloseOpenModal(false);
  };
  return (
    <>
      <div
        onClick={onCloseModal}
        className="fixed right-0 left-0 top-0 px-2 py-4 h-full overflow-scroll scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080] "
      >
        <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37]   text-black dark:text-white font-bold shadow-md shadow-[#363e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl ">
          <div className="relative flex justify-between w-full items-center">
            <h1 className="text-lg">{task.title}</h1>
            <img
              src={Elipsis}
              alt="elipsis menu"
              onClick={() => {
                setElipsisMenuOpen((state) => !state);
              }}
              className="cursor-pointer h-6"
            />
            {elipsisMenuOpen && (
              <ElipsisMenu
                setOpenEditModal={setOpenEditModal}
                setOpenCloseModal={setOpenCloseModal}
                type="Task"
              />
            )}
          </div>
          <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6"></p>
          <p className="pt-6 text-gray-500 tracking-widest text-sm">
            Subtasks ({completed} of {subtasks.length})
          </p>
          {/* Subtasks section */}
          <div className="mt-3 space-y-2">
            {subtasks.map((subtask, index) => {
              return (
                <Subtask
                  taskIndex={taskIndex}
                  colIndex={colIndex}
                  key={index}
                  index={index}
                />
              );
            })}
          </div>
          {/* Current status section */}
          <div className="mt-8 flex flex-col space-y-3">
            <label className="text-sm dark:text-white text-gray-500">
              Current Status
            </label>
            <select
              className="flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#2c5f2d] outline-none "
              value={status}
              onChange={onChange}
            >
              {columns.map((column, index) => (
                <option
                  key={index}
                  value={column.name}
                  className="dark:bg-[#2b2c37]"
                >
                  {column.name}
                </option>
              ))}
            </select>
          </div>
          {isCloseOpenModal && (
            <DeleteModal
              onDeleteBtnClick={onDeleteBtnClick}
              setIsCloseOpenModal={setIsCloseOpenModal}
              title={task.title}
              type="task"
            />
          )}
          {isAddTaskModalOpen && (
            <EditTaskModal
              setOpenEditTask={setIsAddTaskModalOpen}
              type="edit"
              taskIndex={taskIndex}
              pervColIndex={colIndex}
              setIsTaskModalOpen={setIsTaskModalOpen}
            />
          )}
        </div>
      </div>
    </>
  );
};
TaskModal.propTypes = {
  colIndex: PropTypes.number,
  taskIndex: PropTypes.number,
  setIsTaskModalOpen: PropTypes.func,
};
export default TaskModal;
