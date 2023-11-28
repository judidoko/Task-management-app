import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import Elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import PropTypes from "prop-types";
import EditBoardModal from "../modals/EditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import EditTaskModal from "./../modals/EditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import { TiThMenu } from "react-icons/ti";

const Header = ({ boardModalOpen, setBoardModalOpen }) => {
  const dispatch = useDispatch();
  // Hooks
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [openEditTask, setOpenEditTask] = useState(false);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);
  const [isCloseOpenModal, setIsCloseOpenModal] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  // Open edit Modal function
  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisOpen(false);
  };

  // To close task function
  const setOpenCloseModal = () => {
    setIsCloseOpenModal(true);
    setIsElipsisOpen(false);
  };

  //  function to delete task
  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setIsCloseOpenModal(false);
  };

  return (
    <>
      <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
        <header className="flex justify-between dark:text-white items-center">
          {/* Left Side Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <TiThMenu className="h-6 w-6 text-[#2C5F2D]" />
            <h3 className="hidden md:inline-block font-bold font-sans text-[#2C5F2D] md:text-4xl">
              TMA
            </h3>
            <div className="flex items-center">
              <h3 className="truncate max-w-[200px] md:text-2xl text-xl underline decoration-4 font-bold md:ml-20 font-sans">
                {board.name}
              </h3>
              <div
                onClick={() => setOpenDropdown((state) => !state)}
                className="w-3 ml-2 cursor-pointer md:hidden text-[#2C5F2D] text-2xl"
              >
                {openDropdown ? <SlArrowUp /> : <SlArrowDown />}
              </div>
            </div>
          </div>
          {/* Right Side Section  */}
          <div className="flex space-x-4 items-center md:space-x-6">
            <button
              className="button hidden md:block"
              onClick={() => {
                setOpenEditTask((state) => !state);
              }}
            >
              +Add New Task
            </button>
            <button
              className="button py-1 px-3 md:hidden"
              onClick={() => {
                setOpenEditTask((state) => !state);
              }}
            >
              +
            </button>
            <img
              src={Elipsis}
              onClick={() => {
                setBoardType("edit");
                setOpenDropdown(false);
                setIsElipsisOpen((state) => !state);
              }}
              alt="elipsis"
              className="cursor-pointer h-6"
            />

            {isElipsisOpen && (
              <ElipsisMenu
                setOpenEditModal={setOpenEditModal}
                setOpenCloseModal={setOpenCloseModal}
                type="Boards"
              />
            )}
          </div>
        </header>
        {openDropdown && (
          <HeaderDropdown
            setBoardModalOpen={setBoardModalOpen}
            setOpenDropdown={setOpenDropdown}
          />
        )}
        {boardModalOpen && (
          <EditBoardModal
            setBoardModalOpen={setBoardModalOpen}
            type={boardType}
          />
        )}
        {openEditTask && (
          <EditTaskModal
            setOpenEditTask={setOpenEditTask}
            device="mobile"
            type="add"
          />
        )}
        {isCloseOpenModal && (
          <DeleteModal
            title={board.name}
            type={boardType}
            onDeleteBtnClick={onDeleteBtnClick}
            setIsCloseOpenModal={setIsCloseOpenModal}
          />
        )}
      </div>
    </>
  );
};

Header.propTypes = {
  setBoardModalOpen: PropTypes.func,
  boardModalOpen: PropTypes.bool,
};
export default Header;
