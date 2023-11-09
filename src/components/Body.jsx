import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import Column from "./Column";

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
        {window[0] >= 768 && <SideBar />}
        {columns.map((col, index) => (
          <Column key={index} colIndex={index} />
        ))}
      </div>
    </>
  );
};

Body.propTypes = {
  boardModalOpen: PropTypes.bool,
  setBoardModalOpen: PropTypes.func,
};
export default Body;
