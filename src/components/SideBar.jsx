import { PropTypes } from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDarkMode from "../Hooks/DarkMode";
import boardsSlice from "../redux/boardsSlice";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { Switch } from "@headlessui/react";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import EditBoardModal from "../modals/EditBoardModal";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const dispatch = useDispatch();
  // Hooks
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [colorTheme, setColorTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const boards = useSelector((state) => state.boards);

  // function to toggle switch component
  const toggleDarkMode = (checked) => {
    setColorTheme(colorTheme);
    setDarkSide(checked);
  };
  return (
    <>
      <div>
        <div
          className={
            isSideBarOpen
              ? `min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20 `
              : `bg-[#2c5f2d] dark:bg-[#2b2cc37] dark:hover:bg-[#2c5f2d] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed w-[56px] h-[48px] rounded-r-full `
          }
        >
          {isSideBarOpen && (
            <div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl ">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                ALL BOARDS ({boards?.length})
              </h3>
              <div className="flex flex-col h-[70px] justify-between ">
                <div className=" ">
                  {boards.map((board, index) => (
                    <div
                      key={index}
                      className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-white dark:hover:text-[#2c5f2d] dark:text-white ${
                        board.isActive &&
                        "bg-[#2c5f2d] rounded-r-full text-white mr-8"
                      }`}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="h-4" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  ))}
                  <div
                    onClick={() => {
                      setBoardModalOpen(true);
                    }}
                    className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#2c5f2d] px-5 py-4 hover:bg-[#2c5f2d1a] hover:text-[#2c5f2d] dark:hover:bg-white "
                  >
                    <img src={boardIcon} alt="BoardIcon" className="h-4" />
                    <p className="text-lg font-bold">Create New Board</p>
                  </div>
                </div>
                <div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg ">
                  {/* Switching to dark theme */}
                  <img src={lightIcon} alt="light theme" />
                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#2c5f2d]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    ></span>
                  </Switch>
                  <img src={darkIcon} alt="dark theme" />
                </div>
              </div>
            </div>
          )}
          {/* Show/hide sidebar Toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#2c5f2d] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#2c5f2d1a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500 "
            >
              <img
                src={hideSidebarIcon}
                alt="Hide Sidebar Icon"
                className="min-w-[20px]"
              />
              {isSideBarOpen && <p>Hide SideBar</p>}
            </div>
          ) : (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="absolute p-5"
            >
              <img src={showSidebarIcon} alt="Show sidebar Icon" />
            </div>
          )}
        </div>
        {boardModalOpen && (
          <EditBoardModal type="add" setBoardModalOpen={setBoardModalOpen} />
        )}
      </div>
    </>
  );
};

SideBar.propTypes = {
  isSideBarOpen: PropTypes.bool,
  setIsSideBarOpen: PropTypes.func,
};
export default SideBar;
