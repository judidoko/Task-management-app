import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import EditBoardModal from "../modals/EditBoardModal";

const Body = ({ setBoardModalOpen, boardModalOpen }) => {
  //  Hooks
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <>
      <div
        className={
          windowSize[0] >= 768 && isSideBarOpen
            ? "bg-[#f4f7fd]  w-fit h-screen flex dark:bg-[#20212c] overflow-y-scroll gap-6 ml-[261px]"
            : "bg-[#f4f7fd] w-fit h-screen flex dark:bg-[#20212c] scrollbar-hide overflow-auto gap-6"
        }
      >
        {/* SideBar Section */}
        {windowSize[0] >= 768 && (
          <SideBar
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
          />
        )}
        {/* Columns Section */}
        {columns.length > 0 ? (
          <>
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} />
            ))}
            <div
              onClick={() => {
                setBoardModalOpen(true);
              }}
              className="h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#2c5f2d] transition duration-300 cursor-pointer bg-[#e9effa] scrollbar-hide mb-2 mx-5 pt-[90px min-w-[280px] text-[#828fa3] mt-[135px] rounded-lg] "
            >
              + New Column
            </div>
          </>
        ) : (
          <>
            <EmptyBoard type="edit" />
          </>
        )}
        {boardModalOpen && (
          <EditBoardModal type="edit" setBoardModalOpen={setBoardModalOpen} />
        )}
      </div>
    </>
  );
};

Body.propTypes = {
  boardModalOpen: PropTypes.bool,
  setBoardModalOpen: PropTypes.func,
};
export default Body;
