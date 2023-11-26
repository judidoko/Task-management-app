import { useState } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import Elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import PropTypes from "prop-types";
import EditBoardModal from "../modals/EditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import EditTaskModal from "./../modals/EditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

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
            <img src={Logo} alt="Logo" className="h-6 w-6" />
            <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">
              TMA
            </h3>
            <div className="flex items-center">
              <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
                {board.name}
              </h3>
              <img
                src={openDropdown ? iconUp : iconDown}
                alt="Dropdown Icon"
                className="w-3 ml-2 cursor-pointer md:hidden"
                onClick={() => setOpenDropdown((state) => !state)}
              />
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
