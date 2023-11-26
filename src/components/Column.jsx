import { shuffle } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import Task from "./Task";
import boardsSlice from "../redux/boardsSlice";

const Column = ({ colIndex }) => {
  const colors = useMemo(
    () => [
      "bg-red-500",
      "bg-orange-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-sky-500",
    ],
    []
  );

  const [color, setColor] = useState(null);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const col = board.columns.find((col, i) => i === colIndex);

  useEffect(() => {
    setColor(shuffle(colors).pop()); //it's should work just one time

    return () => {};
  }, [dispatch, colors]);

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );
    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  return (
    <>
      <div
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        className="scrollbar-hide mx-5 pt-[90px] min-w-[280px] "
      >
        <div className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[1em] text-[#828fa3]">
          <div className={`rounded-full w-4 h-4 ${color}`} />
          {col.name} ({col?.tasks?.length})
        </div>
        {col.tasks?.map((task, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))}
      </div>
    </>
  );
};

Column.propTypes = {
  colIndex: PropTypes.number,
};
export default Column;
