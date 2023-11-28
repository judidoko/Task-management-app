import { useState } from "react";
import { PropTypes } from "prop-types";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

const EditTaskModal = ({
  type,
  device,
  setOpenEditTask,
  taskIndex,
  prevColIndex = 0,
  setIsTaskModalOpen,
}) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  //
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  //Hooks
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  //   Function for input OnChange
  const onChange = (id, newValue) => {
    setSubtasks((perState) => {
      const newState = [...perState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  //   function to delete task input
  const onDelete = (id) => {
    setSubtasks((perState) => perState.filter((e) => e.id !== id));
  };
  // To validate
  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  //   onSubmit function to submit task or edit task
  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          desc,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          desc,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  // To enable editing of task when user want to edit
  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDesc(task.description);
    setIsFirstLoad(false);
  }

  // function to select current status task
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };
  return (
    <>
      <div
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            return;
          }
          setOpenEditTask(false);
        }}
        className={
          device === "mobile"
            ? "py-6 px-6 pb-40 absolute overflow-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
            : "py-6 px-6 pb-40 absolute overflow-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
        }
      >
        {/* Modal Section */}
        <div className="scroll-hide overflow-y-hidden  my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
          <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"}</h3>
          {/* task Name */}
          <div className="mt-8 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">
              Task Name
            </label>
            <input
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#2c5f2d] ring-0"
              type="text"
              value={title}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g Take a 30mins break by 2 PM  "
            />
          </div>
          {/* Description */}
          <div className="mt-8 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">
              Description
            </label>
            <textarea
              className="bg-transparent min-h-[200px] px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#2c5f2d] ring-0"
              value={desc}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g Take a 30mins break by 2 PM to take coffee and take a walk"
            />
          </div>
          {/* Subtask Section */}
          <div className="mt-8 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">
              Subtasks
            </label>
            {subtasks.map((subtask, index) => {
              return (
                <div key={index} className="flex items-center w-full">
                  <input
                    type="text"
                    value={subtask.title}
                    onChange={(e) => {
                      onChange(subtask.id, e.target.value);
                    }}
                    className="bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#2c5f2d]"
                    placeholder="e.g Complete the button section"
                  />
                  <img
                    src={crossIcon}
                    alt="delete task icon"
                    className="m-4 cursor-pointer"
                    onClick={() => {
                      onDelete(subtask.id);
                    }}
                  />
                </div>
              );
            })}
            {/* button */}
            <button
              onClick={() => {
                setSubtasks((state) => [
                  ...state,
                  { title: "", isCompleted: false, id: uuidv4() },
                ]);
              }}
              className="w-full items-center dark:text-[#2c5f2d] dark:bg-white text-white bg-[#2c5f2d] py-3 rounded-full "
            >
              + Add New subtask
            </button>
          </div>
          {/* Current Status Section */}
          <div className="mt-8 flex flex-col space-y-3 ">
            <label className="text-sm dark:text-white text-gray-500">
              Current Status
            </label>
            <select
              value={status}
              onChange={(e) => onChangeStatus(e)}
              className="flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#2c5f2d] outline-none"
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
            <button
              onClick={() => {
                const isValid = validate();
                if (isValid) {
                  onSubmit(type);
                  setOpenEditTask(false);
                }
              }}
              className="w-full items-center text-white bg-[#2c5f2d] py-2 rounded-full"
            >
              {type === "edit" ? "Save Edit" : "Create Task"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
EditTaskModal.propTypes = {
  type: PropTypes.string,
  device: PropTypes.string,
  setOpenEditTask: PropTypes.func,
  taskIndex: PropTypes.number,
  prevColIndex: PropTypes.number,
  setIsTaskModalOpen: PropTypes.func,
};
export default EditTaskModal;
