import { useState } from "react";
import { PropTypes } from "prop-types";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./../redux/boardsSlice";

const EditBoardModal = ({ setBoardModalOpen, type }) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  // Hooks
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);
  //   0nChange for board column
  const onChange = (id, newValue) => {
    setNewColumns((preState) => {
      const newState = [...preState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };
  //   To Delete Task from a board
  const onDelete = (id) => {
    setNewColumns((perState) => perState.filter((e) => e.id !== id));
  };
  // To validate
  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };
  // To save and edit new Board
  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      // dispatch
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      // dispatch
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  // To display the current board column's name on edit modal
  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className="fixed right-0 left-0 top-0 bottom-0 scrollbar-hide px-2 py-4 overflow-scroll z-50 flex justify-center items-center bg-[#00000080]"
    >
      {/* Modal Section */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"}</h3>
        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          <input
            type="text"
            className="bg-transparent px-4 py-2 rounded-md outline-none text-sm border border-gray-600 fucus:outline-[#2c5f2d] outline-1 ring-0"
            placeholder="e.g Graphic Design"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          {newColumns?.map((column, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                type="text"
                value={column.name}
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]"
              />
              <img
                src={crossIcon}
                alt="CrossIcon"
                className="cursor-pointer m-4"
                onClick={() => {
                  onDelete(column.id);
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", task: [], id: uuidv4 },
              ]);
            }}
            className="w-full items-center mt-2 hover:opacity-75 dark:text-[#2c5f2d] dark:bg-white text-white bg-[#2c5f2d] py-2 rounded-full"
          >
            + Add new Column
          </button>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
            className="w-full items-center hover:opacity-75 dark:text-white dark:bg-[#2c5f2d] mt-8 relative text-white bg-[#2c5f2d] py-2 rounded-full"
          >
            {type == "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

EditBoardModal.propTypes = {
  setBoardModalOpen: PropTypes.func,
  type: PropTypes.string,
};

export default EditBoardModal;
