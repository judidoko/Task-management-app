import { PropTypes } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./../redux/boardsSlice";

const Subtask = ({ index, taskIndex, colIndex }) => {
  const dispatch = useDispatch();
  //
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasks.find((col, i) => taskIndex === i);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  const checked = subtask.isCompleted;

  //   onChange function
  const onChange = () => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };
  return (
    <>
      <div className="w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd] ">
        <input
          onChange={onChange}
          type="checkbox"
          className="w-4 h-4 accent-[#635fc7] cursor-pointer"
          checked={checked}
        />
        <p className={checked ? "line-through opacity-30" : ""}>
          {subtask.title}
        </p>
      </div>
    </>
  );
};

Subtask.propTypes = {
  index: PropTypes.number,
  taskIndex: PropTypes.number,
  colIndex: PropTypes.number,
};
export default Subtask;
